"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CtaBanner() {
  const handleOpenModal = () => {
    window.dispatchEvent(new Event("open-welcome-modal"));
  };

  return (
    <section id="contact" className="py-24 bg-white border-t border-slate-100">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl bg-[#485A71] p-10 md:p-14 shadow-[0_12px_40px_rgba(72,90,113,0.15)] border border-white/5"
        >
          {/* Decorative Background Elements */}
          <div className="absolute -top-16 -right-16 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-[#76A1C1]/20 rounded-full blur-3xl pointer-events-none" />

          {/* Centered Content Container */}
          <div className="relative z-10 flex flex-col items-center text-center gap-5 max-w-3xl mx-auto">
            
            <h2 className="text-2xl md:text-4xl font-semibold text-white tracking-tight leading-tight">
              Ready to scale your business infrastructure?
            </h2>

            <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-xl mx-auto">
              Get an instant premium address, high-speed coworking desk, or custom private suite tailored to your operations. Speak to our workspace consultants today.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full sm:w-auto justify-center">
              <button
                onClick={handleOpenModal}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white text-[#485A71] font-bold hover:bg-slate-50 transition-colors shadow-sm cursor-pointer text-xs"
              >
                Book Free Consultation <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <a
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white/10 text-white font-semibold hover:bg-white/15 border border-white/10 transition-colors text-xs"
              >
                Explore Locations
              </a>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
