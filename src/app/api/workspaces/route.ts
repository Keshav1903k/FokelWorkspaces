import { NextResponse } from "next/server";
import { getWorkspaces } from "@/server/services/workspace.service";
import { workspaceFilterSchema, workspaceCreateSchema } from "@/lib/validations/workspace.schema";
import { submitPartnerListing } from "@/server/services/partner.service";
import { auth } from "@/auth";
import { db } from "@/server/db";

function normalizeWorkspaceType(typeStr?: string | null): string | undefined {
  if (!typeStr || typeStr === "All") return undefined;
  const upper = typeStr.toUpperCase().replace(/\s+/g, "_");
  if (upper === "COWORKING_SPACE" || upper === "COWORKING") return "COWORKING";
  if (upper === "MANAGED_OFFICE" || upper === "MANAGED_OFFICES") return "MANAGED_OFFICE";
  if (upper === "COMMERCIAL_OFFICE" || upper === "COMMERCIAL_SPACES" || upper === "COMMERCIAL_SPACE") return "COMMERCIAL_OFFICE";
  if (upper === "VIRTUAL_OFFICE" || upper === "VIRTUAL_OFFICES") return "VIRTUAL_OFFICE";
  return upper;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const queryObj = {
      city: searchParams.get("city") || undefined,
      type: normalizeWorkspaceType(searchParams.get("type")),
      minPrice: searchParams.get("minPrice") || undefined,
      maxPrice: searchParams.get("maxPrice") || undefined,
      capacity: searchParams.get("capacity") || undefined,
      search: searchParams.get("search") || undefined,
      page: searchParams.get("page") || undefined,
      limit: searchParams.get("limit") || undefined,
      sortBy: searchParams.get("sortBy") || undefined,
    };

    const parsed = workspaceFilterSchema.safeParse(queryObj);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = await getWorkspaces(parsed.data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("[Workspaces API Error]:", error);
    return NextResponse.json(
      { error: "Failed to fetch workspaces" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    const body = await req.json();

    const parsed = workspaceCreateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    let partnerId = session?.user?.id;
    if (!partnerId) {
      // Find default partner or admin
      const defaultUser = await db.user.findFirst({
        where: { role: { in: ["ADMIN", "PARTNER"] } },
      });
      partnerId = defaultUser?.id;
    }

    const workspace = await submitPartnerListing(partnerId || "", parsed.data);
    return NextResponse.json({ success: true, workspace }, { status: 201 });
  } catch (error: any) {
    console.error("[Create Workspace API Error]:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create workspace listing" },
      { status: 500 }
    );
  }
}
