"use client";

import { motion } from "framer-motion";
import { WORKSPACES } from "@/constants/data";
import { MapPin, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function FeaturedOfficeSpaces() {
  const featuredSpaces = WORKSPACES.slice(0, 4);

  return (
    <section className="py-16 bg-[#FAF8F5] border-b border-[#E3DDD3]">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-xs font-semibold text-primary block mb-1 uppercase tracking-wider">
              Curated listings
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#18191C] tracking-tight">
              Featured spaces this week
            </h2>
          </div>
          <Link
            href="/workspaces"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#18191C] hover:text-primary transition-colors border-b border-[#18191C] hover:border-primary pb-0.5 self-start md:self-auto"
          >
            <span>View all workspaces</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4 Cards Grid - 4 Columns across desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {featuredSpaces.map((space, idx) => (
            <motion.div
              key={space.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-white border border-[#E3DDD3] rounded-sm overflow-hidden flex flex-col justify-between group shadow-sm hover:shadow-md hover:border-primary transition-all h-full"
            >
              {/* Identical Compact Image Frame */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#F3EFEA] shrink-0">
                <img
                  src={space.image}
                  alt={space.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="bg-[#18191C] text-white text-[9px] font-medium px-2 py-0.5 rounded-sm flex items-center gap-1 shadow-sm">
                    <ShieldCheck className="w-3 h-3 text-primary" /> Verified
                  </span>
                  <span className="bg-white/95 backdrop-blur-md text-[#18191C] text-[9px] font-medium px-2 py-0.5 rounded-sm shadow-sm border border-[#E3DDD3]/50">
                    {space.type}
                  </span>
                </div>
                <div className="absolute bottom-2.5 right-2.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-sm border border-[#E3DDD3] shadow-sm">
                  <span className="text-xs font-bold text-[#18191C]">
                    {space.price}
                  </span>
                </div>
              </div>

              {/* Compact Card Body */}
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-semibold text-primary">
                      {space.city}
                    </span>
                    <div className="flex items-center gap-0.5 text-[11px] font-bold text-[#18191C]">
                      ★ {space.rating}
                    </div>
                  </div>
                  
                  <h3 className="text-base font-bold text-[#18191C] mb-1 group-hover:text-primary transition-colors tracking-tight line-clamp-1">
                    {space.title}
                  </h3>
                  
                  <p className="text-[11px] text-[#5C5D61] flex items-center gap-1 mb-3 line-clamp-1">
                    <MapPin className="w-3 h-3 text-primary shrink-0" /> {space.location}
                  </p>

                  <div className="flex flex-wrap items-center gap-1 mb-4">
                    {space.amenities.slice(0, 2).map((amenity) => (
                      <span
                        key={amenity}
                        className="text-[10px] font-medium text-[#18191C] bg-[#FAF8F5] border border-[#E3DDD3] px-2 py-0.5 rounded-sm flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-2.5 h-2.5 text-primary shrink-0" /> {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-3 border-t border-[#E3DDD3] flex items-center justify-between mt-auto">
                  <span className="text-[11px] text-[#5C5D61]">
                    Flexible
                  </span>
                  <Link
                    href={`/workspaces/${space.id}`}
                    className="bg-[#18191C] hover:bg-primary text-white px-3 py-1.5 rounded-sm text-[11px] font-semibold transition-colors flex items-center gap-1"
                  >
                    <span>View →</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
