"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Star, ShieldCheck, MapPin } from "lucide-react";
import { AdvancedSearch } from "@/components/search/AdvancedSearch";
import gsap from "gsap";

export function Hero() {
  const handleConsultClick = () => {
    window.dispatchEvent(new Event("open-welcome-modal"));
  };

  return (
    <div className="relative w-full">
      {/* Hero Banner Section */}
      <section
        id="home"
        className="relative z-20 h-[75vh] min-h-[520px] md:h-[80vh] flex items-center justify-center overflow-visible bg-slate-950 pt-[120px] -mt-[88px]"
      >
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600"
            alt="Fokel Premium Workspace Banner"
            className="w-full h-full object-cover opacity-35 select-none"
            draggable="false"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/50 to-slate-950/90" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-6 max-w-5xl text-center flex flex-col items-center gap-6">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-semibold tracking-wider uppercase text-white/80"
          >
            <span>Premium Office Infrastructure</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight leading-snug max-w-3xl"
          >
            Premium Workspaces & Business Infrastructure{" "}
            <span className="text-sky-300 block mt-1.5 font-medium">
              Made Simple
            </span>
          </motion.h1>

          {/* Search component centered on the hero image below the headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full max-w-4xl mt-2"
          >
            <AdvancedSearch />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
