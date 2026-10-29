"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Check, MessageSquare } from "lucide-react";
import { updateCallbackStatusAction } from "../actions";
import { CallbackStatus } from "@prisma/client";

interface CallbackStatusControlsProps {
  callbackId: string;
  currentStatus: CallbackStatus;
  currentNotes?: string | null;
}

export default function CallbackStatusControls({
  callbackId,
  currentStatus,
  currentNotes,
}: CallbackStatusControlsProps) {
  const router = useRouter();
  const [status, setStatus] = useState<CallbackStatus>(currentStatus);
  const [notes, setNotes] = useState(currentNotes || "");
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleStatusChange = async (newStatus: CallbackStatus) => {
    setStatus(newStatus);
    setIsSaving(true);
    try {
      const res = await updateCallbackStatusAction(callbackId, newStatus, notes);
      if (res.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
        router.refresh();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveNotes = async () => {
    setIsSaving(true);
    try {
      const res = await updateCallbackStatusAction(callbackId, status, notes);
      if (res.success) {
        setIsEditingNotes(false);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
        router.refresh();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value as CallbackStatus)}
          disabled={isSaving}
          className={`text-xs px-2.5 py-1 rounded-lg border focus:outline-none transition-colors ${
            status === "NEW"
              ? "bg-purple-500/10 text-purple-400 border-purple-500/30"
              : status === "CONTACTED"
              ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
              : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
          }`}
        >
          <option value="NEW">New</option>
          <option value="CONTACTED">Contacted</option>
          <option value="CLOSED">Closed</option>
        </select>

        {isSaving ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin text-zinc-400" />
        ) : success ? (
          <Check className="w-3.5 h-3.5 text-emerald-400" />
        ) : null}

        <button
          onClick={() => setIsEditingNotes(!isEditingNotes)}
          title="Add / Edit Call Notes"
          className="p-1 rounded text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5" />
        </button>
      </div>

      {isEditingNotes && (
        <div className="mt-2 space-y-1.5 p-2 bg-zinc-950 border border-zinc-800 rounded-xl">
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Log call outcome or follow-up details..."
            className="w-full bg-zinc-900 border border-zinc-700/60 rounded-lg p-2 text-xs text-zinc-200 focus:outline-none focus:border-purple-500"
          />
          <div className="flex justify-end gap-1.5">
            <button
              onClick={() => setIsEditingNotes(false)}
              className="px-2 py-1 text-[11px] text-zinc-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveNotes}
              disabled={isSaving}
              className="px-2.5 py-1 text-[11px] font-semibold bg-purple-600 hover:bg-purple-500 text-white rounded-lg"
            >
              Save Note
            </button>
          </div>
        </div>
      )}

      {!isEditingNotes && notes && (
        <div className="text-[11px] text-zinc-400 italic max-w-xs truncate">
          "{notes}"
        </div>
      )}
    </div>
  );
}
