"use client";

import { motion } from "framer-motion";
import { WORKSPACES } from "@/constants/data";
import { MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

export function FeaturedOfficeSpaces() {
  const featuredSpaces = WORKSPACES.slice(0, 4);

  return (
    <section className="py-16 bg-[#FAF8F5] border-b border-[#E3DDD3]">
      <div className="container mx-auto px-6 max-w-7xl xl:max-w-[1380px] 2xl:max-w-[1480px]">
        
        {/* Trust Stats Bar - Centered at the top of the section */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 md:gap-24 mb-14 pb-12 border-b border-[#E3DDD3] text-center">
          <div>
            <span className="text-2xl sm:text-3xl font-bold text-[#18191C] block tracking-tight">120+</span>
            <span className="text-xs sm:text-sm text-[#6E6E73] font-medium mt-1 block">Verified workspaces</span>
          </div>
          <div className="hidden sm:block w-px h-8 bg-[#E3DDD3]" />
          <div>
            <span className="text-2xl sm:text-3xl font-bold text-[#18191C] block tracking-tight">25+</span>
            <span className="text-xs sm:text-sm text-[#6E6E73] font-medium mt-1 block">Cities covered</span>
          </div>
          <div className="hidden sm:block w-px h-8 bg-[#E3DDD3]" />
          <div>
            <span className="text-2xl sm:text-3xl font-bold text-[#18191C] block tracking-tight">0%</span>
            <span className="text-xs sm:text-sm text-[#6E6E73] font-medium mt-1 block">Brokerage fee</span>
          </div>
        </div>

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
              <Link href={`/workspaces/${space.id}`} className="relative aspect-[16/10] overflow-hidden bg-[#F3EFEA] shrink-0 block">
                <img
                  src={space.image}
                  alt={space.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </Link>

              {/* Compact Card Body */}
              <div className="p-4 flex flex-col justify-between flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-base font-bold text-[#18191C] group-hover:text-primary transition-colors tracking-tight line-clamp-1">
                      <Link href={`/workspaces/${space.id}`}>
                        {space.title}
                      </Link>
                    </h3>
                    <div className="flex items-center gap-0.5 text-[11px] font-bold text-[#18191C] shrink-0 pt-0.5">
                      ★ {space.rating}
                    </div>
                  </div>
                  
                  <p className="text-[11px] text-[#5C5D61] flex items-center gap-1 line-clamp-1">
                    <MapPin className="w-3 h-3 text-primary shrink-0" /> {space.location}
                  </p>

                {/* Card Footer */}
                <div className="pt-3 mt-4 border-t border-[#E3DDD3] flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold text-[#18191C]">
                    {space.price}
                  </span>
                  <Link
                    href={`/workspaces/${space.id}`}
                    className="bg-[#18191C] hover:bg-primary text-white px-3 py-1.5 rounded-sm text-[11px] font-semibold transition-colors flex items-center gap-1"
                  >
                    <span>View details →</span>
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
