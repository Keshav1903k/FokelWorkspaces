"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface FormatItem {
  id: string;
  number: string;
  title: string;
  description: string;
  idealFor: string;
  image: string;
}

const WORKSPACE_FORMATS: FormatItem[] = [
  {
    id: "coworking",
    number: "01",
    title: "Coworking & hot desks",
    description: "Flexible shared workstations in energetic, fully serviced professional environments with high-speed fiber internet and community perks.",
    idealFor: "Freelancers, remote teams and early-stage startups",
    image: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "managed",
    number: "02",
    title: "Managed office suites",
    description: "Bespoke, brand-tailored corporate floors fully operational with dedicated reception, IT infrastructure, and zero capital expenditure.",
    idealFor: "Growing teams and enterprise divisions",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "private",
    number: "03",
    title: "Private cabins & offices",
    description: "Secure, lockable private offices for individual teams seeking quiet focus, sound isolation, and dedicated administrative support.",
    idealFor: "Teams of 4 to 30 people",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "virtual",
    number: "04",
    title: "Virtual office address",
    description: "Prestigious corporate GST business addresses in top commercial districts complete with mail forwarding and official documentation.",
    idealFor: "Company registration and remote businesses",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "meeting",
    number: "05",
    title: "On-demand meeting rooms",
    description: "Boardrooms and conference suites equipped with 4K AV displays, acoustic paneling, video conferencing, and hospitality catering.",
    idealFor: "Client pitches, board meetings and workshops",
    image: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&q=80&w=1000"
  }
];

export function WorkspaceTypes() {
  const [activeFormat, setActiveFormat] = useState<FormatItem>(WORKSPACE_FORMATS[0]);

  return (
    <section className="py-24 bg-[#151619] text-[#FAF8F5] border-b border-[#282A2E]">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Section Header */}
        <div className="mb-14">
          <span className="text-xs font-semibold text-primary block mb-1">
            Workspace options
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            How do you want to work?
          </h2>
        </div>

        {/* Accordion Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Format Titles */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-[#282A2E]">
            {WORKSPACE_FORMATS.map((item) => {
              const isActive = activeFormat.id === item.id;
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveFormat(item)}
                  onClick={() => setActiveFormat(item)}
                  className={`py-6 transition-colors cursor-pointer group flex flex-col ${
                    isActive ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className={`font-mono text-xs ${isActive ? "text-primary font-bold" : "text-white/40"}`}>
                        {item.number}
                      </span>
                      <h3 className={`text-xl font-bold tracking-tight transition-colors ${
                        isActive ? "text-primary" : "group-hover:text-white"
                      }`}>
                        {item.title}
                      </h3>
                    </div>
                    <ArrowUpRight className={`w-5 h-5 transition-transform ${
                      isActive ? "text-primary translate-x-0.5 -translate-y-0.5" : "text-white/40 group-hover:text-white"
                    }`} />
                  </div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 pl-8 overflow-hidden"
                      >
                        <p className="text-sm text-white/75 leading-relaxed max-w-xl mb-3">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-primary font-medium">
                          <span>Ideal for:</span>
                          <span className="text-white/90 font-normal">{item.idealFor}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Column: Image Display */}
          <div className="lg:col-span-5 relative">
            <div className="border border-[#282A2E] p-3 bg-[#1C1D22] rounded-sm">
              <div className="relative aspect-[4/5] overflow-hidden bg-black rounded-sm">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeFormat.id}
                    src={activeFormat.image}
                    alt={activeFormat.title}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs text-primary font-medium block mb-1">
                    Format preview — {activeFormat.number}
                  </span>
                  <p className="text-lg font-bold">
                    {activeFormat.title}
                  </p>
                  <Link
                    href="/services/workspaces"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-white transition-colors"
                  >
                    <span>Browse spaces in this format</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
