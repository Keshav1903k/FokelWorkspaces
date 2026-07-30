"use client";

import { AdvancedSearch } from "@/components/search/AdvancedSearch";

export function ServicesHero() {
  return (
    <section
      id="services-search-header"
      className="w-full bg-slate-950 py-6 flex items-center justify-center border-b border-slate-900 relative z-20"
    >
      <div className="w-full max-w-4xl px-6">
        <AdvancedSearch className="max-w-full" />
      </div>
    </section>
  );
}
