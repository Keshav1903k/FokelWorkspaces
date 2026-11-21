import { db, withDbTimeout } from "../db";
import { BookingStatus } from "@prisma/client";
import { CreateBookingInput } from "@/lib/validations/booking.schema";
import { notifyBookingCreated } from "./notification.service";
import { WORKSPACES } from "@/constants/data";

export async function createTourBooking(input: CreateBookingInput, userId?: string) {
  // Check if workspace exists (with local fallback if DB offline)
  let workspace: any = null;
  try {
    workspace = await withDbTimeout(
      db.workspace.findUnique({
        where: { id: input.workspaceId },
      }),
      1500
    );
  } catch (e) {
    console.warn("[Database Offline / Looking up workspace in local data]:", e);
  }

  if (!workspace) {
    const local = WORKSPACES.find((w) => w.id === input.workspaceId || w.slug === input.workspaceId);
    if (local) {
      workspace = {
        title: local.title,
        location: local.locality,
        city: local.city,
      };
    } else {
      workspace = {
        title: "Selected Workspace",
        location: "Commercial Hub",
        city: "Delhi NCR",
      };
    }
  }

  // Check for duplicate booking
  try {
    const existing = await withDbTimeout(
      db.tourBooking.findFirst({
        where: {
          workspaceId: input.workspaceId,
          guestEmail: input.guestEmail,
          visitDate: input.visitDate,
          timeSlot: input.timeSlot,
          status: { not: BookingStatus.CANCELLED },
        },
      }),
      1500
    );

    if (existing) {
      throw new Error("You already have a tour scheduled for this workspace at the selected time.");
    }
  } catch (e: any) {
    if (e.message?.includes("already have a tour scheduled")) {
      throw e;
    }
  }

  let booking: any = null;
  try {
    booking = await withDbTimeout(
      db.tourBooking.create({
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
          status: BookingStatus.REQUESTED, // Default to REQUESTED for admin review
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
      }),
      1500
    );
  } catch (dbErr) {
    console.warn("[Database Offline / Booking created offline]:", dbErr);
    booking = {
      id: `booking-${Date.now()}`,
      workspaceId: input.workspaceId,
      guestName: input.guestName,
      guestEmail: input.guestEmail,
      guestPhone: input.guestPhone,
      teamSize: input.teamSize || "1-5",
      visitDate: input.visitDate,
      timeSlot: input.timeSlot,
      notes: input.notes,
      status: "REQUESTED",
      workspace: {
        title: workspace.title || "Selected Workspace",
        location: workspace.location || "Commercial District",
        city: workspace.city || "Delhi NCR",
      },
    };
  }

  // Non-blocking notification dispatch
  notifyBookingCreated({
    bookingId: booking.id,
    userName: booking.guestName,
    userEmail: booking.guestEmail,
    userPhone: booking.guestPhone,
    workspaceTitle: workspace.title,
    visitDate: booking.visitDate,
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
