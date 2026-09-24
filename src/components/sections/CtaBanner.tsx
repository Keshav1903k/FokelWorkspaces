"use client";

import { motion } from "framer-motion";
import { Building2, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

export function CtaBanner() {
  return (
    <section className="w-full my-12 sm:my-16 md:my-20 bg-[#282A2E] text-white border-y border-[#1E1F22] py-8 sm:py-12 md:py-14 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 flex flex-col items-start gap-4">
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight text-white">
              Have a space worth listing?
            </h2>
            <p className="text-sm sm:text-base text-white/80 max-w-2xl leading-relaxed">
              Put your commercial property, coworking desks, or managed office floors in front of businesses actively looking for their next office.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-white/70">
              <span className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-primary" /> Verified business leads
              </span>
              <span className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" /> Higher occupancy rates
              </span>
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" /> Zero upfront listing fee
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 flex lg:justify-end">
            <Link
              href="/workspaces/list-space"
              className="w-full sm:w-auto bg-primary hover:bg-[#A93E1B] text-white px-7 py-3.5 rounded-sm text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md group cursor-pointer"
            >
              <span>List your workspace →</span>
            </Link>
          </div>

        </div>
      </div>

      <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none z-0">
        <Building2 className="w-96 h-96 -mb-16 -mr-16 text-white" />
      </div>
    </section>
  );
}
