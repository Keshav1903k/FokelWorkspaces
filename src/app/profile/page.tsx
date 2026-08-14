"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  MapPin, 
  PlusCircle, 
  LogOut, 
  ArrowRight, 
  Briefcase, 
  CheckCircle2, 
  ShieldCheck, 
  Mail, 
  Calendar, 
  User,
  Plus
} from "lucide-react";
import { getCurrentUser, logoutUser, User as AuthUser } from "@/utils/auth";
import Link from "next/link";

const RECOMMENDED_SPACES = [
  {
    id: "rec_1",
    title: "Indiranagar Hybrid Hub",
    locality: "Indiranagar",
    city: "Bangalore",
    type: "Coworking Space",
    price: "₹6,999/month",
    image: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "rec_2",
    title: "Connaught Place Suites",
    locality: "Connaught Place",
    city: "Delhi NCR",
    type: "Managed Office",
    price: "₹14,999/month",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "rec_3",
    title: "Cyber City Pods",
    locality: "DLF Cyber City",
    city: "Delhi NCR",
    type: "Virtual Office",
    price: "₹3,499/month",
    image: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&q=80&w=400",
  }
];

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [listedProperties, setListedProperties] = useState<any[]>([]);
  const [activeBookings, setActiveBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check user on mount
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);

    if (currentUser) {
      loadData(currentUser.email);
    }

    const handleAuthChange = () => {
      const u = getCurrentUser();
      setUser(u);
      if (u) {
        loadData(u.email);
      } else {
        setListedProperties([]);
        setActiveBookings([]);
      }
    };

    window.addEventListener("auth-change", handleAuthChange);
    return () => {
      window.removeEventListener("auth-change", handleAuthChange);
    };
  }, []);

  const loadData = (email: string) => {
    // Load properties
    const props = localStorage.getItem("listed_properties");
    if (props) {
      try {
        const parsed = JSON.parse(props);
        const filtered = parsed.filter((p: any) => p.ownerEmail === email);
        setListedProperties(filtered);
      } catch (e) {}
    }

    // Load bookings
    const bookings = localStorage.getItem("active_bookings");
    if (bookings) {
      try {
        const parsed = JSON.parse(bookings);
        const filtered = parsed.filter((b: any) => b.userEmail === email);
        setActiveBookings(filtered);
      } catch (e) {}
    }
  };

  const handleBookSpace = (space: any) => {
    if (!user) return;

    const newBooking = {
      id: "book_" + Date.now(),
      userEmail: user.email,
      title: space.title,
      locality: space.locality,
      city: space.city,
      type: space.type,
      price: space.price,
      image: space.image,
      dateBooked: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      status: "Active",
    };

    const bookingsStr = localStorage.getItem("active_bookings");
    let bookingsArray = [];
    if (bookingsStr) {
      try {
        bookingsArray = JSON.parse(bookingsStr);
      } catch (e) {}
    }
    bookingsArray.push(newBooking);
    localStorage.setItem("active_bookings", JSON.stringify(bookingsArray));
    setActiveBookings((prev) => [...prev, newBooking]);
    alert(`Successfully booked ${space.title}! It is now active in your dashboard.`);
  };

  const handleCancelBooking = (bookingId: string) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    const bookingsStr = localStorage.getItem("active_bookings");
    if (bookingsStr) {
      try {
        const parsed = JSON.parse(bookingsStr);
        const updated = parsed.filter((b: any) => b.id !== bookingId);
        localStorage.setItem("active_bookings", JSON.stringify(updated));
        if (user) {
          setActiveBookings(updated.filter((b: any) => b.userEmail === user.email));
        }
      } catch (e) {}
    }
  };

  const handleLogout = () => {
    logoutUser();
    router.push("/");
  };

  const handleOpenSignup = () => {
    window.dispatchEvent(new Event("open-signup-modal"));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 py-16 -mt-6">
        <div className="container mx-auto px-6 max-w-md text-center">
          <div className="bg-white border border-[#E8EDF2] rounded-2xl p-8 shadow-[0_6px_24px_rgba(0,0,0,0.03)] flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 mb-6">
              <Building2 className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Access Your Workspace Dashboard</h2>
            <p className="text-slate-400 text-xs sm:text-sm mb-6 leading-relaxed">
              Create an account or login to track workspaces booked by you, review your listed commercial properties, and access member benefits.
            </p>
            <button
              onClick={handleOpenSignup}
              className="w-full py-3 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2"
            >
              Sign Up / Login <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const userInitials = user.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <div className="min-h-screen bg-slate-50 pb-24 -mt-6">
      {/* 1. Header Banner */}
      <section className="bg-[#DEE9F4] pt-20 pb-20 md:pt-24 md:pb-24 border-b border-[#c4d6e9] relative">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="flex items-center gap-4 text-left">
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl border border-white/20 shadow-md">
                {userInitials}
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded bg-white/50 border border-white/50 text-[10px] font-bold tracking-wider uppercase text-primary mb-1 inline-block">
                  Workspace Partner
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
                  {user.name}
                </h1>
                <p className="text-[#5C6B76] text-xs font-medium flex items-center gap-1.5 mt-0.5">
                  <Mail className="w-3.5 h-3.5 opacity-75" /> {user.email}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                href="/list-space"
                className="px-5 py-2.5 rounded-lg bg-white border border-[#c4d6e9] hover:border-[#a8c3df] text-slate-700 font-semibold hover:bg-slate-50/50 transition-colors text-xs flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4 text-primary" /> List Workspace
              </Link>
              <button
                onClick={handleLogout}
                className="px-5 py-2.5 rounded-lg bg-rose-50 border border-rose-100 hover:bg-rose-100/50 text-rose-600 font-semibold transition-colors text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-4 h-4" /> Log Out
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Main Dashboard Content Grid */}
      <div className="container mx-auto px-6 max-w-7xl mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Active Bookings & Recommendations */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            {/* Active Bookings Card */}
            <div className="bg-white border border-[#E8EDF2] rounded-2xl p-6 md:p-8 shadow-[0_6px_24px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 text-primary flex items-center justify-center">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-800">Your Active Workspaces</h2>
                  <p className="text-[10px] text-slate-400 font-semibold">Spaces currently rented or used by your team</p>
                </div>
              </div>

              {activeBookings.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {activeBookings.map((booking) => (
                    <div 
                      key={booking.id}
                      className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-full sm:w-28 aspect-[16/10] sm:aspect-square rounded-lg overflow-hidden shrink-0 border border-slate-150">
                        <img src={booking.image} alt={booking.title} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h3 className="text-sm font-bold text-slate-800 leading-tight">{booking.title}</h3>
                            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 font-extrabold text-[9px] uppercase tracking-wider">
                              {booking.status}
                            </span>
                          </div>
                          <p className="text-[#5C6B76] text-xs font-semibold flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3 text-slate-400" /> {booking.locality}, {booking.city}
                          </p>
                          <p className="text-[10px] text-slate-400 font-semibold mt-1">
                            Type: <span className="font-bold text-slate-500">{booking.type}</span>
                          </p>
                        </div>

                        <div className="flex items-center justify-between border-t border-slate-200/50 pt-2.5 mt-3">
                          <div>
                            <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">Billing Rate</p>
                            <p className="text-xs font-bold text-slate-700">{booking.price}</p>
                          </div>
                          <button
                            onClick={() => handleCancelBooking(booking.id)}
                            className="text-[10px] font-bold text-rose-500 hover:text-rose-700 transition-colors cursor-pointer"
                          >
                            Cancel Agreement
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border border-dashed border-slate-200 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto text-slate-400 mb-3">
                    <Briefcase className="w-4 h-4 opacity-75" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-700 mb-0.5">No Active Workspace Bookings</h3>
                  <p className="text-slate-400 text-[11px] max-w-xs mx-auto mb-4">
                    Ready to set up your team desk, custom office suite, or business GST registration endpoint?
                  </p>
                  <Link 
                    href="/services"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-hover text-white text-[10px] font-semibold rounded-lg transition-colors shadow-sm"
                  >
                    Browse Office Spaces <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>

            {/* Recommended Workspaces Section */}
            <div className="bg-white border border-[#E8EDF2] rounded-2xl p-6 md:p-8 shadow-[0_6px_24px_rgba(0,0,0,0.02)]">
              <h2 className="text-sm font-bold text-slate-800 mb-1">Launch Instant Address or Workspace</h2>
              <p className="text-[10px] text-slate-400 font-semibold mb-5">Select a premium workspace asset below to book and assign to your team instantly</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {RECOMMENDED_SPACES.map((space) => (
                  <div 
                    key={space.id}
                    className="border border-[#E8EDF2] rounded-xl overflow-hidden flex flex-col justify-between group hover:border-[#c4d6e9] transition-all bg-white"
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-slate-50 border-b border-[#E8EDF2]">
                      <img src={space.image} alt={space.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" />
                    </div>
                    <div className="p-3 flex-grow flex flex-col justify-between">
                      <div className="mb-3 text-left">
                        <h3 className="text-xs font-bold text-slate-800 leading-tight mb-1 truncate">{space.title}</h3>
                        <p className="text-[10px] text-slate-500 font-semibold flex items-center gap-0.5">
                          <MapPin className="w-2.5 h-2.5 text-slate-400" /> {space.locality}, {space.city}
                        </p>
                      </div>
                      <div className="flex items-center justify-between border-t border-slate-100 pt-2">
                        <span className="text-[10px] font-bold text-slate-700">{space.price}</span>
                        <button
                          onClick={() => handleBookSpace(space)}
                          className="px-2 py-1 rounded bg-primary/10 hover:bg-primary text-primary hover:text-white text-[9px] font-bold transition-colors cursor-pointer flex items-center gap-0.5"
                        >
                          <Plus className="w-2.5 h-2.5" /> Book
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Properties Listed by You */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="bg-white border border-[#E8EDF2] rounded-2xl p-6 md:p-8 shadow-[0_6px_24px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 text-primary flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-800">Your Listed Properties</h2>
                  <p className="text-[10px] text-slate-400 font-semibold">Spaces you submitted for monetization partnerships</p>
                </div>
              </div>

              {listedProperties.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {listedProperties.map((prop) => (
                    <div 
                      key={prop.id}
                      className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors text-left"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h3 className="text-sm font-bold text-slate-800 leading-tight">{prop.spaceName}</h3>
                          <p className="text-[10px] text-slate-500 font-semibold flex items-center gap-0.5 mt-0.5">
                            <MapPin className="w-2.5 h-2.5 text-slate-400" /> {prop.locality}, {prop.city}
                          </p>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-100 font-extrabold text-[9px] uppercase tracking-wider shrink-0">
                          {prop.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-slate-200/50 text-xs">
                        <div>
                          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Capacity Seats</span>
                          <p className="font-bold text-slate-700">{prop.capacitySeats} Seats</p>
                        </div>
                        <div>
                          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Listed Date</span>
                          <p className="font-semibold text-slate-700">{prop.dateListed}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border border-dashed border-slate-200 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto text-slate-400 mb-3">
                    <Building2 className="w-4 h-4 opacity-75" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-700 mb-0.5">No Properties Listed Yet</h3>
                  <p className="text-slate-400 text-[11px] max-w-xs mx-auto mb-4">
                    Have empty office cabins, commercial halls, or building spaces to monetize? Get them audited by our IT success team.
                  </p>
                  <Link 
                    href="/list-space"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-hover text-white text-[10px] font-semibold rounded-lg transition-colors shadow-sm"
                  >
                    List Your Property <Plus className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
