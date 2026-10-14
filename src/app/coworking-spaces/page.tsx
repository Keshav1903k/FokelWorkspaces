"use client";

import { motion } from "framer-motion";
import { Users, ArrowRight, ShieldCheck, MapPin, CheckCircle2 } from "lucide-react";
import { CITY_HUBS } from "@/constants/data";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CoworkingSpacesPage() {
  const router = useRouter();

  const handleSelectCity = (cityName: string) => {
    const params = new URLSearchParams();
    params.set("city", cityName);
    params.set("type", "Coworking Space");
    params.set("scroll", "true");
    router.push(`/workspaces?${params.toString()}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5]">
      {/* Hero Section */}
      <section className="relative bg-[#121316] text-white pt-24 pb-16 md:pt-28 md:pb-20 border-b border-[#2E2F34] overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-6 h-px bg-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                Flexible Coworking Spaces
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
              Find Coworking Spaces Across India
            </h1>
            <p className="text-sm sm:text-base text-[#9E9EA5] leading-relaxed max-w-2xl">
              Choose your city to explore verified hot desks, dedicated seats, and private team suites in India's top commercial hubs. No long lock-ins or brokerage fees.
            </p>
          </div>
        </div>
      </section>

      {/* City Selector Grid */}
      <section className="py-16 bg-[#FAF8F5]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 pb-4 border-b border-[#E3DDD3]">
            <div>
              <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-1">
                Choose Location
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#18191C] tracking-tight">
                Select a City to View Spaces
              </h2>
            </div>
            <Link
              href="/workspaces?type=Coworking+Space"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-[#A93E1B] transition-colors"
            >
              <span>View all coworking spaces across India</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {CITY_HUBS.map((city, idx) => (
              <motion.div
                key={city.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => handleSelectCity(city.name)}
                className="group bg-white border border-[#E3DDD3] hover:border-primary rounded-sm overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-all cursor-pointer"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#F3EFEA]">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#18191C]/90 text-white text-[10px] font-semibold px-2.5 py-1 rounded-sm flex items-center gap-1 shadow-sm">
                      <Users className="w-3 h-3 text-primary" /> {city.coworkingCount}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-lg font-bold">{city.name}</h3>
                    <p className="text-xs text-white/80 line-clamp-1">{city.popularAreas}</p>
                  </div>
                </div>

                <div className="p-4 flex items-center justify-between border-t border-[#F3EFEA] bg-white group-hover:bg-[#FAF8F5] transition-colors">
                  <span className="text-xs font-semibold text-[#18191C] group-hover:text-primary">
                    Explore Spaces in {city.name}
                  </span>
                  <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
