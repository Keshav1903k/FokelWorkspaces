import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { createTourBooking, getUserBookings } from "@/server/services/booking.service";
import { createBookingSchema } from "@/lib/validations/booking.schema";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const body = await req.json();

    const parsed = createBookingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const booking = await createTourBooking(parsed.data, session?.user?.id);
    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (error: any) {
    console.error("[Booking API Error]:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create booking" },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const bookings = await getUserBookings(session.user.id);
    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("[Get Bookings API Error]:", error);
    return NextResponse.json(
      { error: "Failed to retrieve bookings" },
      { status: 500 }
    );
  }
}
