import { db } from "../db";
import { Prisma, WorkspaceType, ListingStatus } from "@prisma/client";
import { WorkspaceFilterInput } from "@/lib/validations/workspace.schema";
import { WORKSPACES } from "@/constants/data";

function formatFallbackWorkspace(ws: any) {
  let mappedType: string = "COWORKING";
  if (ws.type?.toLowerCase().includes("virtual")) mappedType = "VIRTUAL_OFFICE";
  else if (ws.type?.toLowerCase().includes("managed")) mappedType = "MANAGED_OFFICE";
  else if (ws.type?.toLowerCase().includes("commercial")) mappedType = "COMMERCIAL_OFFICE";

  const imgList =
    ws.images && ws.images.length > 0
      ? ws.images
      : [ws.image || "https://images.unsplash.com/photo-1497215728101-856f4ea42174"];

  return {
    id: ws.id,
    title: ws.title || ws.name,
    name: ws.title || ws.name,
    slug: ws.slug,
    type: mappedType,
    city: ws.city,
    location: ws.location || ws.locality,
    address: ws.address || `${ws.location || ws.locality}, ${ws.city}`,
    pincode: ws.pincode,
    description: ws.description,
    priceMonthly: ws.priceMonthly || ws.startingPrice,
    priceDaily: null,
    priceHourly: null,
    capacity: ws.totalCapacity || ws.capacity || 50,
    rating: ws.rating || 4.8,
    reviewCount: ws.reviewCount || 120,
    amenitiesList: ws.amenities || [],
    primaryImage: imgList[0],
    images: imgList.map((url: string, idx: number) => ({
      id: `img-${idx}`,
      url,
      isPrimary: idx === 0,
    })),
    amenities: (ws.amenities || []).map((name: string) => ({ amenity: { name } })),
    partner: {
      id: "partner-officera",
      name: "Officera Workspace Partner",
      email: "partner@officera.in",
      image: null,
    },
    reviews: [],
  };
}

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

  try {
    const where: Prisma.WorkspaceWhereInput = {
      status: { in: [ListingStatus.APPROVED, ListingStatus.PUBLISHED] },
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

    const dbQueryPromise = Promise.all([
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

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Database timeout")), 1500)
    );

    const [total, items] = await Promise.race([dbQueryPromise, timeoutPromise]);

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
  } catch (error) {
    // Graceful fallback to static WORKSPACES data when DB is offline
    let filtered = WORKSPACES.map(formatFallbackWorkspace);

    if (city && city.toLowerCase() !== "all") {
      filtered = filtered.filter(
        (w) => w.city.toLowerCase() === city.toLowerCase()
      );
    }

    if (type) {
      filtered = filtered.filter((w) => w.type === type);
    }

    if (minPrice !== undefined) {
      filtered = filtered.filter((w) => (w.priceMonthly || 0) >= minPrice);
    }
    if (maxPrice !== undefined) {
      filtered = filtered.filter((w) => (w.priceMonthly || 0) <= maxPrice);
    }

    if (search && search.trim() !== "") {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter(
        (w) =>
          w.title.toLowerCase().includes(q) ||
          w.location.toLowerCase().includes(q) ||
          w.city.toLowerCase().includes(q) ||
          w.description.toLowerCase().includes(q)
      );
    }

    if (sortBy === "price_asc") {
      filtered.sort((a, b) => (a.priceMonthly || 0) - (b.priceMonthly || 0));
    } else if (sortBy === "price_desc") {
      filtered.sort((a, b) => (b.priceMonthly || 0) - (a.priceMonthly || 0));
    } else if (sortBy === "rating_desc") {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    const skip = (page - 1) * limit;
    const paginated = filtered.slice(skip, skip + limit);

    return {
      items: paginated,
      pagination: {
        total: filtered.length,
        page,
        limit,
        totalPages: Math.ceil(filtered.length / limit),
        hasMore: skip + paginated.length < filtered.length,
      },
    };
  }
}

export async function getWorkspaceByIdOrSlug(idOrSlug: string) {
  try {
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

    if (workspace) {
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
  } catch (error) {
    // Database offline, fall back directly
  }

  const target = (idOrSlug || "").toLowerCase().trim();
  const found = WORKSPACES.find(
    (w: any) =>
      w.shortId?.toLowerCase() === target ||
      w.slug?.toLowerCase() === target ||
      w.id?.toLowerCase() === target ||
      w.legacySlug?.toLowerCase() === target ||
      w.url?.toLowerCase() === target ||
      w.url?.toLowerCase().endsWith(`/${target}`)
  );
  if (found) {
    return formatFallbackWorkspace(found);
  }

  return null;
}

export async function getDistinctCities() {
  try {
    const cities = await db.workspace.groupBy({
      by: ["city"],
      where: { status: { in: [ListingStatus.APPROVED, ListingStatus.PUBLISHED] } },
      _count: {
        id: true,
      },
    });

    return cities.map((c) => ({
      city: c.city,
      count: c._count.id,
    }));
  } catch (error) {
    const counts: Record<string, number> = {};
    WORKSPACES.forEach((w) => {
      counts[w.city] = (counts[w.city] || 0) + 1;
    });
    return Object.entries(counts).map(([city, count]) => ({ city, count }));
  }
}
