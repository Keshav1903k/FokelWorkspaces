"use client";

import { motion } from "framer-motion";
import { AdvancedSearch } from "@/components/search/AdvancedSearch";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative bg-[#121316] pt-8 pb-16 md:pt-12 md:pb-20 border-b border-[#2E2F34] overflow-hidden text-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch">
          
          {/* Left Column: Clean Sans Headline & Search */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6 z-10">
            
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2.5"
            >
              <span className="w-6 h-px bg-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                Flexible workspaces across India
              </span>
            </motion.div>

            {/* Clean Sans Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]"
            >
              Find a workspace <br />
              that works for you.
            </motion.h1>

            {/* Supporting Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base text-[#9E9EA5] max-w-xl leading-relaxed font-normal"
            >
              Compare coworking spaces, private offices and managed workspaces across India's top business districts — all in one place.
            </motion.p>

            {/* Integrated Search Component */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="w-full mt-1"
            >
              <AdvancedSearch />
            </motion.div>

            {/* Trust Stats Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap items-center gap-8 pt-2 text-xs text-[#9E9EA5]"
            >
              <div>
                <span className="text-lg font-bold text-white block">120+</span>
                <span>Verified workspaces</span>
              </div>
              <div className="w-px h-7 bg-[#2E2F34]" />
              <div>
                <span className="text-lg font-bold text-white block">25+</span>
                <span>Cities covered</span>
              </div>
              <div className="w-px h-7 bg-[#2E2F34]" />
              <div>
                <span className="text-lg font-bold text-white block">0%</span>
                <span>Brokerage fee</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Architectural Workspace Photography Frame */}
          <div className="lg:col-span-5 relative flex flex-col h-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-full flex flex-col"
            >
              <div className="relative border border-[#2E2F34] bg-[#1C1D22] p-2.5 sm:p-3 shadow-2xl rounded-sm h-full flex flex-col">
                <div className="relative flex-1 min-h-[360px] lg:min-h-0 overflow-hidden bg-[#18191C] rounded-sm">
                  <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
                    alt="Executive office space in Cyber City Gurugram"
                    className="w-full h-full object-cover object-center filter saturate-[0.95] contrast-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  
                  {/* Photo Caption Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white flex items-end justify-between">
                    <div>
                      <span className="text-xs font-medium text-white/80 block">
                        Featured location
                      </span>
                      <p className="text-base font-semibold">
                        DLF Cyber City, Gurugram
                      </p>
                    </div>
                    <Link
                      href="/workspaces"
                      className="w-8 h-8 bg-white/20 hover:bg-white text-white hover:text-[#18191C] backdrop-blur-md rounded-sm flex items-center justify-center transition-colors"
                      aria-label="View workspace details"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
