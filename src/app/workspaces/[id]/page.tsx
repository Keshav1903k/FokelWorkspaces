"use client";

import { use, useState } from "react";
import { WORKSPACES } from "@/constants/data";
import { 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft, 
  Calendar, 
  Users, 
  Wifi, 
  Coffee, 
  Shield, 
  Clock,
  Building2,
  Share2,
  Heart
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function WorkspaceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const spaceId = resolvedParams.id;
  const space = WORKSPACES.find((w) => w.id === spaceId) || WORKSPACES[0];

  const [bookingSuccess, setBookingSuccess] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-[#5C5D61] mb-6">
          <Link href="/workspaces" className="hover:text-primary transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Workspaces
          </Link>
          <span>/</span>
          <span className="text-primary font-semibold">{space.city}</span>
          <span>/</span>
          <span className="text-[#18191C] font-semibold truncate">{space.title}</span>
        </div>

        {/* Main Grid Header */}
        <div className="bg-white border border-[#E3DDD3] rounded-sm p-6 sm:p-8 mb-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="bg-[#18191C] text-white text-xs font-semibold px-2.5 py-0.5 rounded-sm flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Verified Operator
                </span>
                <span className="bg-[#FAF8F5] border border-[#E3DDD3] text-primary text-xs font-semibold px-2.5 py-0.5 rounded-sm">
                  {space.type}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#18191C] tracking-tight mb-2">
                {space.title}
              </h1>
              <p className="text-xs sm:text-sm text-[#5C5D61] flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary shrink-0" /> {space.location}
              </p>
            </div>

            <div className="flex items-center gap-4 border-t lg:border-t-0 border-[#E3DDD3] pt-4 lg:pt-0">
              <div className="text-right">
                <span className="text-xs text-[#5C5D61] block">Starting from</span>
                <span className="text-2xl font-bold text-primary">{space.price}</span>
              </div>
              <button
                onClick={() => setBookingSuccess(true)}
                className="bg-primary hover:bg-[#A93E1B] text-white px-6 py-3 rounded-sm text-xs font-semibold shadow-md transition-all cursor-pointer"
              >
                Schedule Tour →
              </button>
            </div>
          </div>
        </div>

        {/* Image & Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Main Section */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* Gallery Frame */}
            <div className="relative aspect-[16/10] overflow-hidden bg-[#F3EFEA] border border-[#E3DDD3] rounded-sm shadow-sm">
              <img
                src={space.image}
                alt={space.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Overview & Specs */}
            <div className="bg-white border border-[#E3DDD3] rounded-sm p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-[#18191C] mb-4 tracking-tight">
                Workspace Overview
              </h2>
              <p className="text-sm text-[#5C5D61] leading-relaxed mb-6">
                Establish your team presence at {space.title}, situated in prime {space.location}. 
                This verified commercial facility offers sound-insulated focus pods, high-speed fiber internet backup, 
                biometric access, and corporate GST NOC registration eligibility.
              </p>

              <h3 className="text-sm font-bold text-[#18191C] mb-3">Included Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                {space.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="p-3 bg-[#FAF8F5] border border-[#E3DDD3] rounded-sm text-xs font-semibold text-[#18191C] flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-sm font-bold text-[#18191C] mb-3">Key Specification Highlights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#5C5D61]">
                <div className="p-4 border border-[#E3DDD3] rounded-sm">
                  <span className="font-semibold text-[#18191C] block mb-1">Operating Hours</span>
                  <span>24/7 Unlimited Access with Keycard</span>
                </div>
                <div className="p-4 border border-[#E3DDD3] rounded-sm">
                  <span className="font-semibold text-[#18191C] block mb-1">Compliance & Address</span>
                  <span>GST NOC & Commercial Lease Agreement</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Sidebar Booking & Summary */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            <div className="bg-white border border-[#E3DDD3] rounded-sm p-6 shadow-sm sticky top-24">
              <h3 className="text-lg font-bold text-[#18191C] mb-4 pb-3 border-b border-[#E3DDD3]">
                Book a Visit
              </h3>

              {bookingSuccess ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-sm text-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <p className="text-xs font-bold text-emerald-900 mb-1">Visit Request Submitted!</p>
                  <p className="text-[11px] text-emerald-700">Our workspace manager will contact you shortly to confirm timings.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setBookingSuccess(true); }} className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#5C5D61] block mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rohan Sharma"
                      className="w-full px-3 py-2 text-xs border border-[#E3DDD3] rounded-sm bg-white text-[#18191C]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#5C5D61] block mb-1">Work Email</label>
                    <input
                      type="email"
                      required
                      placeholder="rohan@company.com"
                      className="w-full px-3 py-2 text-xs border border-[#E3DDD3] rounded-sm bg-white text-[#18191C]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#5C5D61] block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 text-xs border border-[#E3DDD3] rounded-sm bg-white text-[#18191C]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-[#A93E1B] text-white py-3 rounded-sm text-xs font-semibold transition-colors cursor-pointer shadow-sm mt-2"
                  >
                    Confirm Visit Schedule
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
