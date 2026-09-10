"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, Layers } from "lucide-react";
import Link from "next/link";

export function ForBusinesses() {
  return (
    <section className="py-24 bg-[#151619] text-[#FAF8F5] relative overflow-hidden border-b border-[#282A2E]">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Pitch */}
          <div className="lg:col-span-6 flex flex-col items-start gap-6">
            <span className="text-xs font-semibold text-primary">
              Enterprise teams
            </span>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white tracking-tight">
              Growing team? <br />
              <span className="text-primary font-bold">Your office doesn't have to be permanent.</span>
            </h2>

            <p className="text-base text-white/75 leading-relaxed">
              Scale from a 10-person cabin to a full custom-built corporate floor without committing to 9-year commercial leases or heavy buildout costs.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full my-2">
              <div className="p-4 border border-[#282A2E] bg-[#1C1D22] rounded-sm">
                <Layers className="w-5 h-5 text-primary mb-2" />
                <h4 className="text-base font-bold text-white mb-1">Tailored branding</h4>
                <p className="text-xs text-white/60">Custom executive suites with your company branding and biometric access control.</p>
              </div>

              <div className="p-4 border border-[#282A2E] bg-[#1C1D22] rounded-sm">
                <Shield className="w-5 h-5 text-primary mb-2" />
                <h4 className="text-base font-bold text-white mb-1">Single contract</h4>
                <p className="text-xs text-white/60">One consolidated monthly invoice for rent, utilities, IT infrastructure and housekeeping.</p>
              </div>
            </div>

            <Link
              href="/business-registration"
              className="bg-primary hover:bg-[#A93E1B] text-white px-7 py-3 rounded-sm text-xs font-semibold flex items-center gap-2 transition-all shadow-sm group cursor-pointer"
            >
              <span>Explore managed spaces</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right Column: Image */}
          <div className="lg:col-span-6">
            <div className="border border-[#282A2E] p-3 bg-[#1C1D22] rounded-sm">
              <div className="relative aspect-[16/11] overflow-hidden bg-black rounded-sm">
                <img
                  src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200"
                  alt="Enterprise managed office suite"
                  className="w-full h-full object-cover filter saturate-[0.9] contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white flex justify-between items-end">
                  <div>
                    <span className="text-xs text-primary font-medium block">
                      Case study
                    </span>
                    <p className="text-lg font-bold">
                      500-seat managed HQ in BKC, Mumbai
                    </p>
                  </div>
                  <span className="text-xs text-white/80 font-mono">Delivered in 21 days</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
