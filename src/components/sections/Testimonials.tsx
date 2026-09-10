"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export function Testimonials() {
  return (
    <section className="py-24 bg-[#FAF8F5] border-b border-[#E3DDD3]">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        
        <span className="text-xs font-semibold text-primary block mb-4">
          Customer feedback
        </span>

        <Quote className="w-8 h-8 text-primary mx-auto mb-6 opacity-40" />

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl font-bold text-[#18191C] leading-snug tracking-tight max-w-3xl mx-auto mb-6"
        >
          “We evaluated six spaces in Gurugram before deciding. Fokel made shortlisting much easier.”
        </motion.blockquote>

        <div className="flex flex-col items-center gap-0.5 text-xs">
          <span className="font-bold text-[#18191C] text-sm">
            Rohan Sharma
          </span>
          <span className="text-[#5C5D61]">
            Co-Founder & VP Operations · ZetaTech Labs
          </span>
        </div>

      </div>
    </section>
  );
}
