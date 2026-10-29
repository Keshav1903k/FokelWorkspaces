import { NextResponse } from "next/server";
import { verifyAdminSession, updateAdminBookingStatus } from "@/server/services/admin.service";
import { updateBookingStatusSchema } from "@/lib/validations/booking.schema";
import { BookingStatus } from "@prisma/client";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await verifyAdminSession();
    const { id } = await params;
    const body = await req.json();

    const parsed = updateBookingStatusSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const updated = await updateAdminBookingStatus({
      bookingId: id,
      status: parsed.data.status as BookingStatus,
      rescheduledTo: parsed.data.rescheduledTo,
      adminUserId: admin.id,
    });

    return NextResponse.json({
      success: true,
      message: `Booking updated to ${parsed.data.status}`,
      data: updated,
    });
  } catch (error: any) {
    console.error("[Admin Booking Update Error]:", error);
    const status = error.message?.includes("UNAUTHORIZED") ? 403 : 500;
    return NextResponse.json(
      { error: error.message || "Action failed" },
      { status }
    );
  }
}
