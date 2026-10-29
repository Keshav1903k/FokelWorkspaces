import { getAdminListingsQueue } from "@/server/services/admin.service";
import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface ListingsPageProps {
  searchParams: Promise<{
    status?: string;
    city?: string;
    search?: string;
    page?: string;
  }>;
}

export default async function AdminListingsPage({ searchParams }: ListingsPageProps) {
  const params = await searchParams;
  const currentStatus = params.status || "ALL";
  const currentCity = params.city || "ALL";
  const currentSearch = params.search || "";
  const currentPage = Number(params.page) || 1;

  const { listings, total, totalPages } = await getAdminListingsQueue({
    status: currentStatus,
    city: currentCity,
    search: currentSearch,
    page: currentPage,
    limit: 15,
  });

  const statusBadges: Record<string, { label: string; class: string; icon: any }> = {
    PENDING_REVIEW: {
      label: "Pending Review",
      class: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      icon: Clock,
    },
    PENDING_APPROVAL: {
      label: "Pending Approval",
      class: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      icon: Clock,
    },
    PUBLISHED: {
      label: "Published",
      class: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      icon: CheckCircle2,
    },
    APPROVED: {
      label: "Approved",
      class: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      icon: CheckCircle2,
    },
    REJECTED: {
      label: "Rejected",
      class: "bg-rose-500/10 text-rose-400 border-rose-500/30",
      icon: XCircle,
    },
    DRAFT: {
      label: "Draft",
      class: "bg-zinc-700/20 text-zinc-400 border-zinc-700/40",
      icon: AlertCircle,
    },
    ARCHIVED: {
      label: "Archived",
      class: "bg-zinc-800 text-zinc-500 border-zinc-700",
      icon: AlertCircle,
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Building2 className="w-6 h-6 text-orange-500" />
            Listings Review Queue
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Review partner submissions, verify images & amenities, approve for public display
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-lg border border-zinc-700">
            Total Listings: <strong>{total}</strong>
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <form
        method="GET"
        className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
      >
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            name="search"
            defaultValue={currentSearch}
            placeholder="Search title or location..."
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors"
          />
        </div>

        {/* Status Filter */}
        <div>
          <select
            name="status"
            defaultValue={currentStatus}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-orange-500 transition-colors"
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING_REVIEW">Pending Review</option>
            <option value="PENDING_APPROVAL">Pending Approval</option>
            <option value="PUBLISHED">Published</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
            <option value="DRAFT">Draft</option>
          </select>
        </div>

        {/* City Filter */}
        <div>
          <select
            name="city"
            defaultValue={currentCity}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-orange-500 transition-colors"
          >
            <option value="ALL">All Cities</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi NCR">Delhi NCR</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Pune">Pune</option>
          </select>
        </div>

        {/* Submit Filter Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-500 text-white font-medium text-sm py-2 px-4 rounded-xl transition-colors shadow-md shadow-orange-600/20"
          >
            Apply Filters
          </button>
        </div>
      </form>

      {/* Listings Table */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="bg-zinc-900 text-xs uppercase tracking-wider text-zinc-400 border-b border-zinc-800">
              <tr>
                <th scope="col" className="px-6 py-4">Workspace</th>
                <th scope="col" className="px-6 py-4">City / Area</th>
                <th scope="col" className="px-6 py-4">Pricing</th>
                <th scope="col" className="px-6 py-4">Partner</th>
                <th scope="col" className="px-6 py-4">Status</th>
                <th scope="col" className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {listings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">
                    <Building2 className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    No listings match the current filters.
                  </td>
                </tr>
              ) : (
                listings.map((ws) => {
                  const badge = statusBadges[ws.status] || {
                    label: ws.status,
                    class: "bg-zinc-800 text-zinc-300 border-zinc-700",
                    icon: AlertCircle,
                  };
                  const BadgeIcon = badge.icon;
                  const thumb = ws.images[0]?.url || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=300";

                  return (
                    <tr
                      key={ws.id}
                      className="hover:bg-zinc-800/30 transition-colors group"
                    >
                      {/* Workspace Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-zinc-800 shrink-0 border border-zinc-700/60">
                            <Image
                              src={thumb}
                              alt={ws.title}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0 max-w-xs">
                            <Link
                              href={`/admin/listings/${ws.id}`}
                              className="font-semibold text-zinc-100 hover:text-orange-400 transition-colors truncate block"
                            >
                              {ws.title}
                            </Link>
                            <span className="text-xs text-zinc-500 block truncate">
                              {ws.type}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Location */}
                      <td className="px-6 py-4">
                        <div className="text-zinc-200 font-medium">{ws.city}</div>
                        <div className="text-xs text-zinc-500 truncate max-w-[180px]">
                          {ws.location}
                        </div>
                      </td>

                      {/* Pricing */}
                      <td className="px-6 py-4">
                        <span className="font-semibold text-zinc-200">
                          {ws.priceDisplay}
                        </span>
                      </td>

                      {/* Partner */}
                      <td className="px-6 py-4">
                        <div className="text-zinc-200 text-xs font-medium">
                          {ws.partner?.name || "Direct Submitter"}
                        </div>
                        <div className="text-[11px] text-zinc-500 truncate">
                          {ws.partner?.email || "N/A"}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${badge.class}`}
                        >
                          <BadgeIcon className="w-3.5 h-3.5" />
                          {badge.label}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/admin/listings/${ws.id}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-orange-600 text-zinc-200 hover:text-white text-xs font-semibold transition-all shadow-sm"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Review Detail
                        </Link>
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
              Page {currentPage} of {totalPages} ({total} listings)
            </span>
            <div className="flex items-center gap-2">
              {currentPage > 1 && (
                <Link
                  href={`/admin/listings?page=${currentPage - 1}&status=${currentStatus}&city=${currentCity}&search=${currentSearch}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </Link>
              )}
              {currentPage < totalPages && (
                <Link
                  href={`/admin/listings?page=${currentPage + 1}&status=${currentStatus}&city=${currentCity}&search=${currentSearch}`}
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
