"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Prevent hydration mismatch
    return <div className="w-[52px] h-[28px] rounded-full bg-white/10" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="relative flex items-center w-[52px] h-[28px] rounded-full border border-white/15 bg-white/10 hover:bg-white/15 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
    >
      {/* Sliding pill */}
      <motion.div
        layout
        animate={{ x: isDark ? 2 : 24 }}
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        className="absolute w-[22px] h-[22px] rounded-full bg-white shadow-md flex items-center justify-center"
      >
        <motion.div
          key={resolvedTheme}
          initial={{ rotate: -30, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 30, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isDark ? (
            <Moon className="w-3 h-3 text-slate-700" />
          ) : (
            <Sun className="w-3 h-3 text-amber-500" />
          )}
        </motion.div>
      </motion.div>
    </button>
  );
}
