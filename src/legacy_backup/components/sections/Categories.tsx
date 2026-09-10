"use client";

import { motion } from "framer-motion";
import { CATEGORIES } from "@/constants/data";
import { PenTool, Code, Video, Image as ImageIcon, TrendingUp, Database, CheckCircle, PenTool as Design, DollarSign, Mic, Zap, Headphones } from "lucide-react";
import Link from "next/link";

const iconMap = [
  PenTool, Code, Video, ImageIcon, TrendingUp, Database,
  CheckCircle, Design, DollarSign, Mic, Zap, Headphones
];

const iconColors = [
  "text-violet-500 bg-violet-50 border-violet-100",
  "text-blue-500 bg-blue-50 border-blue-100",
  "text-rose-500 bg-rose-50 border-rose-100",
  "text-pink-500 bg-pink-50 border-pink-100",
  "text-green-500 bg-green-50 border-green-100",
  "text-cyan-500 bg-cyan-50 border-cyan-100",
  "text-emerald-500 bg-emerald-50 border-emerald-100",
  "text-indigo-500 bg-indigo-50 border-indigo-100",
  "text-amber-500 bg-amber-50 border-amber-100",
  "text-orange-500 bg-orange-50 border-orange-100",
  "text-yellow-500 bg-yellow-50 border-yellow-100",
  "text-teal-500 bg-teal-50 border-teal-100",
];

export function Categories() {
  return (
    <section className="py-24 border-t border-border bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-heading font-bold text-foreground tracking-tight"
          >
            Explore by Category
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto"
          >
            Find exactly what you need across 100+ categories. From coding assistants to generative art, we&apos;ve organized the AI universe.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {CATEGORIES.map((category, index) => {
            const Icon = iconMap[index % iconMap.length];
            const color = iconColors[index % iconColors.length];
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link
                  href={`/categories/${category.toLowerCase()}`}
                  className="group flex flex-col items-center justify-center p-8 rounded-3xl bg-card border border-border hover:border-primary/40 hover:shadow-[var(--shadow-card)] transition-all duration-300"
                >
                  <div className={`w-16 h-16 rounded-full border flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 shadow-sm ${color}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-foreground font-medium text-lg">{category}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{50 + (index * 13 % 150)} tools</p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
