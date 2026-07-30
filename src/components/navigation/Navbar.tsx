"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Building2 } from "lucide-react";
import { NAV_LINKS } from "@/constants/data";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGetStarted = () => {
    window.dispatchEvent(new Event("open-welcome-modal"));
    setMobileMenuOpen(false);
  };

  const handleOpenSignup = () => {
    window.dispatchEvent(new Event("open-signup-modal"));
    setMobileMenuOpen(false);
  };

  const navClass = isHomepage
    ? isScrolled
      ? "bg-white border-b border-border/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] py-3 text-foreground"
      : "bg-transparent py-4 text-white"
    : "bg-white border-b border-border/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] py-3 text-foreground";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${navClass}`}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between relative">
          
          {/* Left: Logo */}
          <div className="flex-1 flex justify-start">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex items-center justify-center w-8.5 h-8.5 rounded-lg bg-primary text-white">
                <Building2 className="w-4.5 h-4.5" />
              </div>
              <span className="font-sans font-bold text-lg tracking-tight text-inherit whitespace-nowrap">
                Fokel Workspaces
              </span>
            </Link>
          </div>
 
          {/* Center: Navigation Links */}
          <div className="hidden md:flex flex-2 justify-center items-center">
            <div className="flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xs font-semibold tracking-wide text-inherit hover:text-primary transition-colors opacity-85 hover:opacity-100"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
 
          {/* Right: Action Button & Mobile Menu Toggle */}
          <div className="flex-1 flex justify-end items-center gap-3">
            <Button
              onClick={handleGetStarted}
              className={`hidden md:inline-flex rounded-lg px-5 py-2.5 text-xs font-semibold tracking-wide transition-all shadow-sm cursor-pointer ${
                isHomepage && !isScrolled
                  ? "bg-white text-primary hover:bg-white/90"
                  : "bg-primary hover:bg-primary-hover text-white"
              }`}
            >
              Get Started
            </Button>

            <button
              onClick={handleOpenSignup}
              className={`hidden md:inline-flex rounded-lg px-5 py-2.5 text-xs font-semibold tracking-wide transition-all shadow-sm cursor-pointer ${
                isHomepage && !isScrolled
                  ? "bg-white text-primary hover:bg-white/90"
                  : "bg-primary hover:bg-primary-hover text-white"
              }`}
            >
              Login / Signup
            </button>
            
            {/* Mobile Toggle */}
            <button
              className="md:hidden text-inherit p-2 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-border overflow-hidden shadow-sm text-foreground"
          >
            <div className="flex flex-col px-6 py-6 gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t border-border">
                <Button
                  onClick={handleGetStarted}
                  className="w-full rounded-lg"
                  size="lg"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
