import { getAdminAuditLogs } from "@/server/services/admin.service";
import Link from "next/link";
import {
  ScrollText,
  Filter,
  User,
  Clock,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  Code,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface AuditPageProps {
  searchParams: Promise<{
    action?: string;
    actorId?: string;
    page?: string;
  }>;
}

export default async function AdminAuditPage({ searchParams }: AuditPageProps) {
  const params = await searchParams;
  const currentAction = params.action || "ALL";
  const currentActorId = params.actorId || "";
  const currentPage = Number(params.page) || 1;

  const { logs, total, totalPages } = await getAdminAuditLogs({
    action: currentAction,
    actorId: currentActorId,
    page: currentPage,
    limit: 25,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <ScrollText className="w-6 h-6 text-emerald-500" />
            Compliance & Operations Audit Trail
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Immutable chronological record of administrative decisions, status transitions, and listing actions
          </p>
        </div>

        <div>
          <span className="text-xs bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-lg border border-zinc-700">
            Total Events: <strong>{total}</strong>
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <form
        method="GET"
        className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-wrap items-center gap-3"
      >
        <div className="flex-1 min-w-[200px]">
          <select
            name="action"
            defaultValue={currentAction}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-emerald-500 transition-colors"
          >
            <option value="ALL">All Actions</option>
            <option value="LISTING_APPROVE">Listing Approved</option>
            <option value="LISTING_REJECT">Listing Rejected</option>
            <option value="BOOKING_">Booking Status Changes</option>
            <option value="CALLBACK_">Callback Status Changes</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm py-2 px-4 rounded-xl transition-colors shadow-md shadow-emerald-600/20"
        >
          Filter Events
        </button>
      </form>

      {/* Audit Log Table */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="bg-zinc-900 text-xs uppercase tracking-wider text-zinc-400 border-b border-zinc-800">
              <tr>
                <th scope="col" className="px-6 py-4">Timestamp</th>
                <th scope="col" className="px-6 py-4">Action</th>
                <th scope="col" className="px-6 py-4">Actor</th>
                <th scope="col" className="px-6 py-4">Target Entity</th>
                <th scope="col" className="px-6 py-4">Details & Notes</th>
                <th scope="col" className="px-6 py-4 text-right">Metadata</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">
                    <ScrollText className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    No audit records match the selected filter.
                  </td>
                </tr>
              ) : (
                logs.map((log) => {
                  let badgeColor = "bg-zinc-800 text-zinc-300 border-zinc-700";
                  if (log.action.includes("APPROVE") || log.action.includes("CONFIRMED")) {
                    badgeColor = "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
                  } else if (log.action.includes("REJECT") || log.action.includes("CANCEL")) {
                    badgeColor = "bg-rose-500/10 text-rose-400 border-rose-500/30";
                  } else if (log.action.includes("RESCHEDULE")) {
                    badgeColor = "bg-blue-500/10 text-blue-400 border-blue-500/30";
                  }

                  return (
                    <tr key={log.id} className="hover:bg-zinc-800/30 transition-colors">
                      {/* Timestamp */}
                      <td className="px-6 py-4 text-xs font-mono text-zinc-400 whitespace-nowrap">
                        {new Date(log.createdAt).toLocaleString("en-IN", {
                          timeZone: "Asia/Kolkata",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </td>

                      {/* Action */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-xs font-mono font-semibold border ${badgeColor}`}
                        >
                          {log.action}
                        </span>
                      </td>

                      {/* Actor */}
                      <td className="px-6 py-4 text-xs">
                        <div className="font-semibold text-zinc-200">
                          {log.user?.name || "Admin"}
                        </div>
                        <div className="text-zinc-500 truncate max-w-[150px]">
                          {log.user?.email || log.actorId || "System"}
                        </div>
                      </td>

                      {/* Entity */}
                      <td className="px-6 py-4 text-xs">
                        <span className="text-zinc-400 font-mono">{log.entityType}</span>
                        {log.entityId && (
                          <div className="text-[11px] text-zinc-500 font-mono truncate max-w-[120px]">
                            {log.entityId}
                          </div>
                        )}
                      </td>

                      {/* Details */}
                      <td className="px-6 py-4 text-xs text-zinc-300 max-w-sm">
                        {log.details || "—"}
                      </td>

                      {/* Metadata */}
                      <td className="px-6 py-4 text-right">
                        {log.metadata ? (
                          <details className="inline-block text-left">
                            <summary className="cursor-pointer text-[11px] font-mono text-zinc-400 hover:text-emerald-400 bg-zinc-800 px-2 py-1 rounded">
                              View JSON
                            </summary>
                            <pre className="absolute z-20 mt-1 right-8 p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-[10px] text-emerald-400 max-w-xs overflow-auto shadow-2xl">
                              {JSON.stringify(log.metadata, null, 2)}
                            </pre>
                          </details>
                        ) : (
                          <span className="text-zinc-600 text-xs">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              {currentPage > 1 && (
                <Link
                  href={`/admin/audit?page=${currentPage - 1}&action=${currentAction}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </Link>
              )}
              {currentPage < totalPages && (
                <Link
                  href={`/admin/audit?page=${currentPage + 1}&action=${currentAction}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
