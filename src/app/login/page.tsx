"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
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
} from "lucide-react";
import { loginUser } from "@/utils/auth";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const errorParam = searchParams.get("error");
  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "login";

  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    errorParam ? "Authentication failed. Please check your credentials." : ""
  );
  const [successMessage, setSuccessMessage] = useState("");

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
          {mode === "login" ? "Welcome Back" : "Create an Account"}
        </h1>
        <p className="text-xs text-[#5C5D61]">
          {mode === "login"
            ? "Sign in to access your workspace bookings and saved offices"
            : "Register to schedule visits, compare verified spaces, and manage bookings"}
        </p>
      </div>

      {/* Tabs */}
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

      {/* Form */}
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
          <label className="block text-xs font-semibold text-[#18191C] uppercase tracking-wider mb-1.5">
            Password*
          </label>
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

      {/* Switch Mode Prompt */}
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
