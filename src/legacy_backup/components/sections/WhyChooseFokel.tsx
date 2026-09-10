"use client";

import { motion } from "framer-motion";
import { Search, SlidersHorizontal, ShieldCheck, Zap, Star, BookmarkPlus, FolderHeart, Rocket } from "lucide-react";

const FEATURES = [
  { icon: Search, title: "Search every AI", desc: "Instantly search across thousands of AI tools with semantic understanding.", color: "text-blue-600 bg-blue-50 border-blue-100" },
  { icon: SlidersHorizontal, title: "Compare tools", desc: "Side-by-side comparisons of pricing, features, and capabilities.", color: "text-violet-600 bg-violet-50 border-violet-100" },
  { icon: ShieldCheck, title: "Verified listings", desc: "Every tool is manually vetted and verified by our expert team.", color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
  { icon: Zap, title: "Smart recommendations", desc: "AI-powered suggestions based on your specific use case.", color: "text-amber-600 bg-amber-50 border-amber-100" },
  { icon: Star, title: "Honest Reviews", desc: "Read authentic reviews from actual users and professionals.", color: "text-yellow-600 bg-yellow-50 border-yellow-100" },
  { icon: BookmarkPlus, title: "Save & Bookmark", desc: "Keep track of interesting tools and build your personal stack.", color: "text-pink-600 bg-pink-50 border-pink-100" },
  { icon: FolderHeart, title: "Curated Collections", desc: "Explore handpicked lists of tools for specific industries.", color: "text-rose-600 bg-rose-50 border-rose-100" },
  { icon: Rocket, title: "Blazing Fast", desc: "Built for speed. Find what you need without waiting.", color: "text-cyan-600 bg-cyan-50 border-cyan-100" },
];

export function WhyChooseFokel() {
  return (
    <section className="py-24 relative overflow-hidden bg-secondary border-t border-border">
      {/* Subtle abstract gradient */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/4 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-bold text-foreground tracking-tight"
          >
            Why Choose Fokel?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto"
          >
            The most comprehensive and powerful platform for discovering artificial intelligence.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative p-8 rounded-3xl bg-card border border-border hover:border-primary/30 hover:shadow-[var(--shadow-card)] transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none" />

                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform ${feature.color}`}>
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-3 relative z-10">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed relative z-10">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
