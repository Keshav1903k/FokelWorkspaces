"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/constants/data";

export function Testimonials() {
  // Duplicate array to ensure seamless infinite looping animation from right to left
  const duplicatedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="py-24 bg-[#FAF8F5] border-b border-[#E3DDD3] overflow-hidden relative">
      <div className="container mx-auto px-6 max-w-7xl mb-12 text-center">
        <span className="text-xs font-semibold text-primary block mb-2 tracking-wide uppercase">
          Customer Feedback
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#18191C] tracking-tight">
          Loved by founders & operational leaders
        </h2>
        <p className="text-sm text-[#5C5D61] mt-3 max-w-xl mx-auto">
          Here is what corporate team leads and growing startups say about sourcing their workspace through Fokel.
        </p>
      </div>

      {/* Infinite Scroll Container with Edge Fades */}
      <div className="relative w-full overflow-hidden">
        {/* Left & Right Gradient Fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#FAF8F5] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#FAF8F5] to-transparent z-10" />

        {/* Marquee Track */}
        <div className="flex w-max">
          <motion.div
            className="flex gap-6 pr-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 35,
                ease: "linear",
              },
            }}
          >
            {duplicatedTestimonials.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="w-[320px] sm:w-[400px] bg-white border border-[#E3DDD3] rounded-lg p-6 flex flex-col justify-between shadow-xs hover:border-primary/50 transition-colors shrink-0 group"
              >
                <div>
                  <div className="flex items-center justify-end mb-4">
                    <Quote className="w-5 h-5 text-primary/30 group-hover:text-primary transition-colors" />
                  </div>

                  <p className="text-sm text-[#18191C] leading-relaxed mb-6 font-normal">
                    “{item.text}”
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-[#E3DDD3]/60">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#E3DDD3]"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#18191C] leading-none">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[#5C5D61] mt-1">
                      {item.role} · <span className="font-medium text-[#18191C]">{item.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
