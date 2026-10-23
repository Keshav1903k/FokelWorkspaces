import { db } from "../db";
import { Prisma, WorkspaceType, ListingStatus } from "@prisma/client";
import { WorkspaceFilterInput } from "@/lib/validations/workspace.schema";

export async function getWorkspaces(filters: WorkspaceFilterInput) {
  const {
    city,
    type,
    minPrice,
    maxPrice,
    capacity,
    search,
    page = 1,
    limit = 12,
    sortBy = "newest",
  } = filters;

  const where: Prisma.WorkspaceWhereInput = {
    status: ListingStatus.APPROVED,
  };

  if (city && city.toLowerCase() !== "all") {
    where.city = { equals: city, mode: "insensitive" };
  }

  if (type) {
    where.type = type as WorkspaceType;
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    where.priceMonthly = {};
    if (minPrice !== undefined) where.priceMonthly.gte = minPrice;
    if (maxPrice !== undefined) where.priceMonthly.lte = maxPrice;
  }

  if (capacity !== undefined) {
    where.capacity = { gte: capacity };
  }

  if (search && search.trim() !== "") {
    const query = search.trim();
    where.OR = [
      { title: { contains: query, mode: "insensitive" } },
      { location: { contains: query, mode: "insensitive" } },
      { city: { contains: query, mode: "insensitive" } },
      { description: { contains: query, mode: "insensitive" } },
    ];
  }

  const orderBy: Prisma.WorkspaceOrderByWithRelationInput[] = [];
  switch (sortBy) {
    case "price_asc":
      orderBy.push({ priceMonthly: "asc" });
      break;
    case "price_desc":
      orderBy.push({ priceMonthly: "desc" });
      break;
    case "rating_desc":
      orderBy.push({ rating: "desc" });
      break;
    case "newest":
    default:
      orderBy.push({ createdAt: "desc" });
      break;
  }

  const skip = (page - 1) * limit;

  const [total, items] = await Promise.all([
    db.workspace.count({ where }),
    db.workspace.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      include: {
        images: {
          orderBy: { order: "asc" },
        },
        amenities: {
          include: {
            amenity: true,
          },
        },
      },
    }),
  ]);

  const formattedItems = items.map((item) => ({
    ...item,
    priceMonthly: item.priceMonthly ? Number(item.priceMonthly) : null,
    amenitiesList: item.amenities.map((a) => a.amenity.name),
    primaryImage:
      item.images.find((img) => img.isPrimary)?.url ||
      item.images[0]?.url ||
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174",
  }));

  return {
    items: formattedItems,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasMore: skip + items.length < total,
    },
  };
}

export async function getWorkspaceByIdOrSlug(idOrSlug: string) {
  const workspace = await db.workspace.findFirst({
    where: {
      OR: [{ id: idOrSlug }, { slug: idOrSlug }],
    },
    include: {
      images: {
        orderBy: { order: "asc" },
      },
      amenities: {
        include: {
          amenity: true,
        },
      },
      partner: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
      reviews: {
        orderBy: { createdAt: "desc" },
        take: 10,
      },
    },
  });

  if (!workspace) return null;

  return {
    ...workspace,
    priceMonthly: workspace.priceMonthly ? Number(workspace.priceMonthly) : null,
    priceDaily: workspace.priceDaily ? Number(workspace.priceDaily) : null,
    priceHourly: workspace.priceHourly ? Number(workspace.priceHourly) : null,
    amenitiesList: workspace.amenities.map((a) => a.amenity.name),
    primaryImage:
      workspace.images.find((img) => img.isPrimary)?.url ||
      workspace.images[0]?.url ||
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174",
  };
}

export async function getDistinctCities() {
  const cities = await db.workspace.groupBy({
    by: ["city"],
    where: { status: ListingStatus.APPROVED },
    _count: {
      id: true,
    },
  });

  return cities.map((c) => ({
    city: c.city,
    count: c._count.id,
  }));
}
