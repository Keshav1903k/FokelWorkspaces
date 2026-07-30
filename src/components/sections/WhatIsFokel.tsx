"use client";

import { motion } from "framer-motion";
import { Search, ShieldCheck, Zap, BarChart3, BookmarkPlus, Globe } from "lucide-react";

const BENTO = [
  {
    icon: Search,
    title: "Semantic Discovery",
    desc: "Describe your problem in plain English. Our AI maps it to the perfect tool instantly.",
    colSpan: "md:col-span-2",
    tall: false,
    accent: "from-blue-500/8 via-transparent to-transparent",
    iconBg: "bg-blue-50 border-blue-100 text-blue-600",
  },
  {
    icon: ShieldCheck,
    title: "Verified Listings",
    desc: "Every tool is hand-verified by our team before going live.",
    colSpan: "md:col-span-1",
    tall: false,
    accent: "from-emerald-500/8 via-transparent to-transparent",
    iconBg: "bg-emerald-50 border-emerald-100 text-emerald-600",
  },
  {
    icon: BarChart3,
    title: "Side-by-Side Comparisons",
    desc: "Stack any two tools and compare pricing, features, and real reviews at a glance.",
    colSpan: "md:col-span-1",
    tall: true,
    accent: "from-violet-500/8 via-transparent to-transparent",
    iconBg: "bg-violet-50 border-violet-100 text-violet-600",
  },
  {
    icon: Zap,
    title: "Smart Recommendations",
    desc: "Get personalised tool suggestions based on your role, stack, and goals.",
    colSpan: "md:col-span-1",
    tall: true,
    accent: "from-amber-500/8 via-transparent to-transparent",
    iconBg: "bg-amber-50 border-amber-100 text-amber-600",
  },
  {
    icon: BookmarkPlus,
    title: "Build Your Stack",
    desc: "Bookmark favourites and curate your personal AI toolkit in one place.",
    colSpan: "md:col-span-1",
    tall: false,
    accent: "from-pink-500/8 via-transparent to-transparent",
    iconBg: "bg-pink-50 border-pink-100 text-pink-600",
  },
  {
    icon: Globe,
    title: "Global Coverage",
    desc: "Tools from 50+ countries, reviewed in English and localised for Indian markets.",
    colSpan: "md:col-span-2",
    tall: false,
    accent: "from-cyan-500/8 via-transparent to-transparent",
    iconBg: "bg-cyan-50 border-cyan-100 text-cyan-600",
  },
];

export function WhatIsFokel() {
  return (
    <section className="py-28 bg-secondary border-t border-border">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-semibold text-sm uppercase tracking-widest mb-4"
          >
            Why Fokel
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold text-foreground leading-tight"
          >
            Everything you need to navigate the AI universe.
          </motion.h2>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {BENTO.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className={`group relative overflow-hidden rounded-3xl bg-card border border-border p-8 flex flex-col gap-4 cursor-default ${item.colSpan} ${item.tall ? "md:row-span-2" : ""} transition-all duration-300 hover:border-primary/30 hover:shadow-[var(--shadow-card)]`}
              >
                {/* Gradient shimmer */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div className="relative z-10 flex flex-col gap-4 flex-1">
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-300 ${item.iconBg}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
