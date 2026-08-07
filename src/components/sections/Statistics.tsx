"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";


const STATS = [
  { value: 15000, label: "Businesses Served", suffix: "+", color: "from-primary to-primary-hover" },
  { value: 25, label: "Cities Covered", suffix: "+", color: "from-primary to-accent" },
  { value: 120, label: "Office Spaces", suffix: "+", color: "from-primary to-primary-hover" },
  { value: 8000, label: "Registrations", suffix: "+", color: "from-primary to-accent" },
];

function Counter({ from, to, suffix }: { from: number, to: number, suffix: string }) {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  useEffect(() => {
    if (inView) {
      let startTimestamp: number;
      const duration = 2000;

      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeProgress * (to - from) + from));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    }
  }, [inView, from, to]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function Statistics() {
  return (
    <section className="py-24 bg-background-alt border-y border-slate-200/50 relative">

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Title Block & Metrics Cards Grid */}
          <div className="lg:col-span-6 flex flex-col gap-8 order-first lg:order-last">
            <div className="text-left">

              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 leading-snug">
                Designed to Support Enterprise Growth
              </h2>
              <p className="text-para-gray text-xs leading-relaxed max-w-lg">
                Fokel streamlines the complexity of physical expansion. Manage Grade-A cabins, hot desks, conference rooms, and business virtual address legal registrations from a centralized portal.
              </p>
            </div>
 
            {/* Staggered 2x2 Grid */}
            <div className="grid grid-cols-2 gap-8 w-full">
              {STATS.map((stat, index) => (
                <motion.div
                   key={stat.label}
                   initial={{ opacity: 0, y: 15 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: index * 0.08 }}
                   className="flex flex-col items-start"
                >
                  <div className="text-3xl font-bold text-primary mb-1">
                    <Counter from={0} to={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-[9px] text-label-gray font-bold uppercase tracking-wider">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
 
          {/* Right Column: Premium Lobby Lounge Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 w-full flex justify-center order-last lg:order-first"
          >
            <div className="relative w-full max-w-md aspect-[16/10] sm:aspect-[16/9] lg:aspect-square rounded-xl overflow-hidden border border-[#2a4542] shadow-sm group">
              <img
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800"
                alt="Fokel Premium Workspace Lounge"
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent pointer-events-none" />

            </div>
          </motion.div>
 
        </div>
      </div>
    </section>
  );
}
