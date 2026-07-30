"use client";

import { motion } from "framer-motion";
import { FileText, ShieldCheck, CheckCircle, HelpCircle, Briefcase, Award } from "lucide-react";

const REGISTRATION_SERVICES = [
  {
    title: "Company Incorporation (Pvt Ltd / LLP)",
    description: "Launch your business in India with full legal standing. We handle name reservation (RUN), Director Identification Numbers (DIN), Digital Signatures (DSC), and drafting of MoA/AoA.",
    features: ["Incorporation Certificate (COI)", "PAN & TAN Allotment", "Bank Account Opening Support", "1-Year Compliance Calendar Guide"],
    price: "Starts at ₹5,999 + Govt Fees",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "GST Registration & Amendment",
    description: "Obtain tax registration seamlessly. Ideal for e-commerce sellers, consultants, and companies looking to secure multi-state GST numbers using virtual office lease agreements.",
    features: ["Virtual Office Document Integration", "Landlord NOC & Lease Deed", "Application Filing & Follow-up", "GST Portal Credential Handover"],
    price: "Starts at ₹1,999",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Trademark & Intellectual Property Filings",
    description: "Protect your logo, brand name, and intellectual assets. We perform detailed trademark searches, file applications, and draft replies to objections raised by the TM registrar.",
    features: ["Public Trademark Search", "Class Identification", "Online Filing & TM Status Tracking", "Objection Advisory Support"],
    price: "Starts at ₹2,499 + Govt Fees",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600"
  }
];

export default function BusinessRegistrationPage() {
  const handleGetStarted = () => {
    window.dispatchEvent(new Event("open-welcome-modal"));
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="bg-slate-950 py-16 md:py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1600"
            alt="Business Registration Fokel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/85" />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 max-w-5xl flex flex-col items-center">
          <span className="px-3.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-bold tracking-wider uppercase text-white/80 mb-4">
            Registration & Compliance
          </span>
          <h1 className="text-3xl md:text-5xl font-semibold text-white tracking-tight leading-tight mb-4">
            Business Registration & GST Setup
          </h1>
          <p className="text-[#C9D6E3] text-xs sm:text-base max-w-2xl opacity-90 leading-relaxed">
            Quickly incorporate your private limited company, secure GST registrations, and protect your intellectual property with our legal experts.
          </p>
        </div>
      </section>

      {/* Main Options Grid */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REGISTRATION_SERVICES.map((option, idx) => (
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
                      <FileText className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">{option.price}</span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-foreground tracking-tight group-hover:text-primary transition-colors mb-2 min-h-[3.5rem] flex items-center">
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
                    Get Started With Registration
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
            <h3 className="text-2xl font-bold text-foreground">Incorporation & Tax FAQs</h3>
            <p className="text-para-gray text-xs mt-2">Common queries about government portals and legal processing times.</p>
          </div>

          <div className="flex flex-col gap-4 bg-white border border-[#E8EDF2] rounded-2xl p-8 shadow-sm">
            {[
              {
                q: "How many days does it take to incorporate a Private Limited Company?",
                a: "Typically, it takes about 7 to 10 working days to receive the Certificate of Incorporation (COI) from the MCA, depending on government processing times and document accuracy."
              },
              {
                q: "What is MoA and AoA in company registration?",
                a: "MoA (Memorandum of Association) outlines the scope and purpose of the company, while AoA (Articles of Association) defines internal management guidelines and voting rules."
              },
              {
                q: "Can I get a GST registration without physical space?",
                a: "Yes! Using our Virtual Office packages, we provide you with a Commercial Lease Agreement, NOC from the landlord, and utility bills. These are fully approved for GST registrations."
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
            Need Expert Legal Counseling?
          </h2>
          <p className="text-white/80 text-xs max-w-lg mb-6 leading-relaxed">
            Schedule a session with our corporate registry compliance attorneys to address shareholder agreements, DIN allocation, or Trademark objections.
          </p>
          <button
            onClick={handleGetStarted}
            className="px-6 py-3 rounded-lg bg-white text-[#485A71] font-semibold text-xs transition-colors hover:bg-slate-100 cursor-pointer shadow-sm"
          >
            Speak to a Legal Consultant
          </button>
        </div>
      </section>
    </div>
  );
}
