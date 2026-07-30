"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";

export function ContactForm() {
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
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="contact-section" className="py-24 bg-slate-50 border-t border-slate-100">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Contact info */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div>
              <p className="text-xs text-primary uppercase tracking-widest font-bold mb-2">
                Get In Touch
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 mb-4 tracking-tight">
                Let's discuss your office workspace needs
              </h2>
              <p className="text-slate-400 text-xs leading-relaxed max-w-md">
                Have questions about our premium virtual offices, collaborative coworking spaces, private cabins, or business legal compliance? Drop us a line, and our consultant will contact you within 24 hours.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 text-slate-600 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Call Us</p>
                  <p className="text-xs font-semibold text-slate-800">+91 (80) 4567-8910</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 text-slate-600 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Email Us</p>
                  <p className="text-xs font-semibold text-slate-800">support@fokel.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 text-slate-600 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Headquarters</p>
                  <p className="text-xs font-semibold text-slate-800">Indiranagar Double Road, Bangalore, India</p>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-slate-400">
              By submitting this form you agree to our privacy policy and terms.
            </p>
          </div>

          {/* Right Column: Contact form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-100 rounded-xl p-8 md:p-10 shadow-sm h-full flex flex-col justify-center">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 flex flex-col items-center gap-4"
                >
                  <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                  <h3 className="text-xl font-bold text-slate-800">Message Sent Successfully!</h3>
                  <p className="text-slate-400 text-xs max-w-sm">
                    Thank you for reaching out. One of our workspace consultants will contact you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-5 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-semibold text-slate-600 ml-1">Full Name*</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your Name"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary/45 focus:ring-1 focus:ring-primary/45 transition-all text-xs"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-semibold text-slate-600 ml-1">Work Email*</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@company.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary/45 focus:ring-1 focus:ring-primary/45 transition-all text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-semibold text-slate-600 ml-1">Phone Number*</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary/45 focus:ring-1 focus:ring-primary/45 transition-all text-xs"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-semibold text-slate-600 ml-1">Interested In*</label>
                      <select
                        required
                        value={formData.interest}
                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 focus:outline-none focus:border-primary/45 focus:ring-1 focus:ring-primary/45 transition-all text-xs cursor-pointer"
                      >
                        <option value="virtual-office">Virtual Office (Business Address)</option>
                        <option value="coworking">Coworking Spaces (Desk/Cabin)</option>
                        <option value="private-office">Private Managed Office</option>
                        <option value="enterprise">Custom Floor / Enterprise Solution</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-semibold text-slate-600 ml-1">Message / Requirements</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your team size, budget, and specific requirements..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary/45 focus:ring-1 focus:ring-primary/45 transition-all text-xs resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 bg-primary text-white font-semibold rounded-lg px-6 py-3 hover:bg-primary-hover transition-colors flex items-center justify-center gap-2 cursor-pointer text-xs shadow-sm"
                  >
                    Submit Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
