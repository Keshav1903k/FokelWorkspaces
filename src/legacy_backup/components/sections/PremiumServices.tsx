"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Building2, FileText, HeartHandshake, CheckCircle2, ArrowRight } from "lucide-react";

const LARGE_SERVICES = [
  {
    title: "Flexible Workspaces",
    category: "Workspaces",
    description: "Get premium corporate address registration, high-speed coworking desks, private office cabins, or fully customized enterprise floor layouts. Access fully managed corporate facilities certified for immediate operations.",
    bullets: [
      "Virtual Office Address for GST & Company Registration",
      "Vibrant Coworking Spaces (Dedicated and hot desks)",
      "Biometric Private Office Cabins & Custom Enterprise Floors"
    ],
    icon: Building2,
    href: "/services/workspaces",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Business Registration & Incorporation",
    category: "Business Registration",
    description: "Launch your legal entity without standard administrative friction. We incorporate Private Limited Companies/LLPs, secure government tax GST approvals, and execute trademark registrations.",
    bullets: [
      "End-to-End Company Incorporation (Pvt Ltd / LLP)",
      "Multi-State GST Registrations using approved lease deeds",
      "Trademark Filings, Patent Search, & Regulatory Objections reply"
    ],
    icon: FileText,
    href: "/business-registration",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Support & Operations Infrastructure",
    category: "Support Services",
    description: "Focus entirely on scaling your business operations while we handle daily logistics. Benefit from digital mail scanning, lobby receptionist teams, and enterprise IT network configurations.",
    bullets: [
      "Digital Mail Scan, logging, and global parcel forwarding",
      "Professional front-lobby receptionist presence",
      "Dedicated high-speed fiber internet and custom VLAN servers"
    ],
    icon: HeartHandshake,
    href: "/support-services",
    image: "https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?auto=format&fit=crop&q=80&w=800"
  }
];

export function PremiumServices() {
  return (
    <section id="services" className="py-24 border-t border-slate-200/50 bg-background-alt relative">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-semibold text-foreground mb-4 tracking-tight"
          >
            Our Core{" "}
            <span className="text-primary">
              Service Pillars
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-para-gray text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed"
          >
            We manage premium real-estate, corporate legal registration, and day-to-day office logistics so your enterprise can launch and scale smoothly.
          </motion.p>
        </div>

        {/* Vertical Stack List */}
        <div className="flex flex-col gap-10">
          {LARGE_SERVICES.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white border border-[#c4d6e9] rounded-2xl overflow-hidden shadow-[0_6px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.05)] transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 items-stretch"
              >
                {/* Image Section */}
                <div className={`lg:col-span-5 relative min-h-[250px] lg:min-h-auto ${
                  idx % 2 === 1 ? "lg:order-last" : ""
                }`}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover absolute inset-0"
                  />
                  <div className="absolute inset-0 bg-slate-900/10" />
                </div>

                {/* Info Content Section */}
                <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between">
                  <div>
                    {/* Header */}
                    <div className="flex items-center gap-2.5 mb-5">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 text-secondary flex items-center justify-center">
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {service.category}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                      {service.title}
                    </h3>
                    <p className="text-para-gray text-xs leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Bullet List */}
                    <ul className="flex flex-col gap-3 mb-8">
                      {service.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5 text-xs font-semibold text-slate-600">
                          <CheckCircle2 className="w-4 h-4 text-[#3F5719] shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Redirection link */}
                  <div className="border-t border-slate-100 pt-6 mt-4">
                    <Link
                      href={service.href}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-semibold tracking-wide transition-colors cursor-pointer shadow-sm w-fit"
                    >
                      Explore Solutions <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
