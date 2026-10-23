import { NextResponse } from "next/server";
import { getWorkspaces } from "@/server/services/workspace.service";
import { workspaceFilterSchema } from "@/lib/validations/workspace.schema";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const queryObj = {
      city: searchParams.get("city") || undefined,
      type: searchParams.get("type") || undefined,
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
