import { PrismaClient, WorkspaceType, ListingStatus, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const WORKSPACES_DATA = [
  {
    id: "cowork-1",
    slug: "the-zenith-coworking-indiranagar",
    title: "The Zenith Coworking",
    location: "Indiranagar, Bangalore",
    city: "Bangalore",
    priceDisplay: "₹8,500/seat",
    priceMonthly: 8500,
    type: WorkspaceType.COWORKING,
    rating: 4.9,
    description: "High energy coworking environment with dedicated desks, high-speed fiber internet, and premium artisan coffee bar.",
    amenities: ["24/7 Access", "High-speed Wi-Fi", "Coffee Bar", "Phone Booths"],
    image: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "cowork-2",
    slug: "wework-galaxy-mg-road",
    title: "WeWork Galaxy",
    location: "MG Road, Bangalore",
    city: "Bangalore",
    priceDisplay: "₹12,000/seat",
    priceMonthly: 12000,
    type: WorkspaceType.COWORKING,
    rating: 4.8,
    description: "Centrally located on MG Road with world-class community events, printing hubs, and executive conference spaces.",
    amenities: ["Hot Desks", "Conference Rooms", "Printing Services", "Community Events"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "cowork-3",
    slug: "innov8-coworking-connaught-place",
    title: "Innov8 Coworking",
    location: "Connaught Place, Delhi NCR",
    city: "Delhi NCR",
    priceDisplay: "₹9,000/seat",
    priceMonthly: 9000,
    type: WorkspaceType.COWORKING,
    rating: 4.7,
    description: "Heritage architectural space equipped with modern ergonomic workstations, sound-damped call pods, and high-speed leased line.",
    amenities: ["Ergonomic Seating", "Pantry Access", "Secure Lockers", "High-speed Internet"],
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "cowork-4",
    slug: "awfis-one-bkc-mumbai",
    title: "Awfis One BKC",
    location: "Bandra Kurla Complex, Mumbai",
    city: "Mumbai",
    priceDisplay: "₹15,000/seat",
    priceMonthly: 15000,
    type: WorkspaceType.COWORKING,
    rating: 4.8,
    description: "Grade-A business center located right in Mumbai's prime financial district with customized meeting suites.",
    amenities: ["Meeting Rooms", "Lounge Area", "Complimentary Tea/Coffee", "Acoustic Pods"],
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "managed-1",
    slug: "signature-managed-suites-bkc",
    title: "Signature Managed Suites",
    location: "BKC, Mumbai",
    city: "Mumbai",
    priceDisplay: "₹25,000/desk",
    priceMonthly: 25000,
    type: WorkspaceType.MANAGED_OFFICE,
    rating: 4.9,
    description: "Fully bespoke enterprise office suites featuring biometric security, private executive pantries, and dedicated IT support.",
    amenities: ["Dedicated Pantry", "Biometric Security", "Housekeeping", "IT Helpdesk"],
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "managed-2",
    slug: "ascendas-it-park-whitefield",
    title: "Ascendas IT Park",
    location: "Whitefield, Bangalore",
    city: "Bangalore",
    priceDisplay: "₹18,000/desk",
    priceMonthly: 18000,
    type: WorkspaceType.MANAGED_OFFICE,
    rating: 4.7,
    description: "Scalable corporate floor plates inside Whitefield tech corridor with ample parking and bespoke branding options.",
    amenities: ["Custom branding", "Reception Desk", "Parking Space", "Breakout Zone"],
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "managed-3",
    slug: "cyber-city-managed-office-gurgaon",
    title: "Cyber City Managed Office",
    location: "DLF Phase 3, Delhi NCR",
    city: "Delhi NCR",
    priceDisplay: "₹22,000/desk",
    priceMonthly: 22000,
    type: WorkspaceType.MANAGED_OFFICE,
    rating: 4.8,
    description: "Top-tier managed workspace overlooking DLF Cyber City with rapid access to metro and national highway.",
    amenities: ["Board Rooms", "Executive Lounge", "High-speed Fiber", "24/7 Security"],
    image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "managed-4",
    slug: "hi-tech-managed-spaces-hyderabad",
    title: "Hi-Tech Managed Spaces",
    location: "Madhapur, Hyderabad",
    city: "Hyderabad",
    priceDisplay: "₹16,500/desk",
    priceMonthly: 16500,
    type: WorkspaceType.MANAGED_OFFICE,
    rating: 4.9,
    description: "Custom office layouts for scaling tech enterprises with centralized climate control and on-site cafe.",
    amenities: ["Custom Layout", "Centralized AC", "Cafeteria Access", "Visitor Lobby"],
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "office-1",
    slug: "capital-towers-lease-delhi",
    title: "Capital Towers Lease",
    location: "Connaught Place, Delhi NCR",
    city: "Delhi NCR",
    priceDisplay: "₹120/sq.ft",
    priceMonthly: 120000,
    type: WorkspaceType.COMMERCIAL_OFFICE,
    rating: 4.7,
    description: "Grade-A commercial lease plate in central Connaught Place with multi-level automated parking.",
    amenities: ["Bare shell option", "Centralized HVAC", "100% Power Backup", "Multi-level Parking"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "office-2",
    slug: "prestige-commercial-hub-bangalore",
    title: "Prestige Commercial Hub",
    location: "Outer Ring Road, Bangalore",
    city: "Bangalore",
    priceDisplay: "₹150/sq.ft",
    priceMonthly: 150000,
    type: WorkspaceType.COMMERCIAL_OFFICE,
    rating: 4.8,
    description: "Stunning double-height entrance lobby, high speed elevators, and panoramic views over ORR.",
    amenities: ["Glass Facade", "Double Height Lobby", "High Speed Elevators", "Fire Safety Systems"],
    image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "office-3",
    slug: "one-bkc-commercial-mumbai",
    title: "One BKC Commercial",
    location: "Bandra Kurla Complex, Mumbai",
    city: "Mumbai",
    priceDisplay: "₹280/sq.ft",
    priceMonthly: 280000,
    type: WorkspaceType.COMMERCIAL_OFFICE,
    rating: 4.9,
    description: "LEED Gold certified commercial building accommodating Fortune 500 headquarters in India.",
    amenities: ["Grade-A Building", "Leed Certified", "Advanced Security Systems", "Executive Dining"],
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "office-4",
    slug: "phoenix-commercial-park-hyderabad",
    title: "Phoenix Commercial Park",
    location: "Gachibowli, Hyderabad",
    city: "Hyderabad",
    priceDisplay: "₹95/sq.ft",
    priceMonthly: 95000,
    type: WorkspaceType.COMMERCIAL_OFFICE,
    rating: 4.6,
    description: "Highly efficient column-free floor plates within minutes of Hyderabad Financial District and ORR expressway.",
    amenities: ["Customizable Floor Plate", "Zero Maintenance Overhead", "High Security", "Metro Proximity"],
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "virtual-1",
    slug: "premium-cp-virtual-address-delhi",
    title: "Premium CP Virtual Address",
    location: "Connaught Place, Delhi NCR",
    city: "Delhi NCR",
    priceDisplay: "₹999/mo",
    priceMonthly: 999,
    type: WorkspaceType.VIRTUAL_OFFICE,
    rating: 4.8,
    description: "Legally compliant business address with authorized landlord NOCs for ROC & GST registrations in New Delhi.",
    amenities: ["GST Registration NOC", "Company Incorporation NOC", "Mail Handling & Scanning", "Courier Forwarding"],
    image: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "virtual-2",
    slug: "indiranagar-corporate-address-bangalore",
    title: "Indiranagar Corporate Address",
    location: "Indiranagar, Bangalore",
    city: "Bangalore",
    priceDisplay: "₹1,299/mo",
    priceMonthly: 1299,
    type: WorkspaceType.VIRTUAL_OFFICE,
    rating: 4.9,
    description: "Iconic commercial address in Bangalore with mail scanning, document courier dispatch, and front desk assistance.",
    amenities: ["Premium Commercial Address", "NOC & Utility Bills", "Dedicated Receptionist", "GST Registry Support"],
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "virtual-3",
    slug: "bkc-premium-virtual-hub-mumbai",
    title: "BKC Premium Virtual Hub",
    location: "Bandra Kurla Complex, Mumbai",
    city: "Mumbai",
    priceDisplay: "₹1,999/mo",
    priceMonthly: 1999,
    type: WorkspaceType.VIRTUAL_OFFICE,
    rating: 4.9,
    description: "Prestigious BKC business address for companies seeking corporate presence in Mumbai with boardroom access.",
    amenities: ["Prestigious Business Address", "GST Compliant Documents", "Bi-weekly Mail Dispatch", "Meeting Room Access"],
    image: "https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "virtual-4",
    slug: "cyber-gateway-virtual-office-hyderabad",
    title: "Cyber Gateway Virtual Office",
    location: "Hitec City, Hyderabad",
    city: "Hyderabad",
    priceDisplay: "₹1,199/mo",
    priceMonthly: 1199,
    type: WorkspaceType.VIRTUAL_OFFICE,
    rating: 4.7,
    description: "Fast-track ROC & GST compliant virtual office package in the heart of Hyderabad's technology center.",
    amenities: ["Business Registration NOC", "Utility Bill Copies", "Courier Alerts", "Reception Answering"],
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "kolkata-cowork",
    slug: "salt-lake-sector-v-hub-kolkata",
    title: "Salt Lake Sector V Hub",
    location: "Sector V, Salt Lake, Kolkata",
    city: "Kolkata",
    priceDisplay: "₹6,000/seat",
    priceMonthly: 6000,
    type: WorkspaceType.COWORKING,
    rating: 4.8,
    description: "Modern, vibrant coworking facility with metro connectivity, cafeteria, and collaborative networking areas.",
    amenities: ["Metro Connectivity", "High-speed Internet", "Free Coffee", "Modern Cafeteria"],
    image: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "kolkata-managed",
    slug: "rajarhat-managed-offices-kolkata",
    title: "Rajarhat Managed Offices",
    location: "Rajarhat, New Town, Kolkata",
    city: "Kolkata",
    priceDisplay: "₹14,000/desk",
    priceMonthly: 14000,
    type: WorkspaceType.MANAGED_OFFICE,
    rating: 4.7,
    description: "Fully serviced private executive offices in New Town with round-the-clock security and parking.",
    amenities: ["Customizable Layout", "Biometric Lock", "Reception Desk", "Parking"],
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "kolkata-office",
    slug: "park-street-commercial-space-kolkata",
    title: "Park Street Commercial Space",
    location: "Park Street, Kolkata",
    city: "Kolkata",
    priceDisplay: "₹85/sq.ft",
    priceMonthly: 85000,
    type: WorkspaceType.COMMERCIAL_OFFICE,
    rating: 4.9,
    description: "Grade-A office space in Kolkata's central business district with 100% power backup and high-speed elevators.",
    amenities: ["Grade-A Building", "Centralized AC", "100% Power Backup", "Elevators"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "kolkata-virtual",
    slug: "camac-street-virtual-office-kolkata",
    title: "Camac Street Virtual Office",
    location: "Camac Street, Kolkata",
    city: "Kolkata",
    priceDisplay: "₹899/mo",
    priceMonthly: 899,
    type: WorkspaceType.VIRTUAL_OFFICE,
    rating: 4.8,
    description: "Prime address on Camac Street offering full documentation support for GST & company incorporation.",
    amenities: ["GST Compliant NOC", "Business Address NOC", "Mail Scanning", "Courier Alerts"],
    image: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&q=80&w=800"
  }
];

async function main() {
  console.log("Starting database seeding...");

  const adminEmail = process.env.ADMIN_EMAIL || "admin@officera.in";
  const rawAdminPassword = process.env.ADMIN_PASSWORD || "Admin@Officera2025!";
  const passwordHash = await bcrypt.hash(rawAdminPassword, 10);

  // 1. Seed Admin User
  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      role: Role.ADMIN,
      passwordHash,
    },
    create: {
      name: "Officera Admin",
      email: adminEmail,
      role: Role.ADMIN,
      passwordHash,
    },
  });
  console.log(`Admin user ready: ${adminUser.email}`);

  // In production, only seed the admin user as required by Step 1 of Phase 4
  const isProduction = process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production";
  if (isProduction) {
    console.log("Production environment detected: Skipping fake test data seeding.");
    return;
  }

  // 2. Extract & Seed All Unique Amenities
  const allAmenities = new Set<string>();
  WORKSPACES_DATA.forEach((ws) => {
    ws.amenities.forEach((a) => allAmenities.add(a));
  });

  const amenityMap = new Map<string, string>();
  for (const name of allAmenities) {
    const amenity = await prisma.amenity.upsert({
      where: { name },
      update: {},
      create: { name, category: "General" },
    });
    amenityMap.set(name, amenity.id);
  }
  console.log(`Seeded ${amenityMap.size} unique amenities.`);

  // 3. Seed Workspaces, Images & Amenities
  for (const item of WORKSPACES_DATA) {
    const workspace = await prisma.workspace.upsert({
      where: { slug: item.slug },
      update: {
        title: item.title,
        location: item.location,
        city: item.city,
        priceDisplay: item.priceDisplay,
        priceMonthly: item.priceMonthly,
        type: item.type,
        rating: item.rating,
        description: item.description,
        status: ListingStatus.APPROVED,
        isFeatured: true,
      },
      create: {
        id: item.id,
        slug: item.slug,
        title: item.title,
        location: item.location,
        city: item.city,
        priceDisplay: item.priceDisplay,
        priceMonthly: item.priceMonthly,
        type: item.type,
        rating: item.rating,
        description: item.description,
        status: ListingStatus.APPROVED,
        isFeatured: true,
        partnerId: adminUser.id,
      },
    });

    // Add Primary Image
    await prisma.workspaceImage.deleteMany({
      where: { workspaceId: workspace.id },
    });
    await prisma.workspaceImage.create({
      data: {
        workspaceId: workspace.id,
        url: item.image,
        altText: item.title,
        isPrimary: true,
        order: 0,
      },
    });

    // Link Amenities
    await prisma.workspaceAmenity.deleteMany({
      where: { workspaceId: workspace.id },
    });
    for (const amName of item.amenities) {
      const amId = amenityMap.get(amName);
      if (amId) {
        await prisma.workspaceAmenity.create({
          data: {
            workspaceId: workspace.id,
            amenityId: amId,
          },
        });
      }
    }
  }

  console.log(`Seeded ${WORKSPACES_DATA.length} workspaces successfully.`);
  console.log("Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
