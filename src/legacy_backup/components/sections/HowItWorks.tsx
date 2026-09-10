"use client";

import { motion } from "framer-motion";
import { Search, Filter, Rocket } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    title: "1. Search & Discover",
    desc: "Enter your use case or browse through 100+ categories to find the tools that match your exact needs.",
    color: "from-blue-500 to-primary",
    iconBg: "bg-blue-50 border-blue-100 text-blue-600",
    glowColor: "rgba(79,125,248,0.12)",
  },
  {
    icon: Filter,
    title: "2. Compare & Evaluate",
    desc: "Review features, pricing, and authentic user reviews to narrow down your choices to the best fit.",
    color: "from-primary to-cyan-400",
    iconBg: "bg-cyan-50 border-cyan-100 text-cyan-600",
    glowColor: "rgba(34,199,247,0.12)",
  },
  {
    icon: Rocket,
    title: "3. Integrate & Launch",
    desc: "Connect the tool to your workflow and start supercharging your productivity immediately.",
    color: "from-cyan-400 to-emerald-400",
    iconBg: "bg-emerald-50 border-emerald-100 text-emerald-600",
    glowColor: "rgba(25,179,107,0.12)",
  }
];

export function HowItWorks() {
  return (
    <section className="py-32 bg-background border-t border-border relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-bold text-foreground tracking-tight"
          >
            How it Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto"
          >
            Your journey to finding the perfect AI tool, simplified into three easy steps.
          </motion.p>
        </div>

        <div className="relative">
          {/* Animated Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[60px] left-[10%] right-[10%] h-[2px] bg-border">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-cyan-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative flex flex-col items-center text-center">
                  {/* Step Node */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.3 }}
                    className="w-32 h-32 rounded-full bg-background border-4 border-background flex items-center justify-center relative z-10 mb-8"
                    style={{ boxShadow: `0 0 40px ${step.glowColor}` }}
                  >
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.color} opacity-10 animate-pulse`} />
                    <div className={`w-24 h-24 rounded-full border flex items-center justify-center relative z-10 ${step.iconBg}`}>
                      <Icon className="w-10 h-10" />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.3 }}
                  >
                    <h3 className="text-2xl font-bold text-foreground mb-4">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.desc}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
