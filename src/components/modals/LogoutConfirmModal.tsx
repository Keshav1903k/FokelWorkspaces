"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, LogOut, Loader2 } from "lucide-react";
import { logoutUser } from "@/utils/auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function LogoutConfirmModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
    };

    const handleClose = () => {
      if (!isLoggingOut) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isLoggingOut) {
        setIsOpen(false);
      }
    };

    window.addEventListener("open-logout-modal", handleOpen);
    window.addEventListener("close-logout-modal", handleClose);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("open-logout-modal", handleOpen);
      window.removeEventListener("close-logout-modal", handleClose);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isLoggingOut]);

  const handleConfirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      logoutUser();
      await signOut({ redirect: false });
      setIsOpen(false);
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !isLoggingOut && setIsOpen(false)}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="relative w-full max-w-sm rounded-2xl p-6 sm:p-7 bg-white border border-[#E3DDD3] shadow-2xl z-10 text-center overflow-hidden"
          >
            {/* Close Button */}
            {!isLoggingOut && (
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Icon Badge */}
            <div className="w-13 h-13 rounded-full bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4 mt-1">
              <LogOut className="w-6 h-6 ml-0.5" />
            </div>

            {/* Content */}
            <h3 className="text-lg font-bold text-slate-800 mb-1.5">
              Confirm Sign Out
            </h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed max-w-xs mx-auto">
              Are you sure you want to sign out of your account? You will need to sign in again to access your dashboard.
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                disabled={isLoggingOut}
                onClick={() => setIsOpen(false)}
                className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl text-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isLoggingOut}
                onClick={handleConfirmLogout}
                className="flex-1 py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl text-xs transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-1.5 disabled:opacity-60"
              >
                {isLoggingOut ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Signing Out...</span>
                  </>
                ) : (
                  <span>Yes, Sign Out</span>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
