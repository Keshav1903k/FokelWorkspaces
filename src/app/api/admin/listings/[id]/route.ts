import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { updateListingStatus } from "@/server/services/admin.service";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    const userRole = (session?.user as any)?.role;

    if (!session?.user?.id || userRole !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const { id } = await params;
    const body = await req.json();
    const { status, notes } = body;

    if (status !== "APPROVED" && status !== "REJECTED") {
      return NextResponse.json(
        { error: "Status must be either APPROVED or REJECTED" },
        { status: 400 }
      );
    }

    const updated = await updateListingStatus(id, status, session.user.id, notes);
    return NextResponse.json({ success: true, workspace: updated });
  } catch (error: any) {
    console.error("[Admin Listing Update Error]:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update listing status" },
      { status: 500 }
    );
  }
}
