import { db } from "../db";
import { ListingStatus } from "@prisma/client";

export async function getPendingListings() {
  return db.workspace.findMany({
    where: { status: ListingStatus.PENDING_APPROVAL },
    orderBy: { createdAt: "desc" },
    include: {
      partner: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      images: true,
      amenities: {
        include: {
          amenity: true,
        },
      },
    },
  });
}

export async function updateListingStatus(
  workspaceId: string,
  status: "APPROVED" | "REJECTED",
  adminUserId: string,
  notes?: string
) {
  const workspace = await db.workspace.update({
    where: { id: workspaceId },
    data: {
      status: status === "APPROVED" ? ListingStatus.APPROVED : ListingStatus.REJECTED,
    },
  });

  // Log in AuditLog
  await db.auditLog.create({
    data: {
      userId: adminUserId,
      action: `LISTING_${status}`,
      entityType: "WORKSPACE",
      entityId: workspaceId,
      details: notes || `Admin changed status to ${status}`,
    },
  });

  return workspace;
}

export async function getLeadsPipeline() {
  const [inquiries, serviceRequests, bookings] = await Promise.all([
    db.inquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
    db.serviceRequest.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
    db.tourBooking.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      include: {
        workspace: {
          select: { title: true, city: true },
        },
      },
    }),
  ]);

  return {
    inquiries,
    serviceRequests,
    bookings,
  };
}

export async function getAuditLogs(take = 50) {
  return db.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    take,
    include: {
      user: {
        select: { name: true, email: true, role: true },
      },
    },
  });
}
