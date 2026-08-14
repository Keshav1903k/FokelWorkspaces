"use client";

import { motion, useInView } from "framer-motion";
import { 
  ArrowRight, 
  Shield, 
  ChevronRight
} from "lucide-react";
import { GrCompliance } from "react-icons/gr";
import { LuHouse } from "react-icons/lu";
import { MdCurrencyRupee } from "react-icons/md";
import { useState, useEffect, useRef } from "react";

// Reusable Counter component that triggers when in view
function Counter({ value, suffix = "", decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const end = value;
    const duration = 1500; // 1.5 seconds
    const steps = duration / 16;
    const increment = end / steps;
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, isInView]);

  const formatted = count.toFixed(decimals);
  const display = decimals === 0 ? parseInt(formatted, 10).toLocaleString() : formatted;

  return <span ref={ref}>{display}{suffix}</span>;
}

const STATS = [
  { value: 48, suffix: "h", label: "Setup Guarantee" },
  { value: 1200, suffix: "+", label: "Verified Cabins" },
  { value: 50, suffix: "+", label: "Cities Presence" },
  { value: 99.8, suffix: "%", decimals: 1, label: "IT & Network Uptime" }
];

const VALUES = [
  {
    icon: GrCompliance,
    title: "Speed & Compliance",
    description: "Launch in new cities in less than 48 hours with pre-approved corporate NOC compliance and immediate company registration approvals."
  },
  {
    icon: LuHouse,
    title: "Human-Centric Spaces",
    description: "Every cabin, focus pod, and lounge is designed to maximize daylight, acoustics, and posture health for high-performing teams."
  },
  {
    icon: Shield,
    title: "Enterprise Grade Safety",
    description: "Keep company data safe with isolated VLAN network lines, dual-active fiber backups, static public IPs, and 24/7 security personnel."
  },
  {
    icon: MdCurrencyRupee,
    title: "Pricing Transparency",
    description: "No hidden cleaning fees, utility surprises, or dynamic seat rates. You pay exactly what you sign for, guaranteed."
  }
];

export default function AboutPage() {
  return (
    <div className="flex flex-col bg-white">
      {/* 1. Hero Section */}
      <section className="relative pt-20 pb-20 md:pt-28 md:pb-28 bg-gradient-to-b from-[#F4F7FA] to-white overflow-hidden -mt-6">
        {/* Colorful glowing backgrounds */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#DEE9F4] blur-[100px] opacity-60 pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#51818C]/10 blur-[100px] opacity-40 pointer-events-none" />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground tracking-tight leading-[1.1] mb-6"
            >
              Architecting the Future of <br className="hidden sm:inline" />
              <span className="text-gradient-brand">Flexible Workspaces</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-para-gray text-sm sm:text-base md:text-lg max-w-3xl leading-relaxed mb-8 opacity-95"
            >
              We combine grade-A physical corporate office cabins with automated compliance registration, high-performance managed networks, and instant GST certifications so companies can scale borderless.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#mission"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-xs tracking-wide transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                Explore Our Purpose
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white border border-[#E8EDF2] hover:border-[#c4d6e9] hover:bg-[#F8FAFC] text-foreground font-semibold text-xs tracking-wide transition-all cursor-pointer"
              >
                Connect With Us
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Metrics Block */}
      <section className="bg-white border-y border-[#E8EDF2] py-12 md:py-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col items-center justify-center text-center p-4 ${
                  index > 1 ? 'pt-8 md:pt-4' : ''
                }`}
              >
                <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary tracking-tight mb-2">
                  <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals || 0} />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-para-gray">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Core Pillars (Mission, Vision, Strategy) */}
      <section id="mission" className="py-24 bg-background-alt border-y border-slate-200/50 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3.5 py-1 rounded bg-white border border-[#c4d6e9] text-[10px] font-bold tracking-wider uppercase text-primary">
              Core Pillars
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-4 tracking-tight">
              What Drives Our Focus
            </h2>
            <p className="text-para-gray text-xs sm:text-sm">
              We operate at the convergence of Grade-A workspace physical logistics and structural regulatory technologies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Our Mission",
                description: "To eliminate the operational overhead of physical real estate expansion. We build pre-configured commercial spaces that launch immediately without building delays.",
                color: "bg-white"
              },
              {
                title: "Our Vision",
                description: "To make borderless company scaling frictionless. In addition to a physical workspace, we provide legal NOCs, digital mail scans, and corporate GST filing endpoints.",
                color: "bg-white"
              },
              {
                title: "Our Strategy",
                description: "By integrating real estate selection, secure network engineering (isolated VLANs), and compliance coordination, we deliver 100% managed hubs within 48 hours.",
                color: "bg-white"
              }
            ].map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${pillar.color} border border-[#E8EDF2] hover:border-[#c4d6e9] rounded-2xl p-8 flex flex-col justify-between h-full hover:shadow-[0_12px_30px_rgba(48,87,137,0.06)] transition-all duration-300 group`}
              >
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-3 tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-para-gray text-xs sm:text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
                <div className="mt-8 flex items-center text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Learn more</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Asymmetric Photo Collage (Solar Panel Inspiration) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-12 gap-4 md:gap-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="col-span-12 md:col-span-8 relative h-[280px] sm:h-[360px] md:h-[420px] rounded-2xl overflow-hidden border border-[#E8EDF2] shadow-sm group"
            >
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
                alt="Premium Collaboration Zone"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6 md:p-8">
                <div className="text-white">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-accent mb-1.5">Collaboration</p>
                  <h4 className="text-base md:text-lg font-bold">Integrated Common Lounge & Focus Rooms</h4>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="col-span-12 md:col-span-4 relative h-[280px] sm:h-[360px] md:h-[420px] rounded-2xl overflow-hidden border border-[#E8EDF2] shadow-sm group"
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600"
                alt="Active Tech Team Meeting"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-accent mb-1.5">Launch</p>
                  <h4 className="text-base font-bold">Series A & Enterprise Cabins</h4>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="col-span-12 md:col-span-4 relative h-[280px] sm:h-[360px] md:h-[420px] rounded-2xl overflow-hidden border border-[#E8EDF2] shadow-sm group"
            >
              <img
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600"
                alt="Private Cabins"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-accent mb-1.5">Compliance</p>
                  <h4 className="text-base font-bold">Secure Address & Mail Hubs</h4>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="col-span-12 md:col-span-8 relative h-[280px] sm:h-[360px] md:h-[420px] rounded-2xl overflow-hidden border border-[#E8EDF2] shadow-sm group"
            >
              <img
                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800"
                alt="Premium Cafeteria"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6 md:p-8">
                <div className="text-white">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-accent mb-1.5">Lifestyle</p>
                  <h4 className="text-base md:text-lg font-bold">Grade-A Cafeteria & Wellness Pods</h4>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Core Values Grid */}
      <section className="py-24 bg-background-alt border-y border-slate-200/50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3.5 py-1 rounded bg-white border border-[#c4d6e9] text-[10px] font-bold tracking-wider uppercase text-primary">
              Core Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-4 tracking-tight">
              Beliefs that Guide Us
            </h2>
            <p className="text-para-gray text-xs sm:text-sm">
              We hold ourselves to high operational, regulatory, and infrastructural standards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {VALUES.map((val, idx) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="bg-white border border-[#E8EDF2] hover:border-[#c4d6e9] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col h-full"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#DEE9F4] text-primary flex items-center justify-center border border-[#c4d6e9] mb-5 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-3 tracking-tight group-hover:text-primary transition-colors">
                    {val.title}
                  </h3>
                  <p className="text-para-gray text-xs sm:text-sm leading-relaxed flex-1">
                    {val.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
