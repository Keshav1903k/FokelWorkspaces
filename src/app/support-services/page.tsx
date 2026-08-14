"use client";

import { motion } from "framer-motion";
import { HeartHandshake, ShieldCheck, CheckCircle, HelpCircle, HardDrive, PhoneCall } from "lucide-react";

const SUPPORT_SERVICES = [
  {
    title: "Reception & Receptionist Services",
    description: "Welcome your clients with a professional front-desk presence. Our receptionist services manage call routing, visitor registries, and physical board room schedules.",
    features: ["Professional Lobby Receptionists", "Dedicated Call Forwarding", "Visitor Log Management", "Meeting Room Concierge Desk"],
    price: "Included with Private Offices",
    image: "/receptionist.jpg"
  },
  {
    title: "Digital Mail Handling & Forwarding",
    description: "Never miss a legal compliance notice or client contract. We receive your couriers, scan envelopes, notify you instantly, and securely forward physical packages globally.",
    features: ["Same-day Scan Notifications", "Secure Package Vault Storage", "Physical Courier Forwarding", "Document Shredding & Disposal"],
    price: "Included in Virtual Offices",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Enterprise IT & Telecom Operations",
    description: "Keep your startup secure. We deploy dedicated network firewalls, custom VLAN configurations, managed static IP routers, and provide live, on-site IT technicians.",
    features: ["Dual-active Fiber Backbones", "Dedicated VLAN Configurations", "On-site Tech Support (9-to-6)", "Secure Telecom Phone Routing"],
    price: "Custom quotation by requirements",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=600"
  }
];

export default function SupportServicesPage() {
  const handleGetStarted = () => {
    window.dispatchEvent(new Event("open-welcome-modal"));
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="bg-slate-950 py-16 md:py-24 text-center relative overflow-hidden -mt-6">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1521791136368-1a8b27503462?auto=format&fit=crop&q=80&w=1600"
            alt="Support Services Fokel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/85" />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 max-w-5xl flex flex-col items-center">
          <span className="px-3.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-bold tracking-wider uppercase text-white/80 mb-4">
            Operations & Logistics
          </span>
          <h1 className="text-3xl md:text-5xl font-semibold text-white tracking-tight leading-tight mb-4">
            Support & Operations Setup
          </h1>
          <p className="text-[#C9D6E3] text-xs sm:text-base max-w-2xl opacity-90 leading-relaxed">
            Run your startup seamlessly. We manage digital mail rooms, corporate lobby receptionists, high-speed fiber internet, and compliance filings.
          </p>
        </div>
      </section>

      {/* Main Options Grid */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SUPPORT_SERVICES.map((option, idx) => (
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
                      <HeartHandshake className="w-4 h-4" />
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
                    Request Support Setup
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
            <h3 className="text-2xl font-bold text-foreground">Support & Tech FAQs</h3>
            <p className="text-para-gray text-xs mt-2">Common questions regarding package receiving and server rooms.</p>
          </div>

          <div className="flex flex-col gap-4 bg-white border border-[#E8EDF2] rounded-2xl p-8 shadow-sm">
            {[
              {
                q: "Do you open my mail when you digitize it?",
                a: "Never without your explicit consent. Standard digital mail handling only scans the outside envelope. We only open and scan the content if you trigger a digital request for that specific mail document."
              },
              {
                q: "Can my team get a private SSID and static IP?",
                a: "Yes. For our Private managed cabin and custom floor layouts, our on-site IT teams configure dedicated VLANs, private SSIDs, static public IPs, and set up firewall configurations."
              },
              {
                q: "What courier companies do you work with?",
                a: "We receive shipments from all national and international logistics companies, including BlueDart, DHL, FedEx, Delhivery, and India Post."
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
            Looking for Custom Integration?
          </h2>
          <p className="text-white/80 text-xs max-w-lg mb-6 leading-relaxed">
            Schedule a coordination call with our operational managers to plan mail logistics, network firewalls, or telecom setups.
          </p>
          <button
            onClick={handleGetStarted}
            className="px-6 py-3 rounded-lg bg-white text-[#485A71] font-semibold text-xs transition-colors hover:bg-slate-100 cursor-pointer shadow-sm"
          >
            Speak to our Ops Lead
          </button>
        </div>
      </section>
    </div>
  );
}
