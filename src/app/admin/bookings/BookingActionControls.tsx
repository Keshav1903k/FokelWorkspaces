"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  Calendar,
  CheckCheck,
  Ban,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { updateBookingStatusAction } from "../actions";
import { BookingStatus } from "@prisma/client";

interface BookingActionControlsProps {
  bookingId: string;
  currentStatus: BookingStatus;
  guestName: string;
  currentDate: string;
}

export default function BookingActionControls({
  bookingId,
  currentStatus,
  guestName,
  currentDate,
}: BookingActionControlsProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleUpdate = async (status: BookingStatus, rescheduledTo?: string) => {
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await updateBookingStatusAction(bookingId, status, rescheduledTo);
      if (!res.success) {
        setErrorMsg(res.error || "Failed to update booking status");
      } else {
        setShowRescheduleModal(false);
        router.refresh();
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Action failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {errorMsg && (
        <div className="text-[10px] text-rose-400 mb-1 flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" />
          {errorMsg}
        </div>
      )}

      <div className="flex items-center gap-1.5 justify-end">
        {/* Confirm Action */}
        {currentStatus === "REQUESTED" && (
          <button
            onClick={() => handleUpdate("CONFIRMED")}
            disabled={isLoading}
            title="Confirm Tour Appointment"
            className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/20 transition-all text-xs flex items-center gap-1"
          >
            {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">Confirm</span>
          </button>
        )}

        {/* Reschedule Action */}
        {currentStatus !== "CANCELLED" && currentStatus !== "COMPLETED" && (
          <button
            onClick={() => setShowRescheduleModal(true)}
            disabled={isLoading}
            title="Reschedule Tour Date"
            className="p-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500 text-blue-400 hover:text-white border border-blue-500/20 transition-all text-xs flex items-center gap-1"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reschedule</span>
          </button>
        )}

        {/* Complete Action */}
        {(currentStatus === "CONFIRMED" || currentStatus === "RESCHEDULED") && (
          <button
            onClick={() => handleUpdate("COMPLETED")}
            disabled={isLoading}
            title="Mark Tour as Completed"
            className="p-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500 text-purple-400 hover:text-white border border-purple-500/20 transition-all text-xs flex items-center gap-1"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Complete</span>
          </button>
        )}

        {/* Cancel Action */}
        {currentStatus !== "CANCELLED" && currentStatus !== "COMPLETED" && (
          <button
            onClick={() => {
              if (confirm(`Cancel tour for ${guestName}?`)) {
                handleUpdate("CANCELLED");
              }
            }}
            disabled={isLoading}
            title="Cancel Tour"
            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/20 transition-all text-xs flex items-center gap-1"
          >
            <Ban className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cancel</span>
          </button>
        )}
      </div>

      {/* Reschedule Modal */}
      {showRescheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in text-left">
          <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-400" />
                Reschedule Tour for {guestName}
              </h4>
              <button
                onClick={() => setShowRescheduleModal(false)}
                className="text-zinc-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs text-zinc-400 mb-1">
                  Select New Date & Time
                </label>
                <input
                  type="datetime-local"
                  required
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRescheduleModal(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!newDate || isLoading}
                  onClick={() => handleUpdate("RESCHEDULED", newDate)}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                >
                  {isLoading && <Loader2 className="w-3 h-3 animate-spin" />}
                  Save Reschedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
