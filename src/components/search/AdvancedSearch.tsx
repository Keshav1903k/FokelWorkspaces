"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Building, ArrowRight, ChevronDown } from "lucide-react";
import { CITIES, WORKSPACE_TYPES } from "@/constants/data";
import { useRouter } from "next/navigation";

export function AdvancedSearch({ className = "" }: { className?: string }) {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState("Delhi NCR");
  const [selectedType, setSelectedType] = useState("Coworking Space");
  const [isCitySelected, setIsCitySelected] = useState(false);
  const [isTypeSelected, setIsTypeSelected] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);

  // Check URL parameters on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const city = params.get("city");
      const type = params.get("type");
      if (city) {
        setSelectedCity(city);
        setIsCitySelected(true);
      }
      if (type) {
        setSelectedType(type);
        setIsTypeSelected(true);
      }
    }
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("city", selectedCity);
    params.set("type", selectedType);
    params.set("scroll", "true");
    router.push(`/workspaces?${params.toString()}`);
  };

  const handleQuickCitySelect = (city: string) => {
    setSelectedCity(city);
    setIsCitySelected(true);
    const params = new URLSearchParams();
    params.set("city", city);
    params.set("scroll", "true");
    router.push(`/workspaces?${params.toString()}`);
  };

  return (
    <div className={`w-full max-w-2xl relative z-40 ${className}`}>
      {/* Search Bar Container */}
      <div className="bg-white border border-[#E3DDD3] rounded-sm p-3.5 sm:p-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E3DDD3]">
          
          {/* City Selector */}
          <div className="relative pt-1 sm:pt-0 sm:pr-4">
            <label className="text-[11px] font-bold text-[#71717A] uppercase tracking-wider block mb-1.5">
              Location
            </label>
            <button
              type="button"
              onClick={() => {
                setCityOpen(!cityOpen);
                setTypeOpen(false);
              }}
              className="w-full flex items-center justify-between h-11 px-3 bg-[#FAF8F5]/80 hover:bg-[#FAF8F5] border border-[#E3DDD3]/70 hover:border-primary/50 transition-all rounded-sm text-left group cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <MapPin className={`w-4 h-4 shrink-0 transition-colors ${
                  isCitySelected ? "text-primary" : "text-[#71717A]"
                }`} />
                <span className={`text-sm truncate transition-colors ${
                  isCitySelected ? "font-semibold text-[#18191C]" : "font-medium text-[#71717A]"
                }`}>
                  {selectedCity}
                </span>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#5C5D61] shrink-0 transition-transform duration-200 ${
                  cityOpen ? "rotate-180 text-primary" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {cityOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setCityOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="absolute left-0 top-full mt-2 w-full min-w-[220px] bg-white border border-[#E3DDD3] rounded-sm shadow-xl z-50 p-1.5 max-h-60 overflow-y-auto"
                  >
                    {CITIES.map((city) => (
                      <button
                        key={city}
                        type="button"
                        onClick={() => {
                          setSelectedCity(city);
                          setIsCitySelected(true);
                          setCityOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs font-medium rounded-sm transition-colors text-[#18191C] ${
                          selectedCity === city && isCitySelected ? "bg-[#F3EFEA] text-primary font-semibold" : "hover:bg-[#FAF8F5]"
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
          <div className="relative pt-3 sm:pt-0 sm:pl-4">
            <label className="text-[11px] font-bold text-[#71717A] uppercase tracking-wider block mb-1.5">
              Workspace format
            </label>
            <button
              type="button"
              onClick={() => {
                setTypeOpen(!typeOpen);
                setCityOpen(false);
              }}
              className="w-full flex items-center justify-between h-11 px-3 bg-[#FAF8F5]/80 hover:bg-[#FAF8F5] border border-[#E3DDD3]/70 hover:border-primary/50 transition-all rounded-sm text-left group cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Building className={`w-4 h-4 shrink-0 transition-colors ${
                  isTypeSelected ? "text-primary" : "text-[#71717A]"
                }`} />
                <span className={`text-sm truncate transition-colors ${
                  isTypeSelected ? "font-semibold text-[#18191C]" : "font-medium text-[#71717A]"
                }`}>
                  {selectedType}
                </span>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#5C5D61] shrink-0 transition-transform duration-200 ${
                  typeOpen ? "rotate-180 text-primary" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {typeOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setTypeOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="absolute left-0 top-full mt-2 w-full min-w-[220px] bg-white border border-[#E3DDD3] rounded-sm shadow-xl z-50 p-1.5 max-h-60 overflow-y-auto"
                  >
                    {WORKSPACE_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          setSelectedType(type);
                          setIsTypeSelected(true);
                          setTypeOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs font-medium rounded-sm transition-colors text-[#18191C] ${
                          selectedType === type && isTypeSelected ? "bg-[#F3EFEA] text-primary font-semibold" : "hover:bg-[#FAF8F5]"
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

        </div>

        {/* Action Bar */}
        <div className="mt-3.5 pt-3 border-t border-[#E3DDD3] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#5C5D61]">
            <span className="font-medium text-[#18191C]">Popular:</span>
            {["Gurugram", "Noida", "Bangalore", "Mumbai"].map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => handleQuickCitySelect(city)}
                className="hover:text-primary transition-colors cursor-pointer font-medium underline underline-offset-2"
              >
                {city}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleSearch}
            className="w-full sm:w-auto bg-primary hover:bg-[#A93E1B] text-white px-6 h-10 rounded-sm text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm group sm:ml-auto cursor-pointer"
          >
            <span>Explore spaces</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
