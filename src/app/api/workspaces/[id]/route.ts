import { NextResponse } from "next/server";
import { getWorkspaceByIdOrSlug } from "@/server/services/workspace.service";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "Workspace ID is required" }, { status: 400 });
    }

    const workspace = await getWorkspaceByIdOrSlug(id);
    if (!workspace) {
      return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
    }

    return NextResponse.json(workspace);
  } catch (error) {
    console.error("[Workspace Detail API Error]:", error);
    return NextResponse.json(
      { error: "Failed to fetch workspace detail" },
      { status: 500 }
    );
  }
}
