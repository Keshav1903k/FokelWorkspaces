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

          {/* Grid Container */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Form Trigger & Texts */}
            <div className="lg:col-span-7 flex flex-col gap-5 text-left items-start">
              <div className="flex items-center gap-2 px-3 py-1 rounded bg-white/10 border border-white/10 text-[10px] font-bold tracking-wider uppercase text-white">
                Book your space in minutes
              </div>

              <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight leading-tight">
                Ready to scale your business infrastructure?
              </h2>

              <p className="text-xs text-white/80 leading-relaxed max-w-lg">
                Get an instant premium address, high-speed coworking desk, or custom private suite tailored to your operations. Speak to our workspace consultants today.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-2 w-full sm:w-auto">
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

            {/* Right Column: Visual Workspace Facade Image */}
            <div className="lg:col-span-5 w-full flex justify-center">
              <div className="relative w-full max-w-lg aspect-[4/3] rounded-lg overflow-hidden border border-white/10 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=600"
                  alt="Corporate Workspace Tour"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent pointer-events-none" />

              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
