"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User as UserIcon, LogOut, LayoutDashboard, ChevronDown, PlusCircle } from "lucide-react";
import { NAV_LINKS } from "@/constants/data";
import { getCurrentUser, logoutUser } from "@/utils/auth";

export function Navbar() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
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
    if (!confirm("Are you sure you want to log out?")) return;
    logoutUser();
    setDropdownOpen(false);
    router.push("/");
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E3DDD3] py-3.5 text-[#18191C] shadow-sm"
          : "bg-[#FAF8F5] border-b border-[#E3DDD3]/60 py-4 text-[#18191C]"
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <Link href="/" className="group flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-[#18191C] group-hover:text-primary transition-colors">
                Fokel
              </span>
              <span className="text-xs font-medium px-2 py-0.5 border border-[#E3DDD3] text-[#5C5D61] rounded-sm hidden sm:inline-block">
                Workspaces
              </span>
            </Link>
          </div>

          {/* Clean Navigation Links (Sentence Case) */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative py-1 ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-[#18191C]/80 hover:text-[#18191C]"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-sm border border-[#E3DDD3] bg-white text-xs font-semibold text-[#18191C] hover:bg-[#F3EFEA] transition-all cursor-pointer"
                >
                  <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center font-bold text-[10px]">
                    {currentUser.name ? currentUser.name[0].toUpperCase() : "U"}
                  </div>
                  <span className="hidden sm:inline max-w-[110px] truncate">{currentUser.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="absolute right-0 mt-2 w-56 bg-white border border-[#E3DDD3] rounded-sm shadow-xl z-50 p-2 text-[#18191C]"
                      >
                        <div className="px-3 py-2 bg-[#FAF8F5] border-b border-[#E3DDD3] mb-1">
                          <p className="text-xs text-[#5C5D61]">Signed in as</p>
                          <p className="text-xs font-bold text-[#18191C] truncate">{currentUser.name}</p>
                        </div>
                        <Link
                          href="/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-sm hover:bg-[#F3EFEA] transition-colors"
                        >
                          <LayoutDashboard className="w-3.5 h-3.5 opacity-70" />
                          Dashboard
                        </Link>
                        <Link
                          href="/list-space"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-sm hover:bg-[#F3EFEA] transition-colors"
                        >
                          <PlusCircle className="w-3.5 h-3.5 opacity-70" />
                          List a workspace
                        </Link>
                        <div className="h-px bg-[#E3DDD3] my-1" />
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-sm transition-colors text-left"
                        >
                          <LogOut className="w-3.5 h-3.5 opacity-70" />
                          Sign out
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-3">
                <button
                  onClick={handleOpenSignup}
                  className="text-sm font-medium text-[#18191C] hover:text-primary transition-colors px-3 py-2"
                >
                  Sign in
                </button>
                <button
                  onClick={handleGetStarted}
                  className="bg-primary hover:bg-[#A93E1B] text-white px-4 py-2 rounded-sm text-xs font-semibold transition-all shadow-sm"
                >
                  Find a workspace
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-[#18191C] p-2 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#FAF8F5] border-b border-[#E3DDD3] overflow-hidden"
          >
            <div className="flex flex-col px-6 py-6 gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium text-[#18191C] hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-[#E3DDD3] flex flex-col gap-3">
                {!currentUser && (
                  <>
                    <button
                      onClick={() => {
                        handleOpenSignup();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-center py-2.5 border border-[#E3DDD3] rounded-sm text-sm font-medium text-[#18191C]"
                    >
                      Sign in
                    </button>
                    <button
                      onClick={() => {
                        handleGetStarted();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-center py-2.5 bg-primary text-white rounded-sm text-sm font-semibold"
                    >
                      Find a workspace
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
