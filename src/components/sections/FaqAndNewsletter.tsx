"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export function FaqAndNewsletter() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const FAQS = [
    {
      question: "How does Fokel make money as an aggregator?",
      answer: "Fokel charges zero brokerage fees to tenants or businesses. Space operators and building owners pay a standardized referral fee when a lease is signed."
    },
    {
      question: "How are workspace listings verified?",
      answer: "Every workspace undergoes inspection by our team to verify internet redundancy, power backup, meeting room equipment, and GST compliance."
    },
    {
      question: "Can I schedule a tour before booking?",
      answer: "Yes. You can request a guided physical walkthrough or virtual tour directly through any workspace listing."
    },
    {
      question: "Can I compare different spaces side-by-side?",
      answer: "Yes. Our comparison feature lets you compare price per seat, lock-in terms, metro distance, and included amenities across operators."
    },
    {
      question: "How do I list my workspace on Fokel?",
      answer: "Click 'List your space' in the top navigation, submit your property details, and our onboarding team will reach out within 24 hours."
    }
  ];

  return (
    <section className="py-24 bg-[#FAF8F5] border-b border-[#E3DDD3]">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-semibold text-primary block mb-1">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#18191C] tracking-tight">
            Frequently asked questions
          </h2>
        </div>

        {/* Minimal Accordion */}
        <div className="flex flex-col divide-y divide-[#E3DDD3] border-t border-b border-[#E3DDD3]">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={faq.question} className="py-5">
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between text-left gap-4 group cursor-pointer"
                >
                  <h3 className="text-base sm:text-lg font-bold text-[#18191C] group-hover:text-primary transition-colors tracking-tight">
                    {faq.question}
                  </h3>
                  <div className="w-6 h-6 rounded-sm border border-[#E3DDD3] flex items-center justify-center text-[#18191C] shrink-0 group-hover:border-primary group-hover:text-primary transition-colors">
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden mt-3"
                    >
                      <p className="text-sm text-[#5C5D61] leading-relaxed pr-8">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
