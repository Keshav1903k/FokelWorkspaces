import { db } from "../db";
import { ListingStatus, WorkspaceType } from "@prisma/client";
import { WorkspaceCreateInput } from "@/lib/validations/workspace.schema";
import { notifyTeamNewListing } from "./notification.service";

export async function saveListingDraft(partnerId: string, data: Partial<WorkspaceCreateInput>, draftId?: string) {
  const slug =
    data.slug ||
    (data.title
      ? `${data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now().toString().slice(-4)}`
      : `draft-${Date.now()}`);

  if (draftId) {
    return db.workspace.update({
      where: { id: draftId },
      data: {
        title: data.title || "Untitled Draft",
        type: data.type || WorkspaceType.COWORKING,
        location: data.location || "TBD",
        city: data.city || "TBD",
        priceDisplay: data.priceDisplay || "Contact for pricing",
        priceMonthly: data.priceMonthly,
        description: data.description,
        status: ListingStatus.DRAFT,
      },
    });
  }

  return db.workspace.create({
    data: {
      partnerId,
      slug,
      title: data.title || "Untitled Draft",
      type: data.type || WorkspaceType.COWORKING,
      location: data.location || "TBD",
      city: data.city || "TBD",
      priceDisplay: data.priceDisplay || "Contact for pricing",
      priceMonthly: data.priceMonthly,
      description: data.description,
      status: ListingStatus.DRAFT,
    },
  });
}

export async function submitPartnerListing(partnerId: string, data: WorkspaceCreateInput, draftId?: string) {
  const baseSlug = (data.title || "workspace")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

  const workspaceData = {
    partnerId,
    slug,
    title: data.title,
    type: data.type as WorkspaceType,
    location: data.location,
    city: data.city,
    state: data.state,
    pincode: data.pincode,
    address: data.address,
    capacity: data.capacity,
    priceDisplay: data.priceDisplay,
    priceMonthly: data.priceMonthly,
    description: data.description,
    status: ListingStatus.PENDING_APPROVAL,
  };

  let workspace;
  if (draftId) {
    workspace = await db.workspace.update({
      where: { id: draftId },
      data: workspaceData,
    });
  } else {
    workspace = await db.workspace.create({
      data: workspaceData,
    });
  }

  // Handle Amenities
  if (data.amenities && data.amenities.length > 0) {
    for (const name of data.amenities) {
      const amenity = await db.amenity.upsert({
        where: { name },
        update: {},
        create: { name, category: "General" },
      });

      await db.workspaceAmenity.upsert({
        where: {
          workspaceId_amenityId: {
            workspaceId: workspace.id,
            amenityId: amenity.id,
          },
        },
        update: {},
        create: {
          workspaceId: workspace.id,
          amenityId: amenity.id,
        },
      });
    }
  }

  // Handle Images
  if (data.images && data.images.length > 0) {
    for (let i = 0; i < data.images.length; i++) {
      await db.workspaceImage.create({
        data: {
          workspaceId: workspace.id,
          url: data.images[i],
          order: i,
          isPrimary: i === 0,
        },
      });
    }
  }

  // Non-blocking team notification
  const partnerUser = await db.user.findUnique({
    where: { id: partnerId },
    select: { email: true },
  });

  notifyTeamNewListing({
    listingId: workspace.id,
    title: workspace.title,
    city: workspace.city,
    partnerEmail: partnerUser?.email,
  });

  return workspace;
}

export async function getPartnerListings(partnerId: string) {
  return db.workspace.findMany({
    where: { partnerId },
    orderBy: { createdAt: "desc" },
    include: {
      images: {
        where: { isPrimary: true },
        take: 1,
      },
      _count: {
        select: {
          bookings: true,
        },
      },
    },
  });
}
