"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface CityCardItem {
  id: string;
  name: string;
  image: string;
}

const CITY_LISTINGS: CityCardItem[] = [
  {
    id: "bangalore",
    name: "Bangalore",
    image: "https://images.unsplash.com/photo-1709967884183-7ffa9d168508?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzg2MDk5MTI2fA&ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "mumbai",
    name: "Mumbai",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "delhi-ncr",
    name: "Delhi NCR",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "hyderabad",
    name: "Hyderabad",
    image: "/images/hyderabad.jpg"
  },
  {
    id: "pune",
    name: "Pune",
    image: "/images/pune.jpg"
  },
  {
    id: "chennai",
    name: "Chennai",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "kolkata",
    name: "Kolkata",
    image: "https://images.unsplash.com/photo-1536421469767-80559bb6f5e1?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzg2MDk5MjkzfA&ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=800"
  }
];

export function CityExplorer() {
  return (
    <section className="py-24 bg-[#FAF8F5] border-b border-[#E3DDD3]">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-semibold text-primary block mb-1">
              Locations
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#18191C] tracking-tight">
              Where business happens
            </h2>
          </div>
          <p className="text-xs text-[#5C5D61] max-w-md">
            Explore workspace listings across India's key economic corridors and commercial hubs.
          </p>
        </div>

        {/* City Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CITY_LISTINGS.map((city, idx) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <Link
                href={`/workspaces?city=${encodeURIComponent(city.name)}`}
                className="group block bg-white border border-[#E3DDD3] rounded-sm overflow-hidden hover:border-primary transition-all shadow-sm"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#F3EFEA]">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter saturate-[0.95]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-md text-[#18191C] text-xs font-semibold px-2.5 py-1 rounded-sm shadow-xs">
                      {city.name}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3">
                    <div className="w-8 h-8 rounded-sm bg-white/20 group-hover:bg-primary text-white flex items-center justify-center transition-colors backdrop-blur-xs">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="p-3.5 bg-white border-t border-[#E3DDD3] flex items-center justify-end text-xs text-[#18191C]">
                  <span className="text-primary font-semibold group-hover:underline">Explore location →</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
