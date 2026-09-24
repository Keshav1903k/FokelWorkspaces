"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Building, Users, ArrowRight, ChevronDown } from "lucide-react";
import { CITIES, WORKSPACE_TYPES } from "@/constants/data";
import { useRouter } from "next/navigation";

export function AdvancedSearch({ className = "" }: { className?: string }) {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState("Delhi NCR");
  const [selectedType, setSelectedType] = useState("Coworking Space");
  const [selectedSeats, setSelectedSeats] = useState("1–4 seats");
  const [cityOpen, setCityOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const [seatsOpen, setSeatsOpen] = useState(false);

  const TEAM_SIZES = ["1–4 seats", "5–15 seats", "16–50 seats", "50+ enterprise"];

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("city", selectedCity);
    params.set("type", selectedType);
    params.set("scroll", "true");
    router.push(`/workspaces?${params.toString()}`);
  };

  const handleQuickCitySelect = (city: string) => {
    setSelectedCity(city);
    const params = new URLSearchParams();
    params.set("city", city);
    params.set("scroll", "true");
    router.push(`/workspaces?${params.toString()}`);
  };

  return (
    <div className={`w-full relative z-40 ${className}`}>
      {/* Search Bar Container */}
      <div className="bg-white border border-[#E3DDD3] rounded-sm p-3 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 divide-y md:divide-y-0 md:divide-x divide-[#E3DDD3]">
          
          {/* City Selector */}
          <div className="relative pt-1 md:pt-0 md:pr-3">
            <label className="text-xs font-semibold text-[#5C5D61] block mb-1">
              Location
            </label>
            <button
              onClick={() => {
                setCityOpen(!cityOpen);
                setTypeOpen(false);
                setSeatsOpen(false);
              }}
              className="w-full flex items-center justify-between py-1.5 px-2 hover:bg-[#FAF8F5] transition-colors rounded-sm text-left group cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm font-semibold text-[#18191C] truncate">{selectedCity}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#5C5D61] shrink-0" />
            </button>

            <AnimatePresence>
              {cityOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setCityOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="absolute left-0 top-full mt-2 w-full min-w-[200px] bg-white border border-[#E3DDD3] rounded-sm shadow-xl z-50 p-1.5"
                  >
                    {CITIES.map((city) => (
                      <button
                        key={city}
                        onClick={() => {
                          setSelectedCity(city);
                          setCityOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs font-medium rounded-sm transition-colors text-[#18191C] ${
                          selectedCity === city ? "bg-[#F3EFEA] text-primary font-semibold" : "hover:bg-[#FAF8F5]"
                        }`}
                      >
                        {city}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Workspace Format Selector */}
          <div className="relative pt-3 md:pt-0 md:px-3">
            <label className="text-xs font-semibold text-[#5C5D61] block mb-1">
              Workspace format
            </label>
            <button
              onClick={() => {
                setTypeOpen(!typeOpen);
                setCityOpen(false);
                setSeatsOpen(false);
              }}
              className="w-full flex items-center justify-between py-1.5 px-2 hover:bg-[#FAF8F5] transition-colors rounded-sm text-left group cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Building className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm font-semibold text-[#18191C] truncate">{selectedType}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#5C5D61] shrink-0" />
            </button>

            <AnimatePresence>
              {typeOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setTypeOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="absolute left-0 top-full mt-2 w-full min-w-[210px] bg-white border border-[#E3DDD3] rounded-sm shadow-xl z-50 p-1.5"
                  >
                    {WORKSPACE_TYPES.map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setSelectedType(type);
                          setTypeOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs font-medium rounded-sm transition-colors text-[#18191C] ${
                          selectedType === type ? "bg-[#F3EFEA] text-primary font-semibold" : "hover:bg-[#FAF8F5]"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Capacity / Team Size */}
          <div className="relative pt-3 md:pt-0 md:pl-3">
            <label className="text-xs font-semibold text-[#5C5D61] block mb-1">
              Team size
            </label>
            <button
              onClick={() => {
                setSeatsOpen(!seatsOpen);
                setCityOpen(false);
                setTypeOpen(false);
              }}
              className="w-full flex items-center justify-between py-1.5 px-2 hover:bg-[#FAF8F5] transition-colors rounded-sm text-left group cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Users className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm font-semibold text-[#18191C] truncate">{selectedSeats}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#5C5D61] shrink-0" />
            </button>

            <AnimatePresence>
              {seatsOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setSeatsOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="absolute left-0 top-full mt-2 w-full min-w-[190px] bg-white border border-[#E3DDD3] rounded-sm shadow-xl z-50 p-1.5"
                  >
                    {TEAM_SIZES.map((size) => (
                      <button
                        key={size}
                        onClick={() => {
                          setSelectedSeats(size);
                          setSeatsOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs font-medium rounded-sm transition-colors text-[#18191C] ${
                          selectedSeats === size ? "bg-[#F3EFEA] text-primary font-semibold" : "hover:bg-[#FAF8F5]"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Action Bar */}
        <div className="mt-3 pt-3 border-t border-[#E3DDD3] flex items-center justify-between gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs text-[#5C5D61]">
            <span>Popular areas:</span>
            {["Gurugram", "Noida", "Bangalore", "Mumbai"].map((city) => (
              <button
                key={city}
                onClick={() => handleQuickCitySelect(city)}
                className="hover:text-primary transition-colors cursor-pointer font-medium underline underline-offset-2"
              >
                {city}
              </button>
            ))}
          </div>

          <button
            onClick={handleSearch}
            className="w-full sm:w-auto bg-primary hover:bg-[#A93E1B] text-white px-6 py-2.5 rounded-sm text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm group ml-auto cursor-pointer"
          >
            <span>Explore spaces</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
