import { getAdminCallbacks } from "@/server/services/admin.service";
import Link from "next/link";
import {
  PhoneCall,
  Clock,
  Building,
  User,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import CallbackStatusControls from "./CallbackStatusControls";

export const dynamic = "force-dynamic";

interface CallbacksPageProps {
  searchParams: Promise<{
    status?: string;
    page?: string;
  }>;
}

export default async function AdminCallbacksPage({ searchParams }: CallbacksPageProps) {
  const params = await searchParams;
  const currentStatus = params.status || "ALL";
  const currentPage = Number(params.page) || 1;

  const { callbacks, total, totalPages } = await getAdminCallbacks({
    status: currentStatus,
    page: currentPage,
    limit: 20,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <PhoneCall className="w-6 h-6 text-purple-500" />
            Callback Requests
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Outreach queue for clients requesting workspace consultations and pricing queries
          </p>
        </div>

        <div>
          <span className="text-xs bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-lg border border-zinc-700">
            Total Requests: <strong>{total}</strong>
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
        {[
          { label: "All Requests", value: "ALL" },
          { label: "New Requests", value: "NEW" },
          { label: "Contacted", value: "CONTACTED" },
          { label: "Closed", value: "CLOSED" },
        ].map((tab) => {
          const isActive = currentStatus === tab.value;
          return (
            <Link
              key={tab.value}
              href={`/admin/callbacks?status=${tab.value}`}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                  : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {/* Callbacks Table */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="bg-zinc-900 text-xs uppercase tracking-wider text-zinc-400 border-b border-zinc-800">
              <tr>
                <th scope="col" className="px-6 py-4">Client</th>
                <th scope="col" className="px-6 py-4">Phone Number</th>
                <th scope="col" className="px-6 py-4">Preferred Time</th>
                <th scope="col" className="px-6 py-4">Interested In</th>
                <th scope="col" className="px-6 py-4">Submitted</th>
                <th scope="col" className="px-6 py-4 text-right">Status & Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {callbacks.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">
                    <PhoneCall className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    No callback requests found in this view.
                  </td>
                </tr>
              ) : (
                callbacks.map((cb) => (
                  <tr key={cb.id} className="hover:bg-zinc-800/30 transition-colors">
                    {/* Client */}
                    <td className="px-6 py-4">
                      <div className="font-semibold text-zinc-100 flex items-center gap-2">
                        <User className="w-4 h-4 text-zinc-500" />
                        {cb.name}
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="px-6 py-4">
                      <a
                        href={`tel:${cb.phone}`}
                        className="text-purple-400 hover:underline font-mono text-xs"
                      >
                        {cb.phone}
                      </a>
                    </td>

                    {/* Preferred Time */}
                    <td className="px-6 py-4 text-zinc-300 text-xs">
                      {cb.preferredTime || "Anytime during business hours"}
                    </td>

                    {/* Workspace */}
                    <td className="px-6 py-4">
                      {cb.workspace ? (
                        <div>
                          <div className="font-medium text-zinc-200">
                            {cb.workspace.title}
                          </div>
                          <div className="text-xs text-zinc-500">{cb.workspace.city}</div>
                        </div>
                      ) : (
                        <span className="text-xs text-zinc-500 italic">General Consultation</span>
                      )}
                    </td>

                    {/* Submitted At */}
                    <td className="px-6 py-4 text-xs text-zinc-400">
                      {new Date(cb.createdAt).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>

                    {/* Status & Notes */}
                    <td className="px-6 py-4 text-right">
                      <CallbackStatusControls
                        callbackId={cb.id}
                        currentStatus={cb.status}
                        currentNotes={cb.notes}
                      />
                    </td>
                  </tr>
                ))
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
                  href={`/admin/callbacks?page=${currentPage - 1}&status=${currentStatus}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </Link>
              )}
              {currentPage < totalPages && (
                <Link
                  href={`/admin/callbacks?page=${currentPage + 1}&status=${currentStatus}`}
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
