"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Star, Building, ArrowRight, Sparkles, FilterX, ChevronDown } from "lucide-react";
import { WORKSPACES, CITIES, WORKSPACE_TYPES } from "@/constants/data";

export function FeaturedOfficeSpaces() {
  const [selectedCity, setSelectedCity] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [filteredWorkspaces, setFilteredWorkspaces] = useState(WORKSPACES);

  // Listen to search filters from Hero search component
  useEffect(() => {
    const handleFilterEvent = (e: any) => {
      const { city, type } = e.detail;
      setSelectedCity(city || "All");
      setSelectedType(type || "All");
    };

    window.addEventListener("filter-workspaces", handleFilterEvent);
    return () => window.removeEventListener("filter-workspaces", handleFilterEvent);
  }, []);

  // Update filtered list when selections change
  useEffect(() => {
    let result = WORKSPACES;
    if (selectedCity !== "All") {
      result = result.filter((w) => w.city === selectedCity);
    }
    if (selectedType !== "All") {
      result = result.filter((w) => w.type === selectedType);
    }
    setFilteredWorkspaces(result);
  }, [selectedCity, selectedType]);

  const handleBooking = (title: string) => {
    window.dispatchEvent(new Event("open-welcome-modal"));
  };

  const clearFilters = () => {
    setSelectedCity("All");
    setSelectedType("All");
  };

  return (
    <section id="spaces" className="py-24 bg-white relative">

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4 tracking-tight">
              Featured Office{" "}
              <span className="text-primary">
                Spaces
              </span>
            </h2>
            <p className="text-muted-foreground text-base">
              Explore custom workspaces in prime corporate environments, fully certified for immediate business setup.
            </p>
          </div>

          {/* Quick inline filter counts */}
          <div className="flex flex-wrap gap-2">
            <div className="relative flex items-center">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="appearance-none pl-6 pr-12 py-2.5 text-sm font-medium border border-slate-200 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors outline-none cursor-pointer text-slate-800 min-w-[180px] shadow-sm w-full"
              >
                <option value="All">All Cities</option>
                {CITIES.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-6 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>

            <div className="relative flex items-center">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="appearance-none pl-6 pr-12 py-2.5 text-sm font-medium border border-slate-200 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors outline-none cursor-pointer text-slate-800 min-w-[180px] shadow-sm w-full"
              >
                <option value="All">All Space Types</option>
                {WORKSPACE_TYPES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-6 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>

            {(selectedCity !== "All" || selectedType !== "All") && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm font-semibold text-destructive hover:bg-destructive/10 border border-destructive/20 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <FilterX className="w-3.5 h-3.5" /> Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Listings Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredWorkspaces.length > 0 ? (
              filteredWorkspaces.map((space) => (
                <motion.div
                  layout
                  key={space.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white border border-slate-100 rounded-xl overflow-hidden group hover:border-slate-200 hover:shadow-sm transition-all duration-200 flex flex-col h-full"
                >
                  {/* Image container */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-50">
                    <img
                      src={space.image}
                      alt={space.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    />
                    {/* Floating space type badge */}
                    <div className="absolute top-4 left-4">
                      <span className="text-[10px] font-semibold tracking-wide px-2.5 py-1 rounded bg-white text-slate-700 shadow-sm border border-slate-100 flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-primary" />
                        {space.type}
                      </span>
                    </div>

                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="mb-4">
                      <h3 className="text-base font-semibold text-slate-800 mb-1 group-hover:text-primary transition-colors">
                        {space.title}
                      </h3>
                      <p className="text-xs text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        {space.location}
                      </p>
                    </div>

                    {/* Amenities list */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {space.amenities.map((item, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-medium bg-slate-50 text-slate-500 px-2 py-0.5 rounded border border-slate-100"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    {/* Bottom Pricing & CTA */}
                    <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">Starting From</p>
                        <p className="text-sm font-bold text-slate-800">{space.price}</p>
                      </div>
                      <button
                        onClick={() => handleBooking(space.title)}
                        className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        Explore Space
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-16 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-secondary text-muted-foreground flex items-center justify-center mx-auto mb-4 border border-border">
                  <FilterX className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">No matching workspaces</h3>
                <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
                  We currently don&apos;t have spaces matching both your selected city and space type. Expand your search filters to explore other premium offices.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover transition-colors cursor-pointer shadow-[0_4px_12px_rgba(10,41,71,0.15)]"
                >
                  Show All Spaces
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
