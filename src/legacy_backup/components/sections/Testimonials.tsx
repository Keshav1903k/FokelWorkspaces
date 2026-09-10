"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/constants/data";

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  const current = TESTIMONIALS[currentIndex];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 60 : -60,
      opacity: 0,
    }),
  };

  return (
    <section className="py-24 bg-background-alt relative border-t border-slate-200/50">
      <div className="container mx-auto px-6 max-w-5xl relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-semibold text-foreground mb-3 tracking-tight"
          >
            What Our Clients{" "}
            <span className="text-primary">
              Say
            </span>
          </motion.h2>
          <p className="text-para-gray text-xs sm:text-sm">
            Hear from startup founders, VPs of operations, and independent business owners who scaled with Fokel Workspaces.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative bg-white border border-[#c4d6e9] rounded-xl pt-8 px-8 pb-6 md:pt-10 md:px-10 md:pb-6 shadow-sm overflow-hidden">
          
          {/* Quote Icon */}
          <div className="absolute top-5 left-5 text-primary/10">
            <Quote className="w-8 h-8 fill-primary/5" />
          </div>

          <div className="min-h-[160px] relative z-10 flex flex-col justify-between">
            
            {/* Slide */}
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="flex flex-col gap-4"
              >

                {/* Review Text */}
                <p className="text-base md:text-lg text-slate-700 font-medium leading-relaxed italic">
                  &ldquo;{current.text}&rdquo;
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4 mt-1">
                  <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs border border-primary/20 shadow-sm shrink-0">
                    {getInitials(current.name)}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">{current.name}</h4>
                    <p className="text-xs text-para-gray">
                      {current.role}, <span className="font-semibold text-primary">{current.company}</span>
                    </p>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

            {/* Slider Navigation Controls (Dots indicator) */}
            <div className="flex justify-center items-center gap-2 mt-5 pt-3.5 border-t border-slate-100/60">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    index === currentIndex 
                      ? "bg-primary w-5" 
                      : "bg-[#c4d6e9] hover:bg-primary/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
