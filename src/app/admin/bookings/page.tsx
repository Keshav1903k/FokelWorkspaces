import { getAdminBookings } from "@/server/services/admin.service";
import Link from "next/link";
import {
  CalendarCheck,
  Search,
  Filter,
  Clock,
  Calendar,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  Building,
} from "lucide-react";
import BookingActionControls from "./BookingActionControls";

export const dynamic = "force-dynamic";

interface BookingsPageProps {
  searchParams: Promise<{
    status?: string;
    city?: string;
    date?: string;
    page?: string;
  }>;
}

export default async function AdminBookingsPage({ searchParams }: BookingsPageProps) {
  const params = await searchParams;
  const currentStatus = params.status || "ALL";
  const currentCity = params.city || "ALL";
  const currentDate = params.date || "";
  const currentPage = Number(params.page) || 1;

  const { bookings, total, totalPages } = await getAdminBookings({
    status: currentStatus,
    city: currentCity,
    date: currentDate,
    page: currentPage,
    limit: 20,
  });

  const statusStyles: Record<string, { label: string; class: string }> = {
    REQUESTED: {
      label: "Requested",
      class: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    },
    PENDING: {
      label: "Pending",
      class: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    },
    CONFIRMED: {
      label: "Confirmed",
      class: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    },
    RESCHEDULED: {
      label: "Rescheduled",
      class: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    },
    COMPLETED: {
      label: "Completed",
      class: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    },
    CANCELLED: {
      label: "Cancelled",
      class: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <CalendarCheck className="w-6 h-6 text-blue-500" />
            Tour Bookings Scheduler
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Manage upcoming workspace viewings, confirm schedules, and process reschedule requests
          </p>
        </div>

        <div>
          <span className="text-xs bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-lg border border-zinc-700">
            Total Requests: <strong>{total}</strong>
          </span>
        </div>
      </div>

      {/* Filters Form */}
      <form
        method="GET"
        className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
      >
        {/* Status Filter */}
        <div>
          <select
            name="status"
            defaultValue={currentStatus}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="ALL">All Statuses</option>
            <option value="REQUESTED">Requested (New)</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="RESCHEDULED">Rescheduled</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        {/* City Filter */}
        <div>
          <select
            name="city"
            defaultValue={currentCity}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="ALL">All Cities</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi NCR">Delhi NCR</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Kolkata">Kolkata</option>
          </select>
        </div>

        {/* Date Filter */}
        <div>
          <input
            type="date"
            name="date"
            defaultValue={currentDate}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Apply Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm py-2 px-4 rounded-xl transition-colors shadow-md shadow-blue-600/20"
          >
            Filter Tours
          </button>
        </div>
      </form>

      {/* Bookings Table */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="bg-zinc-900 text-xs uppercase tracking-wider text-zinc-400 border-b border-zinc-800">
              <tr>
                <th scope="col" className="px-6 py-4">Client</th>
                <th scope="col" className="px-6 py-4">Workspace</th>
                <th scope="col" className="px-6 py-4">Scheduled Date</th>
                <th scope="col" className="px-6 py-4">Slot & Team</th>
                <th scope="col" className="px-6 py-4">Status</th>
                <th scope="col" className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">
                    <Calendar className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    No tour bookings found for the selected criteria.
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => {
                  const style = statusStyles[booking.status] || {
                    label: booking.status,
                    class: "bg-zinc-800 text-zinc-300 border-zinc-700",
                  };

                  const formattedDate = new Date(booking.visitDate).toLocaleDateString("en-IN", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });

                  return (
                    <tr key={booking.id} className="hover:bg-zinc-800/30 transition-colors">
                      {/* Client */}
                      <td className="px-6 py-4">
                        <div className="font-semibold text-zinc-100">{booking.guestName}</div>
                        <div className="text-xs text-zinc-500 flex items-center gap-1.5 mt-0.5">
                          <Mail className="w-3 h-3" />
                          {booking.guestEmail}
                        </div>
                        <div className="text-xs text-zinc-500 flex items-center gap-1.5 mt-0.5">
                          <Phone className="w-3 h-3" />
                          {booking.guestPhone}
                        </div>
                      </td>

                      {/* Workspace */}
                      <td className="px-6 py-4">
                        <div className="font-medium text-zinc-200">
                          {booking.workspace.title}
                        </div>
                        <div className="text-xs text-zinc-500 truncate max-w-[200px]">
                          {booking.workspace.location}, {booking.workspace.city}
                        </div>
                      </td>

                      {/* Scheduled Date */}
                      <td className="px-6 py-4">
                        <div className="font-medium text-zinc-200">{formattedDate}</div>
                        {booking.rescheduledTo && (
                          <div className="text-[11px] text-blue-400 mt-0.5">
                            Rescheduled:{" "}
                            {new Date(booking.rescheduledTo).toLocaleDateString("en-IN", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        )}
                      </td>

                      {/* Slot & Team */}
                      <td className="px-6 py-4">
                        <div className="text-zinc-200">{booking.timeSlot}</div>
                        <div className="text-xs text-zinc-500">{booking.teamSize} people</div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${style.class}`}
                        >
                          {style.label}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <BookingActionControls
                          bookingId={booking.id}
                          currentStatus={booking.status}
                          guestName={booking.guestName}
                          currentDate={formattedDate}
                        />
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
                  href={`/admin/bookings?page=${currentPage - 1}&status=${currentStatus}&city=${currentCity}&date=${currentDate}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </Link>
              )}
              {currentPage < totalPages && (
                <Link
                  href={`/admin/bookings?page=${currentPage + 1}&status=${currentStatus}&city=${currentCity}&date=${currentDate}`}
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
