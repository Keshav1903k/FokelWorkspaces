"use client";

import { motion } from "framer-motion";
import { WORKSPACES } from "@/constants/data";
import { MapPin, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function FeaturedOfficeSpaces() {
  const featuredMain = WORKSPACES[0];
  const supportingWorkspaces = WORKSPACES.slice(1, 4);

  return (
    <section className="py-20 bg-[#FAF8F5] border-b border-[#E3DDD3]">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-semibold text-primary block mb-1">
              Curated listings
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#18191C] tracking-tight">
              Featured spaces this week
            </h2>
          </div>
          <Link
            href="/services/workspaces"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#18191C] hover:text-primary transition-colors border-b border-[#18191C] hover:border-primary pb-0.5 self-start md:self-auto"
          >
            <span>View all workspaces</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Featured Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Featured Property Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-white border border-[#E3DDD3] rounded-sm overflow-hidden flex flex-col group shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-[#F3EFEA]">
              <img
                src={featuredMain.image}
                alt={featuredMain.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="bg-[#18191C] text-white text-xs font-medium px-2.5 py-1 rounded-sm flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Verified operator
                </span>
                <span className="bg-white/90 backdrop-blur-md text-[#18191C] text-xs font-medium px-2.5 py-1 rounded-sm">
                  {featuredMain.type}
                </span>
              </div>
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-sm border border-[#E3DDD3]">
                <span className="text-base font-bold text-[#18191C]">
                  {featuredMain.price}
                </span>
              </div>
            </div>

            <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-primary">
                    {featuredMain.city}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-[#18191C]">
                    ★ {featuredMain.rating} / 5.0
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#18191C] mb-2 group-hover:text-primary transition-colors tracking-tight">
                  {featuredMain.title}
                </h3>
                <p className="text-xs text-[#5C5D61] flex items-center gap-1.5 mb-6">
                  <MapPin className="w-3.5 h-3.5 text-primary" /> {featuredMain.location}
                </p>

                <div className="flex flex-wrap items-center gap-2 mb-6">
                  {featuredMain.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="text-xs font-medium text-[#18191C] bg-[#FAF8F5] border border-[#E3DDD3] px-2.5 py-1 rounded-sm flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-primary" /> {amenity}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E3DDD3] flex items-center justify-between">
                <span className="text-xs text-[#5C5D61]">
                  Capacity: 4–24 flexible desks
                </span>
                <Link
                  href="/services/workspaces"
                  className="bg-[#18191C] hover:bg-primary text-white px-5 py-2.5 rounded-sm text-xs font-semibold transition-colors"
                >
                  View workspace →
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Supporting Cards Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {supportingWorkspaces.map((space, idx) => (
              <motion.div
                key={space.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white border border-[#E3DDD3] rounded-sm p-4 flex gap-4 items-center group hover:border-primary transition-all shadow-sm"
              >
                <div className="w-28 h-28 sm:w-32 sm:h-32 bg-[#F3EFEA] rounded-sm overflow-hidden shrink-0 relative">
                  <img
                    src={space.image}
                    alt={space.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between h-full py-1">
                  <div>
                    <span className="text-xs font-semibold text-primary block mb-1">
                      {space.type}
                    </span>
                    <h4 className="text-base font-bold text-[#18191C] truncate group-hover:text-primary transition-colors tracking-tight">
                      {space.title}
                    </h4>
                    <p className="text-xs text-[#5C5D61] truncate flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-primary shrink-0" /> {space.location}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#E3DDD3]/80 flex items-center justify-between">
                    <span className="font-bold text-xs text-[#18191C]">{space.price}</span>
                    <Link
                      href="/services/workspaces"
                      className="text-xs font-semibold text-primary hover:underline"
                    >
                      Details →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
