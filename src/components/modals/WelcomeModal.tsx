"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";
import { loginUser } from "@/utils/auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function WelcomeModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"consultation" | "signup" | "login">("consultation");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    interest: "virtual-office",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const handleOpenConsultation = () => {
      setMode("consultation");
      setErrorMsg("");
      setSuccessMsg("");
      setIsOpen(true);
    };

    const handleOpenSignup = () => {
      setMode("signup");
      setErrorMsg("");
      setSuccessMsg("");
      setIsOpen(true);
    };

    const handleOpenLogin = () => {
      setMode("login");
      setErrorMsg("");
      setSuccessMsg("");
      setIsOpen(true);
    };

    window.addEventListener("open-welcome-modal", handleOpenConsultation);
    window.addEventListener("open-signup-modal", handleOpenSignup);
    window.addEventListener("open-login-modal", handleOpenLogin);

    // Note: Automatic popup upon opening website has been removed per requirements.
    // Consultation requests and account access are triggered on-demand by the user.

    return () => {
      window.removeEventListener("open-welcome-modal", handleOpenConsultation);
      window.removeEventListener("open-signup-modal", handleOpenSignup);
      window.removeEventListener("open-login-modal", handleOpenLogin);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      if (mode === "login") {
        const res = await signIn("credentials", {
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          redirect: false,
        });

        if (res?.error) {
          setErrorMsg("Invalid email or password. Please try again.");
          setIsSubmitting(false);
          return;
        }

        // Successfully logged in
        loginUser(formData.email.split("@")[0], formData.email);
        setIsOpen(false);
        setFormData({ name: "", phone: "", email: "", interest: "virtual-office", password: "", confirmPassword: "" });
        router.refresh();
        return;
      }

      if (mode === "signup") {
        if (!formData.password || formData.password.length < 8) {
          setErrorMsg("Password must be at least 8 characters long.");
          setIsSubmitting(false);
          return;
        }

        if (formData.password !== formData.confirmPassword) {
          setErrorMsg("Passwords do not match. Please ensure both passwords are identical.");
          setIsSubmitting(false);
          return;
        }

        const regRes = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            role: "USER",
          }),
        });

        const regData = await regRes.json();
        if (!regRes.ok) {
          setErrorMsg(regData.error || "Failed to create account. Please try again.");
          setIsSubmitting(false);
          return;
        }

        // Auto login with credentials
        await signIn("credentials", {
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          redirect: false,
        });

        loginUser(
          regData.user?.name || formData.name,
          regData.user?.email || formData.email,
          regData.user?.id,
          regData.user?.role
        );

        setIsOpen(false);
        setFormData({ name: "", phone: "", email: "", interest: "virtual-office", password: "", confirmPassword: "" });
        router.refresh();
        return;
      }

      // Consultation mode
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "Consultation Request",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          interest: formData.interest,
          sourceUrl: typeof window !== "undefined" ? window.location.href : "",
        }),
      });

      setSuccessMsg("Consultation requested! Our workspace advisor will connect with you shortly.");
      loginUser(formData.name, formData.email);
      setTimeout(() => {
        setIsOpen(false);
        setSuccessMsg("");
        setFormData({ name: "", phone: "", email: "", interest: "virtual-office", password: "", confirmPassword: "" });
      }, 1500);

    } catch (err: any) {
      console.error("Auth / Consultation action failed:", err);
      setErrorMsg("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
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
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", duration: 0.35 }}
            className="relative w-full max-w-md rounded-2xl p-6 md:p-8 bg-white border border-[#E3DDD3] shadow-2xl z-10 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer z-50"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header & Logo */}
            <div className="mb-4">
              <div className="mb-3">
                <img
                  src="/images/logo-light.png"
                  alt="Officera"
                  className="h-7 w-auto object-contain"
                />
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-1 p-1 bg-[#F5F2EB] rounded-lg mb-4 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setErrorMsg("");
                  }}
                  className={`flex-1 py-1.5 rounded-md transition-all cursor-pointer text-center ${
                    mode === "login"
                      ? "bg-white text-[#18191C] shadow-xs"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    setErrorMsg("");
                  }}
                  className={`flex-1 py-1.5 rounded-md transition-all cursor-pointer text-center ${
                    mode === "signup"
                      ? "bg-white text-[#18191C] shadow-xs"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Create Account
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode("consultation");
                    setErrorMsg("");
                  }}
                  className={`flex-1 py-1.5 rounded-md transition-all cursor-pointer text-center ${
                    mode === "consultation"
                      ? "bg-white text-[#18191C] shadow-xs"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Consultation
                </button>
              </div>

              <h2 className="text-xl font-bold text-slate-800 mb-1 leading-snug">
                {mode === "login" && (
                  <>Welcome Back to <span className="text-primary">Officera</span></>
                )}
                {mode === "signup" && (
                  <>Create Your <span className="text-primary">Officera Account</span></>
                )}
                {mode === "consultation" && (
                  <>Find Your Perfect <span className="text-primary">Office Solution</span></>
                )}
              </h2>
              <p className="text-slate-500 text-xs leading-relaxed">
                {mode === "login" &&
                  "Sign in to view your scheduled visits, saved properties, and account settings."}
                {mode === "signup" &&
                  "Register to access verified workspace pricing, book physical tours, and manage listings."}
                {mode === "consultation" &&
                  "Get a customized workspace quotation and details on business registration in minutes."}
              </p>
            </div>

            {/* Error / Success Feedback */}
            {errorMsg && (
              <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-700">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}
            {successMsg && (
              <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 flex items-start gap-2.5 text-xs text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Form */}
            <form className="flex flex-col gap-3.5" onSubmit={handleSubmit}>
              {mode !== "login" && (
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-700 ml-0.5">Full Name*</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-xs"
                  />
                </div>
              )}

              {mode === "consultation" && (
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-700 ml-0.5">Phone Number*</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-xs"
                  />
                </div>
              )}

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-700 ml-0.5">Email Address*</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-xs"
                />
              </div>

              {mode !== "consultation" && (
                <div className="flex flex-col gap-1 relative">
                  <label className="text-xs font-semibold text-slate-700 ml-0.5">Password*</label>
                  <div className="relative w-full">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder={mode === "signup" ? "At least 8 characters" : "Enter your password"}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-3.5 pr-10 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-xs"
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
              )}

              {mode === "signup" && (
                <div className="flex flex-col gap-1 relative">
                  <label className="text-xs font-semibold text-slate-700 ml-0.5">Confirm Password*</label>
                  <div className="relative w-full">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="Confirm your password"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-3.5 pr-10 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {mode === "consultation" && (
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-700 ml-0.5">I am interested in*</label>
                  <select
                    required
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-xs cursor-pointer"
                  >
                    <option value="virtual-office">Virtual Office (GST & Business Registration Address)</option>
                    <option value="coworking">Coworking Spaces (Hot desk / Dedicated seat)</option>
                    <option value="private-office">Private Managed Office (Team Cabins)</option>
                    <option value="enterprise">Enterprise Solutions (Custom Office Floor)</option>
                    <option value="meeting-room">Meeting & Conference Rooms (Hourly)</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 bg-primary hover:bg-[#A93E1B] text-white font-semibold rounded-lg px-6 py-2.5 transition-colors flex items-center justify-center cursor-pointer text-xs shadow-sm disabled:opacity-60"
              >
                {isSubmitting
                  ? "Processing..."
                  : mode === "login"
                  ? "Sign In to Account"
                  : mode === "signup"
                  ? "Create Account & Sign In"
                  : "Submit Consultation Request"}
              </button>
            </form>

            {/* Quick Demo Hint */}
            {mode === "login" && (
              <p className="mt-3 text-[11px] text-slate-400 text-center">
                Default Demo Admin: <span className="font-semibold text-slate-600">admin@officera.com</span> / <span className="font-semibold text-slate-600">admin123</span>
              </p>
            )}

            {/* Mode Switch Toggle Footer */}
            <div className="mt-4 pt-3.5 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-400">
                {mode === "login" && (
                  <>
                    Don&apos;t have an account yet?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setMode("signup");
                        setErrorMsg("");
                      }}
                      className="text-primary font-semibold hover:underline cursor-pointer"
                    >
                      Sign Up
                    </button>
                  </>
                )}
                {mode === "signup" && (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setMode("login");
                        setErrorMsg("");
                      }}
                      className="text-primary font-semibold hover:underline cursor-pointer"
                    >
                      Sign In
                    </button>
                  </>
                )}
                {mode === "consultation" && (
                  <>
                    Looking for account access?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setMode("login");
                        setErrorMsg("");
                      }}
                      className="text-primary font-semibold hover:underline cursor-pointer"
                    >
                      Sign In here
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
