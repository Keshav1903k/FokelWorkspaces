"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Building2, User as UserIcon, LogOut, LayoutDashboard, ChevronDown, PlusCircle } from "lucide-react";
import { NAV_LINKS } from "@/constants/data";
import { Button } from "@/components/ui/button";
import { getCurrentUser, logoutUser } from "@/utils/auth";

export function Navbar() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    setCurrentUser(getCurrentUser());

    const handleAuthChange = () => {
      setCurrentUser(getCurrentUser());
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("auth-change", handleAuthChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("auth-change", handleAuthChange);
    };
  }, []);

  const handleGetStarted = () => {
    window.dispatchEvent(new Event("open-welcome-modal"));
    setMobileMenuOpen(false);
  };

  const handleOpenSignup = () => {
    window.dispatchEvent(new Event("open-signup-modal"));
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logoutUser();
    setDropdownOpen(false);
    router.push("/");
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
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all cursor-pointer select-none text-xs font-semibold ${
                    isHomepage && !isScrolled
                      ? "bg-white/10 border-white/15 text-white hover:bg-white/15"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center font-bold text-[10px]">
                    {currentUser.name ? currentUser.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) : "U"}
                  </div>
                  <span className="hidden sm:inline max-w-[100px] truncate">{currentUser.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-56 bg-white border border-slate-100 rounded-xl shadow-lg z-50 overflow-hidden text-slate-700 p-1.5"
                      >
                        <div className="px-3.5 py-2.5 bg-slate-50/50 rounded-lg mb-1">
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Signed In As</p>
                          <p className="text-xs font-bold text-slate-800 truncate">{currentUser.name}</p>
                          <p className="text-[11px] text-slate-500 truncate mt-0.5">{currentUser.email}</p>
                        </div>

                        <Link
                          href="/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors text-slate-600 hover:text-slate-800"
                        >
                          <LayoutDashboard className="w-4 h-4 opacity-75" />
                          Go to Dashboard
                        </Link>
                        <Link
                          href="/list-space"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors text-slate-600 hover:text-slate-800"
                        >
                          <PlusCircle className="w-4 h-4 opacity-75" />
                          List a Workspace
                        </Link>

                        <div className="h-px bg-slate-100 my-1" />

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-lg hover:bg-rose-50 hover:text-rose-600 transition-colors text-slate-600 text-left cursor-pointer"
                        >
                          <LogOut className="w-4 h-4 opacity-75" />
                          Log Out
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
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
              </>
            )}
            
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
                {currentUser ? (
                  <div className="flex flex-col gap-3">
                    <div className="px-1 py-1">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Logged In As</p>
                      <p className="text-sm font-bold text-slate-800 truncate">{currentUser.name}</p>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{currentUser.email}</p>
                    </div>
                    <Link
                      href="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full rounded-lg bg-primary text-white py-3 text-center text-xs font-semibold hover:bg-primary-hover transition-colors animate-fade-in"
                    >
                      Go to Dashboard
                    </Link>
                    <Link
                      href="/list-space"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full rounded-lg border border-slate-200 text-slate-700 py-3 text-center text-xs font-semibold hover:bg-slate-50 transition-colors"
                    >
                      List a Workspace
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full rounded-lg bg-rose-50 text-rose-600 py-3 text-center text-xs font-semibold hover:bg-rose-100 transition-colors cursor-pointer"
                    >
                      Log Out
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Button
                      onClick={handleGetStarted}
                      className="w-full rounded-lg"
                      size="lg"
                    >
                      Get Started
                    </Button>
                    <button
                      onClick={() => {
                        handleOpenSignup();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full rounded-lg border border-slate-200 text-slate-700 py-3 text-center text-sm font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      Login / Signup
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
