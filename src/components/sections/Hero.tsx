"use client";

import { motion } from "framer-motion";
import { AdvancedSearch } from "@/components/search/AdvancedSearch";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative bg-[#FAF8F5] pt-8 pb-16 md:pt-12 md:pb-20 border-b border-[#E3DDD3] overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
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
              <span className="text-xs font-semibold text-primary">
                Flexible workspaces across India
              </span>
            </motion.div>

            {/* Clean Sans Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#18191C] leading-[1.12]"
            >
              Find a workspace <br />
              that works for you.
            </motion.h1>

            {/* Supporting Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base text-[#5C5D61] max-w-xl leading-relaxed font-normal"
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
              className="flex flex-wrap items-center gap-8 pt-2 text-xs text-[#5C5D61]"
            >
              <div>
                <span className="text-lg font-bold text-[#18191C] block">120+</span>
                <span>Verified workspaces</span>
              </div>
              <div className="w-px h-7 bg-[#E3DDD3]" />
              <div>
                <span className="text-lg font-bold text-[#18191C] block">25+</span>
                <span>Cities covered</span>
              </div>
              <div className="w-px h-7 bg-[#E3DDD3]" />
              <div>
                <span className="text-lg font-bold text-[#18191C] block">0%</span>
                <span>Brokerage fee</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Architectural Workspace Photography Frame */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative border border-[#E3DDD3] bg-white p-3 shadow-lg rounded-sm">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#F3EFEA] rounded-sm">
                  <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
                    alt="Executive office space in Cyber City Gurugram"
                    className="w-full h-full object-cover object-center filter saturate-[0.95] contrast-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
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
                      href="/services/workspaces"
                      className="w-8 h-8 bg-white/20 hover:bg-white text-white hover:text-[#18191C] backdrop-blur-md rounded-sm flex items-center justify-center transition-colors"
                      aria-label="View workspace details"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-[#E3DDD3] flex items-center justify-between text-xs text-[#5C5D61]">
                  <span className="font-semibold text-[#18191C]">Managed private suite</span>
                  <span className="text-primary font-bold">From ₹18,500 / seat</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
