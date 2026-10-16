"use client";

import { AdvancedSearch } from "@/components/search/AdvancedSearch";

export function ServicesHero() {
  return (
    <section
      id="services-search-header"
      className="w-full bg-[#18191C] py-6 flex items-center justify-center border-b border-[#282A2E] relative z-20 -mt-6"
    >
      <div className="w-full max-w-2xl px-6">
        <AdvancedSearch />
      </div>
    </section>
  );
}
