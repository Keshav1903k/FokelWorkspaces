"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  MapPin, 
  CheckCircle, 
  ArrowRight, 
  HelpCircle, 
  FilterX, 
  ChevronDown 
} from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, Suspense } from "react";
import { WORKSPACES, CITIES, WORKSPACE_TYPES } from "@/constants/data";
import { AdvancedSearch } from "@/components/search/AdvancedSearch";

const WORKSPACE_OPTIONS = [
  {
    title: "Virtual Office Address",
    description: "Secure a premium, compliant business address in top commercial districts. Perfect for GST registration, company incorporation, and digital mail handling without leasing physical space.",
    features: ["100% Compliant Lease Agreement", "NOC from Landlord & Utility Bills", "Digital Mail Scanning & Forwarding", "Optional Receptionist Call Handling"],
    price: "Starts at ₹999/month",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Vibrant Coworking Desks",
    description: "Work alongside a community of tech builders and founders. Choose between flexible hot desks or a dedicated desk with high-speed internet, power backup, and breakout spaces.",
    features: ["Superfast Fiber Internet", "Access to Meeting Rooms", "Free Premium Tea & Coffee", "Vibrant Networking Events"],
    price: "Starts at ₹5,999/month",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Private Managed Cabins",
    description: "Fully furnished, lockable office cabins designed for teams of 2 to 20. Enjoy corporate acoustic isolation, customizable team desks, and private biometric access.",
    features: ["Biometric Access Control", "Whiteboard & Display Screens", "Dedicated Lockers", "Daily Housekeeping & IT Desk"],
    price: "Starts at ₹12,999/month",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=600"
  }
];

const CATEGORY_CARDS = [
  {
    title: "Coworking Space",
    tagline: "Full-time offices for teams of all sizes",
    features: [
      "Dedicated seats & private cabins",
      "Fully-equipped coworking spaces",
      "Ideal for individual or small teams"
    ],
    exploreText: "Explore Coworking Space",
    type: "Coworking Space",
    image: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Managed Office",
    tagline: "Dedicated office space managed by a provider",
    features: [
      "Fully furnished customized office",
      "Fully managed operations & housekeeping",
      "Ideal for 50+ team size"
    ],
    exploreText: "Explore Managed Office",
    type: "Managed Office",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Office/Commercial Spaces",
    tagline: "Rent/Lease office space for your company",
    features: [
      "Long term contracts (3 or more years)",
      "Full customizations with self managed amenities",
      "Ideal for 100+ team size"
    ],
    exploreText: "Explore Office/Commercial",
    type: "Office/Commercial Spaces",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Virtual Office",
    tagline: "Professional business address and compliance setup",
    features: [
      "Premium corporate mailing address",
      "GST registration and business license support",
      "Mail handling & dedicated reception services"
    ],
    exploreText: "Explore Virtual Office",
    type: "Virtual Office",
    image: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&q=80&w=600"
  }
];

const CITY_CARDS = [
  {
    name: "Bangalore",
    image: "https://images.unsplash.com/photo-1709967884183-7ffa9d168508?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzg2MDk5MTI2fA&ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=400" // Vidhana Soudha
  },
  {
    name: "Mumbai",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80&w=400" // Gateway of India
  },
  {
    name: "Delhi NCR",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=400" // India Gate
  },
  {
    name: "Hyderabad",
    image: "/images/hyderabad.jpg" // User Charminar
  },
  {
    name: "Pune",
    image: "/images/pune.jpg" // User Shaniwar Wada
  },
  {
    name: "Chennai",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=400" // Kapaleeshwarar Temple
  },
  {
    name: "Kolkata",
    image: "https://images.unsplash.com/photo-1536421469767-80559bb6f5e1?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzg2MDk5MjkzfA&ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=400" // Howrah Bridge
  }
];

function WorkspacesPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const cityParam = searchParams.get("city");
  const typeParam = searchParams.get("type");

  const selectedCity = cityParam || "All";
  const selectedType = typeParam || "All";

  const handleCardClick = (type: string) => {
    if (selectedType === type) {
      updateFilters(selectedCity, "All", false);
    } else {
      updateFilters(selectedCity, type, true);
    }
  };

  const handleCityCardClick = (city: string) => {
    if (selectedCity === city) {
      updateFilters("All", selectedType, false);
    } else {
      updateFilters(city, selectedType, true);
    }
  };

  const filteredWorkspaces = WORKSPACES.filter((w) => {
    const matchesCity = selectedCity === "All" || w.city === selectedCity;
    const matchesType = selectedType === "All" || w.type === selectedType;
    return matchesCity && matchesType;
  });

  const shouldScroll = searchParams.get("scroll") === "true";

  useEffect(() => {
    if (shouldScroll) {
      const timer = setTimeout(() => {
        const element = document.getElementById("listings");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          
          // Clean up the scroll parameter from the URL bar without triggering a reload
          const newParams = new URLSearchParams(window.location.search);
          newParams.delete("scroll");
          const newRelativePathQuery = window.location.pathname + (newParams.toString() ? `?${newParams.toString()}` : "");
          window.history.replaceState(null, "", newRelativePathQuery);
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [shouldScroll, searchParams]);

  const handleGetStarted = () => {
    window.dispatchEvent(new Event("open-welcome-modal"));
  };

  const updateFilters = (city: string, type: string, scrollToListings = false) => {
    const params = new URLSearchParams();
    if (city !== "All") params.set("city", city);
    if (type !== "All") params.set("type", type);
    router.push(`/services/workspaces?${params.toString()}`, { scroll: false });

    if (scrollToListings) {
      setTimeout(() => {
        const element = document.getElementById("properties-grid");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  const clearFilters = () => {
    router.push("/services/workspaces");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="bg-slate-950 pt-24 pb-20 md:pt-32 md:pb-28 text-center relative z-30 -mt-6">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0 opacity-20 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1600"
            alt="Fokel Premium Workspace"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/85" />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 max-w-5xl flex flex-col items-center">
          <h1 className="text-3xl md:text-5xl font-semibold text-white tracking-tight leading-tight mb-4">
            Flexible, Premium Workspaces
          </h1>
          <p className="text-[#C9D6E3] text-xs sm:text-sm max-w-2xl opacity-90 leading-relaxed mb-8">
            From digital mailing addresses to custom office floors, we provide flexible spaces that adapt to your team size and operational needs.
          </p>

          {/* Search box directly in the Hero */}
          {selectedType === "All" && (
            <div className="w-full max-w-3xl mt-4">
              <AdvancedSearch />
            </div>
          )}
        </div>
      </section>

      {/* Real-time Matching Listings */}
      <section id="listings" className="py-24 bg-slate-50 border-b border-[#E8EDF2] relative z-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground tracking-tight">
                Available Spaces in Selected Areas
              </h2>
              <p className="text-para-gray text-xs mt-1">
                Explore fully certified and pre-configured workspace properties ready for immediate launch.
              </p>
            </div>

            {/* Quick Filter Selection */}
            <div className="flex flex-wrap gap-2">
              <div className="relative flex items-center">
                <select
                  value={selectedCity}
                  onChange={(e) => updateFilters(e.target.value, selectedType)}
                  className="appearance-none pl-5 pr-10 py-2.5 text-xs font-bold border border-slate-200 rounded-full bg-white hover:bg-slate-50 transition-colors outline-none cursor-pointer text-slate-700 min-w-[150px] shadow-sm w-full"
                >
                  <option value="All">All Cities</option>
                  {CITIES.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>

              <div className="relative flex items-center">
                <select
                  value={selectedType}
                  onChange={(e) => updateFilters(selectedCity, e.target.value)}
                  className="appearance-none pl-5 pr-10 py-2.5 text-xs font-bold border border-slate-200 rounded-full bg-white hover:bg-slate-50 transition-colors outline-none cursor-pointer text-slate-700 min-w-[170px] shadow-sm w-full"
                >
                  <option value="All">All Space Types</option>
                  {WORKSPACE_TYPES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>

              {(selectedCity !== "All" || selectedType !== "All") && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2.5 text-xs font-bold text-destructive hover:bg-destructive/5 border border-destructive/10 rounded-full flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <FilterX className="w-3 h-3" /> Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Category Cards Slider */}
          <div className="relative mb-14 group">
            <div
              className="flex gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {CATEGORY_CARDS.map((card) => {
                const isActive = selectedType === card.type;
                return (
                  <div
                    key={card.type}
                    onClick={() => handleCardClick(card.type)}
                    className={`flex-shrink-0 w-[305px] sm:w-[335px] text-left bg-white border rounded-2xl overflow-hidden shadow-sm transition-all duration-300 snap-start flex flex-col h-[385px] cursor-pointer hover:shadow-md ${
                      isActive
                        ? "border-primary ring-1 ring-primary/45 shadow-[0_8px_30px_rgb(48,87,137,0.06)]"
                        : "border-[#E8EDF2] hover:border-[#c4d6e9]"
                    }`}
                  >
                    {/* Image */}
                    <div className="relative w-full h-[135px] overflow-hidden bg-slate-50 border-b border-slate-100 shrink-0">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col flex-grow justify-between gap-3">
                      <div>
                        <h3 className="text-base font-bold text-slate-800 mb-1 group-hover:text-primary transition-colors">
                          {card.title}
                        </h3>
                        <p className="text-[#5C6B76] text-xs leading-relaxed font-semibold min-h-[2.4rem]">
                          {card.tagline}
                        </p>
                        
                        {/* Bullet points */}
                        <ul className="flex flex-col gap-1.5 pt-3 border-t border-slate-100 mt-3">
                          {card.features.map((feature, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-2 text-[11px] sm:text-xs font-semibold text-slate-500">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                              <span className="leading-tight">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-1 flex items-center gap-1 text-xs font-bold text-primary group-hover:text-primary-hover transition-colors">
                        <span>{card.exploreText}</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-250 group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cities Filter Slider */}
          <div className="mb-12 flex flex-col items-center">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4 text-center">
              Select Metro City
            </h3>
            <div
              className="flex w-full gap-4 overflow-x-auto pt-3 pb-3 scrollbar-none snap-x snap-mandatory scroll-smooth lg:justify-center"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {CITY_CARDS.map((city) => {
                const isActive = selectedCity === city.name;
                return (
                  <div
                    key={city.name}
                    onClick={() => handleCityCardClick(city.name)}
                    className={`flex-shrink-0 w-[140px] sm:w-[160px] h-[90px] rounded-xl overflow-hidden relative cursor-pointer snap-start transition-all duration-300 group hover:shadow-md ${
                      isActive 
                        ? "ring-2 ring-primary ring-offset-2 scale-[1.02]" 
                        : "border border-[#E8EDF2] opacity-85 hover:opacity-100"
                    }`}
                  >
                    {/* Background City Image */}
                    <img
                      src={city.image}
                      alt={city.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Dark overlay */}
                    <div className={`absolute inset-0 transition-colors duration-300 ${
                      isActive ? "bg-primary/40" : "bg-black/45 group-hover:bg-black/35"
                    }`} />
                    
                    {/* City Name Center Text */}
                    <div className="absolute inset-0 flex items-center justify-center p-2 text-center z-10">
                      <span className="text-xs font-extrabold uppercase tracking-widest text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        {city.name}
                      </span>
                    </div>

                    {/* Active Check Indicator */}
                    {isActive && (
                      <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-0.5 shadow-sm z-20">
                        <CheckCircle className="w-3 h-3 text-white fill-white" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Properties Grid */}
          <motion.div id="properties-grid" layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredWorkspaces.length > 0 ? (
                filteredWorkspaces.map((space) => (
                  <motion.div
                    layout
                    key={space.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white border border-[#E8EDF2] rounded-xl overflow-hidden group hover:border-[#c4d6e9] hover:shadow-md transition-all duration-300 flex flex-col h-full"
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-50">
                      <img
                        src={space.image}
                        alt={space.title}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="text-[9px] font-bold tracking-wide px-2.5 py-1 rounded bg-white text-slate-700 shadow-sm border border-slate-100 flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5 text-primary" />
                          {space.type}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="mb-4">
                        <h3 className="text-sm font-bold text-slate-800 mb-1 group-hover:text-primary transition-colors">
                          {space.title}
                        </h3>
                        <p className="text-[10px] font-semibold text-slate-400 flex items-center gap-0.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          {space.location}
                        </p>
                      </div>

                      {/* Amenities */}
                      <div className="flex flex-wrap gap-1 mb-5">
                        {space.amenities.map((item, idx) => (
                          <span
                            key={idx}
                            className="text-[9px] font-bold bg-slate-50 text-slate-500 px-2 py-0.5 rounded border border-[#E8EDF2]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      {/* Pricing / CTA */}
                      <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Pricing</p>
                          <p className="text-xs font-bold text-slate-800">{space.price}</p>
                        </div>
                        <button
                          onClick={handleGetStarted}
                          className="px-4 py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-[10px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          Explore Space
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full py-16 text-center bg-white rounded-2xl border border-dashed border-slate-200"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center mx-auto mb-4 border border-[#E8EDF2]">
                    <FilterX className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground mb-1">No matching properties found</h3>
                  <p className="text-muted-foreground text-xs max-w-sm mx-auto mb-4">
                    We don&apos;t have workspaces matching both &quot;{selectedCity}&quot; and &quot;{selectedType}&quot; in this selection.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-5 py-2.5 rounded-lg bg-primary text-white text-[10px] font-semibold hover:bg-primary-hover transition-colors cursor-pointer shadow-sm"
                  >
                    Reset Search Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* General Workspace Options Grid */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3.5 py-1 rounded bg-slate-100 border border-[#E8EDF2] text-[10px] font-bold tracking-wider uppercase text-secondary">
              Product Categories
            </span>
            <h2 className="text-3xl font-bold text-foreground mt-4 mb-4 tracking-tight">
              Our Managed Services
            </h2>
            <p className="text-para-gray text-xs sm:text-sm">
              Fully furnished managed office environments built to support all business growth steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {WORKSPACE_OPTIONS.map((option, idx) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white border border-[#E8EDF2] rounded-2xl overflow-hidden shadow-[0_6px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)] hover:border-[#c4d6e9] transition-all duration-300 flex flex-col h-full group"
              >
                {/* Visual Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-50">
                  <img
                    src={option.image}
                    alt={option.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                </div>

                {/* Content Block */}
                <div className="p-6 flex flex-col flex-1 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#DEE9F4] text-primary flex items-center justify-center border border-[#c4d6e9]">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">{option.price}</span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-foreground tracking-tight group-hover:text-primary transition-colors mb-2 min-h-[2.5rem] flex items-center">
                      {option.title}
                    </h3>
                    <p className="text-para-gray text-xs leading-relaxed min-h-[4.5rem]">
                      {option.description}
                    </p>
                  </div>

                  {/* Bullet points */}
                  <ul className="flex flex-col gap-2 pt-4 border-t border-slate-100 mt-auto">
                    {option.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                        <CheckCircle className="w-4 h-4 text-[#3F5719] shrink-0" />
                        <span className="truncate" title={feature}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={handleGetStarted}
                    className="w-full mt-2 px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-semibold tracking-wide transition-colors shadow-sm cursor-pointer text-center"
                  >
                    Request Workspace Tour
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-slate-50 border-t border-[#E8EDF2]">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-foreground">Workspace FAQs</h3>
            <p className="text-para-gray text-xs mt-2">Common questions regarding renting and virtual compliance.</p>
          </div>

          <div className="flex flex-col gap-4 bg-white border border-[#E8EDF2] rounded-2xl p-8 shadow-sm">
            {[
              {
                q: "What is a virtual office and how does it work?",
                a: "A virtual office gives your business a prime commercial address for registration and GST compliance without leasing physical space. We scan and email your mail, and you can book physical desks or meeting rooms as needed."
              },
              {
                q: "How fast can I move into a private cabin?",
                a: "Our private managed cabins are fully set up. Once the agreement is signed and billing is verified, you can move your team in and start work within 24 to 48 hours."
              },
              {
                q: "Is tea, coffee, and internet included?",
                a: "Yes! High-speed secure fiber internet, power backup, unlimited premium tea, coffee, water, and cleaning services are fully bundled with all physical coworking and cabin desks."
              }
            ].map((faq, index) => (
              <div key={index} className="border-b border-slate-100 last:border-0 pb-4 last:pb-0">
                <h4 className="text-xs font-bold text-foreground mb-1.5 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-secondary shrink-0" />
                  {faq.q}
                </h4>
                <p className="text-para-gray text-xs leading-relaxed pl-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="py-16 bg-[#485A71] text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#485A71]" />
        <div className="relative z-10 container mx-auto px-6 max-w-3xl flex flex-col items-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight mb-4">
            Need a Custom Enterprise Office Floor?
          </h2>
          <p className="text-white/80 text-xs max-w-lg mb-6 leading-relaxed">
            Speak directly with our commercial space planners to custom brand and lay out a dedicated workspace office suite for team sizes of 30+.
          </p>
          <button
            onClick={handleGetStarted}
            className="px-6 py-3 rounded-lg bg-white text-[#485A71] font-semibold text-xs transition-colors hover:bg-slate-100 cursor-pointer shadow-sm"
          >
            Schedule Consultation
          </button>
        </div>
      </section>
    </div>
  );
}

export default function WorkspacesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white text-slate-500 text-sm font-semibold">Loading workspaces...</div>}>
      <WorkspacesPageContent />
    </Suspense>
  );
}
