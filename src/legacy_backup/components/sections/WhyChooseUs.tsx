"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { WHY_CHOOSE_US } from "@/constants/data";

function FeatureIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = (LucideIcons as any)[name];
  if (!IconComponent) return <LucideIcons.HelpCircle className={className} />;
  return <IconComponent className={className} />;
}

export function WhyChooseUs() {
  const iconColorClass = "text-slate-600 bg-slate-50 border-slate-150";

  return (
    <section className="py-24 relative bg-background-alt border-t border-slate-200/50">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight"
          >
            Why Choose Fokel Workspaces?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-para-gray mt-3 text-sm max-w-2xl mx-auto leading-relaxed"
          >
            Empowering modern teams and growing startups with flexible, compliant, and cost-efficient business infrastructure.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((feature, index) => {
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="group relative p-7 rounded-xl bg-white border border-[#c4d6e9] hover:border-slate-300 hover:shadow-sm transition-all duration-200"
              >
                <div className={`w-10 h-10 rounded-lg border border-slate-100 flex items-center justify-center mb-6 relative z-10 text-slate-600 bg-slate-50 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors duration-200`}>
                  <FeatureIcon name={feature.icon} className="w-5 h-5" />
                </div>

                <h3 className="text-sm font-semibold text-foreground mb-2 relative z-10">{feature.title}</h3>
                <p className="text-para-gray text-xs leading-relaxed relative z-10">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
