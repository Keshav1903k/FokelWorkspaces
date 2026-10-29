import { NextResponse } from "next/server";
import { getWorkspaceByIdOrSlug } from "@/server/services/workspace.service";
import { auth } from "@/auth";
import { db } from "@/server/db";

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

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    // Check ownership
    const workspace = await db.workspace.findUnique({
      where: { id },
      select: { id: true, partnerId: true, status: true },
    });

    if (!workspace) {
      return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
    }

    // Ownership check: Partner can only edit their own workspace; ADMIN can edit any
    if (workspace.partnerId !== session.user.id && (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden: You do not have permission to edit this listing" },
        { status: 403 }
      );
    }

    // If listing was rejected, editing and resubmitting returns it to PENDING_REVIEW
    const newStatus =
      workspace.status === "REJECTED" ? "PENDING_REVIEW" : workspace.status;

    const updated = await db.workspace.update({
      where: { id },
      data: {
        ...(body.title && { title: body.title }),
        ...(body.description && { description: body.description }),
        ...(body.priceDisplay && { priceDisplay: body.priceDisplay }),
        ...(body.priceMonthly && { priceMonthly: body.priceMonthly }),
        ...(body.capacity && { capacity: body.capacity }),
        status: newStatus,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Workspace updated successfully",
      workspace: updated,
    });
  } catch (error: any) {
    console.error("[Workspace Update API Error]:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update workspace" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const workspace = await db.workspace.findUnique({
      where: { id },
      select: { id: true, partnerId: true },
    });

    if (!workspace) {
      return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
    }

    if (workspace.partnerId !== session.user.id && (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden: You can only delete your own listings" },
        { status: 403 }
      );
    }

    await db.workspace.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: "Workspace listing deleted successfully",
    });
  } catch (error: any) {
    console.error("[Workspace Delete API Error]:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete workspace" },
      { status: 500 }
    );
  }
}
