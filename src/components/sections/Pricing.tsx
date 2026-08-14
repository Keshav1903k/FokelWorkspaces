"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { PRICING_PLANS } from "@/constants/data";

export function PricingComparison() {
  const handleSelectPlan = (planName: string) => {
    window.dispatchEvent(new Event("open-welcome-modal"));
  };

  return (
    <section id="pricing" className="py-24 border-t border-slate-100 bg-slate-50 relative -mt-6">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-semibold text-slate-800 mb-4 tracking-tight"
          >
            Flexible Solutions,{" "}
            <span className="text-primary">
              Honest Pricing
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed"
          >
            Choose a plan that fits your business stage. No lock-in, no hidden overheads—scale up or down anytime.
          </motion.p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICING_PLANS.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`bg-white border rounded-xl p-7 flex flex-col justify-between relative transition-all duration-200 ${
                plan.popular
                  ? "border-primary shadow-sm ring-1 ring-primary/10"
                  : "border-slate-100 shadow-sm hover:border-slate-200"
              }`}
            >
              {/* Popular highlight tag */}
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-[9px] font-bold uppercase tracking-wider py-1 px-3 rounded flex items-center gap-1 shadow-sm">
                  Recommended
                </div>
              )}

              <div>
                {/* Plan Name & Desc */}
                <div className="mb-6">
                  <h3 className="text-base font-semibold text-slate-800 mb-2">{plan.name}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed min-h-[48px]">{plan.description}</p>
                </div>

                {/* Price Display */}
                <div className="mb-8 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-slate-800 tracking-tight">{plan.price}</span>
                  {plan.period && (
                    <span className="text-[10px] text-slate-400 font-medium">/{plan.period}</span>
                  )}
                </div>

                {/* Features checklist */}
                <div className="border-t border-slate-100 pt-6 mb-8">
                  <ul className="space-y-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span className="text-xs text-slate-600 leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleSelectPlan(plan.name)}
                className={`w-full py-3 px-5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer text-center ${
                  plan.popular
                    ? "bg-primary text-white hover:bg-primary-hover shadow-sm"
                    : "bg-[#DEE9F4] text-primary hover:bg-[#c4d6e9] hover:text-[#23416a] transition-colors"
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
