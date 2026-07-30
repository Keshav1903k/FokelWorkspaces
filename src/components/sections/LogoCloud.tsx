"use client";

import { motion } from "framer-motion";

function BharatPeLogo() {
  return (
    <svg viewBox="0 0 200 50" className="w-[155px] h-[39px]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="25" r="14" stroke="#00b2d6" strokeWidth="2.5" />
      <path d="M12 21h16" stroke="#ff9933" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M12 25h16" stroke="#dddddd" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M12 29h16" stroke="#128807" strokeWidth="2.5" strokeLinecap="round" />
      <text x="44" y="33" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="22" fill="#1b2a47">Bharat</text>
      <text x="118" y="33" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="22" fill="#00b2d6">Pe</text>
    </svg>
  );
}

function Cars24Logo() {
  return (
    <svg viewBox="0 0 160 50" className="w-[150px] h-[46px]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="156" height="46" rx="6" stroke="#ff931f" strokeWidth="2.5" />
      <text x="12" y="33" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="24" fill="#1d2d50" letterSpacing="0.5">CARS</text>
      <g clipPath="url(#right-clip)">
        <rect x="94" y="2" width="64" height="46" fill="#ff931f" />
        <path d="M102 2l15 46M117 2l15 46M132 2l15 46" stroke="#d97510" strokeWidth="2" />
      </g>
      <text x="108" y="33" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="24" fill="#ffffff">24</text>
      <defs>
        <clipPath id="right-clip">
          <rect x="2" y="2" width="156" height="46" rx="6" />
        </clipPath>
      </defs>
    </svg>
  );
}

function JioSaavnLogo() {
  return (
    <svg viewBox="0 0 200 50" className="w-[165px] h-[41px]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="25" r="16" fill="#00d1b2" />
      <path d="M22 13c-3.5 4.5 -6 8 -6 11.5 0 3.5 2.5 6 6 6s6-2.5 6-6c0-3.5-2.5-7-6-11.5z" fill="#ffffff" />
      <text x="48" y="33" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="22" fill="#1b2a47">Jio</text>
      <text x="80" y="33" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="22" fill="#1b2a47">Saavn</text>
    </svg>
  );
}

function FlipkartLogo() {
  return (
    <svg viewBox="0 0 220 50" className="w-[175px] h-[40px]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="10" y="34" fontFamily="system-ui, sans-serif" fontWeight="800" fontStyle="italic" fontSize="26" fill="#2874f0">Flipkart</text>
      <g transform="translate(142, 6)">
        <path d="M4 12v20a4 4 0 004 4h18a4 4 0 004-4V12H4z" fill="#ffe11b" />
        <path d="M10 12V8a4 4 0 018 0v4" stroke="#ffe11b" strokeWidth="3" fill="none" />
        <path d="M17 17v4h4v2h-4v7h-2.5v-7h-2v-2h2v-2.5c0-2 1.2-3.5 3.5-3.5h2.5v2H18c-.8 0-1 .4-1 1z" fill="#2874f0" />
        <path d="M9 19.5h3.5M9 23h3.5" stroke="#2874f0" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function MagicBricksLogo() {
  return (
    <svg viewBox="0 0 220 50" className="w-[160px] h-[36px]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="5" y="32" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="24" fill="#333333">magic</text>
      <text x="75" y="32" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="24" fill="#d93838">bricks</text>
      <g transform="translate(156, 4)">
        <text x="0" y="8" fontFamily="system-ui, sans-serif" fontWeight="600" fontSize="9" fill="#777777">.</text>
        <text x="0" y="16" fontFamily="system-ui, sans-serif" fontWeight="600" fontSize="9" fill="#777777">c</text>
        <text x="0" y="24" fontFamily="system-ui, sans-serif" fontWeight="600" fontSize="9" fill="#777777">o</text>
        <text x="0" y="32" fontFamily="system-ui, sans-serif" fontWeight="600" fontSize="9" fill="#777777">m</text>
      </g>
    </svg>
  );
}

function TopprLogo() {
  return (
    <svg viewBox="0 0 160 50" className="w-[140px] h-[43px]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="25" r="15" fill="#00a3ff" />
      <path d="M17 30l10-10M20 20h7v7" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="46" y="33" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="26" fill="#1b2a47" letterSpacing="-0.5">toppr</text>
    </svg>
  );
}

function SanDiskLogo() {
  return (
    <svg viewBox="0 0 180 50" className="w-[150px] h-[42px]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 14c-4 4-4 12 0 16" stroke="#111111" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M20 14c4 4 4 12 0 16" stroke="#e01a22" strokeWidth="3.5" strokeLinecap="round" />
      <text x="32" y="32" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="24" fill="#111111" letterSpacing="-0.5">SanDisk</text>
    </svg>
  );
}

function RebelFoodsLogo() {
  return (
    <svg viewBox="0 0 160 50" className="w-[145px] h-[45px]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="10" y="27" fontFamily="'Impact', Arial black, sans-serif" fontWeight="900" fontSize="28" fill="#111111" letterSpacing="1">REBEL</text>
      <text x="36" y="42" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="10" fill="#111111" letterSpacing="3.5">FOODS</text>
    </svg>
  );
}

const CLIENTS = [
  { logo: BharatPeLogo },
  { logo: Cars24Logo },
  { logo: JioSaavnLogo },
  { logo: FlipkartLogo },
  { logo: MagicBricksLogo },
  { logo: TopprLogo },
  { logo: SanDiskLogo },
  { logo: RebelFoodsLogo },
];

const DOUBLED_CLIENTS = [...CLIENTS, ...CLIENTS, ...CLIENTS];

export function LogoCloud() {
  return (
    <section className="py-24 border-t border-slate-100 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Sliding logos track */}
          <div className="lg:col-span-7 flex flex-col gap-6 w-full overflow-hidden">
            <div>
              <p className="text-xs text-primary uppercase tracking-widest font-bold mb-2">
                Our Clients
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 tracking-tight leading-tight">
                Trusted by Top Enterprises & Startups
              </h2>
            </div>
            
            <div className="relative w-full pt-4">
              {/* Left fade */}
              <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none" />
              {/* Right fade */}
              <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />

              <motion.div
                animate={{ x: ["0%", "-33.33%"] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="flex gap-4 w-max items-center"
              >
                {DOUBLED_CLIENTS.map((client, i) => {
                  const LogoComponent = client.logo;
                  return (
                    <div
                      key={i}
                      className="flex items-center justify-center px-6 py-4 rounded-xl bg-white border border-slate-100 whitespace-nowrap group hover:border-primary/20 transition-colors duration-250 shadow-sm"
                    >
                      <LogoComponent />
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>

          {/* Right Column: Visual Collaboration Photo */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 w-full flex justify-center"
          >
            <div className="relative w-full max-w-lg aspect-[4/3] rounded-xl overflow-hidden border border-slate-100 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600"
                alt="Fokel Team Collaboration"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-[10px] font-bold uppercase tracking-wider mb-0.5 opacity-90">Corporate Networking</p>
                <p className="text-[10px] font-medium opacity-80 leading-relaxed">Collaborative workspaces built to fuel innovation.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
