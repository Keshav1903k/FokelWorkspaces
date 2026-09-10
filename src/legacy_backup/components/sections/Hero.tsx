"use client";

import { motion } from "framer-motion";
import { AdvancedSearch } from "@/components/search/AdvancedSearch";

export function Hero() {

  return (
    <div className="relative w-full">
      {/* Hero Banner Section */}
      <section
        id="home"
        className="relative z-20 h-[75vh] min-h-[520px] md:h-[80vh] flex items-center justify-center overflow-visible bg-slate-950 pt-[120px] -mt-[88px]"
      >
        {/* Background Video with Dark Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-45 select-none"
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/65 via-slate-950/30 to-slate-950/80" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-6 max-w-5xl text-center flex flex-col items-center gap-6">

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl sm:text-2xl md:text-3xl font-semibold text-white tracking-tight leading-snug max-w-3xl"
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
