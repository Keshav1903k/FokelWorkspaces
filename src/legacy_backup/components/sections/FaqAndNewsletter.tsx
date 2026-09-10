"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { FAQS } from "@/constants/data";

export function FaqAndNewsletter() {
  return (
    <section id="about" className="py-24 bg-white border-t border-slate-100">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* FAQ Section */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-semibold text-slate-800 mb-8"
            >
              Frequently Asked Questions
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Accordion className="w-full space-y-3">
                {FAQS.map((faq, i) => (
                  <AccordionItem
                    key={faq.id}
                    value={`item-${i}`}
                    className="border border-slate-100 px-5 rounded-lg bg-white shadow-sm"
                  >
                    <AccordionTrigger className="text-left text-slate-700 hover:no-underline py-5 text-sm font-semibold hover:text-primary transition-colors cursor-pointer">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-400 pb-5 leading-relaxed text-xs">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>

          {/* Newsletter Section */}
          <div className="flex items-center justify-center lg:pt-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative w-full max-w-md p-8 md:p-10 rounded-xl bg-slate-50 border border-slate-100 text-center shadow-sm"
            >
              <div className="relative z-10 flex flex-col items-center">


                 <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-3">Stay ahead of the market</h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                  Join 15,000+ startup founders receiving monthly pricing updates, space availability alerts, and compliance guidance.
                </p>

                <form className="w-full space-y-3" onSubmit={(e) => e.preventDefault()}>
                  <div className="rounded-lg w-full">
                    <Input
                      type="email"
                      placeholder="Enter your work email"
                      className="h-11 bg-white border-slate-200 text-center text-sm text-slate-800 placeholder:text-slate-400 focus-visible:ring-primary rounded-lg shadow-sm relative z-10"
                    />
                  </div>
                  <Button className="w-full h-11 rounded-lg bg-primary hover:bg-primary-hover text-white text-sm font-semibold cursor-pointer transition-colors shadow-sm">
                    Subscribe Now
                  </Button>
                </form>
                <p className="text-xs text-slate-400 mt-4">
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
