"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#151619] text-[#FAF8F5] pt-16 pb-12 border-t border-[#282A2E]">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <div className="pb-12 border-b border-[#282A2E] flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-semibold text-primary block mb-1">
              Fokel Workspaces
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white max-w-2xl">
              Your next workspace starts here.
            </h2>
          </div>
          <Link
            href="/services/workspaces"
            className="bg-primary hover:bg-[#A93E1B] text-white px-5 py-2.5 rounded-sm text-xs font-semibold transition-colors inline-block self-start md:self-auto"
          >
            Explore all workspaces →
          </Link>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-10 border-b border-[#282A2E] text-xs">
          
          <div className="col-span-2 md:col-span-1">
            <span className="text-xl font-bold tracking-tight text-white block mb-2">
              Fokel
            </span>
            <p className="text-white/60 leading-relaxed">
              India's commercial workspace aggregator for coworking, managed office suites, and flexible business spaces.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-primary mb-3">
              Explore spaces
            </h4>
            <ul className="flex flex-col gap-2 text-white/70">
              <li><Link href="/services/workspaces?type=Coworking+Space" className="hover:text-white transition-colors">Coworking spaces</Link></li>
              <li><Link href="/services/workspaces?type=Managed+Office" className="hover:text-white transition-colors">Managed office suites</Link></li>
              <li><Link href="/services/workspaces?type=Private+Office" className="hover:text-white transition-colors">Private cabins</Link></li>
              <li><Link href="/services/workspaces?type=Virtual+Office" className="hover:text-white transition-colors">Virtual offices</Link></li>
              <li><Link href="/services/workspaces" className="hover:text-white transition-colors">Meeting rooms</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-primary mb-3">
              Key business hubs
            </h4>
            <ul className="flex flex-col gap-2 text-white/70">
              <li><Link href="/services/workspaces?city=Delhi+NCR" className="hover:text-white transition-colors">Delhi NCR</Link></li>
              <li><Link href="/services/workspaces?city=Gurugram" className="hover:text-white transition-colors">Gurugram Cyber City</Link></li>
              <li><Link href="/services/workspaces?city=Bangalore" className="hover:text-white transition-colors">Bangalore Indiranagar</Link></li>
              <li><Link href="/services/workspaces?city=Mumbai" className="hover:text-white transition-colors">Mumbai BKC</Link></li>
              <li><Link href="/services/workspaces?city=Noida" className="hover:text-white transition-colors">Noida Expressway</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-primary mb-3">
              For businesses
            </h4>
            <ul className="flex flex-col gap-2 text-white/70">
              <li><Link href="/list-space" className="hover:text-white transition-colors">List your workspace</Link></li>
              <li><Link href="/business-registration" className="hover:text-white transition-colors">Enterprise managed suites</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing plans</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Partner program</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-primary mb-3">
              Company
            </h4>
            <ul className="flex flex-col gap-2 text-white/70">
              <li><Link href="/about-us" className="hover:text-white transition-colors">About Fokel</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact support</Link></li>
              <li><Link href="/about-us" className="hover:text-white transition-colors">Privacy policy</Link></li>
              <li><Link href="/about-us" className="hover:text-white transition-colors">Terms of service</Link></li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50">
          <p>© {new Date().getFullYear()} Fokel Technologies India Pvt. Ltd. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Designed for Indian business districts</p>
        </div>

      </div>
    </footer>
  );
}
