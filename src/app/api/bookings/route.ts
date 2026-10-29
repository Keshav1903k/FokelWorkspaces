import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { createTourBooking, getUserBookings } from "@/server/services/booking.service";
import { createBookingSchema } from "@/lib/validations/booking.schema";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const rateCheck = checkRateLimit(`bookings_${ip}`, { limit: 10, interval: 60 });
    if (!rateCheck.isAllowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again shortly." },
        { status: 429 }
      );
    }

    const session = await auth();
    const body = await req.json();

    // Honeypot check
    if (body._hp || body.honeypot) {
      return NextResponse.json({ success: true, message: "Booking requested" }, { status: 201 });
    }

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
