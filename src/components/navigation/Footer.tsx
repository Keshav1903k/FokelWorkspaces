import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-footer-bg pt-20 pb-10 relative overflow-hidden">
      {/* Top glowing line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-80" />
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[4px] opacity-40" />

      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-16">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-primary overflow-hidden">
                <Sparkles className="w-4 h-4 text-white z-10" />
              </div>
              <span className="font-heading font-bold text-xl tracking-tight text-white">
                Fokel Workspaces
              </span>
            </Link>
            <p className="text-footer-text text-sm leading-relaxed max-w-xs">
              Premium commercial real estate and business infrastructure solutions. Empowering businesses with flexible workspaces, virtual offices, and legal registrations.
            </p>

            <div className="mt-4">
              <h4 className="text-white font-medium mb-3 text-sm">Subscribe to our newsletter</h4>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-[#1a2938] border-[#374e66] text-white placeholder:text-[#C9D6E3]/40 focus-visible:ring-1 focus-visible:ring-[#D9BD9C]/50 h-10"
                />
                <Button className="h-10 px-4 shrink-0 bg-primary hover:bg-primary-hover text-white cursor-pointer transition-colors shadow-sm">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Workspaces links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Workspaces</h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Virtual Offices", href: "/services/workspaces?type=Virtual Office" },
                { label: "Coworking Spaces", href: "/services/workspaces?type=Coworking Space" },
                { label: "Private Offices", href: "/services/workspaces?type=Private Office" },
                { label: "Enterprise Suites", href: "/services/workspaces?type=Enterprise Office" }
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-footer-text hover:text-brand-gold transition-colors text-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Business Setup</h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Company Incorporation", href: "/business-registration" },
                { label: "GST Registration", href: "/business-registration" },
                { label: "Trademark Filings", href: "/business-registration" },
                { label: "Legal Contracts", href: "/business-registration" }
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-footer-text hover:text-brand-gold transition-colors text-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Locations</h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Bangalore", href: "/services/workspaces?city=Bangalore" },
                { label: "Mumbai", href: "/services/workspaces?city=Mumbai" },
                { label: "Delhi NCR", href: "/services/workspaces?city=Delhi NCR" },
                { label: "Hyderabad", href: "/services/workspaces?city=Hyderabad" }
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-footer-text hover:text-brand-gold transition-colors text-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Company</h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: "About Us", href: "/about-us" },
                { label: "Contact", href: "/contact" },
                { label: "Terms of Service", href: "#" },
                { label: "Privacy Policy", href: "#" }
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-footer-text hover:text-brand-gold transition-colors text-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-footer-text/80 text-sm">
            © {new Date().getFullYear()} Fokel. All rights reserved.
          </p>
          {/* Social icons removed */}
        </div>
      </div>
    </footer>
  );
}
