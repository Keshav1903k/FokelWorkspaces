import { NextResponse } from "next/server";
import { verifyAdminSession, approveListing, rejectListing } from "@/server/services/admin.service";
import { z } from "zod";

const listingActionSchema = z.discriminatedUnion("action", [
  z.object({
    action: z.literal("APPROVE"),
  }),
  z.object({
    action: z.literal("REJECT"),
    reviewNotes: z.string().min(5, "Rejection notes must be at least 5 characters"),
  }),
]);

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await verifyAdminSession();
    const { id } = await params;
    const body = await req.json();

    const parsed = listingActionSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    if (parsed.data.action === "APPROVE") {
      const updated = await approveListing(id, admin.id);
      return NextResponse.json({
        success: true,
        message: "Listing approved and published successfully",
        data: updated,
      });
    } else {
      const updated = await rejectListing(id, admin.id, parsed.data.reviewNotes);
      return NextResponse.json({
        success: true,
        message: "Listing rejected and feedback sent to partner",
        data: updated,
      });
    }
  } catch (error: any) {
    console.error("[Admin Listing Action Error]:", error);
    const status = error.message?.includes("UNAUTHORIZED") ? 403 : 500;
    return NextResponse.json(
      { error: error.message || "Action failed" },
      { status }
    );
  }
}
