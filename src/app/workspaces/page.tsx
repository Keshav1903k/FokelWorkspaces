"use client";

import { motion } from "framer-motion";
import { 
  Building2, 
  MapPin, 
  FilterX, 
  ChevronDown
} from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import { WORKSPACES, CITIES, WORKSPACE_TYPES } from "@/constants/data";
import { AdvancedSearch } from "@/components/search/AdvancedSearch";
import Link from "next/link";

function WorkspacesPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const cityParam = searchParams.get("city");
  const typeParam = searchParams.get("type");

  const selectedCity = cityParam || "All";
  const selectedType = typeParam || "All";

  useEffect(() => {
    if (cityParam || typeParam || searchParams.get("scroll")) {
      const el = document.getElementById("listings");
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    }
  }, [cityParam, typeParam, searchParams]);

  const filteredWorkspaces = WORKSPACES.filter((w) => {
    const matchesCity = selectedCity === "All" || w.city === selectedCity;
    const matchesType = selectedType === "All" || w.type === selectedType;
    return matchesCity && matchesType;
  });

  const updateFilters = (city: string, type: string) => {
    const params = new URLSearchParams();
    if (city !== "All") params.set("city", city);
    if (type !== "All") params.set("type", type);
    router.push(`/workspaces?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    router.push("/workspaces");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5]">
      
      {/* Hero */}
      <section className="relative bg-[#121316] text-white pt-28 pb-16 border-b border-[#2E2F34] overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-6 h-px bg-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                Workspace Directory
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-3">
              Explore workspaces across India
            </h1>
            <p className="text-base text-[#9E9EA5] leading-relaxed">
              Compare verified coworking desks, private office suites, managed corporate floors, and virtual office addresses across top business districts.
            </p>
          </div>

          <div className="mt-8">
            <AdvancedSearch />
          </div>
        </div>
      </section>

      {/* Workspace Listings */}
      <section id="listings" className="py-16 bg-[#FAF8F5]">
        <div className="container mx-auto px-6 max-w-7xl">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#E3DDD3]">
            <div>
              {selectedCity === "All" && selectedType === "All" && (
                <h2 className="text-2xl font-bold text-[#18191C] tracking-tight">
                  All verified workspaces
                </h2>
              )}
              <p className="text-xs sm:text-sm font-medium text-[#5C5D61]">
                <span className="font-semibold text-[#18191C]">{filteredWorkspaces.length}</span> workspace listings available
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <select
                  value={selectedCity}
                  onChange={(e) => updateFilters(e.target.value, selectedType)}
                  className="appearance-none pl-3 pr-8 py-2 text-xs font-semibold border border-[#E3DDD3] rounded-sm bg-white text-[#18191C] focus:outline-none focus:border-primary cursor-pointer"
                >
                  <option value="All">All cities</option>
                  {CITIES.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#5C5D61] pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) => updateFilters(selectedCity, e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 text-xs font-semibold border border-[#E3DDD3] rounded-sm bg-white text-[#18191C] focus:outline-none focus:border-primary cursor-pointer"
                >
                  <option value="All">All space formats</option>
                  {WORKSPACE_TYPES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#5C5D61] pointer-events-none" />
              </div>

              {(selectedCity !== "All" || selectedType !== "All") && (
                <button
                  onClick={clearFilters}
                  className="px-3 py-2 text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 rounded-sm flex items-center gap-1 cursor-pointer hover:bg-rose-100 transition-colors"
                >
                  <FilterX className="w-3 h-3" /> Clear filters
                </button>
              )}
            </div>
          </div>

          {filteredWorkspaces.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorkspaces.map((space, idx) => (
                <motion.div
                  key={space.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="bg-white border border-[#E3DDD3] rounded-sm overflow-hidden flex flex-col justify-between group hover:border-primary transition-all shadow-sm"
                >
                  <Link href={`/workspaces/${space.id}`} className="relative aspect-[16/10] overflow-hidden bg-[#F3EFEA] block">
                    <img
                      src={space.image}
                      alt={space.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h3 className="text-base sm:text-lg font-bold text-[#18191C] group-hover:text-primary transition-colors tracking-tight line-clamp-1">
                          <Link href={`/workspaces/${space.id}`}>
                            {space.title}
                          </Link>
                        </h3>
                        <div className="flex items-center gap-0.5 text-xs font-bold text-[#18191C] shrink-0 pt-0.5">
                          ★ {space.rating}
                        </div>
                      </div>
                      
                      <p className="text-xs text-[#5C5D61] flex items-center gap-1.5 line-clamp-1">
                        <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> {space.location}
                      </p>
                    </div>

                    <div className="pt-3.5 mt-4 border-t border-[#E3DDD3] flex items-center justify-between">
                      <span className="text-sm sm:text-base font-bold text-[#18191C]">
                        {space.price}
                      </span>
                      <Link
                        href={`/workspaces/${space.id}`}
                        className="bg-primary hover:bg-[#A93E1B] text-white px-3.5 py-1.5 rounded-sm font-semibold text-xs transition-colors"
                      >
                        View details →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-white border border-[#E3DDD3] rounded-sm p-8">
              <Building2 className="w-12 h-12 text-[#5C5D61] mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-bold text-[#18191C] mb-2">No matching workspaces found</h3>
              <p className="text-xs text-[#5C5D61] mb-6">Try clearing your filters or selecting another city.</p>
              <button
                onClick={clearFilters}
                className="bg-primary text-white px-6 py-2.5 rounded-sm text-xs font-semibold"
              >
                Reset all filters
              </button>
            </div>
          )}

        </div>
      </section>

    </div>
  );
}

export default function WorkspacesPage() {
  return (
    <Suspense fallback={
      <div className="py-32 text-center text-xs font-mono text-[#5C5D61]">
        Loading workspace inventory marketplace...
      </div>
    }>
      <WorkspacesPageContent />
    </Suspense>
  );
}
