import { db } from "../db";
import { ListingStatus, BookingStatus, CallbackStatus, Role } from "@prisma/client";
import { auth } from "@/auth";
import { promoteListingImagesToPublic, getPendingImageSignedUrl } from "./storage.service";
import {
  notifyPartnerListingApproved,
  notifyPartnerListingRejected,
  notifyBookingStatusUpdated,
} from "./notification.service";
import { revalidatePath } from "next/cache";

/**
 * Server-side Admin Role Verification
 * Checked at the start of EVERY admin service function and route handler.
 */
export async function verifyAdminSession() {
  const session = await auth();
  const user = session?.user as any;
  if (!user?.id || user.role !== Role.ADMIN) {
    throw new Error("UNAUTHORIZED: Admin privileges required.");
  }
  return user as { id: string; email?: string | null; name?: string | null; role: Role };
}

/**
 * 1. Overview Statistics for /admin
 * Server-rendered counts, refreshed on load.
 */
export async function getAdminOverviewStats() {
  await verifyAdminSession();

  const [
    activeListingsCount,
    pendingListingsCount,
    registeredUsersCount,
    upcomingToursCount,
    newCallbacksCount,
    recentAudits,
  ] = await Promise.all([
    // Active / Published listings
    db.workspace.count({
      where: {
        status: { in: [ListingStatus.PUBLISHED, ListingStatus.APPROVED] },
      },
    }),
    // Submissions pending review
    db.workspace.count({
      where: {
        status: { in: [ListingStatus.PENDING_REVIEW, ListingStatus.PENDING_APPROVAL] },
      },
    }),
    // Registered users
    db.user.count(),
    // Upcoming tours (REQUESTED, CONFIRMED, RESCHEDULED from today onward)
    db.tourBooking.count({
      where: {
        status: { in: [BookingStatus.REQUESTED, BookingStatus.CONFIRMED, BookingStatus.RESCHEDULED] },
        visitDate: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
      },
    }),
    // New callback requests
    db.callbackRequest.count({
      where: { status: CallbackStatus.NEW },
    }),
    // Recent 5 audit events
    db.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        user: { select: { name: true, email: true } },
      },
    }),
  ]);

  return {
    activeListingsCount,
    pendingListingsCount,
    registeredUsersCount,
    upcomingToursCount,
    newCallbacksCount,
    recentAudits,
  };
}

/**
 * 2. Listings Review Queue for /admin/listings
 * Filter by status & city, search query, with pagination.
 * Pending listings are prioritized first.
 */
export async function getAdminListingsQueue(params: {
  status?: string;
  city?: string;
  search?: string;
  page?: number;
  limit?: number;
}) {
  await verifyAdminSession();

  const page = Math.max(1, Number(params.page) || 1);
  const limit = Math.max(1, Math.min(50, Number(params.limit) || 15));
  const skip = (page - 1) * limit;

  const where: any = {};

  if (params.status && params.status !== "ALL") {
    where.status = params.status as ListingStatus;
  }

  if (params.city && params.city !== "ALL") {
    where.city = { contains: params.city, mode: "insensitive" };
  }

  if (params.search) {
    where.OR = [
      { title: { contains: params.search, mode: "insensitive" } },
      { location: { contains: params.search, mode: "insensitive" } },
      { city: { contains: params.search, mode: "insensitive" } },
    ];
  }

  const [total, listings] = await Promise.all([
    db.workspace.count({ where }),
    db.workspace.findMany({
      where,
      skip,
      take: limit,
      orderBy: [
        {
          // Custom status order can't be done in one DB sort directly,
          // so we sort by updatedAt desc while giving UI filter default to PENDING_REVIEW
          updatedAt: "desc",
        },
      ],
      include: {
        partner: {
          select: { id: true, name: true, email: true },
        },
        images: {
          where: { isPrimary: true },
          take: 1,
        },
      },
    }),
  ]);

  return {
    listings,
    total,
    totalPages: Math.ceil(total / limit) || 1,
    currentPage: page,
  };
}

/**
 * 3. Full Listing Detail for /admin/listings/[id]
 * Includes signed URLs for pending images preview.
 */
export async function getAdminListingDetail(id: string) {
  await verifyAdminSession();

  const listing = await db.workspace.findUnique({
    where: { id },
    include: {
      partner: {
        select: { id: true, name: true, email: true },
      },
      reviewedBy: {
        select: { id: true, name: true, email: true },
      },
      images: {
        orderBy: { order: "asc" },
      },
      amenities: {
        include: { amenity: true },
      },
      bookings: {
        orderBy: { createdAt: "desc" },
        take: 10,
      },
      callbacks: {
        orderBy: { createdAt: "desc" },
        take: 10,
      },
    },
  });

  if (!listing) return null;

  // Resolve signed URLs for images if in pending review
  const resolvedImages = await Promise.all(
    listing.images.map(async (img) => {
      let previewUrl = img.url;
      if (!img.url.startsWith("http://") && !img.url.startsWith("https://")) {
        previewUrl = await getPendingImageSignedUrl(img.url);
      }
      return {
        ...img,
        previewUrl,
      };
    })
  );

  return {
    ...listing,
    images: resolvedImages,
  };
}

/**
 * 4. Listing Approval Action
 * - Set status = PUBLISHED, publishedAt, reviewedById, reviewedAt
 * - Move images from listing-pending to listing-public
 * - Update stored image paths
 * - Write an AuditLog row
 * - Revalidate public pages
 * - Send email notification to partner
 */
export async function approveListing(listingId: string, adminUserId: string) {
  await verifyAdminSession();

  const workspace = await db.workspace.findUnique({
    where: { id: listingId },
    include: {
      images: true,
      partner: { select: { email: true, name: true } },
    },
  });

  if (!workspace) {
    throw new Error("Listing not found");
  }

  const now = new Date();

  // 1. Promote images from listing-pending to listing-public
  const pendingPaths = workspace.images
    .map((img) => img.url)
    .filter((url) => !url.startsWith("http"));

  if (pendingPaths.length > 0) {
    const promoted = await promoteListingImagesToPublic(pendingPaths);
    // Update image URLs in database
    for (const item of promoted) {
      await db.workspaceImage.updateMany({
        where: { workspaceId: listingId, url: item.path },
        data: { url: item.publicUrl },
      });
    }
  }

  // 2. Update Workspace Status & Metadata
  const updated = await db.workspace.update({
    where: { id: listingId },
    data: {
      status: ListingStatus.PUBLISHED,
      publishedAt: now,
      reviewedById: adminUserId,
      reviewedAt: now,
      reviewNotes: null,
    },
  });

  // 3. Write AuditLog row
  await db.auditLog.create({
    data: {
      userId: adminUserId,
      actorId: adminUserId,
      action: "LISTING_APPROVE",
      entityType: "WORKSPACE",
      entityId: listingId,
      metadata: {
        status: ListingStatus.PUBLISHED,
        publishedAt: now.toISOString(),
      },
      details: `Listing "${workspace.title}" approved and published by admin`,
    },
  });

  // 4. Revalidate public cache
  try {
    revalidatePath("/workspaces");
    revalidatePath(`/workspaces/${workspace.slug}`);
    revalidatePath("/");
  } catch (err) {
    console.warn("Revalidation warning:", err);
  }

  // 5. Send approval notification to partner
  if (workspace.partner?.email) {
    notifyPartnerListingApproved({
      partnerEmail: workspace.partner.email,
      title: workspace.title,
      slug: workspace.slug,
    });
  }

  return updated;
}

/**
 * 5. Listing Rejection Action
 * Requires feedback notes, sets REJECTED, writes audit log, emails partner reason.
 */
export async function rejectListing(
  listingId: string,
  adminUserId: string,
  reviewNotes: string
) {
  await verifyAdminSession();

  if (!reviewNotes || reviewNotes.trim().length < 5) {
    throw new Error("Rejection feedback notes are required (minimum 5 characters).");
  }

  const workspace = await db.workspace.findUnique({
    where: { id: listingId },
    include: {
      partner: { select: { email: true, name: true } },
    },
  });

  if (!workspace) {
    throw new Error("Listing not found");
  }

  const now = new Date();

  // 1. Update status to REJECTED and record review notes
  const updated = await db.workspace.update({
    where: { id: listingId },
    data: {
      status: ListingStatus.REJECTED,
      reviewNotes: reviewNotes.trim(),
      reviewedById: adminUserId,
      reviewedAt: now,
    },
  });

  // 2. Write AuditLog row
  await db.auditLog.create({
    data: {
      userId: adminUserId,
      actorId: adminUserId,
      action: "LISTING_REJECT",
      entityType: "WORKSPACE",
      entityId: listingId,
      metadata: {
        status: ListingStatus.REJECTED,
        reason: reviewNotes.trim(),
      },
      details: `Listing "${workspace.title}" rejected with notes: ${reviewNotes.trim()}`,
    },
  });

  // 3. Email partner feedback
  if (workspace.partner?.email) {
    notifyPartnerListingRejected({
      partnerEmail: workspace.partner.email,
      title: workspace.title,
      reason: reviewNotes.trim(),
      listingId: workspace.id,
    });
  }

  return updated;
}

/**
 * 6. Tour Bookings Management for /admin/bookings
 */
export async function getAdminBookings(params: {
  status?: string;
  city?: string;
  date?: string;
  page?: number;
  limit?: number;
}) {
  await verifyAdminSession();

  const page = Math.max(1, Number(params.page) || 1);
  const limit = Math.max(1, Math.min(50, Number(params.limit) || 20));
  const skip = (page - 1) * limit;

  const where: any = {};

  if (params.status && params.status !== "ALL") {
    where.status = params.status as BookingStatus;
  }

  if (params.city && params.city !== "ALL") {
    where.workspace = {
      city: { contains: params.city, mode: "insensitive" },
    };
  }

  if (params.date) {
    const targetDate = new Date(params.date);
    const nextDay = new Date(targetDate);
    nextDay.setDate(targetDate.getDate() + 1);

    where.visitDate = {
      gte: targetDate,
      lt: nextDay,
    };
  }

  const [total, bookings] = await Promise.all([
    db.tourBooking.count({ where }),
    db.tourBooking.findMany({
      where,
      skip,
      take: limit,
      orderBy: [{ visitDate: "asc" }, { createdAt: "desc" }],
      include: {
        workspace: {
          select: { id: true, title: true, city: true, location: true },
        },
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    }),
  ]);

  return {
    bookings,
    total,
    totalPages: Math.ceil(total / limit) || 1,
    currentPage: page,
  };
}

/**
 * 7. Tour Booking Status Transition Action
 * Controls: Confirm, Reschedule (new date), Complete, Cancel
 */
export async function updateAdminBookingStatus(params: {
  bookingId: string;
  status: BookingStatus;
  rescheduledTo?: Date | null;
  adminUserId: string;
}) {
  await verifyAdminSession();

  const booking = await db.tourBooking.findUnique({
    where: { id: params.bookingId },
    include: {
      workspace: { select: { title: true } },
    },
  });

  if (!booking) {
    throw new Error("Tour booking not found");
  }

  const updated = await db.tourBooking.update({
    where: { id: params.bookingId },
    data: {
      status: params.status,
      rescheduledTo: params.rescheduledTo || null,
    },
  });

  // Write audit log
  await db.auditLog.create({
    data: {
      userId: params.adminUserId,
      actorId: params.adminUserId,
      action: `BOOKING_${params.status}`,
      entityType: "TOUR_BOOKING",
      entityId: params.bookingId,
      metadata: {
        status: params.status,
        rescheduledTo: params.rescheduledTo?.toISOString() || null,
      },
      details: `Admin changed booking status to ${params.status}`,
    },
  });

  // Notify client
  notifyBookingStatusUpdated({
    userEmail: booking.guestEmail,
    userName: booking.guestName,
    workspaceTitle: booking.workspace.title,
    status: params.status,
    rescheduledTo: params.rescheduledTo,
  });

  return updated;
}

/**
 * 8. Callback Requests Management for /admin/callbacks
 */
export async function getAdminCallbacks(params: {
  status?: string;
  page?: number;
  limit?: number;
}) {
  await verifyAdminSession();

  const page = Math.max(1, Number(params.page) || 1);
  const limit = Math.max(1, Math.min(50, Number(params.limit) || 20));
  const skip = (page - 1) * limit;

  const where: any = {};

  if (params.status && params.status !== "ALL") {
    where.status = params.status as CallbackStatus;
  }

  const [total, callbacks] = await Promise.all([
    db.callbackRequest.count({ where }),
    db.callbackRequest.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        workspace: {
          select: { id: true, title: true, city: true },
        },
      },
    }),
  ]);

  return {
    callbacks,
    total,
    totalPages: Math.ceil(total / limit) || 1,
    currentPage: page,
  };
}

/**
 * 9. Update Callback Request Status & Notes
 */
export async function updateAdminCallbackStatus(params: {
  callbackId: string;
  status: CallbackStatus;
  notes?: string;
  adminUserId: string;
}) {
  await verifyAdminSession();

  const updated = await db.callbackRequest.update({
    where: { id: params.callbackId },
    data: {
      status: params.status,
      notes: params.notes,
    },
  });

  await db.auditLog.create({
    data: {
      userId: params.adminUserId,
      actorId: params.adminUserId,
      action: `CALLBACK_${params.status}`,
      entityType: "CALLBACK_REQUEST",
      entityId: params.callbackId,
      metadata: { status: params.status, notes: params.notes },
      details: `Callback request marked as ${params.status}`,
    },
  });

  return updated;
}

/**
 * 10. Chronological Audit Logs for /admin/audit
 */
export async function getAdminAuditLogs(params: {
  actorId?: string;
  action?: string;
  page?: number;
  limit?: number;
}) {
  await verifyAdminSession();

  const page = Math.max(1, Number(params.page) || 1);
  const limit = Math.max(1, Math.min(100, Number(params.limit) || 25));
  const skip = (page - 1) * limit;

  const where: any = {};

  if (params.actorId) {
    where.actorId = params.actorId;
  }

  if (params.action && params.action !== "ALL") {
    where.action = { contains: params.action, mode: "insensitive" };
  }

  const [total, logs] = await Promise.all([
    db.auditLog.count({ where }),
    db.auditLog.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { id: true, name: true, email: true, role: true },
        },
      },
    }),
  ]);

  return {
    logs,
    total,
    totalPages: Math.ceil(total / limit) || 1,
    currentPage: page,
  };
}
