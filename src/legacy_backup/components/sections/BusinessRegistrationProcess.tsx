"use client";

import { motion } from "framer-motion";
import { TIMELINE_STEPS } from "@/constants/data";

export function BusinessRegistrationProcess() {
  return (
    <section id="process" className="py-28 bg-slate-50/50 border-y border-border relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[300px] bg-primary/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 tracking-tight"
          >
            How to Set Up Your{" "}
            <span className="text-primary">
              Business
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto"
          >
            Get operational or compliant in 6 simple steps. Our team and digital platform manage the documentation and government liaising from start to finish.
          </motion.p>
        </div>

        {/* Timeline Grid */}
        <div className="relative">
          
          {/* Horizontal Line connector (Desktop only) */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-border -translate-y-12 hidden lg:block z-0" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-primary via-blue-500 to-cyan-400 -translate-y-12 hidden lg:block z-0 origin-left"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative z-10">
            {TIMELINE_STEPS.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                
                {/* Stepper Node Container */}
                <div className="relative mb-6">
                  {/* Outer circle glow on hover */}
                  <div className="absolute -inset-2 bg-primary/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Core Number circle */}
                  <div className="relative w-20 h-20 rounded-full border-2 border-border bg-white flex items-center justify-center text-2xl font-bold font-heading text-muted-foreground group-hover:border-primary group-hover:text-primary transition-all duration-300 shadow-[var(--shadow-card)]">
                    {step.number}
                  </div>
                </div>

                <h3 className="text-base font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed max-w-[180px] mx-auto">
                  {step.description}
                </p>

              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
