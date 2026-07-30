"use client";

import { motion } from "framer-motion";
import { GALLERY_ITEMS } from "@/constants/data";

export function WorkspaceGallery() {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-semibold text-slate-800 mb-4 tracking-tight"
          >
            Explore Our{" "}
            <span className="text-primary">
              Workspaces
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed"
          >
            A sneak peek into our thoughtfully designed, distraction-free environments crafted to maximize enterprise output.
          </motion.p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {GALLERY_ITEMS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-slate-50 border border-slate-100 shadow-sm cursor-pointer"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
              />

              {/* Glassmorphic Overlay (Visible on Hover / Mobile persistent) */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-6 md:p-8">
                <div
                  className="translate-y-2 group-hover:translate-y-0 transition-transform duration-200"
                >
                  <h3 className="text-base font-semibold text-white mb-1.5">{item.title}</h3>
                  <p className="text-white/80 text-xs leading-relaxed">{item.description}</p>
                </div>
              </div>

              {/* Subtle persistent Title at the bottom (for fallback) */}
              <div className="absolute bottom-4 left-4 bg-white/95 px-4 py-2 rounded-lg border border-slate-100 group-hover:opacity-0 transition-opacity duration-200 shadow-sm">
                <span className="text-[10px] font-bold text-slate-700">{item.title}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
