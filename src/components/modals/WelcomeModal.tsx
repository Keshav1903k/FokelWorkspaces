"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  User,
  Mail,
  Lock,
  KeyRound,
  RotateCcw,
} from "lucide-react";
import { loginUser, getCurrentUser } from "@/utils/auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function WelcomeModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"login" | "signup" | "forgot">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Forgot Password / OTP states
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    const handleOpenSignup = () => {
      const current = getCurrentUser();
      if (current && current.email) {
        router.push("/profile");
        return;
      }
      setMode("signup");
      setErrorMsg("");
      setSuccessMsg("");
      setOtpSent(false);
      setIsOpen(true);
    };

    const handleOpenLogin = () => {
      const current = getCurrentUser();
      if (current && current.email) {
        router.push("/profile");
        return;
      }
      setMode("login");
      setErrorMsg("");
      setSuccessMsg("");
      setOtpSent(false);
      setIsOpen(true);
    };

    window.addEventListener("open-welcome-modal", handleOpenSignup);
    window.addEventListener("open-signup-modal", handleOpenSignup);
    window.addEventListener("open-login-modal", handleOpenLogin);

    return () => {
      window.removeEventListener("open-welcome-modal", handleOpenSignup);
      window.removeEventListener("open-signup-modal", handleOpenSignup);
      window.removeEventListener("open-login-modal", handleOpenLogin);
    };
  }, []);

  // Request OTP for password reset
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedEmail = formData.email.trim().toLowerCase();

    if (!normalizedEmail || !normalizedEmail.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Failed to send reset code. Please try again.");
        setIsSubmitting(false);
        return;
      }

      setOtpSent(true);
      setSuccessMsg(data.message || "A 6-digit verification code has been sent to your email.");
    } catch {
      setErrorMsg("Network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit OTP + New Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedEmail = formData.email.trim().toLowerCase();

    if (!otp || otp.trim().length !== 6) {
      setErrorMsg("Please enter the 6-digit verification code sent to your email.");
      return;
    }

    if (!formData.password || formData.password.length < 8) {
      setErrorMsg("New password must be at least 8 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match. Please verify.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: normalizedEmail,
          otp: otp.trim(),
          newPassword: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Failed to reset password. Please check your verification code.");
        setIsSubmitting(false);
        return;
      }

      // Automatically sign in with newly set password
      const signInRes = await signIn("credentials", {
        email: normalizedEmail,
        password: formData.password,
        redirect: false,
      });

      if (!signInRes?.error) {
        loginUser(normalizedEmail.split("@")[0], normalizedEmail, undefined, "USER");
      }

      setSuccessMsg("Password reset successfully! Redirecting...");
      setTimeout(() => {
        setIsOpen(false);
        setMode("login");
        setOtpSent(false);
        setOtp("");
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
        router.push("/profile");
        router.refresh();
      }, 1000);
    } catch {
      setErrorMsg("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Standard Login / Sign Up Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    const normalizedEmail = formData.email.trim().toLowerCase();

    try {
      if (mode === "login") {
        const res = await signIn("credentials", {
          email: normalizedEmail,
          password: formData.password,
          redirect: false,
        });

        if (res?.error) {
          setErrorMsg("Invalid email or password. Please try again.");
          setIsSubmitting(false);
          return;
        }

        const meRes = await fetch("/api/me").catch(() => null);
        let userName = normalizedEmail.split("@")[0];
        let userRole = "USER";
        let userId = undefined;

        if (meRes && meRes.ok) {
          const meData = await meRes.json();
          if (meData?.user) {
            userName = meData.user.name || userName;
            userRole = meData.user.role || "USER";
            userId = meData.user.id;
          }
        }

        loginUser(userName, normalizedEmail, userId, userRole);
        setIsOpen(false);
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });

        router.push("/profile");
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
            email: normalizedEmail,
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

        await signIn("credentials", {
          email: normalizedEmail,
          password: formData.password,
          redirect: false,
        });

        loginUser(
          regData.user?.name || formData.name.trim(),
          regData.user?.email || normalizedEmail,
          regData.user?.id,
          regData.user?.role || "USER"
        );

        setIsOpen(false);
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });

        router.push("/profile");
        router.refresh();
        return;
      }
    } catch (err: any) {
      console.error("Auth action failed:", err);
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

              {/* Navigation Tabs (Only Sign In and Create Account when not resetting password) */}
              {mode !== "forgot" ? (
                <div className="flex items-center gap-1 p-1 bg-[#F5F2EB] rounded-lg mb-4 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => {
                      setMode("login");
                      setErrorMsg("");
                      setSuccessMsg("");
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
                      setSuccessMsg("");
                    }}
                    className={`flex-1 py-1.5 rounded-md transition-all cursor-pointer text-center ${
                      mode === "signup"
                        ? "bg-white text-[#18191C] shadow-xs"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    Create Account
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between mb-4">
                  <button
                    type="button"
                    onClick={() => {
                      setMode("login");
                      setErrorMsg("");
                      setSuccessMsg("");
                      setOtpSent(false);
                    }}
                    className="text-xs text-primary font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    ← Back to Sign In
                  </button>
                </div>
              )}

              <h2 className="text-xl font-bold text-slate-800 mb-1 leading-snug">
                {mode === "login" ? (
                  <>Welcome Back to <span className="text-primary">Officera</span></>
                ) : mode === "signup" ? (
                  <>Create Your <span className="text-primary">Officera Account</span></>
                ) : (
                  <>Reset Your <span className="text-primary">Password</span></>
                )}
              </h2>
              <p className="text-slate-500 text-xs leading-relaxed">
                {mode === "login"
                  ? "Sign in to view your scheduled visits, saved properties, and workspace dashboard."
                  : mode === "signup"
                  ? "Register to access verified workspace pricing, book physical tours, and manage offices."
                  : !otpSent
                  ? "Enter your registered email address and we'll send a 6-digit verification code to reset your password."
                  : "Enter the 6-digit verification code sent to your email and choose a new password."}
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

            {/* FORGOT PASSWORD FORM */}
            {mode === "forgot" ? (
              !otpSent ? (
                /* Step 1: Request OTP */
                <form className="flex flex-col gap-3.5" onSubmit={handleRequestOtp}>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-700 ml-0.5">
                      Registered Email Address*
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@company.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3.5 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-xs"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 bg-primary hover:bg-[#A93E1B] text-white font-semibold rounded-lg px-6 py-2.5 transition-colors flex items-center justify-center cursor-pointer text-xs shadow-sm disabled:opacity-60"
                  >
                    {isSubmitting ? "Sending OTP..." : "Send Verification Code"}
                  </button>
                </form>
              ) : (
                /* Step 2: Enter OTP & Set New Password */
                <form className="flex flex-col gap-3.5" onSubmit={handleResetPassword}>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-slate-700 ml-0.5">
                        6-Digit Verification Code*
                      </label>
                      <button
                        type="button"
                        onClick={handleRequestOtp}
                        disabled={isSubmitting}
                        className="text-[11px] text-primary hover:underline flex items-center gap-1 cursor-pointer disabled:opacity-50"
                      >
                        <RotateCcw className="w-3 h-3" /> Resend Code
                      </button>
                    </div>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                        placeholder="123456"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3.5 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-xs font-mono tracking-widest text-center"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 relative">
                    <label className="text-xs font-semibold text-slate-700 ml-0.5">New Password*</label>
                    <div className="relative w-full">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="At least 8 characters"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-10 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-xs"
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

                  <div className="flex flex-col gap-1 relative">
                    <label className="text-xs font-semibold text-slate-700 ml-0.5">Confirm New Password*</label>
                    <div className="relative w-full">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        placeholder="Re-type new password"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-10 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-xs"
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

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 bg-primary hover:bg-[#A93E1B] text-white font-semibold rounded-lg px-6 py-2.5 transition-colors flex items-center justify-center cursor-pointer text-xs shadow-sm disabled:opacity-60"
                  >
                    {isSubmitting ? "Updating Password..." : "Set New Password & Sign In"}
                  </button>
                </form>
              )
            ) : (
              /* STANDARD LOGIN / SIGN UP FORM */
              <form className="flex flex-col gap-3.5" onSubmit={handleSubmit}>
                {mode === "signup" && (
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-700 ml-0.5">Full Name*</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3.5 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-xs"
                      />
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-700 ml-0.5">Email Address*</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3.5 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-xs"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1 relative">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-700 ml-0.5">Password*</label>
                    {mode === "login" && (
                      <button
                        type="button"
                        onClick={() => {
                          setMode("forgot");
                          setErrorMsg("");
                          setSuccessMsg("");
                          setOtpSent(false);
                        }}
                        className="text-[11px] text-primary hover:underline font-medium cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative w-full">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder={mode === "signup" ? "At least 8 characters" : "Enter your password"}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-10 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-xs"
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

                {mode === "signup" && (
                  <div className="flex flex-col gap-1 relative">
                    <label className="text-xs font-semibold text-slate-700 ml-0.5">Confirm Password*</label>
                    <div className="relative w-full">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        placeholder="Confirm your password"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-10 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-xs"
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

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 bg-primary hover:bg-[#A93E1B] text-white font-semibold rounded-lg px-6 py-2.5 transition-colors flex items-center justify-center cursor-pointer text-xs shadow-sm disabled:opacity-60"
                >
                  {isSubmitting
                    ? "Processing..."
                    : mode === "login"
                    ? "Sign In to Account"
                    : "Create Account & Sign In"}
                </button>
              </form>
            )}

            {/* Mode Switch Toggle Footer */}
            {mode !== "forgot" && (
              <div className="mt-4 pt-3.5 border-t border-slate-100 text-center">
                <p className="text-xs text-slate-400">
                  {mode === "login" ? (
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
                  ) : (
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
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
