"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ToolCard } from "@/components/cards/ToolCard";
import { MOCK_TOOLS } from "@/constants/data";

export function TrendingTools() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-500, 0]);

  const row1 = MOCK_TOOLS.slice(10, 18);
  const row2 = MOCK_TOOLS.slice(18, 26);

  return (
    <section ref={containerRef} className="py-32 overflow-hidden bg-secondary border-t border-border">
      <div className="container mx-auto px-6 max-w-7xl mb-16">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground tracking-tight text-center">
          Trending this week
        </h2>
      </div>

      <div className="flex flex-col gap-8 w-[200vw] lg:w-[150vw] -ml-[50vw] lg:-ml-[25vw]">
        <motion.div style={{ x: x1 }} className="flex gap-6 px-6">
          {row1.map((tool, idx) => (
            <div key={tool.id} className="w-[300px] shrink-0">
              <ToolCard tool={tool} index={idx} />
            </div>
          ))}
        </motion.div>

        <motion.div style={{ x: x2 }} className="flex gap-6 px-6">
          {row2.map((tool, idx) => (
            <div key={tool.id} className="w-[300px] shrink-0">
              <ToolCard tool={tool} index={idx} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
