import { db } from "../db";
import { BookingStatus } from "@prisma/client";
import { CreateBookingInput } from "@/lib/validations/booking.schema";

export async function createTourBooking(input: CreateBookingInput, userId?: string) {
  // Check if workspace exists
  const workspace = await db.workspace.findUnique({
    where: { id: input.workspaceId },
  });

  if (!workspace) {
    throw new Error("Workspace not found");
  }

  // Check for duplicate booking by same email on same date and time slot
  const existing = await db.tourBooking.findFirst({
    where: {
      workspaceId: input.workspaceId,
      guestEmail: input.guestEmail,
      visitDate: input.visitDate,
      timeSlot: input.timeSlot,
      status: { not: BookingStatus.CANCELLED },
    },
  });

  if (existing) {
    throw new Error("You already have a tour scheduled for this workspace at the selected time.");
  }

  const booking = await db.tourBooking.create({
    data: {
      workspaceId: input.workspaceId,
      userId: userId || null,
      guestName: input.guestName,
      guestEmail: input.guestEmail,
      guestPhone: input.guestPhone,
      teamSize: input.teamSize || "1-5",
      visitDate: input.visitDate,
      timeSlot: input.timeSlot,
      notes: input.notes,
      status: BookingStatus.CONFIRMED, // Auto-confirm initial tour visits
    },
    include: {
      workspace: {
        select: {
          title: true,
          location: true,
          city: true,
        },
      },
    },
  });

  return booking;
}

export async function getUserBookings(userId: string) {
  return db.tourBooking.findMany({
    where: { userId },
    orderBy: { visitDate: "desc" },
    include: {
      workspace: {
        select: {
          id: true,
          slug: true,
          title: true,
          location: true,
          city: true,
          priceDisplay: true,
          images: {
            where: { isPrimary: true },
            take: 1,
          },
        },
      },
    },
  });
}

export async function cancelBooking(bookingId: string, userId?: string) {
  const booking = await db.tourBooking.findUnique({
    where: { id: bookingId },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  if (userId && booking.userId && booking.userId !== userId) {
    throw new Error("Unauthorized to cancel this booking");
  }

  return db.tourBooking.update({
    where: { id: bookingId },
    data: { status: BookingStatus.CANCELLED },
  });
}
