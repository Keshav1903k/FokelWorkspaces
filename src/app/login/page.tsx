"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  const errorParam = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    errorParam ? "Authentication error. Please check your credentials." : ""
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      });

      if (res?.error) {
        setErrorMessage("Invalid email or password. Please try again.");
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAutofillAdmin = () => {
    setEmail("admin@officera.in");
    setPassword("Admin@Officera2025!");
    setErrorMessage("");
  };

  return (
    <div className="w-full max-w-md bg-zinc-900/80 border border-zinc-800 backdrop-blur-xl rounded-3xl p-8 shadow-2xl relative z-10 space-y-6">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <Link href="/" className="inline-flex items-center gap-2 group mb-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center font-bold text-white shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-white">Officera</span>
        </Link>
        <h1 className="text-xl font-bold text-white tracking-tight">Portal Access</h1>
        <p className="text-xs text-zinc-400">
          Sign in to access your administrative operations or partner console
        </p>
      </div>

      {/* Error Callout */}
      {errorMessage && (
        <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@officera.in"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
              Password
            </label>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-10 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white shadow-lg shadow-orange-600/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              Sign In to Console
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Demo Quick Fill Helper */}
      <div className="pt-2">
        <button
          type="button"
          onClick={handleAutofillAdmin}
          className="w-full py-2 px-3 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-950 text-xs text-zinc-400 hover:text-zinc-200 transition-colors flex items-center justify-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Autofill Default Admin Credentials
        </button>
      </div>

      {/* Footer */}
      <div className="text-center pt-4 border-t border-zinc-800">
        <Link
          href="/"
          className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          ← Return to Officera Marketplace
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 relative overflow-hidden selection:bg-orange-500 selection:text-white">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <Suspense
        fallback={
          <div className="w-full max-w-md bg-zinc-900/80 border border-zinc-800 rounded-3xl p-8 flex items-center justify-center text-zinc-400 text-sm">
            <Loader2 className="w-5 h-5 animate-spin mr-2 text-orange-500" />
            Loading portal...
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
