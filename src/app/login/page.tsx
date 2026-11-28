"use client";

import { Suspense, useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
  User,
  CheckCircle2,
  KeyRound,
  RotateCcw,
} from "lucide-react";
import { loginUser, getCurrentUser, logoutUser } from "@/utils/auth";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const errorParam = searchParams.get("error");
  const initialMode = searchParams.get("mode") === "signup" ? "signup" : searchParams.get("mode") === "forgot" ? "forgot" : "login";

  const { data: session, status: sessionStatus } = useSession();
  const [isAlreadyLoggedIn, setIsAlreadyLoggedIn] = useState(false);
  const [loggedInUserName, setLoggedInUserName] = useState("");

  const [mode, setMode] = useState<"login" | "signup" | "forgot">(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    errorParam && errorParam !== "Configuration"
      ? "Authentication failed. Please check your credentials."
      : ""
  );
  const [successMessage, setSuccessMessage] = useState("");

  // Check if user is already signed in on mount or session change
  useEffect(() => {
    const localUser = getCurrentUser();
    const authUser = session?.user || localUser;
    if (authUser?.email) {
      setIsAlreadyLoggedIn(true);
      setLoggedInUserName(authUser.name || localUser?.name || authUser.email || "Member");

      const target = (callbackUrl && !callbackUrl.includes("/login") && callbackUrl !== "/admin")
        ? callbackUrl
        : (authUser.role === "ADMIN" ? "/admin" : "/profile");

      const timer = setTimeout(() => {
        router.replace(target);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [session, sessionStatus, callbackUrl, router]);

  // 1. Handle Requesting OTP for Forgot Password
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !normalizedEmail.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || "Failed to send verification code. Please try again.");
        setIsLoading(false);
        return;
      }

      setOtpSent(true);
      setSuccessMessage(data.message || "A 6-digit verification code has been sent to your email.");
    } catch (err: any) {
      setErrorMessage("Network error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Handle Resetting Password with OTP
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();

    if (!otp || otp.trim().length !== 6) {
      setErrorMessage("Please enter the 6-digit verification code sent to your email.");
      return;
    }

    if (!password || password.length < 8) {
      setErrorMessage("New password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("New passwords do not match. Please verify.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: normalizedEmail,
          otp: otp.trim(),
          newPassword: password,
          confirmPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || "Failed to reset password. Please check your code.");
        setIsLoading(false);
        return;
      }

      // Auto sign-in with newly set password
      const signInRes = await signIn("credentials", {
        email: normalizedEmail,
        password,
        redirect: false,
      });

      if (!signInRes?.error) {
        loginUser(normalizedEmail.split("@")[0], normalizedEmail, undefined, "USER");
      }

      setSuccessMessage("Password reset successfully! Redirecting to your dashboard...");
      setTimeout(() => {
        router.push("/profile");
        router.refresh();
      }, 1000);
    } catch (err: any) {
      setErrorMessage("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  // 3. Handle Standard Login / Registration Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const normalizedEmail = email.trim().toLowerCase();

    try {
      if (mode === "signup") {
        if (!password || password.length < 8) {
          setErrorMessage("Password must be at least 8 characters long.");
          setIsLoading(false);
          return;
        }

        if (password !== confirmPassword) {
          setErrorMessage("Passwords do not match. Please ensure both passwords match.");
          setIsLoading(false);
          return;
        }

        const regRes = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            email: normalizedEmail,
            password,
            confirmPassword,
            role: "USER",
          }),
        });

        const regData = await regRes.json();
        if (!regRes.ok) {
          setErrorMessage(regData.error || "Failed to create account. Please try again.");
          setIsLoading(false);
          return;
        }

        // Auto sign-in
        const res = await signIn("credentials", {
          email: normalizedEmail,
          password,
          redirect: false,
        });

        if (res?.error) {
          setSuccessMessage("Account created successfully! Please sign in with your password.");
          setMode("login");
          setIsLoading(false);
          return;
        }

        loginUser(
          regData.user?.name || name.trim(),
          regData.user?.email || normalizedEmail,
          regData.user?.id,
          regData.user?.role || "USER"
        );

        setSuccessMessage("Account created! Redirecting to your dashboard...");
        setTimeout(() => {
          router.push("/profile");
          router.refresh();
        }, 800);
        return;
      }

      // Login mode
      const res = await signIn("credentials", {
        email: normalizedEmail,
        password,
        redirect: false,
      });

      if (res?.error) {
        setErrorMessage("Invalid email or password. Please check your credentials and try again.");
        setIsLoading(false);
        return;
      }

      // Fetch user profile session
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

      // Safe redirect: only admins go to /admin; regular users go to profile or intended page
      let targetUrl = "/profile";
      if (callbackUrl && callbackUrl !== "/admin") {
        targetUrl = callbackUrl;
      } else if (userRole === "ADMIN") {
        targetUrl = "/admin";
      }

      setSuccessMessage("Signed in successfully! Loading...");
      setTimeout(() => {
        router.push(targetUrl);
        router.refresh();
      }, 500);
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  if (isAlreadyLoggedIn) {
    return (
      <div className="w-full max-w-md bg-white border border-[#E3DDD3] rounded-3xl p-8 shadow-xl relative z-10 space-y-6 text-[#18191C] text-center">
        <Link href="/" className="inline-block mb-1">
          <img
            src="/images/logo-light.png"
            alt="Officera"
            className="h-8 w-auto object-contain mx-auto"
          />
        </Link>
        <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mt-2">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#18191C]">
            Already Signed In
          </h1>
          <p className="text-xs text-[#5C5D61] mt-1.5 leading-relaxed">
            You are signed in as <span className="font-semibold text-slate-800">{loggedInUserName}</span>.
            <br />Redirecting to your dashboard...
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/profile"
            className="flex-1 py-3 px-4 bg-primary hover:bg-[#A93E1B] text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            Go to Dashboard <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("open-logout-modal"))}
            className="py-3 px-4 border border-slate-200 text-slate-600 hover:text-slate-900 text-xs font-medium rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Sign Out
          </button>
        </div>

        <div className="pt-2 border-t border-[#E3DDD3]/60">
          <Link
            href="/"
            className="text-xs text-[#5C5D61] hover:text-primary transition-colors"
          >
            ← Return to Officera Marketplace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md bg-white border border-[#E3DDD3] rounded-3xl p-8 shadow-xl relative z-10 space-y-6 text-[#18191C]">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <Link href="/" className="inline-block mb-1">
          <img
            src="/images/logo-light.png"
            alt="Officera"
            className="h-8 w-auto object-contain mx-auto"
          />
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-[#18191C]">
          {mode === "login"
            ? "Welcome Back"
            : mode === "signup"
            ? "Create an Account"
            : "Reset Your Password"}
        </h1>
        <p className="text-xs text-[#5C5D61]">
          {mode === "login"
            ? "Sign in to access your workspace bookings and saved offices"
            : mode === "signup"
            ? "Register to schedule visits, compare verified spaces, and manage bookings"
            : "Enter your registered email to receive a 6-digit verification code"}
        </p>
      </div>

      {/* Tabs (Hidden in forgot mode) */}
      {mode !== "forgot" && (
        <div className="flex items-center gap-1 p-1 bg-[#F5F2EB] rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setErrorMessage("");
              setSuccessMessage("");
            }}
            className={`flex-1 py-2 rounded-lg transition-all cursor-pointer text-center ${
              mode === "login"
                ? "bg-white text-[#18191C] shadow-xs"
                : "text-[#5C5D61] hover:text-[#18191C]"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("signup");
              setErrorMessage("");
              setSuccessMessage("");
            }}
            className={`flex-1 py-2 rounded-lg transition-all cursor-pointer text-center ${
              mode === "signup"
                ? "bg-white text-[#18191C] shadow-xs"
                : "text-[#5C5D61] hover:text-[#18191C]"
            }`}
          >
            Create Account
          </button>
        </div>
      )}

      {/* Feedback Messages */}
      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
          <span>{errorMessage}</span>
        </div>
      )}
      {successMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* 1. FORGOT PASSWORD FLOW */}
      {mode === "forgot" ? (
        !otpSent ? (
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#18191C] uppercase tracking-wider mb-1.5">
                Registered Email Address*
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-[#FAF8F5] border border-[#E3DDD3] rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-[#18191C] placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-primary hover:bg-[#A93E1B] text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Send Verification Code (OTP)
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setErrorMessage("");
                  setSuccessMessage("");
                }}
                className="text-xs text-primary font-semibold hover:underline cursor-pointer"
              >
                ← Back to Sign In
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#18191C] uppercase tracking-wider mb-1.5">
                6-Digit Verification Code (OTP)*
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="123456"
                  className="w-full bg-[#FAF8F5] border border-[#E3DDD3] rounded-xl pl-10 pr-3.5 py-2.5 text-base tracking-widest font-mono text-[#18191C] placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-center"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1 text-center">
                Check your inbox for <span className="font-semibold text-slate-700">{email}</span>
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#18191C] uppercase tracking-wider mb-1.5">
                New Password* (Min 8 Characters)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#FAF8F5] border border-[#E3DDD3] rounded-xl pl-10 pr-10 py-2.5 text-sm text-[#18191C] placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#18191C] uppercase tracking-wider mb-1.5">
                Confirm New Password*
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your new password"
                  className="w-full bg-[#FAF8F5] border border-[#E3DDD3] rounded-xl pl-10 pr-10 py-2.5 text-sm text-[#18191C] placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-primary hover:bg-[#A93E1B] text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Set New Password
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-between text-xs pt-2">
              <button
                type="button"
                onClick={() => {
                  setOtpSent(false);
                  setOtp("");
                }}
                className="text-slate-500 hover:text-slate-800 transition-colors cursor-pointer flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Resend code
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setOtpSent(false);
                  setErrorMessage("");
                  setSuccessMessage("");
                }}
                className="text-primary font-semibold hover:underline cursor-pointer"
              >
                Back to Sign In
              </button>
            </div>
          </form>
        )
      ) : (
        /* 2. STANDARD SIGN IN / SIGN UP FORM */
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label className="block text-xs font-semibold text-[#18191C] uppercase tracking-wider mb-1.5">
                Full Name*
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-[#FAF8F5] border border-[#E3DDD3] rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-[#18191C] placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#18191C] uppercase tracking-wider mb-1.5">
              Email Address*
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-[#FAF8F5] border border-[#E3DDD3] rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-[#18191C] placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-[#18191C] uppercase tracking-wider">
                Password*
              </label>
              {mode === "login" && (
                <button
                  type="button"
                  onClick={() => {
                    setMode("forgot");
                    setErrorMessage("");
                    setSuccessMessage("");
                    setOtpSent(false);
                  }}
                  className="text-xs text-primary font-medium hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={mode === "signup" ? "At least 8 characters" : "••••••••••••"}
                className="w-full bg-[#FAF8F5] border border-[#E3DDD3] rounded-xl pl-10 pr-10 py-2.5 text-sm text-[#18191C] placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {mode === "signup" && (
            <div>
              <label className="block text-xs font-semibold text-[#18191C] uppercase tracking-wider mb-1.5">
                Confirm Password*
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full bg-[#FAF8F5] border border-[#E3DDD3] rounded-xl pl-10 pr-10 py-2.5 text-sm text-[#18191C] placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-primary hover:bg-[#A93E1B] text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                {mode === "login" ? "Sign In to Account" : "Create Account & Sign In"}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}

      {/* Switch Mode Prompt */}
      {mode !== "forgot" && (
        <div className="text-center pt-2">
          <p className="text-xs text-[#5C5D61]">
            {mode === "login" ? (
              <>
                Don&apos;t have an account yet?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    setErrorMessage("");
                    setSuccessMessage("");
                  }}
                  className="text-primary font-semibold hover:underline cursor-pointer"
                >
                  Create an account
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setErrorMessage("");
                    setSuccessMessage("");
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

      {/* Footer Link */}
      <div className="text-center pt-3 border-t border-[#E3DDD3]">
        <Link
          href="/"
          className="text-xs text-[#5C5D61] hover:text-[#18191C] transition-colors"
        >
          ← Return to Officera Marketplace
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-4 relative selection:bg-primary selection:text-white">
      <Suspense
        fallback={
          <div className="w-full max-w-md bg-white border border-[#E3DDD3] rounded-3xl p-8 flex items-center justify-center text-[#5C5D61] text-sm">
            <Loader2 className="w-5 h-5 animate-spin mr-2 text-primary" />
            Loading sign in...
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
