"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Building2, Eye, EyeOff } from "lucide-react";
import { loginUser } from "@/utils/auth";
import { useRouter } from "next/navigation";

export function WelcomeModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"consultation" | "signup">("consultation");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    interest: "virtual-office",
    password: "",
  });

  useEffect(() => {
    const handleOpenConsultation = () => {
      setMode("consultation");
      setIsOpen(true);
    };

    const handleOpenSignup = () => {
      setMode("signup");
      setIsOpen(true);
    };

    window.addEventListener("open-welcome-modal", handleOpenConsultation);
    window.addEventListener("open-signup-modal", handleOpenSignup);
    
    const timer = setTimeout(() => {
      const hasSeenModal = sessionStorage.getItem("hasSeenWelcomeModal");
      if (!hasSeenModal) {
        setMode("consultation");
        setIsOpen(true);
        sessionStorage.setItem("hasSeenWelcomeModal", "true");
      }
    }, 2000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("open-welcome-modal", handleOpenConsultation);
      window.removeEventListener("open-signup-modal", handleOpenSignup);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(formData.name, formData.email);
    setIsOpen(false);
    setFormData((prev) => ({ ...prev, name: "", email: "", password: "", phone: "" }));
    router.push("/profile");
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
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-slate-950/20 backdrop-blur-[1px] cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-md rounded-xl p-6 md:p-8 bg-white border border-slate-100 shadow-md z-10 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-7 h-7 rounded bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer z-50"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center justify-center w-6 h-6 rounded bg-primary text-white">
                  <Building2 className="w-3.5 h-3.5" />
                </div>
                <span className="font-sans font-semibold text-xs text-slate-500">
                  Fokel Workspaces
                </span>
              </div>
              <h2 className="text-xl font-semibold text-slate-800 mb-1.5 leading-snug">
                {mode === "signup" ? (
                  <>
                    Create Your <span className="text-primary">Fokel Account</span>
                  </>
                ) : (
                  <>
                    Find Your Perfect <span className="text-primary">Office Solution</span>
                  </>
                )}
              </h2>
              <p className="text-slate-400 text-xs leading-relaxed">
                {mode === "signup"
                  ? "Sign up to track your quotations, manage virtual address compliance documents, and access premium dashboard features."
                  : "Get a customized workspace quotation and details on business registration in minutes."}
              </p>
            </div>

            {/* Form */}
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-600 ml-1">Name*</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Name"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary/45 focus:ring-1 focus:ring-primary/45 transition-all text-xs"
                />
              </div>

              {mode === "consultation" && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600 ml-1">Phone Number*</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Your Phone Number"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary/45 focus:ring-1 focus:ring-primary/45 transition-all text-xs"
                  />
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-600 ml-1">Email Address*</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary/45 focus:ring-1 focus:ring-primary/45 transition-all text-xs"
                />
              </div>

              {mode === "signup" ? (
                <div className="flex flex-col gap-1.5 relative">
                  <label className="text-xs font-semibold text-slate-600 ml-1">Password*</label>
                  <div className="relative w-full">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="At least 8 characters"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-4 pr-10 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary/45 focus:ring-1 focus:ring-primary/45 transition-all text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600 ml-1">I am interested in*</label>
                  <select
                    required
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:border-primary/45 focus:ring-1 focus:ring-primary/45 transition-all text-xs cursor-pointer"
                  >
                    <option value="virtual-office">Virtual Office (GST/Business Registration Address)</option>
                    <option value="coworking">Coworking Spaces (Hot desk / Dedicated seat)</option>
                    <option value="private-office">Private Managed Office (Team Cabins)</option>
                    <option value="enterprise">Enterprise Solutions (Custom Office Floor)</option>
                    <option value="meeting-room">Meeting & Conference Rooms (Hourly)</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                className="w-full mt-2 bg-primary text-white font-semibold rounded-lg px-6 py-3 hover:bg-primary-hover transition-colors flex items-center justify-center cursor-pointer text-xs shadow-sm"
              >
                {mode === "signup" ? "Create Account & Sign Up" : "Submit Consultation Request"}
              </button>
            </form>

            {/* Mode Switch Toggle Footer */}
            <div className="mt-5 pt-4 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-400">
                {mode === "signup" ? (
                  <>
                    Already have an account?{" "}
                    <button
                      onClick={() => setMode("consultation")}
                      className="text-primary font-semibold hover:underline cursor-pointer"
                    >
                      Consult an expert
                    </button>
                  </>
                ) : (
                  <>
                    Need dashboard access?{" "}
                    <button
                      onClick={() => setMode("signup")}
                      className="text-primary font-semibold hover:underline cursor-pointer"
                    >
                      Sign Up here
                    </button>
                  </>
                )}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
