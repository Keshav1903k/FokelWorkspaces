"use client";

import { useState } from "react";
import Link from "next/link";
import { PlusCircle, MinusCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LocationTag {
  label: string;
  href: string;
}

interface TagSection {
  title: string;
  tags: LocationTag[];
}

const TAG_SECTIONS: TagSection[] = [
  {
    title: "Coworking Spaces in India",
    tags: [
      { label: "Coworking Space in Gurgaon", href: "/workspaces?city=Delhi+NCR&search=Gurugram&type=Coworking+Space" },
      { label: "Coworking Space in Bangalore", href: "/workspaces?city=Bangalore&type=Coworking+Space" },
      { label: "Coworking Space in Mumbai", href: "/workspaces?city=Mumbai&type=Coworking+Space" },
      { label: "Coworking Space in Delhi", href: "/workspaces?city=Delhi+NCR&type=Coworking+Space" },
      { label: "Coworking Space in Noida", href: "/workspaces?city=Delhi+NCR&search=Noida&type=Coworking+Space" },
      { label: "Coworking Space in Hyderabad", href: "/workspaces?city=Hyderabad&type=Coworking+Space" },
      { label: "Coworking Space in Pune", href: "/workspaces?city=Pune&type=Coworking+Space" },
      { label: "Coworking Space in Connaught Place", href: "/workspaces?city=Delhi+NCR&search=Connaught+Place&type=Coworking+Space" },
      { label: "Coworking Space in DLF Cyber City", href: "/workspaces?city=Delhi+NCR&search=DLF+Cyber+City&type=Coworking+Space" },
      { label: "Coworking Space in Golf Course Road", href: "/workspaces?city=Delhi+NCR&search=Golf+Course+Road&type=Coworking+Space" },
      { label: "Coworking Space in Nehru Place", href: "/workspaces?city=Delhi+NCR&search=Nehru+Place&type=Coworking+Space" },
      { label: "Coworking Space in Saket", href: "/workspaces?city=Delhi+NCR&search=Saket&type=Coworking+Space" },
      { label: "Coworking Space in Aerocity", href: "/workspaces?city=Delhi+NCR&search=Aerocity&type=Coworking+Space" },
      { label: "Coworking Space in Sector 62 Noida", href: "/workspaces?city=Delhi+NCR&search=Sector+62&type=Coworking+Space" },
      { label: "Coworking Space in Koramangala", href: "/workspaces?city=Bangalore&search=Koramangala&type=Coworking+Space" },
      { label: "Coworking Space in Bellandur", href: "/workspaces?city=Bangalore&search=Bellandur&type=Coworking+Space" },
      { label: "Coworking Space in Marathahalli", href: "/workspaces?city=Bangalore&search=Marathahalli&type=Coworking+Space" },
      { label: "Coworking Space in BKC Mumbai", href: "/workspaces?city=Mumbai&search=BKC&type=Coworking+Space" },
      { label: "Coworking Space in HITEC City", href: "/workspaces?city=Hyderabad&search=HITEC+City&type=Coworking+Space" },
      { label: "Coworking Space in Koregaon Park", href: "/workspaces?city=Pune&search=Koregaon+Park&type=Coworking+Space" },
    ],
  },
  {
    title: "Virtual Offices in India",
    tags: [
      { label: "Virtual Office in Gurgaon", href: "/workspaces?city=Delhi+NCR&search=Gurugram&type=Virtual+Office" },
      { label: "Virtual Office in Bangalore", href: "/workspaces?city=Bangalore&type=Virtual+Office" },
      { label: "Virtual Office in Mumbai", href: "/workspaces?city=Mumbai&type=Virtual+Office" },
      { label: "Virtual Office in Delhi", href: "/workspaces?city=Delhi+NCR&type=Virtual+Office" },
      { label: "Virtual Office in Noida", href: "/workspaces?city=Delhi+NCR&search=Noida&type=Virtual+Office" },
      { label: "Virtual Office in Hyderabad", href: "/workspaces?city=Hyderabad&type=Virtual+Office" },
      { label: "Virtual Office in Pune", href: "/workspaces?city=Pune&type=Virtual+Office" },
      { label: "Virtual Office in Connaught Place", href: "/workspaces?city=Delhi+NCR&search=Connaught+Place&type=Virtual+Office" },
      { label: "Virtual Office in Nehru Place", href: "/workspaces?city=Delhi+NCR&search=Nehru+Place&type=Virtual+Office" },
      { label: "Virtual Office in Aerocity", href: "/workspaces?city=Delhi+NCR&search=Aerocity&type=Virtual+Office" },
      { label: "Virtual Office in DLF Cyber City", href: "/workspaces?city=Delhi+NCR&search=DLF+Cyber+City&type=Virtual+Office" },
      { label: "Virtual Office in Golf Course Road", href: "/workspaces?city=Delhi+NCR&search=Golf+Course+Road&type=Virtual+Office" },
      { label: "Virtual Office in Sector 39 Gurugram", href: "/workspaces?city=Delhi+NCR&search=Sector+39&type=Virtual+Office" },
      { label: "Virtual Office in Sector 62 Noida", href: "/workspaces?city=Delhi+NCR&search=Sector+62&type=Virtual+Office" },
      { label: "Virtual Office in BKC Mumbai", href: "/workspaces?city=Mumbai&search=BKC&type=Virtual+Office" },
      { label: "Virtual Office in HITEC City", href: "/workspaces?city=Hyderabad&search=HITEC+City&type=Virtual+Office" },
    ],
  },
  {
    title: "Managed Offices in India",
    tags: [
      { label: "Managed Office in Gurgaon", href: "/workspaces?city=Delhi+NCR&search=Gurugram&type=Managed+Office" },
      { label: "Managed Office in Bangalore", href: "/workspaces?city=Bangalore&type=Managed+Office" },
      { label: "Managed Office in Mumbai", href: "/workspaces?city=Mumbai&type=Managed+Office" },
      { label: "Managed Office in Delhi", href: "/workspaces?city=Delhi+NCR&type=Managed+Office" },
      { label: "Managed Office in Noida", href: "/workspaces?city=Delhi+NCR&search=Noida&type=Managed+Office" },
      { label: "Managed Office in Hyderabad", href: "/workspaces?city=Hyderabad&type=Managed+Office" },
      { label: "Managed Office in Pune", href: "/workspaces?city=Pune&type=Managed+Office" },
      { label: "Managed Office in Connaught Place", href: "/workspaces?city=Delhi+NCR&search=Connaught+Place&type=Managed+Office" },
      { label: "Managed Office in Nehru Place", href: "/workspaces?city=Delhi+NCR&search=Nehru+Place&type=Managed+Office" },
      { label: "Managed Office in Saket", href: "/workspaces?city=Delhi+NCR&search=Saket&type=Managed+Office" },
      { label: "Managed Office in Aerocity", href: "/workspaces?city=Delhi+NCR&search=Aerocity&type=Managed+Office" },
      { label: "Managed Office in Sector 48 Gurugram", href: "/workspaces?city=Delhi+NCR&search=Sector+48&type=Managed+Office" },
      { label: "Managed Office in Sector 62 Noida", href: "/workspaces?city=Delhi+NCR&search=Sector+62&type=Managed+Office" },
      { label: "Managed Office in HITEC City", href: "/workspaces?city=Hyderabad&search=HITEC+City&type=Managed+Office" },
      { label: "Managed Office in Koregaon Park", href: "/workspaces?city=Pune&search=Koregaon+Park&type=Managed+Office" },
    ],
  },
  {
    title: "Office Spaces in India",
    tags: [
      { label: "Office Space in Gurgaon", href: "/workspaces?city=Delhi+NCR&search=Gurugram&type=Commercial+%2F+Office+Space" },
      { label: "Office Space in Bangalore", href: "/workspaces?city=Bangalore&type=Commercial+%2F+Office+Space" },
      { label: "Office Space in Mumbai", href: "/workspaces?city=Mumbai&type=Commercial+%2F+Office+Space" },
      { label: "Office Space in Delhi", href: "/workspaces?city=Delhi+NCR&type=Commercial+%2F+Office+Space" },
      { label: "Office Space in Noida", href: "/workspaces?city=Delhi+NCR&search=Noida&type=Commercial+%2F+Office+Space" },
      { label: "Office Space in Hyderabad", href: "/workspaces?city=Hyderabad&type=Commercial+%2F+Office+Space" },
      { label: "Office Space in Pune", href: "/workspaces?city=Pune&type=Commercial+%2F+Office+Space" },
      { label: "Office Space in Nehru Place", href: "/workspaces?city=Delhi+NCR&search=Nehru+Place&type=Commercial+%2F+Office+Space" },
      { label: "Office Space in Golf Course Road", href: "/workspaces?city=Delhi+NCR&search=Golf+Course+Road&type=Commercial+%2F+Office+Space" },
      { label: "Office Space in Golf Course Extension Road", href: "/workspaces?city=Delhi+NCR&search=Golf+Course+Extension+Road&type=Commercial+%2F+Office+Space" },
      { label: "Office Space in Sector 62 Noida", href: "/workspaces?city=Delhi+NCR&search=Sector+62&type=Commercial+%2F+Office+Space" },
      { label: "Office Space in BKC Mumbai", href: "/workspaces?city=Mumbai&search=BKC&type=Commercial+%2F+Office+Space" },
      { label: "Office Space in HITEC City", href: "/workspaces?city=Hyderabad&search=HITEC+City&type=Commercial+%2F+Office+Space" },
    ],
  },
];

export function CityLocationTags() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="bg-[#121316] text-[#FAF8F5] border-t border-[#282A2E]">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Toggle Button Bar */}
        <div className="py-4 flex items-center justify-between">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-medium text-white/90 hover:text-white transition-colors cursor-pointer group focus:outline-none"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <MinusCircle className="w-4 h-4 text-primary transition-transform group-hover:scale-110" />
            ) : (
              <PlusCircle className="w-4 h-4 text-primary transition-transform group-hover:scale-110" />
            )}
            <span>{isOpen ? "Hide locations" : "Show locations"}</span>
          </button>
        </div>

        {/* Expandable Location Tags Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-2 pb-8 border-t border-[#282A2E]/60 space-y-6">
                {TAG_SECTIONS.map((section, idx) => (
                  <div key={idx} className="space-y-2">
                    <h3 className="text-xs sm:text-sm font-bold text-white tracking-wide">
                      {section.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-white/60 leading-relaxed">
                      {section.tags.map((tag, tIdx) => (
                        <span key={tIdx}>
                          <Link
                            href={tag.href}
                            className="hover:text-primary hover:underline transition-colors"
                          >
                            {tag.label}
                          </Link>
                          {tIdx < section.tags.length - 1 && (
                            <span className="text-white/30 mx-1.5 select-none">•</span>
                          )}
                        </span>
                      ))}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
