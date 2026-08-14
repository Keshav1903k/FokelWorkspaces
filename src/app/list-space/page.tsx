"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  MapPin, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  UploadCloud, 
  Wifi, 
  Coffee, 
  Tv, 
  Lock, 
  ShieldCheck, 
  Clock, 
  Info,
  DollarSign
} from "lucide-react";
import { useRouter } from "next/navigation";
import { CITIES } from "@/constants/data";

const PARTNER_ROLES = [
  { value: "owner", label: "Property Owner" },
  { value: "broker", label: "Real Estate Broker / Consultant" },
  { value: "operator", label: "Workspace Operator / Franchisee" },
  { value: "asset-manager", label: "Asset Manager" }
];

const AMENITIES_OPTIONS = [
  { id: "wifi", label: "High-speed Wi-Fi", icon: Wifi },
  { id: "coffee", label: "Unlimited Tea / Coffee", icon: Coffee },
  { id: "power", label: "100% Power Backup", icon: ShieldCheck },
  { id: "meeting", label: "Meeting Rooms", icon: Tv },
  { id: "lock", label: "Biometric Security", icon: Lock },
  { id: "reception", label: "Reception Desk", icon: Clock }
];

export default function ListSpacePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Partner Details
    fullName: "",
    email: "",
    phone: "",
    role: "owner",

    // Step 2: Property Details
    spaceName: "",
    city: "Bangalore",
    locality: "",
    address: "",
    areaSqFt: "",
    capacitySeats: "",

    // Step 3: Workspace Type & Pricing
    pricingCoworking: "",
    pricingCabins: "",
    pricingVirtualOffice: "",
    pricingMeetingRooms: "",

    // Step 4: Amenities
    amenities: [] as string[],

    // Step 5: Description & Photos
    description: "",
  });

  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Form Navigation handlers
  const handleNextStep = () => {
    // Validate current step before moving forward
    const errors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.fullName.trim()) errors.fullName = "Full name is required";
      if (!formData.email.trim()) errors.email = "Email is required";
      if (!formData.phone.trim()) errors.phone = "Phone number is required";
    } else if (currentStep === 2) {
      if (!formData.spaceName.trim()) errors.spaceName = "Property/Space name is required";
      if (!formData.locality.trim()) errors.locality = "Locality is required";
      if (!formData.address.trim()) errors.address = "Address is required";
      if (!formData.capacitySeats.trim()) errors.capacitySeats = "Total seat capacity is required";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const handlePrevStep = () => {
    setFormErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const toggleAmenity = (id: string) => {
    setFormData((prev) => {
      const active = prev.amenities.includes(id);
      return {
        ...prev,
        amenities: active 
          ? prev.amenities.filter((item) => item !== id)
          : [...prev.amenities, id]
      };
    });
  };

  // Simulate file selection
  const handlePhotoUpload = () => {
    // Mock upload pictures
    const mockImages = [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=400"
    ];

    const nextImageIndex = uploadedPhotos.length % mockImages.length;
    setUploadedPhotos((prev) => [...prev, mockImages[nextImageIndex]]);
  };

  const removeUploadedPhoto = (index: number) => {
    setUploadedPhotos((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Final mock submission
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <section className="bg-[#DEE9F4] pt-20 pb-20 md:pt-28 md:pb-28 text-center relative border-b border-[#c4d6e9] -mt-6">
        
        <div className="relative z-10 container mx-auto px-6 max-w-5xl flex flex-col items-center justify-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4 max-w-3xl text-center">
            Monetize Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-hover">Commercial Property</span>
          </h1>
          <p className="text-[#5C6B76] text-xs sm:text-sm max-w-2xl leading-relaxed font-medium text-center">
            Partner with Fokel to convert empty spaces, managed cabins, or full floors into high-yield workspace assets. Get onboarded and reach thousands of verified clients.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-20 bg-slate-50 relative">
        <div className="container mx-auto px-6 max-w-4xl">
          
          <div className="bg-white border border-[#E8EDF2] rounded-2xl p-6 md:p-10 shadow-[0_6px_24px_rgba(0,0,0,0.03)] relative">
            
            {submitted ? (
              // Success Screen
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 flex flex-col items-center gap-5"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-2">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Property Listing Submitted!</h2>
                <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                  Thank you for listing **{formData.spaceName}** with Fokel. Our partner success team will review your spaces details and schedule an IT compliance audit and physical inspection within 24 hours.
                </p>

                {/* Listing Overview details */}
                <div className="w-full max-w-md bg-slate-50 border border-[#E8EDF2] rounded-xl p-5 text-left mt-4 flex flex-col gap-3">
                  <div className="flex justify-between text-xs pb-2 border-b border-slate-200/60">
                    <span className="font-semibold text-slate-400">Partner Representative</span>
                    <span className="font-bold text-slate-700">{formData.fullName}</span>
                  </div>
                  <div className="flex justify-between text-xs pb-2 border-b border-slate-200/60">
                    <span className="font-semibold text-slate-400">Space Name</span>
                    <span className="font-bold text-slate-700">{formData.spaceName}</span>
                  </div>
                  <div className="flex justify-between text-xs pb-2 border-b border-slate-200/60">
                    <span className="font-semibold text-slate-400">Location</span>
                    <span className="font-bold text-slate-700">{formData.locality}, {formData.city}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-400">Listed Capacity</span>
                    <span className="font-bold text-slate-700">{formData.capacitySeats} Seats</span>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => router.push("/")}
                    className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg text-xs transition-colors cursor-pointer"
                  >
                    Back to Home
                  </button>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setCurrentStep(1);
                      setUploadedPhotos([]);
                      setFormData({
                        fullName: "",
                        email: "",
                        phone: "",
                        role: "owner",
                        spaceName: "",
                        city: "Bangalore",
                        locality: "",
                        address: "",
                        areaSqFt: "",
                        capacitySeats: "",
                        pricingCoworking: "",
                        pricingCabins: "",
                        pricingVirtualOffice: "",
                        pricingMeetingRooms: "",
                        amenities: [],
                        description: "",
                      });
                    }}
                    className="px-6 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg text-xs transition-colors cursor-pointer"
                  >
                    List Another Property
                  </button>
                </div>
              </motion.div>
            ) : (
              // Multi-step Listing Form
              <form onSubmit={handleSubmit} className="flex flex-col gap-8 h-full">
                
                {/* Step Indicators */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                  {[1, 2, 3, 4, 5].map((step) => (
                    <div key={step} className="flex items-center gap-2">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                          currentStep === step
                            ? "bg-primary text-white scale-110 shadow-sm"
                            : currentStep > step
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {currentStep > step ? <CheckCircle className="w-4 h-4" /> : step}
                      </div>
                      <span
                        className={`hidden sm:inline text-[10px] font-bold tracking-wider uppercase ${
                          currentStep === step ? "text-slate-800" : "text-slate-400"
                        }`}
                      >
                        {step === 1 && "Partner"}
                        {step === 2 && "Property"}
                        {step === 3 && "Pricing"}
                        {step === 4 && "Amenities"}
                        {step === 5 && "Publish"}
                      </span>
                      {step < 5 && <div className="hidden sm:block w-8 h-px bg-slate-200 mx-2" />}
                    </div>
                  ))}
                </div>

                {/* Form Steps Rendering */}
                <div className="min-h-[250px]">
                  <AnimatePresence mode="wait">
                    
                    {/* Step 1: Partner Details */}
                    {currentStep === 1 && (
                      <motion.div
                        key="step-1"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col gap-6"
                      >
                        <div>
                          <h3 className="text-base font-bold text-slate-800 mb-1">Partner Details</h3>
                          <p className="text-slate-400 text-xs">Tell us about yourself so we can establish contact.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-600 ml-0.5">Full Name*</label>
                            <input
                              type="text"
                              value={formData.fullName}
                              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                              placeholder="Representative Name"
                              className={`w-full bg-slate-50 border rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-primary/45 focus:ring-1 focus:ring-primary/45 text-sm ${
                                formErrors.fullName ? "border-destructive" : "border-slate-200"
                              }`}
                            />
                            {formErrors.fullName && <span className="text-[10px] text-destructive font-medium ml-1">{formErrors.fullName}</span>}
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-600 ml-0.5">Work Email*</label>
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              placeholder="e.g. owner@building.com"
                              className={`w-full bg-slate-50 border rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-primary/45 focus:ring-1 focus:ring-primary/45 text-sm ${
                                formErrors.email ? "border-destructive" : "border-slate-200"
                              }`}
                            />
                            {formErrors.email && <span className="text-[10px] text-destructive font-medium ml-1">{formErrors.email}</span>}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-600 ml-0.5">Contact Number*</label>
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              placeholder="Phone / Mobile Number"
                              className={`w-full bg-slate-50 border rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-primary/45 focus:ring-1 focus:ring-primary/45 text-sm ${
                                formErrors.phone ? "border-destructive" : "border-slate-200"
                              }`}
                            />
                            {formErrors.phone && <span className="text-[10px] text-destructive font-medium ml-1">{formErrors.phone}</span>}
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-600 ml-0.5">Your Role / Relation to Space*</label>
                            <select
                              value={formData.role}
                              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-primary/45 focus:ring-1 focus:ring-primary/45 text-sm cursor-pointer"
                            >
                              {PARTNER_ROLES.map((role) => (
                                <option key={role.value} value={role.value}>{role.label}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Property Details */}
                    {currentStep === 2 && (
                      <motion.div
                        key="step-2"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col gap-6"
                      >
                        <div>
                          <h3 className="text-base font-bold text-slate-800 mb-1">Property Information</h3>
                          <p className="text-slate-400 text-xs">Enter specific details about the physical asset layout.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-600 ml-0.5">Space / Building Name*</label>
                            <input
                              type="text"
                              value={formData.spaceName}
                              onChange={(e) => setFormData({ ...formData, spaceName: e.target.value })}
                              placeholder="e.g. Zenith Business Tower"
                              className={`w-full bg-slate-50 border rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-primary/45 focus:ring-1 focus:ring-primary/45 text-sm ${
                                formErrors.spaceName ? "border-destructive" : "border-slate-200"
                              }`}
                            />
                            {formErrors.spaceName && <span className="text-[10px] text-destructive font-medium ml-1">{formErrors.spaceName}</span>}
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-600 ml-0.5">Metro City*</label>
                            <select
                              value={formData.city}
                              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-primary/45 focus:ring-1 focus:ring-primary/45 text-sm cursor-pointer"
                            >
                              {CITIES.map((city) => (
                                <option key={city} value={city}>{city}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-600 ml-0.5">Micro-market / Locality*</label>
                            <input
                              type="text"
                              value={formData.locality}
                              onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                              placeholder="e.g. Indiranagar or BKC"
                              className={`w-full bg-slate-50 border rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-primary/45 focus:ring-1 focus:ring-primary/45 text-sm ${
                                formErrors.locality ? "border-destructive" : "border-slate-200"
                              }`}
                            />
                            {formErrors.locality && <span className="text-[10px] text-destructive font-medium ml-1">{formErrors.locality}</span>}
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-semibold text-slate-600 ml-0.5">Area (Sq. Ft.)</label>
                              <input
                                type="number"
                                value={formData.areaSqFt}
                                onChange={(e) => setFormData({ ...formData, areaSqFt: e.target.value })}
                                placeholder="e.g. 5000"
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-primary/45 focus:ring-1 focus:ring-primary/45 text-sm"
                              />
                            </div>

                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-semibold text-slate-600 ml-0.5">Seat Capacity*</label>
                              <input
                                type="number"
                                value={formData.capacitySeats}
                                onChange={(e) => setFormData({ ...formData, capacitySeats: e.target.value })}
                                placeholder="Seats count"
                                className={`w-full bg-slate-50 border rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-primary/45 focus:ring-1 focus:ring-primary/45 text-sm ${
                                  formErrors.capacitySeats ? "border-destructive" : "border-slate-200"
                                }`}
                              />
                              {formErrors.capacitySeats && <span className="text-[10px] text-destructive font-medium ml-1">{formErrors.capacitySeats}</span>}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-600 ml-0.5">Full Physical Address*</label>
                          <input
                            type="text"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            placeholder="Plot details, landmark, and postal pin code"
                            className={`w-full bg-slate-50 border rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-primary/45 focus:ring-1 focus:ring-primary/45 text-sm ${
                              formErrors.address ? "border-destructive" : "border-slate-200"
                            }`}
                          />
                          {formErrors.address && <span className="text-[10px] text-destructive font-medium ml-1">{formErrors.address}</span>}
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Space Sizing & Pricing */}
                    {currentStep === 3 && (
                      <motion.div
                        key="step-3"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col gap-6"
                      >
                        <div>
                          <h3 className="text-base font-bold text-slate-800 mb-1">Workspace Sizing & Pricing</h3>
                          <p className="text-slate-400 text-xs">Specify the prices for options you offer. Leave blank if not available.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="flex items-center gap-4 bg-slate-50 border border-slate-100 rounded-xl p-4">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                              <Building2 className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-slate-700">Coworking Desks</p>
                              <div className="flex items-center gap-1.5 mt-1.5">
                                <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                                <input
                                  type="text"
                                  value={formData.pricingCoworking}
                                  onChange={(e) => setFormData({ ...formData, pricingCoworking: e.target.value })}
                                  placeholder="e.g. 7999/mo"
                                  className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-xs focus:outline-none focus:border-primary/45 text-slate-800 font-semibold"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 bg-slate-50 border border-slate-100 rounded-xl p-4">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                              <Lock className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-slate-700">Private Managed Cabins</p>
                              <div className="flex items-center gap-1.5 mt-1.5">
                                <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                                <input
                                  type="text"
                                  value={formData.pricingCabins}
                                  onChange={(e) => setFormData({ ...formData, pricingCabins: e.target.value })}
                                  placeholder="e.g. 15000/seat"
                                  className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-xs focus:outline-none focus:border-primary/45 text-slate-800 font-semibold"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 bg-slate-50 border border-slate-100 rounded-xl p-4">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                              <MapPin className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-slate-700">Virtual Office</p>
                              <div className="flex items-center gap-1.5 mt-1.5">
                                <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                                <input
                                  type="text"
                                  value={formData.pricingVirtualOffice}
                                  onChange={(e) => setFormData({ ...formData, pricingVirtualOffice: e.target.value })}
                                  placeholder="e.g. 1499/mo"
                                  className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-xs focus:outline-none focus:border-primary/45 text-slate-800 font-semibold"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 bg-slate-50 border border-slate-100 rounded-xl p-4">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                              <Tv className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-slate-700">Meeting Rooms</p>
                              <div className="flex items-center gap-1.5 mt-1.5">
                                <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                                <input
                                  type="text"
                                  value={formData.pricingMeetingRooms}
                                  onChange={(e) => setFormData({ ...formData, pricingMeetingRooms: e.target.value })}
                                  placeholder="e.g. 999/hr"
                                  className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-xs focus:outline-none focus:border-primary/45 text-slate-800 font-semibold"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-slate-50 border border-[#E8EDF2] rounded-xl p-4 flex gap-3 mt-2">
                          <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <p className="text-[10px] text-slate-500 leading-relaxed">
                            Leaving pricing empty indicates that the specific desk style/category is not currently available at your center. Pricing can be updated later after onboarding.
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 4: Amenities */}
                    {currentStep === 4 && (
                      <motion.div
                        key="step-4"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col gap-6"
                      >
                        <div>
                          <h3 className="text-base font-bold text-slate-800 mb-1">Amenities & Infrastructure</h3>
                          <p className="text-slate-400 text-xs">Select features available at the listed property.</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {AMENITIES_OPTIONS.map((item) => {
                            const IconComponent = item.icon;
                            const isSelected = formData.amenities.includes(item.id);
                            return (
                              <button
                                type="button"
                                key={item.id}
                                onClick={() => toggleAmenity(item.id)}
                                className={`flex flex-col items-center gap-3 p-5 rounded-xl border transition-all duration-200 cursor-pointer ${
                                  isSelected
                                    ? "bg-primary/5 border-primary text-primary shadow-sm"
                                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                                }`}
                              >
                                <IconComponent className={`w-5 h-5 ${isSelected ? "text-primary" : "text-slate-400"}`} />
                                <span className="text-xs font-semibold text-center">{item.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* Step 5: Photos & Description */}
                    {currentStep === 5 && (
                      <motion.div
                        key="step-5"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col gap-6"
                      >
                        <div>
                          <h3 className="text-base font-bold text-slate-800 mb-1">Photos & Workspace Description</h3>
                          <p className="text-slate-400 text-xs">Help corporate clients visualize the environment.</p>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-600 ml-0.5">Workspace Description</label>
                          <textarea
                            rows={4}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Describe location highlights, operational hours, security, or transportation options nearby..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary/45 focus:ring-1 focus:ring-primary/45 text-xs resize-none"
                          />
                        </div>

                        <div className="flex flex-col gap-3">
                          <label className="text-xs font-semibold text-slate-600 ml-0.5">Upload Property Photos</label>
                          
                          <div 
                            onClick={handlePhotoUpload}
                            className="border-2 border-dashed border-slate-300 hover:border-primary bg-slate-50 hover:bg-primary/5 rounded-xl p-8 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors"
                          >
                            <UploadCloud className="w-8 h-8 text-slate-400 hover:text-primary transition-colors" />
                            <p className="text-xs font-bold text-slate-700 mt-1">Upload files here</p>
                            <p className="text-[10px] text-slate-400">Supported formats: JPEG, PNG. Max 5MB per file.</p>
                            <button
                              type="button"
                              className="mt-2 px-4 py-1.5 rounded bg-white text-slate-800 border border-slate-200 text-[10px] font-semibold hover:bg-slate-50"
                            >
                              Add Image Mockup
                            </button>
                          </div>

                          {/* Render Uploaded Photos Mock */}
                          {uploadedPhotos.length > 0 && (
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mt-2">
                              {uploadedPhotos.map((photo, index) => (
                                <div key={index} className="relative aspect-video rounded-lg overflow-hidden border border-slate-200 group">
                                  <img src={photo} alt={`Uploaded ${index}`} className="w-full h-full object-cover" />
                                  <button
                                    type="button"
                                    onClick={() => removeUploadedPhoto(index)}
                                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] font-bold transition-opacity duration-150 rounded"
                                  >
                                    Delete
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-6 mt-4">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    disabled={currentStep === 1}
                    className={`px-5 py-2.5 rounded-lg border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      currentStep === 1 
                        ? "opacity-40 cursor-not-allowed" 
                        : "hover:bg-slate-50 cursor-pointer"
                    }`}
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>

                  {currentStep < 5 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                    >
                      Continue <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                    >
                      Publish Property Listing <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

              </form>
            )}

          </div>
        </div>
      </section>
    </div>
  );
}
