"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Building2, FileText, HeartHandshake, ArrowRight } from "lucide-react";

const SERVICES_PREVIEW = [
  {
    title: "Flexible Workspaces",
    description: "Access premium corporate addresses, shared coworking desks, private office cabins, and managed enterprise suites fully certified for immediate business operations.",
    icon: Building2,
    bullets: ["Virtual Office Setup", "Coworking Desks", "Private Managed Cabins"],
    href: "/services/workspaces",
  },
  {
    title: "Business Registration",
    description: "Launch your venture legally and seamlessly. We manage company incorporation, GST registrations, trademark filings, and structural compliance from start to finish.",
    icon: FileText,
    bullets: ["Company Incorporation", "GST & Tax Registration", "Trademark & IP Filings"],
    href: "/business-registration",
  },
  {
    title: "Support & Operations",
    description: "Run your daily operations without hassle. Benefit from mail forwarding, reception services, premium high-speed IT setup, and professional legal contracting templates.",
    icon: HeartHandshake,
    bullets: ["Mail Handling & Dispatch", "Legal Contracts & Templates", "Receptionist & IT Support"],
    href: "/support-services",
  },
];

export function HomepageServices() {
  return (
    <section className="py-24 bg-white relative border-t border-slate-100">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#DEE9F4] border border-[#c4d6e9] text-[10px] font-bold tracking-wider uppercase text-primary mb-4"
          >
            <span>Our Offerings</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-semibold text-foreground mb-4 tracking-tight"
          >
            End-to-End Solutions for{" "}
            <span className="text-primary">
              Your Enterprise
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-para-gray text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed"
          >
            Everything your business needs to establish, incorporate, and scale in modern markets—without managing operational overhead.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {SERVICES_PREVIEW.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-white border border-[#E8EDF2] hover:border-[#c4d6e9] rounded-2xl p-8 flex flex-col justify-between shadow-[0_6px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)] transition-all duration-300 group"
              >
                <div>
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-[#E8EDF2] text-secondary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors duration-200">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-para-gray text-xs leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Bullets List */}
                <div className="border-t border-slate-100 pt-5 mt-auto">
                  <ul className="space-y-2 mb-6">
                    {service.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-para-gray font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={service.href}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg border border-primary/10 text-xs font-semibold text-primary bg-primary/5 hover:bg-primary/10 hover:border-primary/25 transition-all duration-200 group/link cursor-pointer"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Callout */}
        <div className="text-center">
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-semibold tracking-wide transition-all shadow-sm cursor-pointer"
          >
            Explore Detailed Services <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
