"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

interface SpaceSpec {
  name: string;
  city: string;
  type: string;
  pricePerSeat: string;
  lockInPeriod: string;
  metroDistance: string;
  meetingCredits: string;
  accessHours: string;
  gstRegistration: boolean;
}

const COMPARISON_DATA: SpaceSpec[] = [
  {
    name: "The Zenith Cyber City",
    city: "Gurugram",
    type: "Managed Office",
    pricePerSeat: "₹18,500 / mo",
    lockInPeriod: "6 Months",
    metroDistance: "200m from Rapid Metro",
    meetingCredits: "20 hours / seat",
    accessHours: "24/7 Unlimited",
    gstRegistration: true
  },
  {
    name: "AeroHub Workspaces",
    city: "Delhi Aerocity",
    type: "Coworking Space",
    pricePerSeat: "₹14,200 / mo",
    lockInPeriod: "3 Months",
    metroDistance: "400m from Airport Express",
    meetingCredits: "12 hours / seat",
    accessHours: "24/7 Unlimited",
    gstRegistration: true
  },
  {
    name: "Indiranagar Executive Suite",
    city: "Bangalore",
    type: "Private Cabin",
    pricePerSeat: "₹16,000 / mo",
    lockInPeriod: "1 Month (Flex)",
    metroDistance: "150m from Purple Line",
    meetingCredits: "15 hours / seat",
    accessHours: "24/7 Unlimited",
    gstRegistration: true
  }
];

export function ComparisonPanel() {
  return (
    <section className="py-24 bg-[#FAF8F5] border-b border-[#E3DDD3]">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-semibold text-primary block mb-1">
              Side-by-side comparison
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#18191C] tracking-tight">
              Don't settle on the first office.
            </h2>
          </div>
          <p className="text-xs text-[#5C5D61] max-w-md">
            Compare key parameters side-by-side: seat pricing, lock-in terms, metro connectivity, and included services before booking a visit.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white border border-[#E3DDD3] rounded-sm overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-[#E3DDD3] bg-[#FAF8F5]">
                  <th className="p-4 text-xs font-semibold text-[#5C5D61] w-1/4">Specification</th>
                  {COMPARISON_DATA.map((space) => (
                    <th key={space.name} className="p-4 border-l border-[#E3DDD3] w-1/4">
                      <span className="text-xs font-semibold text-primary block">{space.city} · {space.type}</span>
                      <span className="text-base font-bold text-[#18191C]">{space.name}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3DDD3] text-xs">
                <tr>
                  <td className="p-4 font-semibold text-[#18191C] bg-[#FAF8F5]">Price per seat</td>
                  {COMPARISON_DATA.map((space) => (
                    <td key={space.name} className="p-4 border-l border-[#E3DDD3] text-base font-bold text-primary">
                      {space.pricePerSeat}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#18191C] bg-[#FAF8F5]">Lock-in period</td>
                  {COMPARISON_DATA.map((space) => (
                    <td key={space.name} className="p-4 border-l border-[#E3DDD3] text-[#5C5D61]">
                      {space.lockInPeriod}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#18191C] bg-[#FAF8F5]">Metro connectivity</td>
                  {COMPARISON_DATA.map((space) => (
                    <td key={space.name} className="p-4 border-l border-[#E3DDD3] text-[#5C5D61]">
                      {space.metroDistance}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#18191C] bg-[#FAF8F5]">Meeting room credits</td>
                  {COMPARISON_DATA.map((space) => (
                    <td key={space.name} className="p-4 border-l border-[#E3DDD3] text-[#5C5D61]">
                      {space.meetingCredits}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#18191C] bg-[#FAF8F5]">Access hours</td>
                  {COMPARISON_DATA.map((space) => (
                    <td key={space.name} className="p-4 border-l border-[#E3DDD3] text-[#5C5D61]">
                      {space.accessHours}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#18191C] bg-[#FAF8F5]">GST registration ready</td>
                  {COMPARISON_DATA.map((space) => (
                    <td key={space.name} className="p-4 border-l border-[#E3DDD3]">
                      <span className="inline-flex items-center gap-1 text-[#2A6447] font-semibold">
                        <Check className="w-4 h-4" /> Yes
                      </span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-[#FAF8F5] border-t border-[#E3DDD3] flex items-center justify-between">
            <span className="text-xs text-[#5C5D61]">Compare multiple listings before scheduling a visit.</span>
            <Link
              href="/workspaces"
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <span>Explore all spaces</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
