"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, CheckCircle, Building2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "virtual-office",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header Banner */}
      <section className="bg-slate-950 py-16 md:py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1600"
            alt="Contact Fokel Offices"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/80" />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 max-w-5xl flex flex-col items-center">
          <span className="px-3.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-bold tracking-wider uppercase text-white/80 mb-4">
            Connect With Us
          </span>
          <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-tight leading-tight mb-3">
            Contact Our Workspace Consultants
          </h1>
          <p className="text-[#C9D6E3] text-xs sm:text-sm max-w-xl opacity-90 leading-relaxed">
            Get customized office quote pricing, discuss landlord partnerships, or obtain virtual office compliance details in under 24 hours.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-24 bg-slate-50 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: Platform Details Card */}
            <div className="lg:col-span-6 h-full">
              <div className="bg-white border border-[#E8EDF2] rounded-2xl p-8 md:p-10 shadow-[0_6px_24px_rgba(0,0,0,0.04)] h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center justify-center w-6 h-6 rounded bg-primary text-white">
                      <Building2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-sans font-bold text-xs text-secondary tracking-wide uppercase">
                      Platform Head Office
                    </span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-foreground mb-4 leading-snug">
                    Fokel Operations HQ
                  </h2>
                  <p className="text-para-gray text-xs leading-relaxed mb-8 max-w-md">
                    Have questions about premium virtual business addresses, collaborative coworking spaces, custom layouts, or corporate legal compliance? Reach out to our operational team directly.
                  </p>

                  <div className="flex flex-col gap-6 mb-8">
                    {/* Address details */}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-[#E8EDF2] flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Corporate HQ Address</p>
                        <p className="text-sm font-semibold text-foreground leading-relaxed">Indiranagar Double Road, Bangalore, India</p>
                      </div>
                    </div>

                    {/* Email details */}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-[#E8EDF2] flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Support Desk</p>
                        <p className="text-sm font-semibold text-foreground leading-relaxed">
                          <a href="mailto:support@fokel.com" className="hover:text-primary transition-colors">support@fokel.com</a>
                        </p>
                      </div>
                    </div>

                    {/* Phone details */}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-[#E8EDF2] flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Direct Hotline</p>
                        <p className="text-sm font-semibold text-foreground leading-relaxed">
                          <a href="tel:+918045678910" className="hover:text-primary transition-colors">+91 (80) 4567-8910</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-6 h-full">
              <div className="bg-white border border-[#E8EDF2] rounded-2xl p-8 md:p-10 shadow-[0_6px_24px_rgba(0,0,0,0.04)] h-full flex flex-col justify-center">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 flex flex-col items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-2">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Message Sent Successfully!</h3>
                    <p className="text-para-gray text-xs max-w-sm">
                      Thank you for reaching out. One of our workspace consultants will contact you shortly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors shadow-sm"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5 h-full justify-between">
                    <div className="flex flex-col gap-5 flex-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-600 ml-1">Full Name*</label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Your Name"
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary/45 focus:ring-1 focus:ring-primary/45 transition-all text-sm"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-600 ml-1">Work Email*</label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="you@company.com"
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary/45 focus:ring-1 focus:ring-primary/45 transition-all text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-600 ml-1">Phone Number*</label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="e.g. +91 98765 43210"
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary/45 focus:ring-1 focus:ring-primary/45 transition-all text-sm"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-600 ml-1">I am interested in*</label>
                          <select
                            required
                            value={formData.interest}
                            onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-primary/45 focus:ring-1 focus:ring-primary/45 transition-all text-sm cursor-pointer"
                          >
                            <option value="virtual-office">Virtual Office (GST / Business address)</option>
                            <option value="coworking">Coworking Space (Dedicated seat)</option>
                            <option value="private-office">Private Managed Cabin</option>
                            <option value="enterprise">Custom Managed Floor</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5 flex-1">
                        <label className="text-xs font-semibold text-slate-600 ml-1">Message / Requirements</label>
                        <textarea
                          rows={6}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tell us about your team size, budget, and specific location requirements..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary/45 focus:ring-1 focus:ring-primary/45 transition-all text-sm resize-none flex-grow flex-1 min-h-[160px]"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-6 bg-primary text-white font-semibold rounded-lg px-6 py-3.5 hover:bg-primary-hover transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm shadow-sm font-heading shrink-0"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
