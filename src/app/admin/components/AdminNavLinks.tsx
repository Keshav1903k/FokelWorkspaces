"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  CalendarCheck,
  PhoneCall,
  ScrollText,
} from "lucide-react";

const NAV_ITEMS = [
  {
    name: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    name: "Listings Queue",
    href: "/admin/listings",
    icon: Building2,
    exact: false,
  },
  {
    name: "Tour Bookings",
    href: "/admin/bookings",
    icon: CalendarCheck,
    exact: false,
  },
  {
    name: "Callback Requests",
    href: "/admin/callbacks",
    icon: PhoneCall,
    exact: false,
  },
  {
    name: "Audit Trail",
    href: "/admin/audit",
    icon: ScrollText,
    exact: false,
  },
];

export default function AdminNavLinks() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1.5">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = item.exact
          ? pathname === item.href
          : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              isActive
                ? "bg-orange-500/10 text-orange-400 border border-orange-500/30 shadow-sm shadow-orange-500/5 font-semibold"
                : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60"
            }`}
          >
            <Icon
              className={`w-4 h-4 transition-colors ${
                isActive ? "text-orange-400" : "text-zinc-400"
              }`}
            />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
