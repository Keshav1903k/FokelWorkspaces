"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  User as UserIcon, 
  LogOut, 
  LayoutDashboard, 
  ChevronDown, 
  PlusCircle, 
  Users, 
  MapPin, 
  ArrowRight,
  Building2,
  Sparkles
} from "lucide-react";
import { NAV_LINKS, CITY_HUBS, NavLinkItem } from "@/constants/data";
import { getCurrentUser, logoutUser } from "@/utils/auth";

export function Navbar() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeCityMenu, setActiveCityMenu] = useState<"Coworking Space" | "Virtual Office" | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    setCurrentUser(getCurrentUser());

    const handleAuthChange = () => {
      setCurrentUser(getCurrentUser());
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveCityMenu(null);
        setDropdownOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("auth-change", handleAuthChange);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("auth-change", handleAuthChange);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Close menus on route change
  useEffect(() => {
    setActiveCityMenu(null);
    setMobileMenuOpen(false);
  }, [pathname]);

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

  const handleSelectCity = (cityName: string, spaceType: "Coworking Space" | "Virtual Office") => {
    setActiveCityMenu(null);
    setMobileMenuOpen(false);
    const params = new URLSearchParams();
    params.set("city", cityName);
    params.set("type", spaceType);
    params.set("scroll", "true");
    router.push(`/workspaces?${params.toString()}`);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E3DDD3] py-3 text-[#18191C] shadow-sm"
          : "bg-[#FAF8F5] border-b border-[#E3DDD3]/60 py-3.5 text-[#18191C]"
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <Link href="/" className="group flex items-center">
              <img
                src="/images/logo-light.png"
                alt="Officera"
                className="h-8 sm:h-9 w-auto object-contain transition-opacity duration-200 group-hover:opacity-85"
              />
            </Link>
          </div>

          {/* Navigation Links with Explicit Coworking & Virtual Office Buttons */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => {
              const isCityDropdown = link.isCityDropdown && link.spaceType;
              const isDropdownOpen = activeCityMenu === link.spaceType;
              const isActive = pathname === link.href || (isCityDropdown && activeCityMenu === link.spaceType);

              if (isCityDropdown) {
                const words = link.name.split(" ");
                const firstWord = words[0];
                const restWords = words.slice(1).join(" ");

                return (
                  <div key={link.name} className="relative">
                    <button
                      onClick={() => {
                        setActiveCityMenu(isDropdownOpen ? null : (link.spaceType as "Coworking Space" | "Virtual Office"));
                      }}
                      className={`transition-all inline-flex items-center gap-1.5 py-0.5 px-1 rounded-sm cursor-pointer ${
                        isDropdownOpen
                          ? "text-primary font-semibold"
                          : "text-[#18191C]/85 hover:text-primary"
                      }`}
                    >
                      <div className="flex flex-col text-left leading-[1.15]">
                        <span className="text-[13px] font-medium tracking-tight">{firstWord}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-[13px] font-medium tracking-tight">{restWords}</span>
                          {link.badge && (
                            <span className="text-[8px] font-bold uppercase tracking-wider px-1 py-0.2 rounded-xs bg-primary/10 text-primary border border-primary/20">
                              {link.badge}
                            </span>
                          )}
                        </div>
                      </div>
                      <ChevronDown 
                        className={`w-3.5 h-3.5 text-[#5C5D61] shrink-0 transition-transform duration-200 ${
                          isDropdownOpen ? "rotate-180 text-primary" : ""
                        }`} 
                      />
                    </button>
                    {isDropdownOpen && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                      />
                    )}
                  </div>
                );
              }

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

          {/* User Account / CTA Actions */}
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
                          href="/workspaces/list-space"
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
                  className="text-sm font-medium text-[#18191C] hover:text-primary transition-colors px-3 py-2 cursor-pointer"
                >
                  Sign in
                </button>
                <button
                  onClick={handleGetStarted}
                  className="bg-primary hover:bg-[#A93E1B] text-white px-4 py-2 rounded-sm text-xs font-semibold transition-all shadow-sm cursor-pointer"
                >
                  Find a workspace
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-[#18191C] p-2 focus:outline-none cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Desktop City Selector Mega Menu Popover */}
      <AnimatePresence>
        {activeCityMenu && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setActiveCityMenu(null)}
              className="fixed inset-0 top-[65px] bg-black/40 backdrop-blur-xs z-40 cursor-pointer"
            />

            {/* Mega Panel Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 bg-[#FAF8F5] border-b border-[#E3DDD3] shadow-2xl z-50 py-7 text-[#18191C]"
            >
              <div className="container mx-auto px-6 max-w-7xl">
                
                {/* Panel Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 mb-6 border-b border-[#E3DDD3] gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-sm bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">
                      {activeCityMenu === "Coworking Space" ? (
                        <Users className="w-5 h-5" />
                      ) : (
                        <MapPin className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#18191C] tracking-tight">
                        {activeCityMenu === "Coworking Space" 
                          ? "Select City for Coworking Spaces" 
                          : "Select City for Virtual Offices"}
                      </h3>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const typeToRedirect = activeCityMenu;
                      setActiveCityMenu(null);
                      router.push(`/workspaces?type=${encodeURIComponent(typeToRedirect)}&scroll=true`);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-[#A93E1B] transition-colors self-start md:self-auto cursor-pointer"
                  >
                    <span>View all {activeCityMenu === "Coworking Space" ? "coworking spaces" : "virtual offices"} across India</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 7 City Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3.5">
                  {CITY_HUBS.map((city) => (
                    <button
                      key={city.name}
                      onClick={() => handleSelectCity(city.name, activeCityMenu)}
                      className="group flex flex-col text-left bg-white border border-[#E3DDD3] hover:border-primary rounded-sm overflow-hidden p-2.5 transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer"
                    >
                      {/* Photo Thumbnail */}
                      <div className="relative aspect-[16/11] w-full rounded-xs overflow-hidden bg-[#F3EFEA] mb-2.5">
                        <img
                          src={city.image}
                          alt={city.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                        <span className="absolute bottom-1.5 left-2 text-xs font-bold text-white drop-shadow-sm">
                          {city.name}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex flex-col flex-1 justify-between">
                        <div className="mb-2">
                          <span className="text-[10px] font-bold text-primary block">
                            {activeCityMenu === "Coworking Space" ? city.coworkingCount : city.virtualCount}
                          </span>
                          <p className="text-[11px] text-[#5C5D61] line-clamp-1 mt-0.5">
                            {city.popularAreas}
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-[11px] font-semibold text-[#18191C] group-hover:text-primary pt-2 border-t border-[#F3EFEA]">
                          <span>Select City</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#FAF8F5] border-b border-[#E3DDD3] overflow-hidden"
          >
            <div className="flex flex-col px-6 py-6 gap-3">
              {NAV_LINKS.map((link) => {
                const isCityDropdown = link.isCityDropdown && link.spaceType;
                const isExpanded = mobileExpanded === link.name;

                if (isCityDropdown) {
                  return (
                    <div key={link.name} className="border-b border-[#E3DDD3]/60 pb-3">
                      <button
                        onClick={() => setMobileExpanded(isExpanded ? null : link.name)}
                        className="w-full flex items-center justify-between py-1 text-base font-semibold text-[#18191C] text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span>{link.name}</span>
                          {link.badge && (
                            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm bg-primary/10 text-primary border border-primary/20">
                              {link.badge}
                            </span>
                          )}
                        </div>
                        <ChevronDown 
                          className={`w-4 h-4 text-[#5C5D61] transition-transform duration-200 ${
                            isExpanded ? "rotate-180 text-primary" : ""
                          }`} 
                        />
                      </button>

                      {isExpanded && (
                        <div className="mt-3 pl-2 flex flex-col gap-2">
                          <p className="text-xs text-[#5C5D61] mb-1">
                            Select a city for {link.name}:
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            {CITY_HUBS.map((city) => (
                              <button
                                key={city.name}
                                onClick={() => handleSelectCity(city.name, link.spaceType as "Coworking Space" | "Virtual Office")}
                                className="flex items-center justify-between p-2 rounded-sm border border-[#E3DDD3] bg-white text-xs font-semibold text-[#18191C] hover:border-primary text-left cursor-pointer"
                              >
                                <span>{city.name}</span>
                                <ArrowRight className="w-3 h-3 text-primary shrink-0" />
                              </button>
                            ))}
                          </div>
                          <button
                            onClick={() => {
                              setMobileMenuOpen(false);
                              router.push(`/workspaces?type=${encodeURIComponent(link.spaceType!)}&scroll=true`);
                            }}
                            className="text-xs font-semibold text-primary mt-2 flex items-center gap-1 cursor-pointer"
                          >
                            <span>View all across India →</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-base font-medium text-[#18191C] hover:text-primary transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-[#E3DDD3] flex flex-col gap-3">
                {!currentUser && (
                  <>
                    <button
                      onClick={() => {
                        handleOpenSignup();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-center py-2.5 border border-[#E3DDD3] rounded-sm text-sm font-medium text-[#18191C] cursor-pointer"
                    >
                      Sign in
                    </button>
                    <button
                      onClick={() => {
                        handleGetStarted();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-center py-2.5 bg-primary text-white rounded-sm text-sm font-semibold cursor-pointer"
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

