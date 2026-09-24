"use client";

import { motion } from "framer-motion";
import { Building2, Search, SlidersHorizontal, CheckSquare, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

interface StepItem {
  number: string;
  title: string;
  subtitle: string;
  icon: any;
}

const AGGREGATOR_FLOW: StepItem[] = [
  {
    number: "01",
    title: "Multiple operators",
    subtitle: "WeWork, Awfis, Indiqube, Smartworks and independent building owners.",
    icon: Building2
  },
  {
    number: "02",
    title: "Unified search",
    subtitle: "Real-time pricing, seat availability, metro proximity and amenities.",
    icon: Search
  },
  {
    number: "03",
    title: "Compare options",
    subtitle: "Compare price per seat, lock-in terms, and included services side-by-side.",
    icon: SlidersHorizontal
  },
  {
    number: "04",
    title: "Shortlist spaces",
    subtitle: "Filter by exact headcount, budget, and business district preference.",
    icon: CheckSquare
  },
  {
    number: "05",
    title: "Schedule a tour",
    subtitle: "Book physical or virtual walkthroughs directly with zero brokerage fee.",
    icon: Calendar
  }
];

export function WhyChooseFokel() {
  return (
    <section className="py-24 bg-[#F3EFEA] border-b border-[#E3DDD3]">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold text-primary block mb-1">
            Why Fokel
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#18191C] tracking-tight mb-4">
            One search. Many workspaces.
          </h2>
          <p className="text-sm sm:text-base text-[#5C5D61] leading-relaxed">
            Instead of visiting dozens of operator sites, Fokel brings workspaces into one simple marketplace so you can compare options easily before deciding.
          </p>
        </div>

        {/* Workflow Steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {AGGREGATOR_FLOW.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white border border-[#E3DDD3] rounded-sm p-5 flex flex-col justify-between relative group hover:border-primary transition-all shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-primary">
                      {step.number}
                    </span>
                    <div className="w-8 h-8 rounded-sm bg-[#FAF8F5] border border-[#E3DDD3] flex items-center justify-center text-[#18191C] group-hover:bg-primary group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-[#18191C] mb-1.5 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#5C5D61] leading-relaxed">
                    {step.subtitle}
                  </p>
                </div>

                {idx < AGGREGATOR_FLOW.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 bg-white border border-[#E3DDD3] rounded-full p-1 text-primary">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/workspaces"
            className="inline-flex items-center gap-2 bg-[#18191C] hover:bg-primary text-white px-7 py-3 rounded-sm text-xs font-semibold transition-colors shadow-sm"
          >
            <span>Compare spaces</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
