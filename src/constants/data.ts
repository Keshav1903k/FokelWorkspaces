export interface WorkspaceSpace {
  id: string;
  slug?: string;
  title: string;
  location: string;
  city: string;
  locality?: string;
  price: string;
  priceMonthly?: number;
  type: string;
  prismaType?: string;
  rating: number;
  amenities: string[];
  image: string;
  imageFileName?: string;
  description?: string;
  address?: string;
  pincode?: string;
  capacity?: string | number;
  priceUnit?: string;
  images?: string[];
  internalName?: string;
  shortId?: string;
  url?: string;
  seoTitle?: string;
  stateCode?: string;
  legacySlug?: string;
  [key: string]: any;
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
  "Chennai",
  "Kolkata"
];

export const WORKSPACE_TYPES = [
  "Coworking Space",
  "Managed Office",
  "Office/Commercial Spaces",
  "Virtual Office"
];

export const STATS: StatItem[] = [
  { value: "15,000+", label: "Businesses Served" },
  { value: "5", label: "Cities Covered" },
  { value: "63", label: "Verified Workspaces" },
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
    "id": "prop-1",
    "slug": "ofcdl01",
    "title": "Asaf Ali Road Coworking 01",
    "location": "Asaf Ali Road, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Asaf Ali Road",
    "price": "\u20b95,499/seat",
    "priceMonthly": 5499,
    "type": "Coworking Space",
    "rating": 4.8,
    "amenities": [
      "High-speed Wi-Fi",
      "Power Backup",
      "Charging Points",
      "Printing",
      "Air Conditioning",
      "Mail Handling"
    ],
    "image": "/images/properties/22-workspace-corporate-house/image-1.jpg",
    "imageFileName": "22 Workspace - Corporate House.jpg",
    "description": "Budget-friendly coworking centre on Asaf Ali Road, a short hop from Connaught Place and New Delhi metro (about 0.8 km). Flexi day passes plus dedicated desks, open 9 am to 7 pm Monday to Saturday.",
    "address": "Asaf Ali Road, Central Delhi",
    "pincode": "110002",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/22-workspace-corporate-house/image-1.jpg",
      "/images/properties/22-workspace-corporate-house/image-2.jpg"
    ],
    "internalName": "22 Workspace - Corporate House",
    "name": "Asaf Ali Road Coworking 01",
    "shortId": "OFCDL01",
    "url": "/coworking/delhi/asaf-ali-road/ofcdl01",
    "seoTitle": "Coworking in Asaf Ali Road, Delhi - OFCDL01 | Officera",
    "stateCode": "DL",
    "legacySlug": "22-workspace-corporate-house",
    "internalAddress": "1/22, 2nd Floor, Asaf Ali Road, Opposite Kamla Market HP Petrol Pump, New Delhi"
  },
  {
    "id": "prop-2",
    "slug": "ofcdl02",
    "title": "Asaf Ali Road Coworking 02",
    "location": "Asaf Ali Road, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Asaf Ali Road",
    "price": "\u20b96,999/seat",
    "priceMonthly": 6999,
    "type": "Coworking Space",
    "rating": 4.9,
    "amenities": [
      "High-speed Wi-Fi",
      "Power Backup",
      "Printing",
      "Air Conditioning",
      "Mail Handling"
    ],
    "image": "/images/properties/22-workspace-asaf-ali-road/image-1.jpg",
    "imageFileName": "22 Workspace - Asaf Ali Road.jpg",
    "description": "Second 22 Workspace centre on Asaf Ali Road, about 1.3 km from Delhi Gate metro. A budget-friendly option for teams wanting a central Delhi address.",
    "address": "Asaf Ali Road, Central Delhi",
    "pincode": "110002",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/22-workspace-asaf-ali-road/image-1.jpg",
      "/images/properties/22-workspace-asaf-ali-road/image-2.jpg"
    ],
    "internalName": "22 Workspace - Asaf Ali Road",
    "name": "Asaf Ali Road Coworking 02",
    "shortId": "OFCDL02",
    "url": "/coworking/delhi/asaf-ali-road/ofcdl02",
    "seoTitle": "Coworking in Asaf Ali Road, Delhi - OFCDL02 | Officera",
    "stateCode": "DL",
    "legacySlug": "22-workspace-asaf-ali-road",
    "internalAddress": "3/8, 2nd Floor, Asaf Ali Road, New Delhi"
  },
  {
    "id": "prop-3",
    "slug": "ofcdl03",
    "title": "Connaught Place Coworking 01",
    "location": "Connaught Place, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Connaught Place",
    "price": "\u20b915,000/seat",
    "priceMonthly": 15000,
    "type": "Coworking Space",
    "rating": 4.7,
    "amenities": [
      "Dedicated Desks",
      "Storage Units",
      "Charging Points",
      "Power Backup",
      "Metro Connectivity"
    ],
    "image": "/images/properties/connect-hq-abl-workspaces-cp/image-1.jpg",
    "imageFileName": "Connect HQ - ABL Workspaces CP.jpg",
    "description": "Reserved dedicated desks with storage on the 2nd floor of M Block, Outer Circle, about 0.5 km from Rajiv Chowk metro. Part of ABL Workspaces, a Delhi NCR brand serving mostly corporate teams.",
    "address": "Outer Circle, Connaught Place, New Delhi",
    "pincode": "110001",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/connect-hq-abl-workspaces-cp/image-1.jpg",
      "/images/properties/connect-hq-abl-workspaces-cp/image-2.jpg"
    ],
    "internalName": "Connect HQ - ABL Workspaces CP",
    "name": "Connaught Place Coworking 01",
    "shortId": "OFCDL03",
    "url": "/coworking/delhi/connaught-place/ofcdl03",
    "seoTitle": "Coworking in Connaught Place, Delhi - OFCDL03 | Officera",
    "stateCode": "DL",
    "legacySlug": "connect-hq-abl-workspaces-cp",
    "internalAddress": "2nd Floor, 130-131, M Block, Outer Circle, Connaught Place, New Delhi"
  },
  {
    "id": "prop-4",
    "slug": "ofcdl04",
    "title": "Connaught Place Coworking 02",
    "location": "Connaught Place, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Connaught Place",
    "price": "\u20b910,999/seat",
    "priceMonthly": 10999,
    "type": "Coworking Space",
    "rating": 4.8,
    "amenities": [
      "Dedicated Desks",
      "Private Cabins",
      "Meeting Room Hours",
      "Storage",
      "Metro Connectivity"
    ],
    "image": "/images/properties/start-coworks-connaught-place/image-1.jpg",
    "imageFileName": "Start CoWorks - Connaught Place.jpg",
    "description": "Modern coworking space near R.K. Ashram Marg metro (about 400 m) with dedicated desks and private cabins. Rated 4.8 on CoFynd.",
    "address": "Panchkuian Marg, Connaught Place, New Delhi",
    "pincode": "110001",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/start-coworks-connaught-place/image-1.jpg"
    ],
    "internalName": "Start CoWorks - Connaught Place",
    "name": "Connaught Place Coworking 02",
    "shortId": "OFCDL04",
    "url": "/coworking/delhi/connaught-place/ofcdl04",
    "seoTitle": "Coworking in Connaught Place, Delhi - OFCDL04 | Officera",
    "stateCode": "DL",
    "legacySlug": "start-coworks-connaught-place",
    "internalAddress": "Building No-55, 1st Floor, Panchkuian Marg, Near Ramakrishna Ashram Metro Station, Connaught Place, New Delhi"
  },
  {
    "id": "prop-5",
    "slug": "ofcdl05",
    "title": "Nehru Place Coworking 01",
    "location": "Nehru Place, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Nehru Place",
    "price": "\u20b96,499/seat",
    "priceMonthly": 6499,
    "type": "Coworking Space",
    "rating": 4.6,
    "amenities": [
      "Air Conditioning",
      "Charging Points",
      "Power Backup",
      "Flexi Desks",
      "Dedicated Desks"
    ],
    "image": "/images/properties/rworkspaces-vardhman-trade-centre/image-1.jpg",
    "imageFileName": "Rworkspaces - Vardhman Trade Centre.jpg",
    "description": "Value-priced coworking centre in Nehru Place, South Delhi's IT and commercial hub. Rated 4.7 on myHQ from 157 reviews.",
    "address": "Lala Lajpat Rai Road, Nehru Place, New Delhi",
    "pincode": "110019",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/rworkspaces-vardhman-trade-centre/image-1.jpg",
      "/images/properties/rworkspaces-vardhman-trade-centre/image-2.jpg"
    ],
    "internalName": "Rworkspaces - Vardhman Trade Centre",
    "name": "Nehru Place Coworking 01",
    "shortId": "OFCDL05",
    "url": "/coworking/delhi/nehru-place/ofcdl05",
    "seoTitle": "Coworking in Nehru Place, Delhi - OFCDL05 | Officera",
    "stateCode": "DL",
    "legacySlug": "rworkspaces-vardhman-trade-centre",
    "internalAddress": "Vardhman Trade Centre, Unit No. 1, 3rd Floor, DDA Building, Lala Lajpat Rai Road, above Exide Life Insurance, Nehru Place, New Delhi"
  },
  {
    "id": "prop-6",
    "slug": "ofcdl06",
    "title": "Nehru Place Coworking 02",
    "location": "Nehru Place, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Nehru Place",
    "price": "\u20b98,500/seat",
    "priceMonthly": 8500,
    "type": "Coworking Space",
    "rating": 4.8,
    "amenities": [
      "Flexi Desks",
      "Dedicated Desks",
      "High-speed Wi-Fi",
      "Power Backup",
      "Metro Connectivity"
    ],
    "image": "/images/properties/rworkspaces-devika-towers/image-1.jpg",
    "imageFileName": "Rworkspaces - Devika Towers.jpg",
    "description": "Coworking for startups and corporates on the 7th floor of Devika Tower, about 550 m from Nehru Enclave metro. Flexi desks start around \u20b9250/day.",
    "address": "Main Market Commercial Area, Nehru Place, New Delhi",
    "pincode": "110019",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/rworkspaces-devika-towers/image-1.jpg",
      "/images/properties/rworkspaces-devika-towers/image-2.jpg"
    ],
    "internalName": "Rworkspaces - Devika Towers",
    "name": "Nehru Place Coworking 02",
    "shortId": "OFCDL06",
    "url": "/coworking/delhi/nehru-place/ofcdl06",
    "seoTitle": "Coworking in Nehru Place, Delhi - OFCDL06 | Officera",
    "stateCode": "DL",
    "legacySlug": "rworkspaces-devika-towers",
    "internalAddress": "713, 7th Floor, Devika Tower, Nehru Place, New Delhi"
  },
  {
    "id": "prop-7",
    "slug": "ofcdl07",
    "title": "Nehru Place Coworking 03",
    "location": "Nehru Place, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Nehru Place",
    "price": "\u20b912,999/seat",
    "priceMonthly": 12999,
    "type": "Coworking Space",
    "rating": 4.9,
    "amenities": [
      "Storage Space",
      "Breakout Area",
      "Cafeteria",
      "Metro Connectivity",
      "Flexi Desks"
    ],
    "image": "/images/properties/91springboard-chandra-bhavan/image-1.jpg",
    "imageFileName": "91Springboard - Chandra Bhavan.jpg",
    "description": "Established national-brand centre in Nehru Place, 400-450 m from Kalkaji Mandir and Nehru Place metro stations. Rated 4.4 from 658 reviews on myHQ.",
    "address": "Main Commercial Complex, Nehru Place, New Delhi",
    "pincode": "110019",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/91springboard-chandra-bhavan/image-1.jpg",
      "/images/properties/91springboard-chandra-bhavan/image-2.jpg"
    ],
    "internalName": "91Springboard - Chandra Bhavan",
    "name": "Nehru Place Coworking 03",
    "shortId": "OFCDL07",
    "url": "/coworking/delhi/nehru-place/ofcdl07",
    "seoTitle": "Coworking in Nehru Place, Delhi - OFCDL07 | Officera",
    "stateCode": "DL",
    "legacySlug": "91springboard-chandra-bhavan",
    "internalAddress": "3rd Floor, Chandra Bhavan, 67-68, Nehru Place, New Delhi"
  },
  {
    "id": "prop-8",
    "slug": "ofcdl08",
    "title": "Nehru Place Coworking 04",
    "location": "Nehru Place, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Nehru Place",
    "price": "\u20b911,000/seat",
    "priceMonthly": 11000,
    "type": "Coworking Space",
    "rating": 4.7,
    "amenities": [
      "Private Cabins",
      "Storage Space",
      "Breakout Area",
      "Cafeteria",
      "Air Conditioning"
    ],
    "image": "/images/properties/workly-hemkunt-chambers/image-1.jpg",
    "imageFileName": "Workly - Hemkunt Chambers.jpg",
    "description": "Private-cabin focused centre on the 3rd floor of Hemkunt Chambers in the heart of Nehru Place, with banks, cafes and food outlets nearby.",
    "address": "Commercial Enclave, Nehru Place, New Delhi",
    "pincode": "110019",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/workly-hemkunt-chambers/image-1.jpg",
      "/images/properties/workly-hemkunt-chambers/image-2.jpg"
    ],
    "internalName": "Workly - Hemkunt Chambers",
    "name": "Nehru Place Coworking 04",
    "shortId": "OFCDL08",
    "url": "/coworking/delhi/nehru-place/ofcdl08",
    "seoTitle": "Coworking in Nehru Place, Delhi - OFCDL08 | Officera",
    "stateCode": "DL",
    "legacySlug": "workly-hemkunt-chambers",
    "internalAddress": "Hemkunt Chambers, 3rd Floor, 310, 89, Nehru Place, New Delhi"
  },
  {
    "id": "prop-9",
    "slug": "ofcdl09",
    "title": "Nehru Place Coworking 05",
    "location": "Nehru Place, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Nehru Place",
    "price": "\u20b99,999/seat",
    "priceMonthly": 9999,
    "type": "Coworking Space",
    "rating": 4.8,
    "amenities": [
      "Meeting Rooms",
      "Common Areas",
      "Metro Connectivity",
      "24/7 Access",
      "Business Address"
    ],
    "image": "/images/properties/regus-eros-corporate-tower/image-1.jpg",
    "imageFileName": "Regus - Eros Corporate Tower.jpg",
    "description": "Premium Regus centre on the 15th floor of Eros Corporate Tower, steps from Nehru Place market and close to metro. Open 24/7 on myHQ listing.",
    "address": "Main Market Commercial Area, Nehru Place, New Delhi",
    "pincode": "110019",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/regus-eros-corporate-tower/image-1.jpg",
      "/images/properties/regus-eros-corporate-tower/image-2.jpg"
    ],
    "internalName": "Regus - Eros Corporate Tower",
    "name": "Nehru Place Coworking 05",
    "shortId": "OFCDL09",
    "url": "/coworking/delhi/nehru-place/ofcdl09",
    "seoTitle": "Coworking in Nehru Place, Delhi - OFCDL09 | Officera",
    "stateCode": "DL",
    "legacySlug": "regus-eros-corporate-tower",
    "internalAddress": "Eros Corporate Towers, 15th Floor, Nehru Place, New Delhi"
  },
  {
    "id": "prop-10",
    "slug": "ofcdl10",
    "title": "Saket Coworking 01",
    "location": "Saket, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Saket",
    "price": "\u20b913,999/seat",
    "priceMonthly": 13999,
    "type": "Coworking Space",
    "rating": 4.6,
    "amenities": [
      "Power Backup",
      "Stationery",
      "Metro Connectivity",
      "Flexi Desks",
      "Dedicated Desks",
      "Private Cabins"
    ],
    "image": "/images/properties/innov8-old-fort-saket/image-1.jpg",
    "imageFileName": "Innov8 - Old Fort Saket.jpg",
    "description": "Innov8 centre next to Select Citywalk Mall in Saket District Centre, offering flexi desks from about \u20b9350/day, dedicated desks and private cabins. Malviya Nagar metro is about 1.2 km away.",
    "address": "District Centre, Saket, New Delhi",
    "pincode": "110017",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/innov8-old-fort-saket/image-1.jpg",
      "/images/properties/innov8-old-fort-saket/image-2.jpg"
    ],
    "internalName": "Innov8 - Old Fort Saket",
    "name": "Saket Coworking 01",
    "shortId": "OFCDL10",
    "url": "/coworking/delhi/saket/ofcdl10",
    "seoTitle": "Coworking in Saket, Delhi - OFCDL10 | Officera",
    "stateCode": "DL",
    "legacySlug": "innov8-old-fort-saket",
    "internalAddress": "1st Floor, Old Fort, Saket District Centre, Next to Select City Walk Mall, Sector 6, Pushp Vihar, New Delhi"
  },
  {
    "id": "prop-11",
    "slug": "ofcdl11",
    "title": "Saket Coworking 02",
    "location": "Saket, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Saket",
    "price": "\u20b910,999/seat",
    "priceMonthly": 10999,
    "type": "Coworking Space",
    "rating": 4.8,
    "amenities": [
      "High-speed Wi-Fi",
      "Power Backup",
      "Air Conditioning",
      "Dedicated Desks"
    ],
    "image": "/images/properties/mio-coworks-saiyad-ul-ajaib/image-1.jpg",
    "imageFileName": "MIO Coworks - Saiyad Ul Ajaib.jpg",
    "description": "Coworking centre on Westend Marg in the Saket and Saiyad Ul Ajaib area of South Delhi.",
    "address": "Westend Marg, Saidulajab, Saket, New Delhi",
    "pincode": "110030",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/mio-coworks-saiyad-ul-ajaib/image-1.jpg",
      "/images/properties/mio-coworks-saiyad-ul-ajaib/image-2.jpg"
    ],
    "internalName": "MIO Coworks - Saiyad Ul Ajaib",
    "name": "Saket Coworking 02",
    "shortId": "OFCDL11",
    "url": "/coworking/delhi/saket/ofcdl11",
    "seoTitle": "Coworking in Saket, Delhi - OFCDL11 | Officera",
    "stateCode": "DL",
    "legacySlug": "mio-coworks-saiyad-ul-ajaib",
    "internalAddress": "251, Westend Marg, Saiyad Ul Ajaib Extension, Pushp Vihar, New Delhi"
  },
  {
    "id": "prop-12",
    "slug": "ofcdl12",
    "title": "Saket Coworking 03",
    "location": "Saket, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Saket",
    "price": "\u20b97,999/seat",
    "priceMonthly": 7999,
    "type": "Coworking Space",
    "rating": 4.9,
    "amenities": [
      "Dedicated Desks",
      "High-speed Wi-Fi",
      "Power Backup",
      "Air Conditioning"
    ],
    "image": "/images/properties/zo-space-plot-no-5-saket/image-1.jpg",
    "imageFileName": "Zo Space - Plot No 5 Saket.jpg",
    "description": "Budget dedicated-desk coworking on Westend Marg, Saidulajab, near Saket metro.",
    "address": "Westend Marg, Saidulajab, Saket, New Delhi",
    "pincode": "110030",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/zo-space-plot-no-5-saket/image-1.jpg",
      "/images/properties/zo-space-plot-no-5-saket/image-2.jpg"
    ],
    "internalName": "Zo Space - Plot No 5 Saket",
    "name": "Saket Coworking 03",
    "shortId": "OFCDL12",
    "url": "/coworking/delhi/saket/ofcdl12",
    "seoTitle": "Coworking in Saket, Delhi - OFCDL12 | Officera",
    "stateCode": "DL",
    "legacySlug": "zo-space-plot-no-5-saket",
    "internalAddress": "Plot No. 5, Khasra No. 274, Saidulajab Extension, Westend Marg, New Delhi"
  },
  {
    "id": "prop-13",
    "slug": "ofcdl13",
    "title": "Aerocity Coworking 01",
    "location": "Aerocity, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Aerocity",
    "price": "\u20b924,999/seat",
    "priceMonthly": 24999,
    "type": "Coworking Space",
    "rating": 4.7,
    "amenities": [
      "Flexi Desks",
      "Private Cabins",
      "Meeting Rooms",
      "Metro Connectivity",
      "Premium Address"
    ],
    "image": "/images/properties/cowrks-aerocity-worldmark-1a/image-1.jpg",
    "imageFileName": "COWRKS - Aerocity Worldmark 1A.jpg",
    "description": "Premium coworking in Worldmark 1, Tower A, Aerocity, about 600 m from Delhi Aerocity metro (Airport Express Line). Flexi desks, private cabins and meeting rooms available.",
    "address": "Hospitality District, Aerocity, New Delhi",
    "pincode": "110037",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/cowrks-aerocity-worldmark-1a/image-1.jpg",
      "/images/properties/cowrks-aerocity-worldmark-1a/image-2.jpg"
    ],
    "internalName": "COWRKS - Aerocity Worldmark 1A",
    "name": "Aerocity Coworking 01",
    "shortId": "OFCDL13",
    "url": "/coworking/delhi/aerocity/ofcdl13",
    "seoTitle": "Coworking in Aerocity, Delhi - OFCDL13 | Officera",
    "stateCode": "DL",
    "legacySlug": "cowrks-aerocity-worldmark-1a",
    "internalAddress": "Worldmark 1, Tower A, Indira Gandhi International Airport, Aerocity, New Delhi"
  },
  {
    "id": "prop-14",
    "slug": "ofcdl14",
    "title": "Aerocity Coworking 02",
    "location": "Aerocity, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Aerocity",
    "price": "\u20b924,999/seat",
    "priceMonthly": 24999,
    "type": "Coworking Space",
    "rating": 4.8,
    "amenities": [
      "High-speed Wi-Fi",
      "Power Backup",
      "Meeting Rooms",
      "Cafeteria",
      "Air Conditioning"
    ],
    "image": "/images/properties/innov8-pride-plaza-aerocity/image-1.jpg",
    "imageFileName": "Innov8 - Pride Plaza Aerocity.jpg",
    "description": "Innov8 coworking inside the Pride Plaza Hotel precinct in Aerocity, close to IGI Airport. Suited to teams that need a hospitality-district address.",
    "address": "Hospitality District, Aerocity, New Delhi",
    "pincode": "110037",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/innov8-pride-plaza-aerocity/image-1.jpg",
      "/images/properties/innov8-pride-plaza-aerocity/image-2.jpg"
    ],
    "internalName": "Innov8 - Pride Plaza Aerocity",
    "name": "Aerocity Coworking 02",
    "shortId": "OFCDL14",
    "url": "/coworking/delhi/aerocity/ofcdl14",
    "seoTitle": "Coworking in Aerocity, Delhi - OFCDL14 | Officera",
    "stateCode": "DL",
    "legacySlug": "innov8-pride-plaza-aerocity",
    "internalAddress": "Innov8 Coworking, Pride Plaza Hotel, Asset 5A, Aerocity, Near IGI Airport, New Delhi"
  },
  {
    "id": "prop-15",
    "slug": "ofcdl15",
    "title": "Aerocity Coworking 03",
    "location": "Aerocity, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Aerocity",
    "price": "\u20b940,000/seat",
    "priceMonthly": 40000,
    "type": "Coworking Space",
    "rating": 4.6,
    "amenities": [
      "Flexi Desks",
      "Dedicated Desks",
      "Private Cabins",
      "Metro Connectivity",
      "Premium Address"
    ],
    "image": "/images/properties/roseate-house-aerocity-coworking/image-1.jpg",
    "imageFileName": "Roseate House Aerocity Coworking.jpg",
    "description": "Premium coworking within Roseate House in Aerocity's Hospitality District, 270 m from Aerocity metro. Flexi day desks start around \u20b91,000-1,200.",
    "address": "Hospitality District, Aerocity, New Delhi",
    "pincode": "110037",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/roseate-house-aerocity-coworking/image-1.jpg",
      "/images/properties/roseate-house-aerocity-coworking/image-2.jpg"
    ],
    "internalName": "Roseate House Aerocity Coworking",
    "name": "Aerocity Coworking 03",
    "shortId": "OFCDL15",
    "url": "/coworking/delhi/aerocity/ofcdl15",
    "seoTitle": "Coworking in Aerocity, Delhi - OFCDL15 | Officera",
    "stateCode": "DL",
    "legacySlug": "roseate-house-aerocity-coworking",
    "internalAddress": "Asset 10, Northern Access Road, Aerocity, Hospitality District, IGI Airport, New Delhi"
  },
  {
    "id": "prop-16",
    "slug": "ofcdl16",
    "title": "Janakpuri Coworking 01",
    "location": "Janakpuri, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Janakpuri",
    "price": "\u20b97,999/seat",
    "priceMonthly": 7999,
    "type": "Coworking Space",
    "rating": 4.8,
    "amenities": [
      "Air Conditioning",
      "Charging Points",
      "Power Backup",
      "Flexi Desks",
      "Dedicated Desks",
      "Metro Connectivity"
    ],
    "image": "/images/properties/co-offiz-janakpuri/image-1.jpg",
    "imageFileName": "Co-Offiz - Janakpuri.jpg",
    "description": "Budget coworking directly opposite Janakpuri East metro (about 300 m), with flexi desks from about \u20b9200/day and dedicated desks. Co-Offiz also runs centres in Preet Vihar, Netaji Subhash Place, Noida and Gurugram.",
    "address": "District Centre, Janakpuri, New Delhi",
    "pincode": "110058",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/co-offiz-janakpuri/image-1.jpg",
      "/images/properties/co-offiz-janakpuri/image-2.jpg"
    ],
    "internalName": "Co-Offiz - Janakpuri",
    "name": "Janakpuri Coworking 01",
    "shortId": "OFCDL16",
    "url": "/coworking/delhi/janakpuri/ofcdl16",
    "seoTitle": "Coworking in Janakpuri, Delhi - OFCDL16 | Officera",
    "stateCode": "DL",
    "legacySlug": "co-offiz-janakpuri",
    "internalAddress": "B1/632, 3rd Floor, Opposite Metro Pillar No. 566, Janakpuri, New Delhi"
  },
  {
    "id": "prop-17",
    "slug": "ofcdl17",
    "title": "Netaji Subhash Place Coworking 01",
    "location": "Netaji Subhash Place, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Netaji Subhash Place",
    "price": "\u20b99,499/seat",
    "priceMonthly": 9499,
    "type": "Coworking Space",
    "rating": 4.9,
    "amenities": [
      "Dedicated Desks",
      "Storage",
      "Metro Connectivity",
      "Air Conditioning",
      "Power Backup"
    ],
    "image": "/images/properties/co-offiz-hb-twin-tower/image-1.jpg",
    "imageFileName": "Co-Offiz - HB Twin Tower.jpg",
    "description": "Dedicated-desk coworking on the 5th floor of HB Twin Tower above Max Hospital, about 0.7 km from Netaji Subhash Place metro. Rated 4.4 from 289 reviews.",
    "address": "Ring Road, Netaji Subhash Place, Pitampura, New Delhi",
    "pincode": "110034",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/co-offiz-hb-twin-tower/image-1.jpg",
      "/images/properties/co-offiz-hb-twin-tower/image-2.jpg"
    ],
    "internalName": "Co-Offiz - HB Twin Tower",
    "name": "Netaji Subhash Place Coworking 01",
    "shortId": "OFCDL17",
    "url": "/coworking/delhi/netaji-subhash-place/ofcdl17",
    "seoTitle": "Coworking in Netaji Subhash Place, Delhi - OFCDL17 | Officera",
    "stateCode": "DL",
    "legacySlug": "co-offiz-hb-twin-tower",
    "internalAddress": "5th Floor, HB Twin Tower, Netaji Subhash Place, Above Max Hospital, New Delhi"
  },
  {
    "id": "prop-18",
    "slug": "ofcdl18",
    "title": "Netaji Subhash Place Coworking 02",
    "location": "Netaji Subhash Place, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Netaji Subhash Place",
    "price": "\u20b96,499/seat",
    "priceMonthly": 6499,
    "type": "Coworking Space",
    "rating": 4.7,
    "amenities": [
      "Dedicated Desks",
      "Private Cabins",
      "Separate Washrooms",
      "Power Backup",
      "Air Conditioning"
    ],
    "image": "/images/properties/cosphere-spaces-netaji-subhash-place/image-1.jpg",
    "imageFileName": "Cosphere Spaces - Netaji Subhash Place.jpg",
    "description": "Rated 5.0 coworking centre with around 65 seats and separate washrooms, serving North West Delhi.",
    "address": "Ring Road, Netaji Subhash Place, Pitampura, New Delhi",
    "pincode": "110009",
    "capacity": "65",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/cosphere-spaces-netaji-subhash-place/image-1.jpg",
      "/images/properties/cosphere-spaces-netaji-subhash-place/image-2.jpg"
    ],
    "internalName": "Cosphere Spaces - Netaji Subhash Place",
    "name": "Netaji Subhash Place Coworking 02",
    "shortId": "OFCDL18",
    "url": "/coworking/delhi/netaji-subhash-place/ofcdl18",
    "seoTitle": "Coworking in Netaji Subhash Place, Delhi - OFCDL18 | Officera",
    "stateCode": "DL",
    "legacySlug": "cosphere-spaces-netaji-subhash-place",
    "internalAddress": "Plot No. 13, SBI Colony, GT Karnal Road, Delhi"
  },
  {
    "id": "prop-19",
    "slug": "ofcdl19",
    "title": "Janakpuri Coworking 02",
    "location": "Janakpuri, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Janakpuri",
    "price": "\u20b98,500/seat",
    "priceMonthly": 8500,
    "type": "Coworking Space",
    "rating": 4.8,
    "amenities": [
      "Air Conditioning",
      "Dedicated Desks",
      "Metro Connectivity",
      "Power Backup",
      "High-speed Wi-Fi"
    ],
    "image": "/images/properties/4u-coworks-subhash-nagar/image-1.jpg",
    "imageFileName": "4U Coworks - Subhash Nagar.jpg",
    "description": "Coworking on the 2nd and 3rd floors above IDFC Bank near Subhash Nagar metro. Rated 4.9 from 49 reviews.",
    "address": "Najafgarh Road, Subhash Nagar, New Delhi",
    "pincode": "110018",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/4u-coworks-subhash-nagar/image-1.jpg",
      "/images/properties/4u-coworks-subhash-nagar/image-2.jpg"
    ],
    "internalName": "4U Coworks - Subhash Nagar",
    "name": "Janakpuri Coworking 02",
    "shortId": "OFCDL19",
    "url": "/coworking/delhi/janakpuri/ofcdl19",
    "seoTitle": "Coworking in Janakpuri, Delhi - OFCDL19 | Officera",
    "stateCode": "DL",
    "legacySlug": "4u-coworks-subhash-nagar",
    "internalAddress": "Gate No. 4, WZ-104, Second and Third Floor, above IDFC Bank, near Subhash Nagar Metro Station, Meenakshi Garden, New Delhi"
  },
  {
    "id": "prop-20",
    "slug": "ofchr01",
    "title": "DLF Cyber City Coworking 01",
    "location": "DLF Cyber City, Gurugram, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "DLF Cyber City, Gurugram",
    "price": "\u20b919,999/seat",
    "priceMonthly": 19999,
    "type": "Coworking Space",
    "rating": 4.6,
    "amenities": [
      "24x7 Access",
      "Meeting Rooms",
      "Phone Booth",
      "Flexi Desks",
      "Private Cabins",
      "Metro Connectivity"
    ],
    "image": "/images/properties/cowrks-dlf-cyber-city/image-1.jpg",
    "imageFileName": "COWRKS - DLF Cyber City.jpg",
    "description": "24x7 coworking centre in DLF Cyber City, about 0.5 km from IndusInd Bank Cyber City metro, near global enterprises and business hotels.",
    "address": "DLF Cyber City, Phase 2, Gurugram",
    "pincode": "122002",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/cowrks-dlf-cyber-city/image-1.jpg",
      "/images/properties/cowrks-dlf-cyber-city/image-2.jpg"
    ],
    "internalName": "COWRKS - DLF Cyber City",
    "name": "DLF Cyber City Coworking 01",
    "shortId": "OFCHR01",
    "url": "/coworking/gurugram/dlf-cyber-city/ofchr01",
    "seoTitle": "Coworking in DLF Cyber City, Gurugram - OFCHR01 | Officera",
    "stateCode": "HR",
    "legacySlug": "cowrks-dlf-cyber-city",
    "internalAddress": "5th Floor, Building No. 10A, DLF Cyber City, DLF Phase 2, Sector 24, Gurugram, Haryana"
  },
  {
    "id": "prop-21",
    "slug": "ofchr02",
    "title": "DLF Cyber City Coworking 02",
    "location": "DLF Cyber City, Gurugram, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "DLF Cyber City, Gurugram",
    "price": "\u20b924,999/seat",
    "priceMonthly": 24999,
    "type": "Coworking Space",
    "rating": 4.8,
    "amenities": [
      "Flexi Desks",
      "Dedicated Desks",
      "Private Cabins",
      "Meeting Room Hours",
      "Metro Connectivity"
    ],
    "image": "/images/properties/91springboard-dlf-building-7a/image-1.jpg",
    "imageFileName": "91Springboard - DLF Building 7A.jpg",
    "description": "Large 91Springboard centre on the ground and first floors of Building 7A, about 0.8 km from Cyber City metro. Flexi desks, dedicated desks and private cabins with meeting-room hours.",
    "address": "DLF Cyber City, Phase 2, Gurugram",
    "pincode": "122002",
    "capacity": "600",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/91springboard-dlf-building-7a/image-1.jpg",
      "/images/properties/91springboard-dlf-building-7a/image-2.jpg"
    ],
    "internalName": "91Springboard - DLF Building 7A",
    "name": "DLF Cyber City Coworking 02",
    "shortId": "OFCHR02",
    "url": "/coworking/gurugram/dlf-cyber-city/ofchr02",
    "seoTitle": "Coworking in DLF Cyber City, Gurugram - OFCHR02 | Officera",
    "stateCode": "HR",
    "legacySlug": "91springboard-dlf-building-7a",
    "internalAddress": "Ground and 1st Floor, Building No. 7A, DLF Cyber City, DLF Phase 2, Sector 24, Gurugram, Haryana"
  },
  {
    "id": "prop-22",
    "slug": "ofchr03",
    "title": "DLF Cyber City Coworking 03",
    "location": "DLF Cyber City, Gurugram, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "DLF Cyber City, Gurugram",
    "price": "\u20b923,099/seat",
    "priceMonthly": 23099,
    "type": "Coworking Space",
    "rating": 4.9,
    "amenities": [
      "Dedicated Desks",
      "Private Cabins",
      "Reserved Storage",
      "Premium Address"
    ],
    "image": "/images/properties/spaces-dlf-building-9a/image-1.jpg",
    "imageFileName": "Spaces - DLF Building 9A.jpg",
    "description": "Premium Spaces centre on the 16th floor of Building 9A, Cyber City, with dedicated desks and private cabins.",
    "address": "DLF Cyber City, Phase 2, Gurugram",
    "pincode": "122002",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/spaces-dlf-building-9a/image-1.jpg",
      "/images/properties/spaces-dlf-building-9a/image-2.jpg"
    ],
    "internalName": "Spaces - DLF Building 9A",
    "name": "DLF Cyber City Coworking 03",
    "shortId": "OFCHR03",
    "url": "/coworking/gurugram/dlf-cyber-city/ofchr03",
    "seoTitle": "Coworking in DLF Cyber City, Gurugram - OFCHR03 | Officera",
    "stateCode": "HR",
    "legacySlug": "spaces-dlf-building-9a",
    "internalAddress": "16th Floor, Building No. 9A, Cyber City, DLF Phase 3, Gurugram, Haryana"
  },
  {
    "id": "prop-23",
    "slug": "ofchr04",
    "title": "Udyog Vihar Coworking 01",
    "location": "Udyog Vihar, Gurugram, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Udyog Vihar, Gurugram",
    "price": "\u20b97,000/seat",
    "priceMonthly": 7000,
    "type": "Coworking Space",
    "rating": 4.7,
    "amenities": [
      "Meeting Rooms",
      "Air Conditioning",
      "Dedicated Desks",
      "Power Backup",
      "Metro Nearby"
    ],
    "image": "/images/properties/nimble-cowork-udyog-vihar/image-1.jpg",
    "imageFileName": "Nimble Cowork - Udyog Vihar.jpg",
    "description": "Budget-friendly coworking centre with 500-plus seats opposite DLF Cyber City, off NH8 near the metro.",
    "address": "Phase IV, Udyog Vihar, NH-48 Corridor, Gurugram",
    "pincode": "122015",
    "capacity": "500+",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/nimble-cowork-udyog-vihar/image-1.jpg",
      "/images/properties/nimble-cowork-udyog-vihar/image-2.jpg"
    ],
    "internalName": "Nimble Cowork - Udyog Vihar",
    "name": "Udyog Vihar Coworking 01",
    "shortId": "OFCHR04",
    "url": "/coworking/gurugram/udyog-vihar/ofchr04",
    "seoTitle": "Coworking in Udyog Vihar, Gurugram - OFCHR04 | Officera",
    "stateCode": "HR",
    "legacySlug": "nimble-cowork-udyog-vihar",
    "internalAddress": "Plot 250, Phase IV, Udyog Vihar, Sector 18, Gurugram, Haryana"
  },
  {
    "id": "prop-24",
    "slug": "ofchr05",
    "title": "Sector 39 Coworking 01",
    "location": "Sector 39, Gurugram, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Sector 39, Gurugram",
    "price": "\u20b96,090/seat",
    "priceMonthly": 6090,
    "type": "Coworking Space",
    "rating": 4.8,
    "amenities": [
      "Meeting Rooms",
      "Dedicated Desks",
      "Day Coworking",
      "Virtual Office Plans",
      "Business Address"
    ],
    "image": "/images/properties/regus-unitech-cyber-park/image-1.jpg",
    "imageFileName": "Regus - Unitech Cyber Park.jpg",
    "description": "Regus centre in Unitech Cyber Park with easy access to HUDA City Centre metro and NH-48. Dedicated desks, day coworking, meeting rooms and virtual office plans.",
    "address": "Sector 39, Jharsa Road, Gurugram",
    "pincode": "122003",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/regus-unitech-cyber-park/image-1.jpg",
      "/images/properties/regus-unitech-cyber-park/image-2.jpg",
      "/images/properties/regus-unitech-cyber-park/image-3.jpg"
    ],
    "internalName": "Regus - Unitech Cyber Park",
    "name": "Sector 39 Coworking 01",
    "shortId": "OFCHR05",
    "url": "/coworking/gurugram/sector-39/ofchr05",
    "seoTitle": "Coworking in Sector 39, Gurugram - OFCHR05 | Officera",
    "stateCode": "HR",
    "legacySlug": "regus-unitech-cyber-park",
    "internalAddress": "3rd Floor, Unitech Cyber Park, Village Jharsa, Gurugram, Haryana"
  },
  {
    "id": "prop-25",
    "slug": "ofcup01",
    "title": "Sector 62 Coworking 01",
    "location": "Sector 62, Noida, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Sector 62, Noida",
    "price": "\u20b98,499/seat",
    "priceMonthly": 8499,
    "type": "Coworking Space",
    "rating": 4.6,
    "amenities": [
      "Dedicated Desks",
      "Private Cabins",
      "Meeting Rooms",
      "Power Backup",
      "High-speed Wi-Fi"
    ],
    "image": "/images/properties/akasa-coworking-sector-62/image-1.jpg",
    "imageFileName": "Akasa Coworking - Sector 62.jpg",
    "description": "Large coworking centre in a 50,000 sq ft building in Noida's Sector 62 IT hub. Rated 4.8 from 302 brand reviews on myHQ.",
    "address": "Electronic City IT Belt, Sector 62, Noida",
    "pincode": "201309",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/akasa-coworking-sector-62/image-1.jpg",
      "/images/properties/akasa-coworking-sector-62/image-2.jpg",
      "/images/properties/akasa-coworking-sector-62/image-3.jpg"
    ],
    "internalName": "Akasa Coworking - Sector 62",
    "name": "Sector 62 Coworking 01",
    "shortId": "OFCUP01",
    "url": "/coworking/noida/sector-62/ofcup01",
    "seoTitle": "Coworking in Sector 62, Noida - OFCUP01 | Officera",
    "stateCode": "UP",
    "legacySlug": "akasa-coworking-sector-62",
    "internalAddress": "56-6C, C Block, Phase 2, Industrial Area, Sector 62, Noida, Uttar Pradesh"
  },
  {
    "id": "prop-26",
    "slug": "ofcup02",
    "title": "Sector 62 Coworking 02",
    "location": "Sector 62, Noida, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Sector 62, Noida",
    "price": "\u20b96,999/seat",
    "priceMonthly": 6999,
    "type": "Coworking Space",
    "rating": 4.8,
    "amenities": [
      "Dedicated Desks",
      "Private Cabins",
      "Metro Connectivity",
      "Power Backup",
      "High-speed Wi-Fi"
    ],
    "image": "/images/properties/akasa-coworking-trapezoid-it-park/image-1.jpg",
    "imageFileName": "Akasa Coworking - Trapezoid IT Park.jpg",
    "description": "Affordable dedicated desks and private cabins in Trapezoid IT Park, about 1.4 km from Noida Sector 62 metro. Rated 4.9 from 171 reviews.",
    "address": "Electronic City IT Belt, Sector 62, Noida",
    "pincode": "201309",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/akasa-coworking-trapezoid-it-park/image-1.jpg",
      "/images/properties/akasa-coworking-trapezoid-it-park/image-2.jpg"
    ],
    "internalName": "Akasa Coworking - Trapezoid IT Park",
    "name": "Sector 62 Coworking 02",
    "shortId": "OFCUP02",
    "url": "/coworking/noida/sector-62/ofcup02",
    "seoTitle": "Coworking in Sector 62, Noida - OFCUP02 | Officera",
    "stateCode": "UP",
    "legacySlug": "akasa-coworking-trapezoid-it-park",
    "internalAddress": "Unit No. 907, Trapezoid IT Park, C-27, C Block, Phase 2, Industrial Area, Sector 62, Noida, Uttar Pradesh"
  },
  {
    "id": "prop-27",
    "slug": "ofcup03",
    "title": "Sector 62 Coworking 03",
    "location": "Sector 62, Noida, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Sector 62, Noida",
    "price": "\u20b914,500/seat",
    "priceMonthly": 14500,
    "type": "Coworking Space",
    "rating": 4.9,
    "amenities": [
      "Flexi Desks",
      "Dedicated Desks",
      "Private Cabins",
      "Premium Address",
      "High-speed Wi-Fi"
    ],
    "image": "/images/properties/cowrks-candor-techspace-noida/image-1.jpg",
    "imageFileName": "COWRKS - Candor Techspace Noida.jpg",
    "description": "Premium COWRKS centre inside Candor Techspace Tower 5, Sector 62, with flexi desks, dedicated desks and private cabins.",
    "address": "Electronic City IT Belt, Sector 62, Noida",
    "pincode": "201309",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/cowrks-candor-techspace-noida/image-1.jpg",
      "/images/properties/cowrks-candor-techspace-noida/image-2.jpg"
    ],
    "internalName": "COWRKS - Candor Techspace Noida",
    "name": "Sector 62 Coworking 03",
    "shortId": "OFCUP03",
    "url": "/coworking/noida/sector-62/ofcup03",
    "seoTitle": "Coworking in Sector 62, Noida - OFCUP03 | Officera",
    "stateCode": "UP",
    "legacySlug": "cowrks-candor-techspace-noida",
    "internalAddress": "Candor Techspace, Sector 62, Noida, Uttar Pradesh"
  },
  {
    "id": "prop-28",
    "slug": "ofcup04",
    "title": "Sector 62 Coworking 04",
    "location": "Sector 62, Noida, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Sector 62, Noida",
    "price": "\u20b912,999/seat",
    "priceMonthly": 12999,
    "type": "Coworking Space",
    "rating": 4.7,
    "amenities": [
      "Dedicated Desks",
      "Meeting Rooms",
      "Reception",
      "Business Address",
      "Air Conditioning"
    ],
    "image": "/images/properties/vatika-business-centre-sector-62/image-1.jpg",
    "imageFileName": "Vatika Business Centre - Sector 62.jpg",
    "description": "Serviced business centre in Sector 62, Noida, offering dedicated desks for 1 to 100+ seats. Rated 4.2 on CoFynd.",
    "address": "Electronic City IT Belt, Sector 62, Noida",
    "pincode": "201309",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/vatika-business-centre-sector-62/image-1.jpg"
    ],
    "internalName": "Vatika Business Centre - Sector 62",
    "name": "Sector 62 Coworking 04",
    "shortId": "OFCUP04",
    "url": "/coworking/noida/sector-62/ofcup04",
    "seoTitle": "Coworking in Sector 62, Noida - OFCUP04 | Officera",
    "stateCode": "UP",
    "legacySlug": "vatika-business-centre-sector-62",
    "internalAddress": "Sector 62, Noida, Uttar Pradesh (exact building to be confirmed)"
  },
  {
    "id": "prop-29",
    "slug": "ofcdl20",
    "title": "Connaught Place Managed Office 01",
    "location": "Connaught Place, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Connaught Place",
    "price": "\u20b911,499/seat",
    "priceMonthly": 11499,
    "type": "Managed Office",
    "rating": 4.8,
    "amenities": [
      "Ready-to-move-in Offices",
      "Warm-shell Option",
      "Meeting Rooms",
      "Power Backup",
      "Metro Nearby"
    ],
    "image": "/images/properties/work-matrix-naurang-house/image-1.jpg",
    "imageFileName": "Work Matrix - Naurang House.jpg",
    "description": "Managed office with A-class coworking amenities in Naurang House on Kasturba Gandhi Marg, in the heart of Connaught Place. Ready-to-move-in and warm-shell options.",
    "address": "KG Marg, Connaught Place, New Delhi",
    "pincode": "110001",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/work-matrix-naurang-house/image-1.jpg",
      "/images/properties/work-matrix-naurang-house/image-2.jpg"
    ],
    "internalName": "Work Matrix - Naurang House",
    "name": "Connaught Place Managed Office 01",
    "shortId": "OFCDL20",
    "url": "/managed-office/delhi/connaught-place/ofcdl20",
    "seoTitle": "Managed Office in Connaught Place, Delhi - OFCDL20 | Officera",
    "stateCode": "DL",
    "legacySlug": "work-matrix-naurang-house",
    "internalAddress": "105, B-21, Kasturba Gandhi Marg, Connaught Place, New Delhi"
  },
  {
    "id": "prop-30",
    "slug": "ofcdl21",
    "title": "Nehru Place Managed Office 01",
    "location": "Nehru Place, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Nehru Place",
    "price": "\u20b99,000/seat",
    "priceMonthly": 9000,
    "type": "Managed Office",
    "rating": 4.6,
    "amenities": [
      "Ready-to-move-in Offices",
      "Warm-shell Option",
      "Security Personnel",
      "First Aid Kit",
      "Air Conditioning"
    ],
    "image": "/images/properties/smartworks-vardhman-trade-center/image-1.jpg",
    "imageFileName": "Smartworks - Vardhman Trade Center.jpg",
    "description": "Managed office in a prominent Nehru Place commercial building, with ready-to-move-in and warm-shell options. Rated 4.1 from 119 reviews.",
    "address": "Lala Lajpat Rai Road, Nehru Place, New Delhi",
    "pincode": "110019",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/smartworks-vardhman-trade-center/image-1.jpg",
      "/images/properties/smartworks-vardhman-trade-center/image-2.jpg"
    ],
    "internalName": "Smartworks - Vardhman Trade Center",
    "name": "Nehru Place Managed Office 01",
    "shortId": "OFCDL21",
    "url": "/managed-office/delhi/nehru-place/ofcdl21",
    "seoTitle": "Managed Office in Nehru Place, Delhi - OFCDL21 | Officera",
    "stateCode": "DL",
    "legacySlug": "smartworks-vardhman-trade-center",
    "internalAddress": "Vardhman Trade Centre, Nehru Place, New Delhi (floor and unit to be confirmed)"
  },
  {
    "id": "prop-31",
    "slug": "ofcdl22",
    "title": "Nehru Place Managed Office 02",
    "location": "Nehru Place, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Nehru Place",
    "price": "\u20b913,000/seat",
    "priceMonthly": 13000,
    "type": "Managed Office",
    "rating": 4.8,
    "amenities": [
      "Warm-shell Customisation",
      "Design Assistance",
      "Air Conditioning",
      "Power Backup",
      "Metro Nearby"
    ],
    "image": "/images/properties/cubeecle-brookfield-mall/image-1.jpg",
    "imageFileName": "Cubeecle - Brookfield Mall.jpg",
    "description": "Warm-shell managed office custom-designed to your brand, located in Vardhman Trade Centre, Nehru Place. Rated 4.8 from 199 reviews.",
    "address": "Main Market Commercial Area, Nehru Place, New Delhi",
    "pincode": "110019",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/cubeecle-brookfield-mall/image-1.jpg",
      "/images/properties/cubeecle-brookfield-mall/image-2.jpg"
    ],
    "internalName": "Cubeecle - Brookfield Mall",
    "name": "Nehru Place Managed Office 02",
    "shortId": "OFCDL22",
    "url": "/managed-office/delhi/nehru-place/ofcdl22",
    "seoTitle": "Managed Office in Nehru Place, Delhi - OFCDL22 | Officera",
    "stateCode": "DL",
    "legacySlug": "cubeecle-brookfield-mall",
    "internalAddress": "Vardhman Trade Centre, District Centre, 3rd Floor, Unit No. 2, Plot No. 3 and 4, Nehru Place, New Delhi"
  },
  {
    "id": "prop-32",
    "slug": "ofcdl23",
    "title": "Saket Managed Office 01",
    "location": "Saket, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Saket",
    "price": "\u20b913,374/seat",
    "priceMonthly": 13374,
    "type": "Managed Office",
    "rating": 4.9,
    "amenities": [
      "Ready-to-move-in Offices",
      "Warm-shell Option",
      "Metro Nearby (about 350 m)",
      "Air Conditioning",
      "Power Backup"
    ],
    "image": "/images/properties/buzz-by-spacetime-saket/image-1.jpg",
    "imageFileName": "Buzz by Spacetime - Saket.jpg",
    "description": "Premium managed office in Saidulajab near Saket, designed for creative teams. Rated 4.6 from 31 reviews, with ready-to-move-in and warm-shell options.",
    "address": "Westend Marg, Saidulajab, Saket, New Delhi",
    "pincode": "110030",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/buzz-by-spacetime-saket/image-1.jpg",
      "/images/properties/buzz-by-spacetime-saket/image-2.jpg"
    ],
    "internalName": "Buzz by Spacetime - Saket",
    "name": "Saket Managed Office 01",
    "shortId": "OFCDL23",
    "url": "/managed-office/delhi/saket/ofcdl23",
    "seoTitle": "Managed Office in Saket, Delhi - OFCDL23 | Officera",
    "stateCode": "DL",
    "legacySlug": "buzz-by-spacetime-saket",
    "internalAddress": "275, Khasra, Westend Marg, Saidulajab, Saket, New Delhi"
  },
  {
    "id": "prop-33",
    "slug": "ofcdl24",
    "title": "Saket Managed Office 02",
    "location": "Saket, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Saket",
    "price": "\u20b96,499/seat",
    "priceMonthly": 6499,
    "type": "Managed Office",
    "rating": 4.7,
    "amenities": [
      "Ready-to-move-in Offices",
      "Warm-shell Option",
      "Metro Connectivity",
      "Air Conditioning",
      "Power Backup"
    ],
    "image": "/images/properties/krastay-saket/image-1.jpg",
    "imageFileName": "Krastay - Saket.jpg",
    "description": "Budget-friendly managed office on Westend Marg near Saket, rated 4.4. Ready-to-move-in and warm-shell options.",
    "address": "Westend Marg, Saidulajab, Saket, New Delhi",
    "pincode": "110030",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/krastay-saket/image-1.jpg",
      "/images/properties/krastay-saket/image-2.jpg"
    ],
    "internalName": "Krastay - Saket",
    "name": "Saket Managed Office 02",
    "shortId": "OFCDL24",
    "url": "/managed-office/delhi/saket/ofcdl24",
    "seoTitle": "Managed Office in Saket, Delhi - OFCDL24 | Officera",
    "stateCode": "DL",
    "legacySlug": "krastay-saket",
    "internalAddress": "H-294, Building 2, Lane 2, 1st Floor, Westend Marg, near Saket, Saidulajab, New Delhi"
  },
  {
    "id": "prop-34",
    "slug": "ofcdl25",
    "title": "Aerocity Managed Office 01",
    "location": "Aerocity, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Aerocity",
    "price": "\u20b930,000/seat",
    "priceMonthly": 30000,
    "type": "Managed Office",
    "rating": 4.8,
    "amenities": [
      "Warm-shell Customisation",
      "Security Personnel",
      "First Aid Kit",
      "Air Conditioning",
      "Metro Nearby"
    ],
    "image": "/images/properties/smartworks-worldmark-4-aerocity/image-1.jpg",
    "imageFileName": "Smartworks - Worldmark 4 Aerocity.jpg",
    "description": "Warm-shell managed office on the 6th floor of Worldmark 4 in the Gateway District, Aerocity. Rated 4.8.",
    "address": "Hospitality District, Aerocity, New Delhi",
    "pincode": "110037",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/smartworks-worldmark-4-aerocity/image-1.jpg",
      "/images/properties/smartworks-worldmark-4-aerocity/image-2.jpg"
    ],
    "internalName": "Smartworks - Worldmark 4 Aerocity",
    "name": "Aerocity Managed Office 01",
    "shortId": "OFCDL25",
    "url": "/managed-office/delhi/aerocity/ofcdl25",
    "seoTitle": "Managed Office in Aerocity, Delhi - OFCDL25 | Officera",
    "stateCode": "DL",
    "legacySlug": "smartworks-worldmark-4-aerocity",
    "internalAddress": "6th Floor, Worldmark 4, Worldmark Aerocity, Manhattan Street, Gateway District, Aerocity, New Delhi"
  },
  {
    "id": "prop-35",
    "slug": "ofcdl26",
    "title": "Aerocity Managed Office 02",
    "location": "Aerocity, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Aerocity",
    "price": "\u20b940,000/seat",
    "priceMonthly": 40000,
    "type": "Managed Office",
    "rating": 4.6,
    "amenities": [
      "Ready-to-move-in Offices",
      "Meeting Rooms",
      "Air Conditioning",
      "Power Backup",
      "Metro Nearby"
    ],
    "image": "/images/properties/awfis-prestige-trade-centre-aerocity/image-1.jpg",
    "imageFileName": "awfis - Prestige Trade Centre Aerocity.jpg",
    "description": "Awfis managed office on the 2nd floor of Prestige Trade Centre, Aerocity. Rated 4.8 from 45 reviews.",
    "address": "Hospitality District, Aerocity, New Delhi",
    "pincode": "110037",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/awfis-prestige-trade-centre-aerocity/image-1.jpg",
      "/images/properties/awfis-prestige-trade-centre-aerocity/image-2.jpg"
    ],
    "internalName": "awfis - Prestige Trade Centre Aerocity",
    "name": "Aerocity Managed Office 02",
    "shortId": "OFCDL26",
    "url": "/managed-office/delhi/aerocity/ofcdl26",
    "seoTitle": "Managed Office in Aerocity, Delhi - OFCDL26 | Officera",
    "stateCode": "DL",
    "legacySlug": "awfis-prestige-trade-centre-aerocity",
    "internalAddress": "2nd Floor, Prestige Trade Centre, Asset No. 13, Aerocity Road, Aerocity, New Delhi"
  },
  {
    "id": "prop-36",
    "slug": "ofchr06",
    "title": "Sector 48 Managed Office 01",
    "location": "Sector 48, Gurugram, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Sector 48, Gurugram",
    "price": "\u20b95,500/seat",
    "priceMonthly": 5500,
    "type": "Managed Office",
    "rating": 4.8,
    "amenities": [
      "Ready-to-move-in Offices",
      "Warm-shell Option",
      "Meeting Rooms",
      "Power Backup",
      "Parking"
    ],
    "image": "/images/properties/springhouse-welldone-tech-park/image-1.jpg",
    "imageFileName": "SpringHouse - Welldone Tech Park.jpg",
    "description": "Affordable managed office in Welldone Tech Park on Sohna Road, Sector 48. Rated 4.8 from 24 reviews, with a warm-shell option.",
    "address": "Sohna Road Expressway, Sector 48, Gurugram",
    "pincode": "122001",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/springhouse-welldone-tech-park/image-1.jpg",
      "/images/properties/springhouse-welldone-tech-park/image-2.jpg",
      "/images/properties/springhouse-welldone-tech-park/image-3.jpg"
    ],
    "internalName": "SpringHouse - Welldone Tech Park",
    "name": "Sector 48 Managed Office 01",
    "shortId": "OFCHR06",
    "url": "/managed-office/gurugram/sector-48/ofchr06",
    "seoTitle": "Managed Office in Sector 48, Gurugram - OFCHR06 | Officera",
    "stateCode": "HR",
    "legacySlug": "springhouse-welldone-tech-park",
    "internalAddress": "Welldone Tech Park, Badshahpur Sohna Road Highway, Sector 48, Gurugram, Haryana"
  },
  {
    "id": "prop-37",
    "slug": "ofcup05",
    "title": "Sector 62 Managed Office 01",
    "location": "Sector 62, Noida, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Sector 62, Noida",
    "price": "\u20b96,799/seat",
    "priceMonthly": 6799,
    "type": "Managed Office",
    "rating": 4.9,
    "amenities": [
      "Ready-to-move-in Offices",
      "Warm-shell Option",
      "Meeting Rooms",
      "Power Backup",
      "Metro Nearby"
    ],
    "image": "/images/properties/nukleus-logix-cyber-park/image-1.jpg",
    "imageFileName": "Nukleus - Logix Cyber Park.jpg",
    "description": "Managed office on the 9th floor of Tower C, Logix Cyber Park, in one of Noida's major business sectors. Rated 4.7 from 63 reviews.",
    "address": "Electronic City IT Belt, Sector 62, Noida",
    "pincode": "201309",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/nukleus-logix-cyber-park/image-1.jpg",
      "/images/properties/nukleus-logix-cyber-park/image-2.jpg"
    ],
    "internalName": "Nukleus - Logix Cyber Park",
    "name": "Sector 62 Managed Office 01",
    "shortId": "OFCUP05",
    "url": "/managed-office/noida/sector-62/ofcup05",
    "seoTitle": "Managed Office in Sector 62, Noida - OFCUP05 | Officera",
    "stateCode": "UP",
    "legacySlug": "nukleus-logix-cyber-park",
    "internalAddress": "9th Floor, Tower C, Logix Cyber Park, C Block, Sector 62, Noida, Uttar Pradesh"
  },
  {
    "id": "prop-38",
    "slug": "ofcdl27",
    "title": "Nehru Place Office Space 01",
    "location": "Nehru Place, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Nehru Place",
    "price": "\u20b9200/sq.ft",
    "priceMonthly": 200,
    "type": "Commercial / Office Space",
    "rating": 4.7,
    "amenities": [
      "Air Conditioning",
      "Lifts",
      "Power Backup",
      "Parking",
      "Metro Nearby"
    ],
    "image": "/images/properties/international-trade-tower-nehru-place/image-1.jpg",
    "imageFileName": "International Trade Tower - Nehru Place.jpg",
    "description": "Independent air-conditioned commercial tower built in 2001, in the middle of Nehru Place. Typical lease carries a 6-month security deposit.",
    "address": "Business District, Nehru Place, New Delhi",
    "pincode": "110019",
    "capacity": "Area on request",
    "priceUnit": "per sq ft/month",
    "images": [
      "/images/properties/international-trade-tower-nehru-place/image-1.jpg",
      "/images/properties/international-trade-tower-nehru-place/image-2.jpg"
    ],
    "internalName": "International Trade Tower - Nehru Place",
    "name": "Nehru Place Office Space 01",
    "shortId": "OFCDL27",
    "url": "/office-space/delhi/nehru-place/ofcdl27",
    "seoTitle": "Office Space in Nehru Place, Delhi - OFCDL27 | Officera",
    "stateCode": "DL",
    "legacySlug": "international-trade-tower-nehru-place",
    "internalAddress": "International Trade Tower, Nehru Place, New Delhi"
  },
  {
    "id": "prop-39",
    "slug": "ofcdl28",
    "title": "Nehru Place Office Space 02",
    "location": "Nehru Place, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Nehru Place",
    "price": "\u20b9200/sq.ft",
    "priceMonthly": 200,
    "type": "Commercial / Office Space",
    "rating": 4.8,
    "amenities": [
      "Unfurnished Warm Shell",
      "Metro Nearby",
      "Lifts",
      "Power Backup",
      "Parking"
    ],
    "image": "/images/properties/ifci-tower-nehru-place/image-1.jpg",
    "imageFileName": "IFCI Tower - Nehru Place.jpg",
    "description": "Corporate tower opposite Nehru Place metro, with unfurnished, fully customisable warm-shell floors.",
    "address": "Business District, Nehru Place, New Delhi",
    "pincode": "110019",
    "capacity": "Area on request",
    "priceUnit": "per sq ft/month",
    "images": [
      "/images/properties/ifci-tower-nehru-place/image-1.jpg",
      "/images/properties/ifci-tower-nehru-place/image-2.jpg"
    ],
    "internalName": "IFCI Tower - Nehru Place",
    "name": "Nehru Place Office Space 02",
    "shortId": "OFCDL28",
    "url": "/office-space/delhi/nehru-place/ofcdl28",
    "seoTitle": "Office Space in Nehru Place, Delhi - OFCDL28 | Officera",
    "stateCode": "DL",
    "legacySlug": "ifci-tower-nehru-place",
    "internalAddress": "IFCI Tower, Nehru Place, New Delhi"
  },
  {
    "id": "prop-40",
    "slug": "ofcdl29",
    "title": "Nehru Place Office Space 03",
    "location": "Nehru Place, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Nehru Place",
    "price": "\u20b990/sq.ft",
    "priceMonthly": 90,
    "type": "Commercial / Office Space",
    "rating": 4.6,
    "amenities": [
      "Unfurnished Warm Shell",
      "Parking",
      "Lifts",
      "Power Backup"
    ],
    "image": "/images/properties/plot-no-b-18-chirag-enclave/image-1.jpg",
    "imageFileName": "Plot No B-18 - Chirag Enclave.jpg",
    "description": "Budget unfurnished office space near Nehru Place at Chirag Enclave, for businesses that want to fit out their own floor.",
    "address": "Outer Ring Road, Nehru Place, New Delhi",
    "pincode": "110048",
    "capacity": "Area on request",
    "priceUnit": "per sq ft/month",
    "images": [
      "/images/properties/plot-no-b-18-chirag-enclave/image-1.jpg",
      "/images/properties/plot-no-b-18-chirag-enclave/image-2.jpg",
      "/images/properties/plot-no-b-18-chirag-enclave/image-3.jpg"
    ],
    "internalName": "Plot No B-18 - Chirag Enclave",
    "name": "Nehru Place Office Space 03",
    "shortId": "OFCDL29",
    "url": "/office-space/delhi/nehru-place/ofcdl29",
    "seoTitle": "Office Space in Nehru Place, Delhi - OFCDL29 | Officera",
    "stateCode": "DL",
    "legacySlug": "plot-no-b-18-chirag-enclave",
    "internalAddress": "Plot No. B-18, Chirag Enclave, near Nehru Place, New Delhi"
  },
  {
    "id": "prop-41",
    "slug": "ofchr07",
    "title": "Golf Course Road Office Space 01",
    "location": "Golf Course Road, Gurugram, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Golf Course Road, Gurugram",
    "price": "\u20b9100/sq.ft",
    "priceMonthly": 100,
    "type": "Commercial / Office Space",
    "rating": 4.8,
    "amenities": [
      "Power Backup",
      "Parking",
      "Lifts",
      "Security",
      "Metro Nearby"
    ],
    "image": "/images/properties/vatika-towers-golf-course-road/image-1.jpg",
    "imageFileName": "Vatika Towers - Golf Course Road.jpg",
    "description": "Ready-to-move office towers on Golf Course Road, Sector 54, with floor plates from 1,000 to 17,000 sq ft across two towers (about 2.14 lakh sq ft).",
    "address": "Golf Course Road, DLF Phase 5, Gurugram",
    "pincode": "122002",
    "capacity": "1,000-17,000 sq ft",
    "priceUnit": "per sq ft/month",
    "images": [
      "/images/properties/vatika-towers-golf-course-road/image-1.jpg",
      "/images/properties/vatika-towers-golf-course-road/image-2.jpg",
      "/images/properties/vatika-towers-golf-course-road/image-3.jpg"
    ],
    "internalName": "Vatika Towers - Golf Course Road",
    "name": "Golf Course Road Office Space 01",
    "shortId": "OFCHR07",
    "url": "/office-space/gurugram/golf-course-road/ofchr07",
    "seoTitle": "Office Space in Golf Course Road, Gurugram - OFCHR07 | Officera",
    "stateCode": "HR",
    "legacySlug": "vatika-towers-golf-course-road",
    "internalAddress": "Vatika Towers, Sector 54, Golf Course Road, Gurugram, Haryana"
  },
  {
    "id": "prop-42",
    "slug": "ofchr08",
    "title": "Golf Course Road Office Space 02",
    "location": "Golf Course Road, Gurugram, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Golf Course Road, Gurugram",
    "price": "\u20b9120/sq.ft",
    "priceMonthly": 120,
    "type": "Commercial / Office Space",
    "rating": 4.9,
    "amenities": [
      "Power Backup",
      "Parking",
      "Lifts",
      "Security",
      "Furnished Floors Available"
    ],
    "image": "/images/properties/orchid-centre-golf-course-road/image-1.jpg",
    "imageFileName": "Orchid Centre - Golf Course Road.jpg",
    "description": "Grade A office building on Golf Course Road, Sector 53, with part and full floors from 1,000 to 40,000 sq ft.",
    "address": "Golf Course Road, DLF Phase 5, Gurugram",
    "pincode": "122002",
    "capacity": "1,000-40,000 sq ft",
    "priceUnit": "per sq ft/month",
    "images": [
      "/images/properties/orchid-centre-golf-course-road/image-1.jpg",
      "/images/properties/orchid-centre-golf-course-road/image-2.jpg"
    ],
    "internalName": "Orchid Centre - Golf Course Road",
    "name": "Golf Course Road Office Space 02",
    "shortId": "OFCHR08",
    "url": "/office-space/gurugram/golf-course-road/ofchr08",
    "seoTitle": "Office Space in Golf Course Road, Gurugram - OFCHR08 | Officera",
    "stateCode": "HR",
    "legacySlug": "orchid-centre-golf-course-road",
    "internalAddress": "Orchid Centre, Sector 53, Golf Course Road, Gurugram, Haryana"
  },
  {
    "id": "prop-43",
    "slug": "ofchr09",
    "title": "Golf Course Extension Road Office Space 01",
    "location": "Golf Course Extension Road, Gurugram, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Golf Course Extension Road, Gurugram",
    "price": "\u20b955/sq.ft",
    "priceMonthly": 55,
    "type": "Commercial / Office Space",
    "rating": 4.7,
    "amenities": [
      "Bare to Fully Furnished Options",
      "Parking",
      "Lifts",
      "Power Backup",
      "Security"
    ],
    "image": "/images/properties/suncity-success-tower-golf-course-extension-road/image-1.jpg",
    "imageFileName": "Suncity Success Tower - Golf Course Extension Road.jpg",
    "description": "Commercial tower on Golf Course Extension Road, Sector 65, with flexible 1,000 to 4,000 sq ft units suiting small and mid-sized teams. Bare space at the low end, furnished at the top.",
    "address": "Golf Course Extension Road, Sector 65, Gurugram",
    "pincode": "122102",
    "capacity": "1,000-4,000 sq ft",
    "priceUnit": "per sq ft/month",
    "images": [
      "/images/properties/suncity-success-tower-golf-course-extension-road/image-1.jpg",
      "/images/properties/suncity-success-tower-golf-course-extension-road/image-2.jpg",
      "/images/properties/suncity-success-tower-golf-course-extension-road/image-3.jpg"
    ],
    "internalName": "Suncity Success Tower - Golf Course Extension Road",
    "name": "Golf Course Extension Road Office Space 01",
    "shortId": "OFCHR09",
    "url": "/office-space/gurugram/golf-course-extension-road/ofchr09",
    "seoTitle": "Office Space in Golf Course Extension Road, Gurugram - OFCHR09 | Officera",
    "stateCode": "HR",
    "legacySlug": "suncity-success-tower-golf-course-extension-road",
    "internalAddress": "Suncity Success Tower, Golf Course Extension Road, The Close South, Sector 65, Gurugram, Haryana"
  },
  {
    "id": "prop-44",
    "slug": "ofchr10",
    "title": "Golf Course Road Office Space 03",
    "location": "Golf Course Road, Gurugram, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Golf Course Road, Gurugram",
    "price": "\u20b9110/sq.ft",
    "priceMonthly": 110,
    "type": "Commercial / Office Space",
    "rating": 4.8,
    "amenities": [
      "Power Backup",
      "Parking",
      "Lifts",
      "Security",
      "Metro Nearby"
    ],
    "image": "/images/properties/ocus-technopolis-golf-course-road/image-1.jpg",
    "imageFileName": "Ocus Technopolis - Golf Course Road.jpg",
    "description": "Commercial building on Golf Course Road, Sector 54, in the premium Golf Course Road office belt.",
    "address": "Golf Course Road, DLF Phase 5, Gurugram",
    "pincode": "122002",
    "capacity": "Area on request",
    "priceUnit": "per sq ft/month",
    "images": [
      "/images/properties/ocus-technopolis-golf-course-road/image-1.jpg",
      "/images/properties/ocus-technopolis-golf-course-road/image-2.jpg",
      "/images/properties/ocus-technopolis-golf-course-road/image-3.jpg"
    ],
    "internalName": "Ocus Technopolis - Golf Course Road",
    "name": "Golf Course Road Office Space 03",
    "shortId": "OFCHR10",
    "url": "/office-space/gurugram/golf-course-road/ofchr10",
    "seoTitle": "Office Space in Golf Course Road, Gurugram - OFCHR10 | Officera",
    "stateCode": "HR",
    "legacySlug": "ocus-technopolis-golf-course-road",
    "internalAddress": "Ocus Technopolis, Sector 54, Golf Course Road, Gurugram, Haryana"
  },
  {
    "id": "prop-45",
    "slug": "ofcup06",
    "title": "Sector 62 Office Space 01",
    "location": "Sector 62, Noida, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Sector 62, Noida",
    "price": "\u20b961/sq.ft",
    "priceMonthly": 61,
    "type": "Commercial / Office Space",
    "rating": 4.6,
    "amenities": [
      "Lifts",
      "Parking",
      "Power Backup",
      "Furnished Options",
      "Metro Nearby"
    ],
    "image": "/images/properties/i-thum-tower-sector-62/image-1.jpg",
    "imageFileName": "I-Thum Tower - Sector 62.jpg",
    "description": "IT office tower in Noida's Sector 62 Industrial Area, with furnished and semi-furnished units from roughly 485 to 1,560 sq ft listed.",
    "address": "Electronic City IT Belt, Sector 62, Noida",
    "pincode": "201309",
    "capacity": "485-1,560 sq ft",
    "priceUnit": "per sq ft/month",
    "images": [
      "/images/properties/i-thum-tower-sector-62/image-1.jpg",
      "/images/properties/i-thum-tower-sector-62/image-2.jpg"
    ],
    "internalName": "I-Thum Tower - Sector 62",
    "name": "Sector 62 Office Space 01",
    "shortId": "OFCUP06",
    "url": "/office-space/noida/sector-62/ofcup06",
    "seoTitle": "Office Space in Sector 62, Noida - OFCUP06 | Officera",
    "stateCode": "UP",
    "legacySlug": "i-thum-tower-sector-62",
    "internalAddress": "Plot A-40, I-Thum IT Tower, Industrial Area, Sector 62, Noida, Uttar Pradesh"
  },
  {
    "id": "prop-46",
    "slug": "ofcdl30",
    "title": "Connaught Place Virtual Office 01",
    "location": "Connaught Place, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Connaught Place",
    "price": "\u20b9849/mo",
    "priceMonthly": 849,
    "type": "Virtual Office",
    "rating": 4.8,
    "amenities": [
      "Business Address",
      "GST Registration",
      "Company Registration",
      "Mail Handling",
      "Digital KYC"
    ],
    "image": "/images/properties/connaught-place-virtual-office-l29-l34-block-l/image-1.jpg",
    "imageFileName": "Connaught Place Virtual Office - L29-L34 Block L.jpg",
    "description": "Prime Connaught Place business address for registered-office use. Plans include Business Address from \u20b9849/month and GST Registration from \u20b91,199/month, with a company registration plan also offered.",
    "address": "Block L, Connaught Place, New Delhi",
    "pincode": "110001",
    "priceUnit": "per month (VO)",
    "images": [
      "/images/properties/connaught-place-virtual-office-l29-l34-block-l/image-1.jpg",
      "/images/properties/connaught-place-virtual-office-l29-l34-block-l/image-2.jpg",
      "/images/properties/connaught-place-virtual-office-l29-l34-block-l/image-3.jpg"
    ],
    "internalName": "Connaught Place Virtual Office - L29-L34 Block L",
    "name": "Connaught Place Virtual Office 01",
    "shortId": "OFCDL30",
    "url": "/virtual-office/delhi/connaught-place/ofcdl30",
    "seoTitle": "Virtual Office in Connaught Place, Delhi - OFCDL30 | Officera",
    "stateCode": "DL",
    "legacySlug": "connaught-place-virtual-office-l29-l34-block-l",
    "internalAddress": "L29-L34, First Floor, Block L, Connaught Place, New Delhi"
  },
  {
    "id": "prop-47",
    "slug": "ofcdl31",
    "title": "Nehru Place Virtual Office 01",
    "location": "Nehru Place, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Nehru Place",
    "price": "\u20b9599/mo",
    "priceMonthly": 599,
    "type": "Virtual Office",
    "rating": 4.9,
    "amenities": [
      "GST Registration",
      "Company Registration",
      "Rent Agreement",
      "NOC",
      "Utility Bill"
    ],
    "image": "/images/properties/nehru-place-virtual-office-registerkaro/image-1.jpg",
    "imageFileName": "Nehru Place Virtual Office - RegisterKaro.jpg",
    "description": "Compliant virtual office in Nehru Place for GST and company registration. Package includes rent agreement, NOC and utility bill ready for MCA and GST portals.",
    "address": "Main Market Commercial Area, Nehru Place, New Delhi",
    "pincode": "110019",
    "priceUnit": "per month (VO)",
    "images": [
      "/images/properties/nehru-place-virtual-office-registerkaro/image-1.jpg",
      "/images/properties/nehru-place-virtual-office-registerkaro/image-2.jpg",
      "/images/properties/nehru-place-virtual-office-registerkaro/image-3.jpg"
    ],
    "internalName": "Nehru Place Virtual Office - RegisterKaro",
    "name": "Nehru Place Virtual Office 01",
    "shortId": "OFCDL31",
    "url": "/virtual-office/delhi/nehru-place/ofcdl31",
    "seoTitle": "Virtual Office in Nehru Place, Delhi - OFCDL31 | Officera",
    "stateCode": "DL",
    "legacySlug": "nehru-place-virtual-office-registerkaro",
    "internalAddress": "Nehru Place, New Delhi (exact address shared on purchase)"
  },
  {
    "id": "prop-48",
    "slug": "ofcdl32",
    "title": "Aerocity Virtual Office 01",
    "location": "Aerocity, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Aerocity",
    "price": "\u20b91,399/mo",
    "priceMonthly": 1399,
    "type": "Virtual Office",
    "rating": 4.7,
    "amenities": [
      "Business Address",
      "GST Registration Support",
      "Digital Mail Scans",
      "Rent Agreement",
      "NOC"
    ],
    "image": "/images/properties/aerocity-virtual-office-thegstco/image-1.jpg",
    "imageFileName": "Aerocity Virtual Office - TheGSTCo.jpg",
    "description": "Aerocity business address with GST registration support. Basic plan is \u20b91,399/month, with higher tiers adding mail scans and forwarding.",
    "address": "Hospitality District, Aerocity, New Delhi",
    "pincode": "110037",
    "priceUnit": "per month (VO)",
    "images": [
      "/images/properties/aerocity-virtual-office-thegstco/image-1.jpg",
      "/images/properties/aerocity-virtual-office-thegstco/image-2.jpg"
    ],
    "internalName": "Aerocity Virtual Office - TheGSTCo",
    "name": "Aerocity Virtual Office 01",
    "shortId": "OFCDL32",
    "url": "/virtual-office/delhi/aerocity/ofcdl32",
    "seoTitle": "Virtual Office in Aerocity, Delhi - OFCDL32 | Officera",
    "stateCode": "DL",
    "legacySlug": "aerocity-virtual-office-thegstco",
    "internalAddress": "Aerocity, New Delhi (exact address shared on purchase)"
  },
  {
    "id": "prop-49",
    "slug": "ofchr11",
    "title": "Golf Course Road Virtual Office 01",
    "location": "Golf Course Road, Gurugram, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Golf Course Road, Gurugram",
    "price": "\u20b91,099/mo",
    "priceMonthly": 1099,
    "type": "Virtual Office",
    "rating": 4.8,
    "amenities": [
      "Business Address",
      "GST Registration",
      "Company Registration",
      "Digital KYC",
      "Agreement in 24 Hours"
    ],
    "image": "/images/properties/cowrks-paras-twin-towers-virtual-office/image-1.jpg",
    "imageFileName": "CoWrks Paras Twin Towers - Virtual Office.jpg",
    "description": "Golf Course Road virtual office. Business Address from \u20b91,099/month, GST Registration from \u20b92,199 and Company Registration from \u20b91,599, with documents in 24 hours.",
    "address": "Golf Course Road, DLF Phase 5, Gurugram",
    "pincode": "122002",
    "priceUnit": "per month (VO)",
    "images": [
      "/images/properties/cowrks-paras-twin-towers-virtual-office/image-1.jpg",
      "/images/properties/cowrks-paras-twin-towers-virtual-office/image-2.jpg"
    ],
    "internalName": "CoWrks Paras Twin Towers - Virtual Office",
    "name": "Golf Course Road Virtual Office 01",
    "shortId": "OFCHR11",
    "url": "/virtual-office/gurugram/golf-course-road/ofchr11",
    "seoTitle": "Virtual Office in Golf Course Road, Gurugram - OFCHR11 | Officera",
    "stateCode": "HR",
    "legacySlug": "cowrks-paras-twin-towers-virtual-office",
    "internalAddress": "Paras Twin Towers, Golf Course Road, Gurugram, Haryana"
  },
  {
    "id": "prop-50",
    "slug": "ofchr05",
    "title": "Sector 39 Coworking 01",
    "location": "Sector 39, Gurugram, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Sector 39, Gurugram",
    "price": "\u20b91,050/mo",
    "priceMonthly": 1050,
    "type": "Virtual Office",
    "rating": 4.6,
    "amenities": [
      "Business Address",
      "Telephone Answering",
      "Virtual Receptionist",
      "Meeting Room Access",
      "Mail Handling"
    ],
    "image": "/images/properties/regus-unitech-cyber-park-virtual-office/image-1.jpg",
    "imageFileName": "Regus - Unitech Cyber Park Virtual Office.jpg",
    "description": "Regus virtual office plans in Unitech Cyber Park, starting around \u20b935 per day, with optional upgrades to meeting rooms and day office access.",
    "address": "Sector 39, Jharsa Road, Gurugram",
    "pincode": "122003",
    "priceUnit": "per month (VO)",
    "images": [
      "/images/properties/regus-unitech-cyber-park-virtual-office/image-1.jpg"
    ],
    "internalName": "Regus - Unitech Cyber Park",
    "name": "Sector 39 Coworking 01",
    "shortId": "OFCHR05",
    "url": "/coworking/gurugram/sector-39/ofchr05",
    "seoTitle": "Coworking in Sector 39, Gurugram - OFCHR05 | Officera",
    "stateCode": "HR",
    "legacySlug": "regus-unitech-cyber-park-virtual-office",
    "internalAddress": "3rd Floor, Unitech Cyber Park, Village Jharsa, Gurugram, Haryana"
  },
  {
    "id": "prop-51",
    "slug": "ofcup07",
    "title": "Sector 62 Virtual Office 01",
    "location": "Sector 62, Noida, Delhi NCR",
    "city": "Delhi NCR",
    "locality": "Sector 62, Noida",
    "price": "\u20b9790/mo",
    "priceMonthly": 790,
    "type": "Virtual Office",
    "rating": 4.8,
    "amenities": [
      "Business Address",
      "Telephone Answering",
      "Virtual Receptionist",
      "Mail Handling",
      "Meeting Room Access"
    ],
    "image": "/images/properties/regus-noida-virtual-office-green-boulevard/image-1.jpg",
    "imageFileName": "Regus - Noida Virtual Office (Green Boulevard).jpg",
    "description": "Regus virtual office in Noida with a business address, telephone answering and virtual receptionist. Entry plan starts at \u20b9790/month.",
    "address": "Electronic City IT Belt, Sector 62, Noida",
    "pincode": "201309",
    "priceUnit": "per month (VO)",
    "images": [
      "/images/properties/regus-noida-virtual-office-green-boulevard/image-1.jpg",
      "/images/properties/regus-noida-virtual-office-green-boulevard/image-2.jpg"
    ],
    "internalName": "Regus - Noida Virtual Office (Green Boulevard)",
    "name": "Sector 62 Virtual Office 01",
    "shortId": "OFCUP07",
    "url": "/virtual-office/noida/sector-62/ofcup07",
    "seoTitle": "Virtual Office in Sector 62, Noida - OFCUP07 | Officera",
    "stateCode": "UP",
    "legacySlug": "regus-noida-virtual-office-green-boulevard",
    "internalAddress": "Green Boulevard, Sector 62, Noida, Uttar Pradesh"
  },
  {
    "id": "prop-52",
    "slug": "ofcka01",
    "title": "Marathahalli Coworking 01",
    "location": "Marathahalli, Bangalore",
    "city": "Bangalore",
    "locality": "Marathahalli",
    "price": "\u20b96,500/seat",
    "priceMonthly": 6500,
    "type": "Coworking Space",
    "rating": 4.9,
    "amenities": [
      "Air Conditioning",
      "Dedicated Desks",
      "High-speed Wi-Fi",
      "Power Backup",
      "Meeting Rooms"
    ],
    "image": "/images/properties/innov8-ranka-junction/image-1.jpg",
    "imageFileName": "Innov8 - Ranka Junction.jpg",
    "description": "Innov8 centre in Krishna Reddy Industrial Area near Marathahalli with dedicated desks, rated 4.4 from 17 reviews.",
    "address": "Marathahalli Outer Ring Road, Bangalore",
    "pincode": "560016",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/innov8-ranka-junction/image-1.jpg"
    ],
    "internalName": "Innov8 - Ranka Junction",
    "name": "Marathahalli Coworking 01",
    "shortId": "OFCKA01",
    "url": "/coworking/bangalore/marathahalli/ofcka01",
    "seoTitle": "Coworking in Marathahalli, Bangalore - OFCKA01 | Officera",
    "stateCode": "KA",
    "legacySlug": "innov8-ranka-junction",
    "internalAddress": "2nd Floor, AH45, Krishna Reddy Industrial Area, Dooravani Nagar, Bangalore, Karnataka"
  },
  {
    "id": "prop-53",
    "slug": "ofcka02",
    "title": "Koramangala Coworking 01",
    "location": "Koramangala, Bangalore",
    "city": "Bangalore",
    "locality": "Koramangala",
    "price": "\u20b927,699/seat",
    "priceMonthly": 27699,
    "type": "Coworking Space",
    "rating": 4.7,
    "amenities": [
      "Private Offices",
      "Flexi Desks",
      "Meeting Rooms",
      "Tea and Coffee",
      "Premium Address"
    ],
    "image": "/images/properties/wework-prestige-cube-koramangala/image-1.jpg",
    "imageFileName": "WeWork - Prestige Cube Koramangala.jpg",
    "description": "Private-office and flexi-desk workspace on Laskar Hosur Road in Adugodi, Koramangala. Flexi desks from about \u20b9550-750/day.",
    "address": "Hosur Main Road, Koramangala 1st Block, Bangalore",
    "pincode": "560029",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/wework-prestige-cube-koramangala/image-1.jpg",
      "/images/properties/wework-prestige-cube-koramangala/image-2.jpg"
    ],
    "internalName": "WeWork - Prestige Cube Koramangala",
    "name": "Koramangala Coworking 01",
    "shortId": "OFCKA02",
    "url": "/coworking/bangalore/koramangala/ofcka02",
    "seoTitle": "Coworking in Koramangala, Bangalore - OFCKA02 | Officera",
    "stateCode": "KA",
    "legacySlug": "wework-prestige-cube-koramangala",
    "internalAddress": "Site No. 26, Laskar Hosur Road, Adugodi, Bengaluru, Karnataka"
  },
  {
    "id": "prop-54",
    "slug": "ofcka03",
    "title": "Bellandur Coworking 01",
    "location": "Bellandur, Bangalore",
    "city": "Bangalore",
    "locality": "Bellandur",
    "price": "\u20b913,000/seat",
    "priceMonthly": 13000,
    "type": "Coworking Space",
    "rating": 4.8,
    "amenities": [
      "Meeting Rooms",
      "Air Conditioning",
      "Charging Points",
      "Power Backup",
      "Fire Safety"
    ],
    "image": "/images/properties/innov8-prestige-tech-platina/image-1.jpg",
    "imageFileName": "Innov8 - Prestige Tech Platina.jpg",
    "description": "Innov8 centre in Prestige Tech Park on the Outer Ring Road, Bellandur. Rated 4.5 from 58 reviews.",
    "address": "Outer Ring Road Tech Corridor, Bellandur, Bangalore",
    "pincode": "560103",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/innov8-prestige-tech-platina/image-1.jpg",
      "/images/properties/innov8-prestige-tech-platina/image-2.jpg"
    ],
    "internalName": "Innov8 - Prestige Tech Platina",
    "name": "Bellandur Coworking 01",
    "shortId": "OFCKA03",
    "url": "/coworking/bangalore/bellandur/ofcka03",
    "seoTitle": "Coworking in Bellandur, Bangalore - OFCKA03 | Officera",
    "stateCode": "KA",
    "legacySlug": "innov8-prestige-tech-platina",
    "internalAddress": "Prestige Tech Park, Outer Ring Road, Bellandur, Bangalore, Karnataka"
  },
  {
    "id": "prop-55",
    "slug": "ofcmh01",
    "title": "BKC Coworking 01",
    "location": "BKC, Mumbai",
    "city": "Mumbai",
    "locality": "BKC",
    "price": "\u20b922,999/seat",
    "priceMonthly": 22999,
    "type": "Coworking Space",
    "rating": 4.6,
    "amenities": [
      "Flexi Desks",
      "Private Offices",
      "Meeting Rooms",
      "High-speed Wi-Fi",
      "Power Backup"
    ],
    "image": "/images/properties/awfis-adani-inspire-bkc/image-1.jpg",
    "imageFileName": "Awfis - Adani Inspire BKC.jpg",
    "description": "Awfis centre in a 17,500 sq ft space at Adani Inspire, G Block, BKC, with flexi desks, private offices and meeting rooms.",
    "address": "G Block, Bandra Kurla Complex (BKC), Mumbai",
    "pincode": "400051",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/awfis-adani-inspire-bkc/image-1.jpg",
      "/images/properties/awfis-adani-inspire-bkc/image-2.jpg"
    ],
    "internalName": "Awfis - Adani Inspire BKC",
    "name": "BKC Coworking 01",
    "shortId": "OFCMH01",
    "url": "/coworking/mumbai/bkc/ofcmh01",
    "seoTitle": "Coworking in BKC, Mumbai - OFCMH01 | Officera",
    "stateCode": "MH",
    "legacySlug": "awfis-adani-inspire-bkc",
    "internalAddress": "3rd Floor, Unit No. 4, Inspire, Main Road, G Block, Bandra Kurla Complex, Mumbai, Maharashtra"
  },
  {
    "id": "prop-56",
    "slug": "ofcmh02",
    "title": "BKC Coworking 02",
    "location": "BKC, Mumbai",
    "city": "Mumbai",
    "locality": "BKC",
    "price": "\u20b915,499/seat",
    "priceMonthly": 15499,
    "type": "Coworking Space",
    "rating": 4.8,
    "amenities": [
      "Air Conditioning",
      "Cafeteria",
      "Storage Space",
      "Flexi Desks",
      "Private Cabins"
    ],
    "image": "/images/properties/91springboard-bkc-2-kagalwala-house/image-1.jpg",
    "imageFileName": "91Springboard - BKC 2 Kagalwala House.jpg",
    "description": "91Springboard centre with seats and cabins of all sizes near BKC, rated 4.4 from 926 reviews.",
    "address": "G Block, Bandra Kurla Complex (BKC), Mumbai",
    "pincode": "400098",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/91springboard-bkc-2-kagalwala-house/image-1.jpg",
      "/images/properties/91springboard-bkc-2-kagalwala-house/image-2.jpg",
      "/images/properties/91springboard-bkc-2-kagalwala-house/image-3.jpg"
    ],
    "internalName": "91Springboard - BKC 2 Kagalwala House",
    "name": "BKC Coworking 02",
    "shortId": "OFCMH02",
    "url": "/coworking/mumbai/bkc/ofcmh02",
    "seoTitle": "Coworking in BKC, Mumbai - OFCMH02 | Officera",
    "stateCode": "MH",
    "legacySlug": "91springboard-bkc-2-kagalwala-house",
    "internalAddress": "91Springboard BKC 2, Vinay Bhavya Complex, 6th Floor, Wing B, CST Road, Vidya Nagari, Kalina, Santacruz East, Mumbai, Maharashtra"
  },
  {
    "id": "prop-57",
    "slug": "ofcmh03",
    "title": "BKC Coworking 03",
    "location": "BKC, Mumbai",
    "city": "Mumbai",
    "locality": "BKC",
    "price": "\u20b912,999/seat",
    "priceMonthly": 12999,
    "type": "Coworking Space",
    "rating": 4.9,
    "amenities": [
      "Dedicated Desks",
      "High-speed Wi-Fi",
      "Power Backup",
      "Air Conditioning",
      "Railway Nearby"
    ],
    "image": "/images/properties/603-the-coworking-space-amore/image-1.jpg",
    "imageFileName": "603 The Coworking Space - Amore.jpg",
    "description": "Dedicated-desk coworking opposite Khar West railway station, serving the BKC and Bandra business belt.",
    "address": "G Block, Bandra Kurla Complex (BKC), Mumbai",
    "pincode": "400052",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/603-the-coworking-space-amore/image-1.jpg",
      "/images/properties/603-the-coworking-space-amore/image-2.jpg",
      "/images/properties/603-the-coworking-space-amore/image-3.jpg"
    ],
    "internalName": "603 The Coworking Space - Amore",
    "name": "BKC Coworking 03",
    "shortId": "OFCMH03",
    "url": "/coworking/mumbai/bkc/ofcmh03",
    "seoTitle": "Coworking in BKC, Mumbai - OFCMH03 | Officera",
    "stateCode": "MH",
    "legacySlug": "603-the-coworking-space-amore",
    "internalAddress": "5th Floor, 13-14, Amore Building, Opposite Khar Railway Station West, 2nd Road, Ram Krishna Nagar, Khar West, Mumbai, Maharashtra"
  },
  {
    "id": "prop-58",
    "slug": "ofcts01",
    "title": "HITEC City Coworking 01",
    "location": "HITEC City, Hyderabad",
    "city": "Hyderabad",
    "locality": "HITEC City",
    "price": "\u20b98,000/seat",
    "priceMonthly": 8000,
    "type": "Coworking Space",
    "rating": 4.7,
    "amenities": [
      "Air Conditioning",
      "Dedicated Desks",
      "High-speed Wi-Fi",
      "Power Backup",
      "Meeting Rooms"
    ],
    "image": "/images/properties/hs-coworks-hitec-city/image-1.jpg",
    "imageFileName": "HS Coworks - HITEC City.jpg",
    "description": "Affordable coworking in HUDA Techno Enclave, HITEC City, rated 4.3 from 456 reviews.",
    "address": "Cyber Towers Corridor, HITEC City, Madhapur, Hyderabad",
    "pincode": "500081",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/hs-coworks-hitec-city/image-1.jpg",
      "/images/properties/hs-coworks-hitec-city/image-2.jpg"
    ],
    "internalName": "HS Coworks - HITEC City",
    "name": "HITEC City Coworking 01",
    "shortId": "OFCTS01",
    "url": "/coworking/hyderabad/hitec-city/ofcts01",
    "seoTitle": "Coworking in HITEC City, Hyderabad - OFCTS01 | Officera",
    "stateCode": "TS",
    "legacySlug": "hs-coworks-hitec-city",
    "internalAddress": "HUDA Techno Enclave, HITEC City, Hyderabad, Telangana"
  },
  {
    "id": "prop-59",
    "slug": "ofcts02",
    "title": "HITEC City Coworking 02",
    "location": "HITEC City, Hyderabad",
    "city": "Hyderabad",
    "locality": "HITEC City",
    "price": "\u20b910,999/seat",
    "priceMonthly": 10999,
    "type": "Coworking Space",
    "rating": 4.8,
    "amenities": [
      "High-speed Wi-Fi",
      "Power Backup",
      "Meeting Rooms",
      "Cafeteria",
      "Air Conditioning"
    ],
    "image": "/images/properties/awfis-tech-one-hitec-city/image-1.jpg",
    "imageFileName": "Awfis - Tech One HITEC City.jpg",
    "description": "Awfis centre on the 10th floor at Raidurg, HITEC City, close to major IT parks.",
    "address": "Cyber Towers Corridor, HITEC City, Madhapur, Hyderabad",
    "pincode": "500081",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/awfis-tech-one-hitec-city/image-1.jpg",
      "/images/properties/awfis-tech-one-hitec-city/image-2.jpg",
      "/images/properties/awfis-tech-one-hitec-city/image-3.jpg"
    ],
    "internalName": "Awfis - Tech One HITEC City",
    "name": "HITEC City Coworking 02",
    "shortId": "OFCTS02",
    "url": "/coworking/hyderabad/hitec-city/ofcts02",
    "seoTitle": "Coworking in HITEC City, Hyderabad - OFCTS02 | Officera",
    "stateCode": "TS",
    "legacySlug": "awfis-tech-one-hitec-city",
    "internalAddress": "10th Floor, Unit Nos. 1001 and 1002, X Road, Radhe Nagar, Khajaguda, Raidurg, HITEC City, Hyderabad, Telangana"
  },
  {
    "id": "prop-60",
    "slug": "ofcts03",
    "title": "HITEC City Managed Office 01",
    "location": "HITEC City, Hyderabad",
    "city": "Hyderabad",
    "locality": "HITEC City",
    "price": "\u20b98,999/seat",
    "priceMonthly": 8999,
    "type": "Managed Office",
    "rating": 4.6,
    "amenities": [
      "Ready-to-move-in Offices",
      "Meeting Rooms",
      "Power Backup",
      "Air Conditioning",
      "Security"
    ],
    "image": "/images/properties/smartworks-hitec-city/image-1.jpg",
    "imageFileName": "Smartworks - HITEC City.jpg",
    "description": "Managed office space near HITEC City with design and layout assistance. Rated 4.2 from 33 reviews.",
    "address": "Cyber Towers Corridor, HITEC City, Madhapur, Hyderabad",
    "pincode": "500081",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/smartworks-hitec-city/image-1.jpg",
      "/images/properties/smartworks-hitec-city/image-2.jpg"
    ],
    "internalName": "Smartworks - HITEC City",
    "name": "HITEC City Managed Office 01",
    "shortId": "OFCTS03",
    "url": "/managed-office/hyderabad/hitec-city/ofcts03",
    "seoTitle": "Managed Office in HITEC City, Hyderabad - OFCTS03 | Officera",
    "stateCode": "TS",
    "legacySlug": "smartworks-hitec-city",
    "internalAddress": "HITEC City, Hyderabad, Telangana (building to be confirmed)"
  },
  {
    "id": "prop-61",
    "slug": "ofcmh04",
    "title": "Koregaon Park Coworking 01",
    "location": "Koregaon Park, Pune",
    "city": "Pune",
    "locality": "Koregaon Park",
    "price": "\u20b910,500/seat",
    "priceMonthly": 10500,
    "type": "Coworking Space",
    "rating": 4.8,
    "amenities": [
      "Dedicated Desks",
      "Private Cabins",
      "High-speed Wi-Fi",
      "Power Backup",
      "Air Conditioning"
    ],
    "image": "/images/properties/espree-co-works-koregaon-park/image-1.jpg",
    "imageFileName": "Espree Co-works - Koregaon Park.jpg",
    "description": "Coworking in Meera Nagar, Koregaon Park, with dedicated desks and small private cabins.",
    "address": "North Main Road, Koregaon Park, Pune",
    "pincode": "411001",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/espree-co-works-koregaon-park/image-1.jpg",
      "/images/properties/espree-co-works-koregaon-park/image-2.jpg"
    ],
    "internalName": "Espree Co-works - Koregaon Park",
    "name": "Koregaon Park Coworking 01",
    "shortId": "OFCMH04",
    "url": "/coworking/pune/koregaon-park/ofcmh04",
    "seoTitle": "Coworking in Koregaon Park, Pune - OFCMH04 | Officera",
    "stateCode": "MH",
    "legacySlug": "espree-co-works-koregaon-park",
    "internalAddress": "Lane Number 5, Meera Nagar, Koregaon Park, Pune, Maharashtra"
  },
  {
    "id": "prop-62",
    "slug": "ofcmh05",
    "title": "Koregaon Park Coworking 02",
    "location": "Koregaon Park, Pune",
    "city": "Pune",
    "locality": "Koregaon Park",
    "price": "\u20b95,499/seat",
    "priceMonthly": 5499,
    "type": "Coworking Space",
    "rating": 4.9,
    "amenities": [
      "Day Pass",
      "Dedicated Desks",
      "High-speed Wi-Fi",
      "Power Backup",
      "Garden Seating"
    ],
    "image": "/images/properties/urban-nomads-koregaon-park/image-1.jpg",
    "imageFileName": "Urban Nomads - Koregaon Park.jpg",
    "description": "Budget bungalow-style coworking on North Main Road, Koregaon Park, with day passes from about \u20b9300.",
    "address": "North Main Road, Koregaon Park, Pune",
    "pincode": "411001",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/urban-nomads-koregaon-park/image-1.jpg",
      "/images/properties/urban-nomads-koregaon-park/image-2.jpg"
    ],
    "internalName": "Urban Nomads - Koregaon Park",
    "name": "Koregaon Park Coworking 02",
    "shortId": "OFCMH05",
    "url": "/coworking/pune/koregaon-park/ofcmh05",
    "seoTitle": "Coworking in Koregaon Park, Pune - OFCMH05 | Officera",
    "stateCode": "MH",
    "legacySlug": "urban-nomads-koregaon-park",
    "internalAddress": "Bungalow No. 5, Liberty Phase 1, North Main Road, opposite Lane 6, Koregaon Park, Pune, Maharashtra"
  },
  {
    "id": "prop-63",
    "slug": "ofcmh06",
    "title": "Koregaon Park Managed Office 01",
    "location": "Koregaon Park, Pune",
    "city": "Pune",
    "locality": "Koregaon Park",
    "price": "\u20b97,499/seat",
    "priceMonthly": 7499,
    "type": "Managed Office",
    "rating": 4.7,
    "amenities": [
      "Ready-to-move-in Offices",
      "Breakout Area",
      "Meeting Rooms",
      "Power Backup",
      "Air Conditioning"
    ],
    "image": "/images/properties/bootstart-arcadian-building/image-1.jpg",
    "imageFileName": "Bootstart - Arcadian Building.jpg",
    "description": "Managed office on the 1st floor of Arcadian Building on North Main Road, Koregaon Park. Rated 4.4 from 121 reviews.",
    "address": "North Main Road, Koregaon Park, Pune",
    "pincode": "411001",
    "priceUnit": "per seat/month",
    "images": [
      "/images/properties/bootstart-arcadian-building/image-1.jpg",
      "/images/properties/bootstart-arcadian-building/image-2.jpg",
      "/images/properties/bootstart-arcadian-building/image-3.jpg"
    ],
    "internalName": "Bootstart - Arcadian Building",
    "name": "Koregaon Park Managed Office 01",
    "shortId": "OFCMH06",
    "url": "/managed-office/pune/koregaon-park/ofcmh06",
    "seoTitle": "Managed Office in Koregaon Park, Pune - OFCMH06 | Officera",
    "stateCode": "MH",
    "legacySlug": "bootstart-arcadian-building",
    "internalAddress": "1st Floor, Arcadian Building, Plot No. 12, North Main Road, Near Pinnacle Building, Koregaon Park, Pune, Maharashtra"
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

export interface CityHub {
  name: string;
  image: string;
  popularAreas: string;
  coworkingCount: string;
  virtualCount: string;
  totalCount?: string;
  stateBreakdown?: string;
}

export const CITY_HUBS: CityHub[] = [
  {
    name: "Delhi NCR",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=800",
    popularAreas: "Connaught Place, Cyber City, Sector 62, Aerocity",
    coworkingCount: "28 Spaces",
    virtualCount: "6 Locations",
    totalCount: "51 Properties",
    stateBreakdown: "Delhi: 32 | Gurugram: 12 | Noida: 7"
  },
  {
    name: "Bangalore",
    image: "https://images.unsplash.com/photo-1709967884183-7ffa9d168508?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzg2MDk5MTI2fA&ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=800",
    popularAreas: "Marathahalli, Koramangala, Bellandur",
    coworkingCount: "3 Spaces",
    virtualCount: "0 Locations",
    totalCount: "3 Properties",
    stateBreakdown: "Karnataka (KA): 3"
  },
  {
    name: "Mumbai",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80&w=800",
    popularAreas: "Bandra Kurla Complex (BKC)",
    coworkingCount: "3 Spaces",
    virtualCount: "0 Locations",
    totalCount: "3 Properties",
    stateBreakdown: "Maharashtra (MH): 3"
  },
  {
    name: "Hyderabad",
    image: "/images/hyderabad.jpg",
    popularAreas: "HITEC City",
    coworkingCount: "2 Spaces",
    virtualCount: "0 Locations",
    totalCount: "3 Properties",
    stateBreakdown: "Telangana (TS): 3"
  },
  {
    name: "Pune",
    image: "/images/pune.jpg",
    popularAreas: "Koregaon Park",
    coworkingCount: "2 Spaces",
    virtualCount: "0 Locations",
    totalCount: "3 Properties",
    stateBreakdown: "Maharashtra (MH): 3"
  },
  {
    name: "Chennai",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800",
    popularAreas: "OMR, Guindy, Anna Nagar",
    coworkingCount: "Coming Soon",
    virtualCount: "Coming Soon",
    totalCount: "Coming Soon",
    stateBreakdown: "Expanding Soon"
  },
  {
    name: "Kolkata",
    image: "https://images.unsplash.com/photo-1536421469767-80559bb6f5e1?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzg2MDk5MjkzfA&ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=800",
    popularAreas: "Salt Lake Sector V, Rajarhat",
    coworkingCount: "Coming Soon",
    virtualCount: "Coming Soon",
    totalCount: "Coming Soon",
    stateBreakdown: "Expanding Soon"
  }
];

export interface NavLinkItem {
  name: string;
  href: string;
  isCityDropdown?: boolean;
  spaceType?: "Coworking Space" | "Virtual Office";
  badge?: string;
}

export const NAV_LINKS: NavLinkItem[] = [
  { 
    name: "Coworking Spaces", 
    href: "/coworking-spaces", 
    isCityDropdown: true, 
    spaceType: "Coworking Space"
  },
  { 
    name: "Virtual Offices", 
    href: "/virtual-offices", 
    isCityDropdown: true, 
    spaceType: "Virtual Office"
  },
  { name: "Explore", href: "/workspaces" },
  { name: "Solutions", href: "/solutions" },
  { name: "Pricing", href: "/pricing" },
  { name: "List Your Space", href: "/workspaces/list-space" },
  { name: "About Us", href: "/about-us" }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t-1",
    name: "Aditya Nambiar",
    role: "Co-Founder & CTO",
    company: "Qubitron Labs · Bangalore",
    rating: 5,
    text: "When we expanded our backend engineering team from Indiranagar to Koramangala, Officera helped us evaluate 4 Grade-A centres in two days. We finalized 28 dedicated desks with private rack space and leased lines in under a week. Zero broker follow-ups, crystal clear pricing, and the on-ground team was top-notch.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=240"
  },
  {
    id: "t-2",
    name: "Tanvi Deshmukh",
    role: "Managing Director",
    company: "Advaita Commerce · New Delhi",
    rating: 5,
    text: "Getting a compliant business address for multi-state GST in Delhi was a headache until we used Officera. They coordinated directly with the property operator to issue the verified Rent Agreement, 11-month NOC, and electricity bill within 48 hours. Our GST filing was approved on the first submission without queries.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=240"
  },
  {
    id: "t-3",
    name: "Rajesh K. Varma",
    role: "Head of Infrastructure",
    company: "FinEdge Capital · Mumbai BKC",
    rating: 5,
    text: "Relocating our 50-member quantitative trading team to Bandra Kurla Complex (BKC) needed strict access control, dedicated 1 Gbps redundant fiber, and a custom boardroom setup. Officera negotiated direct landlord terms and had our bespoke managed suite ready two weeks ahead of schedule.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=240"
  },
  {
    id: "t-4",
    name: "Sneha Nair",
    role: "VP of People Operations",
    company: "Synapse Mobility · Gurugram",
    rating: 5,
    text: "Our team doubled from 20 to 45 seats within six months. Officera found us an adjoining private wing at DLF Cyber City with seamless lock-in flex terms, so we didn’t sink capital into upfront interior capex. The high-speed infrastructure and Metro proximity make daily commutes effortless.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=240"
  },
  {
    id: "t-5",
    name: "Karthik Reddy",
    role: "Director of Engineering",
    company: "CloudMatrix India · Hyderabad",
    rating: 5,
    text: "Setting up our South India engineering hub at HITEC City was completely frictionless. Officera's side-by-side pricing breakdown helped our finance team save over 18% on monthly seat rentals compared to traditional commercial leasing. The transparent documentation was a huge relief.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=240"
  },
  {
    id: "t-6",
    name: "Meera Krishnan",
    role: "Principal Architect",
    company: "Studio Vistara · Pune",
    rating: 5,
    text: "We needed a creative studio space with natural light and client meeting rooms in Koregaon Park. Officera shortlisted two prime properties within an hour. The booking, legal agreement, and deposit escrow were handled flawlessly with zero hidden charges.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=240"
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
