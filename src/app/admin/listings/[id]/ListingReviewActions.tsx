"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Loader2,
  Sparkles,
} from "lucide-react";
import { approveListingAction, rejectListingAction } from "../../actions";

interface ListingReviewActionsProps {
  listingId: string;
  listingTitle: string;
  currentStatus: string;
  partnerEmail?: string | null;
}

export default function ListingReviewActions({
  listingId,
  listingTitle,
  currentStatus,
  partnerEmail,
}: ListingReviewActionsProps) {
  const router = useRouter();
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleApprove = async () => {
    if (!confirm(`Are you sure you want to approve "${listingTitle}" and publish it live to the public catalog?`)) {
      return;
    }

    setIsApproving(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await approveListingAction(listingId);
      if (!res.success) {
        setErrorMsg(res.error || "Failed to approve listing");
      } else {
        setSuccessMsg("Listing successfully published and images promoted!");
        router.refresh();
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Approval transaction failed");
    } finally {
      setIsApproving(false);
    }
  };

  const handleReject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectReason || rejectReason.trim().length < 5) {
      setErrorMsg("Please provide detailed feedback (at least 5 characters) for the partner.");
      return;
    }

    setIsRejecting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await rejectListingAction(listingId, rejectReason);
      if (!res.success) {
        setErrorMsg(res.error || "Failed to reject listing");
      } else {
        setSuccessMsg("Listing rejected. Feedback has been emailed to the partner.");
        setShowRejectModal(false);
        setRejectReason("");
        router.refresh();
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Rejection action failed");
    } finally {
      setIsRejecting(false);
    }
  };

  const isPublished = currentStatus === "PUBLISHED" || currentStatus === "APPROVED";
  const isRejected = currentStatus === "REJECTED";

  return (
    <div className="space-y-4">
      {/* Toast Feedback */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={handleApprove}
          disabled={isApproving || isPublished}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg ${
            isPublished
              ? "bg-emerald-900/40 text-emerald-400 border border-emerald-500/30 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20 hover:scale-[1.02]"
          }`}
        >
          {isApproving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <CheckCircle2 className="w-4 h-4" />
          )}
          {isPublished ? "Listing Published" : "Approve & Publish"}
        </button>

        <button
          onClick={() => setShowRejectModal(true)}
          disabled={isRejecting || isRejected}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            isRejected
              ? "bg-rose-900/30 text-rose-400 border border-rose-500/30 cursor-not-allowed"
              : "bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 border border-rose-500/30 hover:border-rose-500/50"
          }`}
        >
          <XCircle className="w-4 h-4" />
          {isRejected ? "Currently Rejected" : "Reject with Feedback"}
        </button>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <XCircle className="w-5 h-5 text-rose-500" />
                Reject Submission
              </h3>
              <button
                onClick={() => setShowRejectModal(false)}
                className="text-zinc-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-zinc-400">
              Provide actionable feedback for {partnerEmail ? `partner (${partnerEmail})` : "the partner"}.
              This reason will be logged in the audit trail and sent to the partner so they can revise and resubmit.
            </p>

            <form onSubmit={handleReject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Rejection Reason / Required Changes
                </label>
                <textarea
                  required
                  rows={4}
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="e.g. Please upload higher-resolution photos of the meeting rooms and clarify whether parking is complimentary or chargeable."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRejectModal(false)}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isRejecting}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold bg-rose-600 hover:bg-rose-500 text-white transition-colors"
                >
                  {isRejecting && <Loader2 className="w-4 h-4 animate-spin" />}
                  Confirm Rejection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
