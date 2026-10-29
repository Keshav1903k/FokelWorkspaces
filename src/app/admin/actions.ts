"use server";

import {
  verifyAdminSession,
  approveListing,
  rejectListing,
  updateAdminBookingStatus,
  updateAdminCallbackStatus,
} from "@/server/services/admin.service";
import { BookingStatus, CallbackStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function approveListingAction(listingId: string) {
  try {
    const admin = await verifyAdminSession();
    const result = await approveListing(listingId, admin.id);
    revalidatePath("/admin");
    revalidatePath("/admin/listings");
    revalidatePath(`/admin/listings/${listingId}`);
    return { success: true, data: result };
  } catch (error: any) {
    console.error("[approveListingAction Error]:", error);
    return { success: false, error: error.message || "Failed to approve listing" };
  }
}

export async function rejectListingAction(listingId: string, reviewNotes: string) {
  try {
    const admin = await verifyAdminSession();
    if (!reviewNotes || reviewNotes.trim().length < 5) {
      return { success: false, error: "Feedback notes must be at least 5 characters" };
    }
    const result = await rejectListing(listingId, admin.id, reviewNotes);
    revalidatePath("/admin");
    revalidatePath("/admin/listings");
    revalidatePath(`/admin/listings/${listingId}`);
    return { success: true, data: result };
  } catch (error: any) {
    console.error("[rejectListingAction Error]:", error);
    return { success: false, error: error.message || "Failed to reject listing" };
  }
}

export async function updateBookingStatusAction(
  bookingId: string,
  status: BookingStatus,
  rescheduledTo?: string
) {
  try {
    const admin = await verifyAdminSession();
    const rescheduleDate = rescheduledTo ? new Date(rescheduledTo) : null;
    const result = await updateAdminBookingStatus({
      bookingId,
      status,
      rescheduledTo: rescheduleDate,
      adminUserId: admin.id,
    });
    revalidatePath("/admin/bookings");
    revalidatePath("/admin");
    return { success: true, data: result };
  } catch (error: any) {
    console.error("[updateBookingStatusAction Error]:", error);
    return { success: false, error: error.message || "Failed to update booking status" };
  }
}

export async function updateCallbackStatusAction(
  callbackId: string,
  status: CallbackStatus,
  notes?: string
) {
  try {
    const admin = await verifyAdminSession();
    const result = await updateAdminCallbackStatus({
      callbackId,
      status,
      notes,
      adminUserId: admin.id,
    });
    revalidatePath("/admin/callbacks");
    revalidatePath("/admin");
    return { success: true, data: result };
  } catch (error: any) {
    console.error("[updateCallbackStatusAction Error]:", error);
    return { success: false, error: error.message || "Failed to update callback status" };
  }
}
