export interface WorkspaceSpace {
  id: string;
  title: string;
  location: string;
  city: string;
  price: string;
  type: "Virtual Office" | "Coworking Space" | "Private Office" | "Enterprise Office" | "Meeting Room";
  rating: number;
  amenities: string[];
  image: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon key
  category: "Workspaces" | "Business Registration" | "Support Services";
}

export interface StatItem {
  value: string;
  label: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  text: string;
  avatar: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
  type: string;
}

export const CITIES = [
  "Bangalore",
  "Mumbai",
  "Delhi NCR",
  "Hyderabad",
  "Pune",
  "Chennai"
];

export const WORKSPACE_TYPES = [
  "Virtual Office",
  "Coworking Space",
  "Private Office",
  "Enterprise Office",
  "Meeting Room"
];

export const STATS: StatItem[] = [
  { value: "15,000+", label: "Businesses Served" },
  { value: "25+", label: "Cities Covered" },
  { value: "120+", label: "Office Spaces" },
  { value: "8,000+", label: "Successful Registrations" },
  { value: "99.2%", label: "Customer Satisfaction" },
  { value: "24/7", label: "Dedicated Support" }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "virtual-office",
    title: "Virtual Office",
    description: "Get a premium business address, mail handling services, and professional phone answering without renting physical space.",
    icon: "MapPin",
    category: "Workspaces"
  },
  {
    id: "coworking-spaces",
    title: "Coworking Spaces",
    description: "Hot desks and dedicated desks in vibrant shared environments, perfect for freelancers, startups, and remote teams.",
    icon: "Users",
    category: "Workspaces"
  },
  {
    id: "managed-office",
    title: "Managed Office Spaces",
    description: "Tailor-made private office suites fully managed and customized to reflect your corporate brand identity.",
    icon: "Building",
    category: "Workspaces"
  },
  {
    id: "ready-to-move",
    title: "Ready-to-Move Offices",
    description: "Fully operational office spaces with high-speed internet, power backup, and modern IT infrastructure setup.",
    icon: "FileCheck",
    category: "Workspaces"
  },
  {
    id: "flexible-spaces",
    title: "Flexible Office Spaces",
    description: "Scale your space requirements up or down on-demand with highly adaptable layout configurations.",
    icon: "LayoutGrid",
    category: "Workspaces"
  },
  {
    id: "private-offices",
    title: "Private Offices",
    description: "Secure, lockable, and fully furnished office rooms for individuals and small teams needing maximum privacy.",
    icon: "Lock",
    category: "Workspaces"
  },
  {
    id: "meeting-rooms",
    title: "Meeting & Conference Rooms",
    description: "State-of-the-art meeting, conference, and boardrooms equipped with AV projection and video conferencing tools.",
    icon: "Presentation",
    category: "Workspaces"
  },
  {
    id: "business-registration",
    title: "Business Registration",
    description: "End-to-end guidance and documentation support to register your business entity in your preferred state.",
    icon: "FileText",
    category: "Business Registration"
  },
  {
    id: "company-incorporation",
    title: "Company Incorporation",
    description: "Complete incorporation filing support for Private Limited (Pvt Ltd), LLP, or OPC structures.",
    icon: "Award",
    category: "Business Registration"
  },
  {
    id: "gst-registration",
    title: "GST Registration",
    description: "Fast-track Goods and Services Tax registration and subsequent compliance services managed by experts.",
    icon: "Percent",
    category: "Business Registration"
  },
  {
    id: "trademark-registration",
    title: "Trademark Registration",
    description: "Secure your brand identity with trademark search, brand registration, and legal patent support.",
    icon: "ShieldAlert",
    category: "Business Registration"
  },
  {
    id: "legal-assistance",
    title: "Legal Assistance",
    description: "Access our expert legal panel to draft commercial leases, vendor agreements, and NDA contracts.",
    icon: "Scale",
    category: "Business Registration"
  },
  {
    id: "portfolio-management",
    title: "Portfolio Management",
    description: "Optimize corporate real estate portfolios to lower operational expenditure and lease obligations.",
    icon: "Briefcase",
    category: "Support Services"
  },
  {
    id: "mail-handling",
    title: "Mail Handling & Address",
    description: "Secure receipt, scanning, physical forwarding, and digitization of all your business mails.",
    icon: "Mail",
    category: "Support Services"
  },
  {
    id: "property-consulting",
    title: "Commercial Property Consulting",
    description: "Expert advisory services to help you source, evaluate, and acquire grade-A commercial real estate assets.",
    icon: "HelpCircle",
    category: "Support Services"
  }
];

export const WORKSPACES: WorkspaceSpace[] = [
  {
    id: "prop-1",
    title: "The Zenith Center",
    location: "Indiranagar, Bangalore",
    city: "Bangalore",
    price: "₹8,500/seat",
    type: "Coworking Space",
    rating: 4.9,
    amenities: ["24/7 Access", "High-speed Wi-Fi", "Coffee Bar", "Phone Booths"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "prop-2",
    title: "Signature Corporate Tower",
    location: "BKC, Mumbai",
    city: "Mumbai",
    price: "₹25,000/desk",
    type: "Private Office",
    rating: 4.8,
    amenities: ["Reception Desk", "Parking", "Board Room", "IT Support"],
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "prop-3",
    title: "Capital Business Suite",
    location: "Connaught Place, Delhi NCR",
    city: "Delhi NCR",
    price: "₹1,499/mo",
    type: "Virtual Office",
    rating: 4.7,
    amenities: ["Business Address", "Mail Scanning", "Meeting Access", "GST Registered"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "prop-4",
    title: "Hi-Tech Hub",
    location: "Gachibowli, Hyderabad",
    city: "Hyderabad",
    price: "₹12,000/seat",
    type: "Enterprise Office",
    rating: 4.9,
    amenities: ["Custom Layout", "Dedicated Pantry", "Secure Server Room", "Recreation Area"],
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "prop-5",
    title: "The Summit Executive",
    location: "Kalyani Nagar, Pune",
    city: "Pune",
    price: "₹1,500/hr",
    type: "Meeting Room",
    rating: 4.6,
    amenities: ["4K TV Screen", "Video Conf Tech", "Whiteboards", "Catering Available"],
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "prop-6",
    title: "Elite Space",
    location: "OMR, Chennai",
    city: "Chennai",
    price: "₹7,500/seat",
    type: "Coworking Space",
    rating: 4.7,
    amenities: ["High-speed Wi-Fi", "Lounge Area", "Parking", "Cafeteria"],
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800"
  }
];

export const TIMELINE_STEPS = [
  {
    number: "01",
    title: "Choose Service",
    description: "Select the workspace type or business registration service that matches your operational needs."
  },
  {
    number: "02",
    title: "Select Location",
    description: "Choose from our premium locations across major business hubs in India's top metros."
  },
  {
    number: "03",
    title: "Upload Documents",
    description: "Provide company details or KYC documents securely through our digital portal."
  },
  {
    number: "04",
    title: "Verification",
    description: "Our legal and property compliance experts quickly verify the documents and requirements."
  },
  {
    number: "05",
    title: "Registration",
    description: "We issue drafts, commercial lease agreements, NOCs, and complete the registration filing."
  },
  {
    number: "06",
    title: "Business Ready",
    description: "Step into your new office, or start invoicing with your brand new verified GST registered address."
  }
];

export const WHY_CHOOSE_US = [
  {
    title: "Prime Business Locations",
    description: "Establish your brand with prestigious commercial office addresses in prime financial districts.",
    icon: "MapPin"
  },
  {
    title: "Verified Addresses",
    description: "Get fully compliant business addresses with all the required documentation, lease deeds, and NOCs.",
    icon: "Shield"
  },
  {
    title: "Fast Processing",
    description: "Save time with our automated document templates and quick-turnaround legal verification process.",
    icon: "Zap"
  },
  {
    title: "Legal Support",
    description: "Rely on our in-house legal experts to navigate zoning laws, commercial lease terms, and incorporation filings.",
    icon: "Scale"
  },
  {
    title: "Flexible Plans",
    description: "Pay for what you need with scalable membership models that allow you to grow smoothly.",
    icon: "Calendar"
  },
  {
    title: "Affordable Pricing",
    description: "Save up to 60% on overheads compared to traditional workspace sourcing and corporate leases.",
    icon: "CreditCard"
  },
  {
    title: "Dedicated Experts",
    description: "Our customer success managers and local operations teams support you at every single milestone.",
    icon: "Headset"
  },
  {
    title: "Transparent Docs",
    description: "No hidden charges, zero surprises. What you see in our proposal is exactly what you pay.",
    icon: "FileText"
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Virtual Office",
    price: "₹1,499",
    period: "month",
    description: "Perfect for remote founders, startups, and freelancers who need a professional presence and GST/company registration.",
    features: [
      "Premium Commercial Address",
      "Company Registration Support",
      "GST Registration Assistance",
      "Mail Receipt & Digital Scanning",
      "Access to Courier Forwarding",
      "2 Hours Meeting Room access/mo"
    ],
    cta: "Get Virtual Office",
    popular: false,
    type: "Virtual Office"
  },
  {
    name: "Coworking Space",
    price: "₹7,999",
    period: "desk/month",
    description: "Flexible, productive workspaces inside vibrant environments. Choose hot desks or dedicated seats with full amenities.",
    features: [
      "Access to Shared Workspace Area",
      "High-speed Wi-Fi & LAN ports",
      "Unlimited Gourmet Tea & Coffee",
      "₹500 Printing Credits / month",
      "10 Hours Meeting Room access/mo",
      "Professional Reception Support"
    ],
    cta: "Book a Desk",
    popular: true,
    type: "Coworking Space"
  },
  {
    name: "Private Office",
    price: "₹18,000",
    period: "seat/month",
    description: "Fully secure, lockable private cabins for scaling teams. Includes storage space, high-speed IT setups, and customization options.",
    features: [
      "Dedicated Secure Suite Space",
      "Lockable storage & cabinets",
      "Flexible sizing starting from 2 seats",
      "Free 25 Hours Meeting Room access/mo",
      "Complimentary Reception Answering",
      "High-speed secure IT networking"
    ],
    cta: "Request Proposal",
    popular: false,
    type: "Private Office"
  },
  {
    name: "Enterprise Office",
    price: "Custom",
    period: "quote",
    description: "Highly customized, custom-branded full office floors designed, built, and managed entirely by our workplace design team.",
    features: [
      "Entire custom-branded layouts",
      "Dedicated pantry & reception desk",
      "Corporate-grade firewall & server rooms",
      "Dedicated center operations team",
      "Custom meeting and breakout spaces",
      "Scale from 50 to 500+ seats smoothly"
    ],
    cta: "Contact Enterprise Sales",
    popular: false,
    type: "Enterprise Office"
  }
];

export const FAQS: FaqItem[] = [
  {
    id: "faq-1",
    question: "What documents are required to set up a virtual office?",
    answer: "To set up a virtual office for GST or business registration, we require owner PAN Card, Aadhaar Card, incorporation certificates (if existing), and authorized signatory credentials. We will provide the Commercial Lease Agreement, NOC (No Objection Certificate), and utility bills."
  },
  {
    id: "faq-2",
    question: "Can I use the Virtual Office address for GST registration?",
    answer: "Yes, absolutely. Our commercial real estate addresses are located in approved commercial zones and come with the necessary lease deeds, landlord NOCs, and municipal tax receipts, ensuring smooth approval for GST registration."
  },
  {
    id: "faq-3",
    question: "How do you handle incoming mail and packages?",
    answer: "All incoming mail and couriers are received at the center's front reception desk. We register them, scan the envelopes, and send you digital notifications. You can request us to securely scan the contents, forward them to your residential address, or hold them for local pickup."
  },
  {
    id: "faq-4",
    question: "Can I book meeting rooms if I only have a Virtual Office plan?",
    answer: "Yes, Virtual Office members receive monthly credits for meeting rooms. If you exhaust those credits, you can easily book conference and meeting rooms on an hourly basis through our portal at a member-discounted price."
  },
  {
    id: "faq-5",
    question: "Are there any lock-in periods for coworking or private spaces?",
    answer: "Our Coworking Spaces have flexible month-to-month memberships with no long-term commitment. For Private Offices, we usually have a minimum commitment of 3 to 11 months depending on customize requests and sizing."
  },
  {
    id: "faq-6",
    question: "Is IT support included in my office plan?",
    answer: "Yes, all our workspaces feature on-site IT support during business hours. We provide network configuration, secure VLAN setups for enterprise suites, firewall support, printer configuration, and stable power backup."
  }
];

export const NAV_LINKS = [
  { name: "Services", href: "/services" },
  { name: "Pricing", href: "/pricing" },
  { name: "About Us", href: "/about-us" },
  { name: "Contact", href: "/contact" }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t-1",
    name: "Rohan Sharma",
    role: "Co-Founder",
    company: "ZetaTech Labs",
    rating: 5,
    text: "Setting up our Bangalore team at Fokel was incredibly smooth. The team had our high-speed internet and secure server space active in under 48 hours. The design and natural lighting are fantastic.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
  },
  {
    id: "t-2",
    name: "Priyanka Sen",
    role: "Founder",
    company: "Studio Indigo",
    rating: 5,
    text: "The virtual office GST registration process is standard, but the speed at which Fokel delivered landlord documents and NOCs was impressive. Their digital mail scanning dashboard is brilliant.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120"
  },
  {
    id: "t-3",
    name: "Vikram Malhotra",
    role: "VP of Operations",
    company: "Scale Logistics",
    rating: 4.8,
    text: "We needed an enterprise suite for 65 seats in Mumbai BKC. Fokel design team customized our suite with a private phone booth and executive offices, delivering exactly to our brand book.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120"
  },
  {
    id: "t-4",
    name: "Ananya Iyer",
    role: "VP of People",
    company: "Finlytics",
    rating: 5,
    text: "We leased a private managed cabin for our growing team in Delhi. The administrative support, housekeeping, and premium coffee options have made it the perfect office space for us.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120"
  }
];

export const GALLERY_ITEMS = [
  {
    title: "Coworking Lounge",
    description: "Vibrant shared space with collaborative seating and hot desks.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Executive Private Suite",
    description: "Premium lockable suites designed for fast-growing scaling teams.",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Board Conference Room",
    description: "Professional boardroom equipped with visual and video tech.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Modern Reception Deck",
    description: "Warm, professional front desk that welcomes your clients.",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Cafeteria & Breakout Lounge",
    description: "Unlimited premium coffee, fresh brews, and social break space.",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Phone Booths & Quiet Pods",
    description: "Sound-insulated booths for critical private client calls.",
    image: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&q=80&w=800"
  }
];

// Temporary dummy exports to satisfy unused legacy components and ensure build succeeds
export interface AITool {
  id: string;
  name: string;
  category: string;
  pricing: "Free" | "Freemium" | "Paid" | "Enterprise";
  description: string;
  logo: string;
  rating: number;
  url: string;
  tags: string[];
}

export const CATEGORIES: string[] = [];
export const MOCK_TOOLS: AITool[] = [];
