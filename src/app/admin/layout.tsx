import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Building2,
  CalendarCheck,
  PhoneCall,
  ScrollText,
  ExternalLink,
  ShieldCheck,
  User,
} from "lucide-react";
import AdminNavLinks from "./components/AdminNavLinks";

export const metadata = {
  title: "Admin Dashboard | Officera",
  description: "Officera administrative panel for listings review, bookings, and compliance",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // CRITICAL REQUIREMENT: Server-side admin role check inside layout.tsx
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  if ((session.user as any)?.role !== "ADMIN") {
    redirect("/profile");
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col md:flex-row antialiased selection:bg-orange-500 selection:text-white">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-zinc-900/80 border-b md:border-b-0 md:border-r border-zinc-800 backdrop-blur-md flex flex-col shrink-0">
        {/* Brand Header */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center font-bold text-white shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-white block">Officera</span>
              <span className="text-[10px] font-semibold tracking-wider uppercase text-orange-400 bg-orange-500/10 px-1.5 py-0.5 rounded border border-orange-500/20">
                Admin Console
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 px-4 py-6">
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
            Management
          </p>
          <AdminNavLinks />
        </div>

        {/* Footer / Profile Status */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-900/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs text-orange-400 font-bold shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div className="truncate">
                <p className="text-xs font-semibold text-zinc-200 truncate">
                  {session.user.name || "Administrator"}
                </p>
                <p className="text-[10px] text-zinc-500 truncate">{session.user.email}</p>
              </div>
            </div>

            <Link
              href="/"
              target="_blank"
              title="Open Public Site"
              className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-16 border-b border-zinc-800 bg-zinc-900/40 backdrop-blur-md px-6 md:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-zinc-400 font-medium">Production Node • v4.0 Active</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/workspaces"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-zinc-300 hover:text-white px-3 py-1.5 rounded-lg border border-zinc-700/80 hover:border-zinc-600 bg-zinc-800/60 transition-all"
            >
              Public Catalog
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        <div className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
