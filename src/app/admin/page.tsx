import { getAdminOverviewStats } from "@/server/services/admin.service";
import Link from "next/link";
import {
  Building2,
  Clock,
  Users,
  CalendarCheck,
  PhoneCall,
  ArrowRight,
  ShieldCheck,
  Activity,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const stats = await getAdminOverviewStats();

  const metricCards = [
    {
      title: "Active Listings",
      value: stats.activeListingsCount,
      subtitle: "Published & live in catalog",
      icon: Building2,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
      href: "/admin/listings?status=PUBLISHED",
    },
    {
      title: "Pending Submissions",
      value: stats.pendingListingsCount,
      subtitle: "Awaiting admin verification",
      icon: Clock,
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20",
      badge: stats.pendingListingsCount > 0 ? "Action Required" : "All Caught Up",
      badgeColor: stats.pendingListingsCount > 0 ? "bg-amber-500 text-black" : "bg-zinc-800 text-zinc-400",
      href: "/admin/listings?status=PENDING_REVIEW",
    },
    {
      title: "Upcoming Tours",
      value: stats.upcomingToursCount,
      subtitle: "Scheduled workspace visits",
      icon: CalendarCheck,
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
      href: "/admin/bookings",
    },
    {
      title: "New Callbacks",
      value: stats.newCallbacksCount,
      subtitle: "Pending contact requests",
      icon: PhoneCall,
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/20",
      href: "/admin/callbacks?status=NEW",
    },
    {
      title: "Registered Users",
      value: stats.registeredUsersCount,
      subtitle: "Platform accounts",
      icon: Users,
      color: "text-zinc-300",
      bg: "bg-zinc-800/40 border-zinc-700/60",
      href: "#",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            Operations & Quality Overview
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Real-time server-rendered counts and platform operational health
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/listings?status=PENDING_REVIEW"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm transition-all shadow-lg shadow-orange-600/20 hover:scale-[1.02]"
          >
            Review Pending Submissions
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {metricCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              href={card.href}
              className={`p-5 rounded-2xl border ${card.bg} hover:border-zinc-500/50 transition-all group flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    {card.title}
                  </span>
                  <div className={`p-2 rounded-xl bg-zinc-900/60 ${card.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="text-3xl font-extrabold text-white tracking-tight">
                  {card.value}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-xs text-zinc-400">
                <span className="truncate">{card.subtitle}</span>
                {card.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${card.badgeColor}`}
                  >
                    {card.badge}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Two Column Layout: Quick Actions & Audit Trail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Queues */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-orange-400" />
              Administrative Queues
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/admin/listings"
              className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-orange-500/40 transition-all block group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-white group-hover:text-orange-400 transition-colors">
                  Listings Review Queue
                </span>
                <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-xs text-zinc-400">
                Inspect building details, pricing, operator details, and approve or reject submissions.
              </p>
            </Link>

            <Link
              href="/admin/bookings"
              className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-blue-500/40 transition-all block group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                  Tour Bookings Scheduler
                </span>
                <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-xs text-zinc-400">
                Review visitor requests, confirm appointments, reschedule dates, and track visit completion.
              </p>
            </Link>

            <Link
              href="/admin/callbacks"
              className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-purple-500/40 transition-all block group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-white group-hover:text-purple-400 transition-colors">
                  Callback Requests
                </span>
                <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-xs text-zinc-400">
                Respond to clients requesting workspace consultation, change status, and log outreach notes.
              </p>
            </Link>

            <Link
              href="/admin/audit"
              className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-emerald-500/40 transition-all block group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
                  Compliance Audit Trail
                </span>
                <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-xs text-zinc-400">
                Immutable chronological log of all approvals, rejections, status transitions, and admin actions.
              </p>
            </Link>
          </div>
        </div>

        {/* Recent Activity Mini-Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Recent Audit Log
            </h2>
            <Link
              href="/admin/audit"
              className="text-xs text-orange-400 hover:text-orange-300 font-medium"
            >
              View all
            </Link>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 space-y-3">
            {stats.recentAudits.length === 0 ? (
              <div className="text-center py-6 text-xs text-zinc-500">
                No recent actions recorded.
              </div>
            ) : (
              stats.recentAudits.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-zinc-800/40 border border-zinc-800 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-orange-400 uppercase tracking-wider text-[10px]">
                      {item.action}
                    </span>
                    <span className="text-[10px] text-zinc-500">
                      {new Date(item.createdAt).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-zinc-300 line-clamp-1">{item.details}</p>
                  <p className="text-[10px] text-zinc-500">
                    By: {item.user?.name || item.user?.email || item.actorId || "System"}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
