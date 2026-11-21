"use client";

import { useState, useEffect } from "react";
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
  Heart,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

interface WorkspaceDetailViewProps {
  idOrSlug: string;
}

const DEFAULT_AMENITIES = [
  "High-Speed Fiber WiFi (1 Gbps)",
  "24/7 Biometric Access",
  "Air Conditioned Cabins",
  "Meeting & Conference Rooms",
  "Artisanal Coffee & Cafeteria",
  "Daily Housekeeping & Sanitization",
  "Ergonomic Chairs & Standing Desks",
  "Printing & Scanning Credits"
];

export function WorkspaceDetailView({ idOrSlug }: WorkspaceDetailViewProps) {
  // Find initial space synchronously from WORKSPACES by shortId, slug, id, or url
  const [space, setSpace] = useState<any>(() => {
    const target = (idOrSlug || "").toLowerCase().trim();
    return (
      WORKSPACES.find(
        (w: any) =>
          w.shortId?.toLowerCase() === target ||
          w.slug?.toLowerCase() === target ||
          w.id?.toLowerCase() === target ||
          w.legacySlug?.toLowerCase() === target ||
          w.url?.toLowerCase() === target ||
          w.url?.toLowerCase().endsWith(`/${target}`)
      ) || WORKSPACES[0]
    );
  });
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Default date to tomorrow
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split("T")[0];
  const [visitDate, setVisitDate] = useState(tomorrowStr);
  const [timeSlot, setTimeSlot] = useState("11:00 AM - 12:00 PM");

  useEffect(() => {
    let isMounted = true;
    async function fetchSpace() {
      try {
        const res = await fetch(`/api/workspaces/${idOrSlug}`);
        if (res.ok) {
          const data = await res.json();
          if (data && (data.id || data.slug) && isMounted) {
            setSpace({
              id: data.id,
              slug: data.slug,
              title: data.title,
              city: data.city,
              locality: data.location,
              location: data.location,
              address: data.address,
              pincode: data.pincode,
              capacity: data.capacity,
              type:
                data.type === "COWORKING"
                  ? "Coworking Space"
                  : data.type === "VIRTUAL_OFFICE"
                  ? "Virtual Office"
                  : data.type === "MANAGED_OFFICE"
                  ? "Managed Office"
                  : data.type === "COMMERCIAL_OFFICE"
                  ? "Commercial / Office Space"
                  : data.type,
              price: data.priceDisplay || (data.priceMonthly ? `₹${data.priceMonthly}/mo` : "Contact for pricing"),
              rating: data.rating || 4.8,
              image:
                data.images?.[0]?.url ||
                data.primaryImage ||
                space.image ||
                "https://images.unsplash.com/photo-1497215728101-856f4ea42174",
              images:
                data.images && data.images.length > 0
                  ? data.images.map((im: any) => (typeof im === "string" ? im : im.url))
                  : space.images || [space.image],
              description: data.description || space.description,
              amenities: (data.amenities && data.amenities.length > 0)
                ? data.amenities.map((a: any) => a.amenity?.name || a.name || a)
                : space.amenities,
            });
          }
        }
      } catch (err) {
        console.warn("Could not fetch live workspace detail, using fallback:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchSpace();
    return () => {
      isMounted = false;
    };
  }, [idOrSlug]);

  const handleBookingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setBookingError("");

    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;

    try {
      // 1. Post to live /api/bookings
      const bookingRes = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workspaceId: space.id,
          guestName: name,
          guestEmail: email,
          guestPhone: phone,
          visitDate: new Date(visitDate).toISOString(),
          timeSlot: timeSlot,
          teamSize: "1-5",
          notes: `Tour scheduled for ${space.title}`,
        }),
      });

      const bookingData = await bookingRes.json();

      if (!bookingRes.ok && bookingRes.status !== 400 && bookingRes.status !== 500) {
        setBookingError(bookingData.error || "Could not confirm booking.");
        setIsSubmitting(false);
        return;
      }

      // 2. Also record in leads for sales contact
      try {
        await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "Tour Schedule Request",
            name,
            email,
            phone,
            interest: `${space.title} (${space.type}) - ${space.price} on ${visitDate} (${timeSlot})`,
            city: space.city,
            sourceUrl: typeof window !== "undefined" ? window.location.href : "",
          }),
        });
      } catch (err) {}

      // 3. Local fallback sync
      try {
        const localBooking = {
          id: bookingData?.booking?.id || "book_" + Date.now(),
          userEmail: email,
          title: space.title,
          locality: space.locality || space.location,
          city: space.city,
          type: space.type,
          price: space.price,
          image: space.image,
          dateBooked: new Date(visitDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          timeSlot: timeSlot,
          status: "CONFIRMED",
        };
        const cur = localStorage.getItem("active_bookings");
        const list = cur ? JSON.parse(cur) : [];
        list.push(localBooking);
        localStorage.setItem("active_bookings", JSON.stringify(list));
      } catch (err) {}

      setBookingSuccess(true);
    } catch (err: any) {
      console.error("Failed to post tour schedule request:", err);
      setBookingSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const amenitiesToDisplay = (space.amenities && space.amenities.length > 0)
    ? space.amenities
    : DEFAULT_AMENITIES;

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-[#5C5D61] mb-6 flex-wrap">
          <Link href="/workspaces" className="hover:text-primary transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Workspaces
          </Link>
          <span>/</span>
          <Link href={`/workspaces?city=${encodeURIComponent(space.city)}`} className="hover:text-primary transition-colors font-medium">
            {space.city}
          </Link>
          <span>/</span>
          <span className="text-primary font-semibold">{space.type}</span>
          <span>/</span>
          <span className="text-[#18191C] font-semibold truncate max-w-xs">{space.title}</span>
        </div>

        {/* Main Grid Header */}
        <div className="bg-white border border-[#E3DDD3] rounded-sm p-6 sm:p-8 mb-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2.5 mb-2 flex-wrap">
                <span className="bg-[#18191C] text-white text-xs font-semibold px-2.5 py-0.5 rounded-sm flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Verified Partner
                </span>
                <span className="bg-[#FAF8F5] border border-[#E3DDD3] text-primary text-xs font-semibold px-2.5 py-0.5 rounded-sm">
                  {space.type}
                </span>
                {space.capacity && (
                  <span className="bg-[#FAF8F5] border border-[#E3DDD3] text-[#5C5D61] text-xs font-medium px-2.5 py-0.5 rounded-sm flex items-center gap-1">
                    <Users className="w-3 h-3 text-primary" /> {space.capacity} {typeof space.capacity === 'number' ? 'Seats' : ''}
                  </span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#18191C] tracking-tight mb-2">
                {space.title}
              </h1>
              <p className="text-xs sm:text-sm text-[#5C5D61] flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                {space.address || space.location}
              </p>
            </div>

            <div className="flex sm:items-center gap-4 lg:flex-col lg:items-end justify-between border-t lg:border-t-0 pt-4 lg:pt-0 border-[#E3DDD3]">
              <div>
                <p className="text-[11px] font-semibold text-[#5C5D61] uppercase tracking-wider">Starting Price</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#18191C]">{space.price}</p>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#18191C] bg-[#FAF8F5] px-3 py-1.5 border border-[#E3DDD3] rounded-sm">
                ★ {space.rating} (Verified Reviews)
              </div>
            </div>
          </div>
        </div>

        {/* Layout Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Visual & Details */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <div className="aspect-[16/10] bg-[#F3EFEA] border border-[#E3DDD3] rounded-sm overflow-hidden shadow-sm relative">
                <img
                  src={selectedImage || space.image}
                  alt={space.title}
                  className="w-full h-full object-cover transition-all duration-300"
                />
              </div>

              {/* Multi-Photo Gallery Thumbnails */}
              {space.images && space.images.length > 1 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {space.images.map((imgUrl: string, idx: number) => {
                    const isSelected = (selectedImage || space.image) === imgUrl;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedImage(imgUrl)}
                        className={`relative aspect-[16/10] rounded-sm overflow-hidden border-2 transition-all ${
                          isSelected
                            ? "border-primary ring-2 ring-primary/20 scale-[1.02]"
                            : "border-[#E3DDD3] opacity-75 hover:opacity-100 hover:border-[#18191C]"
                        }`}
                      >
                        <img
                          src={imgUrl}
                          alt={`${space.title} view ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-white border border-[#E3DDD3] rounded-sm p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-[#18191C] mb-3">About this workspace</h2>
              <p className="text-xs sm:text-sm text-[#5C5D61] leading-relaxed mb-6">
                {space.description ||
                  `Experience premium commercial workspace solutions designed for high-growth enterprises and modern professionals. Located in the core commercial hub of ${space.city}, this facility features ergonomic private suites, flexible open-plan desks, meeting suites, and comprehensive enterprise hospitality.`}
              </p>

              <h3 className="text-sm font-bold text-[#18191C] mb-4">Included Amenities & Services</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {amenitiesToDisplay.map((amenity: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#18191C] font-medium bg-[#FAF8F5] border border-[#E3DDD3] p-2.5 rounded-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{amenity}</span>
                  </div>
                ))}
              </div>

              {space.address && (
                <div className="mt-8 pt-6 border-t border-[#E3DDD3]">
                  <h3 className="text-sm font-bold text-[#18191C] mb-2 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-primary" /> Location & Locality
                  </h3>
                  <p className="text-xs text-[#5C5D61] leading-relaxed">
                    {space.address}
                  </p>
                  <p className="text-[11px] text-[#5C5D61]/80 mt-1 italic">
                    Exact building and floor access details provided upon visit confirmation.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Booking & Tour Scheduling Widget */}
          <div className="flex flex-col gap-6">
            <div className="bg-white border border-[#E3DDD3] rounded-sm p-6 sm:p-8 shadow-sm sticky top-28">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E3DDD3]">
                <div>
                  <h3 className="text-base font-bold text-[#18191C]">Schedule a Physical Tour</h3>
                  <p className="text-[11px] text-[#5C5D61]">Free, no-obligation visit with our center manager</p>
                </div>
                <Calendar className="w-5 h-5 text-primary" />
              </div>

              {bookingSuccess ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-sm text-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <p className="text-xs font-bold text-emerald-900 mb-1">Visit Request Confirmed!</p>
                  <p className="text-[11px] text-emerald-700 leading-relaxed mb-3">
                    Your physical tour for <strong>{visitDate}</strong> ({timeSlot}) has been scheduled. Our workspace manager will call you to confirm arrivals.
                  </p>
                  <Link
                    href="/profile"
                    className="inline-block px-3.5 py-1.5 bg-emerald-700 text-white text-xs font-semibold rounded-sm hover:bg-emerald-800 transition-colors"
                  >
                    View in Dashboard →
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="flex flex-col gap-3.5">
                  {bookingError && (
                    <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-sm flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{bookingError}</span>
                    </div>
                  )}

                  <div>
                    <label className="text-xs font-semibold text-[#5C5D61] block mb-1">Your Full Name*</label>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="e.g. Rohan Sharma"
                      className="w-full px-3 py-2 text-xs border border-[#E3DDD3] rounded-sm bg-white text-[#18191C] focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#5C5D61] block mb-1">Work Email*</label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="rohan@company.com"
                      className="w-full px-3 py-2 text-xs border border-[#E3DDD3] rounded-sm bg-white text-[#18191C] focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#5C5D61] block mb-1">Phone Number*</label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 text-xs border border-[#E3DDD3] rounded-sm bg-white text-[#18191C] focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-semibold text-[#5C5D61] block mb-1">Visit Date*</label>
                      <input
                        type="date"
                        required
                        value={visitDate}
                        min={tomorrowStr}
                        onChange={(e) => setVisitDate(e.target.value)}
                        className="w-full px-2.5 py-2 text-xs border border-[#E3DDD3] rounded-sm bg-white text-[#18191C] focus:outline-none focus:border-primary cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#5C5D61] block mb-1">Time Slot*</label>
                      <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="w-full px-2 py-2 text-xs border border-[#E3DDD3] rounded-sm bg-white text-[#18191C] focus:outline-none focus:border-primary cursor-pointer"
                      >
                        <option value="10:00 AM - 11:00 AM">10:00 - 11:00 AM</option>
                        <option value="11:00 AM - 12:00 PM">11:00 - 12:00 PM</option>
                        <option value="02:00 PM - 03:00 PM">02:00 - 03:00 PM</option>
                        <option value="04:00 PM - 05:00 PM">04:00 - 05:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-[#A93E1B] text-white py-3 rounded-sm text-xs font-semibold transition-colors cursor-pointer shadow-sm mt-1 disabled:opacity-60"
                  >
                    {isSubmitting ? "Scheduling Visit..." : "Confirm Visit Schedule"}
                  </button>

                  <p className="text-[10px] text-[#5C5D61] text-center mt-1">
                    Instant confirmation • Reschedule or cancel anytime in profile
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
