"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Building, Search, ArrowRight } from "lucide-react";
import { CITIES, WORKSPACE_TYPES } from "@/constants/data";
import { useRouter } from "next/navigation";

export function AdvancedSearch({ className = "max-w-2xl" }: { className?: string }) {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState("Delhi NCR");
  const [selectedType, setSelectedType] = useState("Coworking Space");
  const [cityOpen, setCityOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);

  const handleSearch = () => {
    // Redirect to the workspaces page with query parameters
    const params = new URLSearchParams();
    params.set("city", selectedCity);
    params.set("type", selectedType);
    params.set("scroll", "true");
    router.push(`/services/workspaces?${params.toString()}`);
  };

  return (
    <div className={`w-full mx-auto relative z-40 ${className}`}>
      <div className="bg-white rounded-xl p-2.5 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-2 items-center">
        
        {/* City Selector */}
        <div className="w-full md:w-1/3 relative">
          <button
            onClick={() => {
              setCityOpen(!cityOpen);
              setTypeOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50 rounded-lg transition-colors text-left group cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">Select City</p>
              <p className="text-xs font-bold text-slate-800 truncate">{selectedCity}</p>
            </div>
          </button>
  
          <AnimatePresence>
            {cityOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setCityOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.1 }}
                  className="absolute left-0 mt-2 w-full min-w-[180px] bg-white border border-slate-100 rounded-lg shadow-md z-50 p-1.5 animate-in fade-in duration-100"
                >
                  {CITIES.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(city);
                        setCityOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium rounded hover:bg-slate-50 hover:text-primary transition-colors cursor-pointer text-slate-700"
                    >
                      {city}
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
  
        {/* Divider line for desktop */}
        <div className="hidden md:block w-px h-6 bg-slate-200" />
  
        {/* Workspace Type Selector */}
        <div className="w-full md:w-1/3 relative">
          <button
            onClick={() => {
              setTypeOpen(!typeOpen);
              setCityOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50 rounded-lg transition-colors text-left group cursor-pointer"
          >
            <Building className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">Workspace Type</p>
              <p className="text-xs font-bold text-slate-800 truncate">{selectedType}</p>
            </div>
          </button>
  
          <AnimatePresence>
            {typeOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setTypeOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.1 }}
                  className="absolute left-0 mt-2 w-full min-w-[200px] bg-white border border-slate-100 rounded-lg shadow-md z-50 p-1.5 animate-in fade-in duration-100"
                >
                  {WORKSPACE_TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setSelectedType(type);
                        setTypeOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium rounded hover:bg-slate-50 hover:text-primary transition-colors cursor-pointer text-slate-700"
                    >
                      {type}
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
  
        {/* Search Action Button */}
        <div className="w-full md:w-1/3 md:flex md:justify-end">
          <button
            onClick={handleSearch}
            className="w-full md:w-auto md:px-7 py-3 md:py-2.5 bg-primary hover:bg-primary-hover text-primary-foreground font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer text-xs"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
  
      </div>
    </div>
  );
}
