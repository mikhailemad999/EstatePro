import { PrismaClient, Role, PropertyStatus, ListingType, LeadStage, AppointmentType, AppointmentStatus, EscrowStage } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding EstatePro database on MySQL port 3305...");

  // 1. Clear existing records safely
  await prisma.escrowDocument.deleteMany({});
  await prisma.escrowTransaction.deleteMany({});
  await prisma.propertyAmenity.deleteMany({});
  await prisma.propertyFloorPlan.deleteMany({});
  await prisma.propertyImage.deleteMany({});
  await prisma.propertyDocument.deleteMany({});
  await prisma.propertyPriceHistory.deleteMany({});
  await prisma.savedProperty.deleteMany({});
  await prisma.task.deleteMany({});
  await prisma.leadActivity.deleteMany({});
  await prisma.lead.deleteMany({});
  await prisma.appointment.deleteMany({});
  await prisma.unit.deleteMany({});
  await prisma.building.deleteMany({});
  await prisma.paymentPlan.deleteMany({});
  await prisma.developmentProject.deleteMany({});
  await prisma.property.deleteMany({});
  await prisma.agentProfile.deleteMany({});
  await prisma.agency.deleteMany({});
  await prisma.developerProfile.deleteMany({});
  await prisma.monographReport.deleteMany({});
  await prisma.auditLog.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("✓ Existing records purged.");

  // 2. Create Users
  const adminUser = await prisma.user.create({
    data: {
      email: "admin@estatepro-overseer.io",
      name: "Alexander von Berg",
      role: Role.SUPER_ADMIN,
      phone: "+41 22 819 0000",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
      bio: "Executive Platform Overseer • Tier-0 Governance",
      verified: true,
    },
  });

  const agentUser = await prisma.user.create({
    data: {
      email: "k.takahashi@estatepro-reserve.io",
      name: "Kenjiro Takahashi",
      role: Role.AGENT,
      phone: "+81 3 5555 0192",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      bio: "Managing Partner, Asia-Pacific Private Client Group • Tokyo Central Node",
      verified: true,
    },
  });

  const buyerUser = await prisma.user.create({
    data: {
      email: "a.sterling@sterling-holdings.co.uk",
      name: "Lord Alistair Sterling",
      role: Role.BUYER,
      phone: "+44 20 7946 0888",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      bio: "Principal of Sterling Family Office • London & Zurich",
      verified: true,
    },
  });

  const developerUser = await prisma.user.create({
    data: {
      email: "development@arc-heritage.ch",
      name: "Jean-Paul Delacroix",
      role: Role.DEVELOPER,
      phone: "+41 22 900 1122",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
      bio: "Chief Architectural Officer • Arc Heritage Development Group",
      verified: true,
    },
  });

  // 3. Create Agency & AgentProfile
  const agency = await prisma.agency.create({
    data: {
      name: "Sotheby's Sovereign Capital Partner",
      slug: "sothebys-sovereign-capital",
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=200&q=80",
      coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      description: "Premier global advisory for trophy architectural acquisitions, heritage palazzos, and sovereign private islands.",
      phone: "+41 22 700 9000",
      email: "sovereign@sothebys-reserve.ch",
      address: "Rue du Rhône 42, Geneva",
      country: "Switzerland",
      verified: true,
      tier: "Sovereign Member Node",
      grossVolume: 840000000,
    },
  });

  const agentProfile = await prisma.agentProfile.create({
    data: {
      userId: agentUser.id,
      agencyId: agency.id,
      title: "Senior Private Advisor & Managing Partner",
      licenseNumber: "SWISS-FINMA-REG-84920",
      experienceYears: 18,
      rating: 4.98,
      reviewCount: 42,
      grossMandateBook: 148500000,
      activeMandates: 14,
      officeLocation: "Tokyo Central & Geneva",
      specializations: "Ultra-HNW Cross-Border Acquisitions, Historic Assets, Japan Trophy Tier",
      tierBadge: "Tier 1 Sovereign Node",
    },
  });

  // 4. Create Developer Profile & Landmark Development Project
  const developerProfile = await prisma.developerProfile.create({
    data: {
      userId: developerUser.id,
      companyName: "Arc Heritage Developments",
      slug: "arc-heritage-developments",
      logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=200&q=80",
      description: "Pioneering monumental architectural living across Alpine and Mediterranean submarkets.",
      completedProjectsCount: 14,
      totalUnitsBuilt: 320,
    },
  });

  const landmarkProject = await prisma.developmentProject.create({
    data: {
      title: "The Obersee Monolith Masterplan",
      slug: "obersee-monolith-masterplan",
      developerId: developerProfile.id,
      description: "A transformative sculptural architectural enclave of 18 bespoke private residences nestled along Lake Zurich's Obersee gold coast. Engineered with carbon-neutral geothermal piles, private boat slips, and panoramic floor-to-ceiling glass pavilions.",
      status: "Under Construction",
      location: "Obersee • Zurich Gold Coast, Switzerland",
      heroImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85",
      brochureUrl: "/brochures/obersee-monolith-monograph.pdf",
      startingPrice: 12500000,
      completionDate: "Q4 2026",
      totalUnits: 18,
      availableUnits: 6,
      buildings: {
        create: [
          { name: "Pavilion Alpha", floors: 4, unitsCount: 6 },
          { name: "Pavilion Beta (Lakefront)", floors: 3, unitsCount: 6 },
          { name: "The Sky Monolith", floors: 5, unitsCount: 6 },
        ],
      },
      paymentPlans: {
        create: [
          {
            name: "Sovereign Milestone Structure",
            downPaymentPercent: 20,
            constructionPercent: 50,
            handoverPercent: 30,
            tenureMonths: 24,
          },
        ],
      },
    },
  });

  // 5. Create Properties
  const propertiesData = [
    {
      title: "The Solis Cliffside Brutalist Sanctuary",
      slug: "solis-cliffside-brutalist-sanctuary",
      refNumber: "EST-84920",
      description: "Perched atop pristine granite cliffs overlooking the Pacific, The Solis Sanctuary is a monumental triumph of sculptural concrete, floor-to-ceiling ultra-clear acoustic glazing, and private deep-water mooring. Crafted by Pritzker laureate architects, featuring cantilevered infinity pools, private subterranean gallery vault, and biometric air filtration.",
      propertyType: "Brutalist Villa",
      listingType: ListingType.FOR_SALE,
      status: PropertyStatus.PUBLISHED,
      price: 38500000,
      currency: "USD",
      pricePerSqm: 28102,
      bedrooms: 6,
      bathrooms: 8.5,
      livingRooms: 3,
      kitchenCount: 2,
      floor: 1,
      totalFloors: 3,
      buildingYear: 2024,
      areaSqm: 1370,
      landAreaSqm: 5400,
      parkingSpaces: 6,
      country: "United States",
      city: "Big Sur",
      district: "Pacific Coastline",
      address: "704 Highway 1, Big Sur Reserve, CA",
      latitude: 36.2704,
      longitude: -121.8081,
      postalCode: "93920",
      featured: true,
      verified: true,
      viewsCount: 14200,
      favoritesCount: 384,
      heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_VEasvn44zxHvit6O03KiBxy1S05Jd7GuMERiYJ9dwBkrxs4F3YisKmox9H3PSQNlY7nxr4IwcFHodvlTfndO0sbworx3JiGfdRxUhSMQutkDCEiTdNvn5V_tqAkyW-kqe1IHviRZ9d_0F29H0nf-CEst-3VE8aK8cY7XYGDxo5Oci-67rpRmn5r763WpXYgdz0HFPXhcmnXojt77OihedBvehSSjI45BPokZyX-ZSFbBoOEg37cInw",
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85",
      ],
      amenities: [
        { name: "Cantilevered Infinity Pool", category: "Wellness" },
        { name: "Private Helipad Node", category: "Aviation" },
        { name: "Subterranean Art Vault", category: "Security" },
        { name: "Wine Cave & Tasting Salon", category: "Culinary" },
      ],
    },
    {
      title: "Palais de la Rive Waterfront Estate",
      slug: "palais-de-la-rive-waterfront-estate",
      refNumber: "EST-91042",
      description: "An extraordinary private domain on the golden shores of Lake Geneva with private deep-draft yacht harbor, restored 19th-century salon architecture blended with modern minimalist pavilion extensions, and panoramic views of Mont Blanc.",
      propertyType: "Waterfront Compound",
      listingType: ListingType.FOR_SALE,
      status: PropertyStatus.PUBLISHED,
      price: 52000000,
      currency: "USD",
      pricePerSqm: 32500,
      bedrooms: 8,
      bathrooms: 11,
      livingRooms: 4,
      kitchenCount: 3,
      floor: 1,
      totalFloors: 3,
      buildingYear: 2023,
      areaSqm: 1600,
      landAreaSqm: 12000,
      parkingSpaces: 10,
      country: "Switzerland",
      city: "Geneva",
      district: "Cologny",
      address: "Route de la Capite 118, Cologny, Geneva",
      latitude: 46.2167,
      longitude: 6.1833,
      postalCode: "1223",
      featured: true,
      verified: true,
      viewsCount: 21900,
      favoritesCount: 612,
      heroImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85",
      images: [
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",
      ],
      amenities: [
        { name: "Private Yacht Harbor & Boathouse", category: "Nautical" },
        { name: "Indoor Thermal Swimming Pavilion", category: "Wellness" },
        { name: "Staff Quarters & Security Compound", category: "Operations" },
      ],
    },
    {
      title: "The Sky Pavilion Crown Duplex",
      slug: "the-sky-pavilion-crown-duplex",
      refNumber: "EST-47219",
      description: "Crowning the topmost two levels of an iconic Tribeca cast-iron residential tower, featuring 24-foot soaring ceilings, private 360-degree landscaped wrap-around observatory terrace, private elevator foyer, and bespoke Boffi chef kitchen.",
      propertyType: "Penthouse & Duplex",
      listingType: ListingType.FOR_SALE,
      status: PropertyStatus.PUBLISHED,
      price: 24500000,
      currency: "USD",
      pricePerSqm: 31818,
      bedrooms: 4,
      bathrooms: 5.5,
      livingRooms: 2,
      kitchenCount: 1,
      floor: 58,
      totalFloors: 60,
      buildingYear: 2024,
      areaSqm: 770,
      parkingSpaces: 3,
      country: "United States",
      city: "New York",
      district: "Tribeca",
      address: "56 Leonard Street, Penthouse 58, New York, NY",
      latitude: 40.7176,
      longitude: -74.0069,
      postalCode: "10013",
      featured: true,
      verified: true,
      viewsCount: 18400,
      favoritesCount: 520,
      heroImage: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=85",
      images: [
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85",
      ],
      amenities: [
        { name: "360° Wrap-around Sky Observatory", category: "Views" },
        { name: "Dedicated Private Elevator Access", category: "Access" },
      ],
    },
    {
      title: "Arashiyama Sukiya Bamboo Sanctuary",
      slug: "arashiyama-sukiya-bamboo-sanctuary",
      refNumber: "EST-33018",
      description: "An ultra-rare private retreat secluded within Kyoto's historic Arashiyama district. Blending centuries-old Sukiya-zukuri carpentry with geothermal underfloor heating, natural hot spring onsen, and private stroll garden bordering ancient bamboo groves.",
      propertyType: "Historic Palazzo",
      listingType: ListingType.FOR_SALE,
      status: PropertyStatus.PUBLISHED,
      price: 18800000,
      currency: "USD",
      pricePerSqm: 25753,
      bedrooms: 5,
      bathrooms: 6,
      livingRooms: 2,
      kitchenCount: 1,
      floor: 1,
      totalFloors: 2,
      buildingYear: 2022,
      areaSqm: 730,
      landAreaSqm: 3800,
      parkingSpaces: 4,
      country: "Japan",
      city: "Kyoto",
      district: "Ukyo-ku",
      address: "Sagatenryuji, Ukyo Ward, Kyoto",
      latitude: 35.0163,
      longitude: 135.6713,
      postalCode: "616-8385",
      featured: false,
      verified: true,
      viewsCount: 9800,
      favoritesCount: 310,
      heroImage: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=85",
      images: [
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=85",
      ],
      amenities: [
        { name: "Natural Geothermal Onsen Bath", category: "Wellness" },
        { name: "Traditional Chashitsu Tea Pavilion", category: "Culture" },
      ],
    },
    {
      title: "The Mayfair Sovereign Townhouse",
      slug: "the-mayfair-sovereign-townhouse",
      refNumber: "EST-66129",
      description: "Grade II listed Georgian trophy residence situated on Grosvenor Square. Complete state-of-the-art restorative overhaul including passenger lift to all 6 levels, double-height basement pool and spa, car lift, and private courtyard terrace.",
      propertyType: "Townhouse",
      listingType: ListingType.FOR_SALE,
      status: PropertyStatus.PUBLISHED,
      price: 44000000,
      currency: "USD",
      pricePerSqm: 37931,
      bedrooms: 7,
      bathrooms: 9,
      livingRooms: 4,
      kitchenCount: 2,
      floor: 1,
      totalFloors: 6,
      buildingYear: 2023,
      areaSqm: 1160,
      parkingSpaces: 3,
      country: "United Kingdom",
      city: "London",
      district: "Mayfair",
      address: "24 Grosvenor Square, Mayfair, London",
      latitude: 51.5115,
      longitude: -0.1517,
      postalCode: "W1K 6LG",
      featured: true,
      verified: true,
      viewsCount: 16500,
      favoritesCount: 442,
      heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
      images: [
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85",
      ],
      amenities: [
        { name: "Subterranean 15m Swimming Pool", category: "Wellness" },
        { name: "Automated Hydraulic Car Lift", category: "Automotive" },
      ],
    },
    {
      title: "Alpine Ridge Private Chalet",
      slug: "alpine-ridge-private-chalet",
      refNumber: "EST-11923",
      description: "Ski-in/ski-out architectural masterpiece located on the prestigious Sunnegga slopes of Zermatt, with direct unimpeded views of the iconic Matterhorn. Built from aged alpine larch and Valser quartzite with private wellness spa, ski salon, and outdoor heated pool.",
      propertyType: "Alpine Chalets",
      listingType: ListingType.FOR_SALE,
      status: PropertyStatus.PUBLISHED,
      price: 29000000,
      currency: "USD",
      pricePerSqm: 32954,
      bedrooms: 6,
      bathrooms: 7,
      livingRooms: 2,
      kitchenCount: 1,
      floor: 1,
      totalFloors: 4,
      buildingYear: 2024,
      areaSqm: 880,
      landAreaSqm: 1800,
      parkingSpaces: 4,
      country: "Switzerland",
      city: "Zermatt",
      district: "Sunnegga",
      address: "Riedweg 45, 3920 Zermatt",
      latitude: 46.0207,
      longitude: 7.7491,
      postalCode: "3920",
      featured: false,
      verified: true,
      viewsCount: 13100,
      favoritesCount: 388,
      heroImage: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1600&q=85",
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
      ],
      amenities: [
        { name: "Ski-in / Ski-out Direct Access", category: "Skiing" },
        { name: "Matterhorn Unobstructed Vista", category: "Views" },
      ],
    },
    {
      title: "Villa Bellissima Diplomatic Lakefront Lease",
      slug: "villa-bellissima-diplomatic-lakefront-lease",
      refNumber: "EST-RNT-88120",
      description: "An ultra-exclusive private sanctuary on Lake Lugano available for long-term diplomatic or sovereign family lease. Features private boat dock, manicured Italianate cypress gardens, full staff quarters, panic vault, and biometric perimeter access.",
      propertyType: "Waterfront Compound",
      listingType: ListingType.FOR_RENT,
      status: PropertyStatus.PUBLISHED,
      price: 145000,
      currency: "USD",
      pricePerSqm: 181,
      bedrooms: 6,
      bathrooms: 8,
      livingRooms: 3,
      kitchenCount: 2,
      floor: 1,
      totalFloors: 3,
      buildingYear: 2023,
      areaSqm: 800,
      landAreaSqm: 4500,
      parkingSpaces: 6,
      country: "Switzerland",
      city: "Lugano",
      district: "Castagnola",
      address: "Strada di Gandria 22, 6976 Lugano",
      latitude: 46.0037,
      longitude: 8.9744,
      postalCode: "6976",
      featured: true,
      verified: true,
      viewsCount: 8400,
      favoritesCount: 290,
      heroImage: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=85",
      images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85",
      ],
      amenities: [
        { name: "Private Deep-Water Dock", category: "Nautical" },
        { name: "Security Gatehouse & Staff Annex", category: "Security" },
      ],
    },
    {
      title: "Tribeca Cast-Iron Sky Observatory Lease",
      slug: "tribeca-cast-iron-sky-lease",
      refNumber: "EST-RNT-55410",
      description: "Available for seasonal or multi-year sovereign lease. Landmark duplex loft featuring 22ft ceilings, private 1,800 sq ft sunset terrace overlooking the Hudson River, private keyed elevator, and 24-hour dedicated building security concierge.",
      propertyType: "Penthouse & Duplex",
      listingType: ListingType.FOR_RENT,
      status: PropertyStatus.PUBLISHED,
      price: 95000,
      currency: "USD",
      pricePerSqm: 190,
      bedrooms: 4,
      bathrooms: 4.5,
      livingRooms: 2,
      kitchenCount: 1,
      floor: 12,
      totalFloors: 14,
      buildingYear: 2022,
      areaSqm: 500,
      parkingSpaces: 2,
      country: "United States",
      city: "New York",
      district: "Tribeca",
      address: "140 Franklin Street, New York, NY",
      latitude: 40.7196,
      longitude: -74.0089,
      postalCode: "10013",
      featured: false,
      verified: true,
      viewsCount: 7100,
      favoritesCount: 215,
      heroImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=85",
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=85",
      ],
      amenities: [
        { name: "Keyed Elevator Directly into Salon", category: "Access" },
        { name: "Hudson River Sunset Terrace", category: "Views" },
      ],
    },
    {
      title: "Rue du Rhône Sovereign Banking Gallery HQ",
      slug: "rue-du-rhone-private-banking-hq",
      refNumber: "EST-COM-77210",
      description: "Premier institutional commercial headquarters building situated on Geneva's ultra-prestigious Rue du Rhône. Features 5-level private banking facilities, bulletproof executive meeting boardrooms, secure biometric bullion vaults, and ground-floor private art gallery.",
      propertyType: "Commercial",
      listingType: ListingType.COMMERCIAL_SALE,
      status: PropertyStatus.PUBLISHED,
      price: 38000000,
      currency: "USD",
      pricePerSqm: 27142,
      bedrooms: 0,
      bathrooms: 8,
      livingRooms: 6,
      kitchenCount: 2,
      floor: 1,
      totalFloors: 5,
      buildingYear: 2021,
      areaSqm: 1400,
      parkingSpaces: 8,
      country: "Switzerland",
      city: "Geneva",
      district: "Centre-Ville",
      address: "Rue du Rhône 48, 1204 Geneva",
      latitude: 46.2044,
      longitude: 6.1432,
      postalCode: "1204",
      featured: true,
      verified: true,
      viewsCount: 15400,
      favoritesCount: 380,
      heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
      images: [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85",
      ],
      amenities: [
        { name: "Class-3 Cryptographic Bullion Vault", category: "Security" },
        { name: "Dedicated Private Executive Boardrooms", category: "Corporate" },
      ],
    },
  ];

  for (const p of propertiesData) {
    const createdProp = await prisma.property.create({
      data: {
        title: p.title,
        slug: p.slug,
        refNumber: p.refNumber,
        description: p.description,
        propertyType: p.propertyType,
        listingType: p.listingType,
        status: p.status,
        price: p.price,
        currency: p.currency,
        pricePerSqm: p.pricePerSqm,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        livingRooms: p.livingRooms,
        kitchenCount: p.kitchenCount,
        floor: p.floor,
        totalFloors: p.totalFloors,
        buildingYear: p.buildingYear,
        areaSqm: p.areaSqm,
        landAreaSqm: p.landAreaSqm,
        parkingSpaces: p.parkingSpaces,
        country: p.country,
        city: p.city,
        district: p.district,
        address: p.address,
        latitude: p.latitude,
        longitude: p.longitude,
        postalCode: p.postalCode,
        featured: p.featured,
        verified: p.verified,
        viewsCount: p.viewsCount,
        favoritesCount: p.favoritesCount,
        heroImage: p.heroImage,
        agentId: agentProfile.id,
        agencyId: agency.id,
        images: {
          create: p.images.map((imgUrl, idx) => ({
            url: imgUrl,
            altText: `${p.title} Architecture View ${idx + 1}`,
            isMain: idx === 0,
            order: idx,
          })),
        },
        amenities: {
          create: p.amenities.map((a) => ({
            name: a.name,
            category: a.category,
          })),
        },
      },
    });

    // Create digital escrow closing room for the first property
    if (p.slug === "solis-cliffside-brutalist-sanctuary") {
      await prisma.escrowTransaction.create({
        data: {
          propertyId: createdProp.id,
          buyerName: "Lord Alistair Sterling",
          sellerName: "Solis Trust Limited",
          agentName: "Kenjiro Takahashi",
          totalAmount: 38500000,
          earnestDeposit: 3850000,
          currentStage: EscrowStage.AML_KYC_VERIFIED,
          progressPercent: 45,
          documents: {
            create: [
              { title: "Sovereign Title Deed Search Certificate", status: "NOTARIZED", fileUrl: "/docs/title-deed.pdf" },
              { title: "FINMA / SEC AML Clearances", status: "SIGNED", fileUrl: "/docs/aml-clearance.pdf" },
              { title: "Irrevocable Escrow Purchase Agreement", status: "PENDING_SIGNATURE", fileUrl: "/docs/escrow-agreement.pdf" },
            ],
          },
        },
      });
    }
  }

  // 6. Create CRM Leads
  const leadsData = [
    {
      name: "Baroness Helene von Habsburg",
      email: "h.habsburg@habsburg-capital.at",
      phone: "+43 1 512 8840",
      stage: LeadStage.QUALIFIED,
      score: 96,
      source: "Zurich Private Bank Referral",
      budget: 45000000,
      netWorth: "> $150M",
      notes: "Seeking trophy lakeside residence on Lake Geneva with private yacht dock. AML/KYC pre-cleared by UBS Sovereign Desk.",
    },
    {
      name: "Maximilian Chen",
      email: "m.chen@apex-singapore.sg",
      phone: "+65 6789 1234",
      stage: LeadStage.VIEWING_SCHEDULED,
      score: 92,
      source: "Singapore Family Office Association",
      budget: 28000000,
      netWorth: "> $80M",
      notes: "VIP Helicopter transfer requested for Tribeca Sky Pavilion on Friday.",
    },
    {
      name: "Sheikh Tariq Al-Maktoum",
      email: "tariq.office@maktoum-invest.ae",
      phone: "+971 4 360 9900",
      stage: LeadStage.NEGOTIATION,
      score: 99,
      source: "Direct Sovereign Mandate",
      budget: 65000000,
      netWorth: "> $500M",
      notes: "Formal Letter of Intent submitted for Solis Sanctuary. Title deed escrow underway.",
    },
    {
      name: "Sir James Sterling-Clarke",
      email: "clarke@sterling-partners.co.uk",
      phone: "+44 20 7946 0192",
      stage: LeadStage.OFFER_SUBMITTED,
      score: 94,
      source: "London Private Wealth Forum",
      budget: 48000000,
      netWorth: "> $120M",
      notes: "Terms sheet in final review for Mayfair Townhouse.",
    },
    {
      name: "Dr. Arthur Pendelton",
      email: "pendelton@geneva-biotech.ch",
      phone: "+41 22 700 8812",
      stage: LeadStage.NEW,
      score: 84,
      source: "EstatePro Private Reserve Inquiry",
      budget: 15000000,
      netWorth: "> $40M",
      notes: "Interested in Alpine Ridge Chalet in Zermatt.",
    },
  ];

  for (const l of leadsData) {
    await prisma.lead.create({
      data: {
        ...l,
        assignedAgentId: agentProfile.id,
        activities: {
          create: [
            {
              type: "STAGE_CHANGE",
              note: `Lead progressed to stage ${l.stage}`,
            },
          ],
        },
      },
    });
  }

  // 7. Create Monograph Reports
  await prisma.monographReport.create({
    data: {
      title: "The Architecture of Sovereignty: Capital Flight into Trophy Real Estate",
      slug: "the-architecture-of-sovereignty-capital-flight-trophy-real-estate",
      category: "Capital Intelligence",
      volume: "Volume IV",
      subtitle: "Global Ultra-Prime Real Estate Telemetry & Macro Reallocation 2026",
      summary: "An in-depth empirical audit of cross-border institutional and family office capital reallocations into prime trophy real estate across Switzerland, Tokyo, London, and New York.",
      content: "Over the past 24 months, geopolitical uncertainty and macroeconomic volatility have accelerated the transition of sovereign capital into tangible, unencumbered prime architectural assets. This monograph explores market capitalization trends, yield compression in super-prime residential hubs, and the emergence of private data room closing protocols.",
      coverImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85",
      pdfUrl: "/reports/monograph-volume-4.pdf",
    },
  });

  await prisma.monographReport.create({
    data: {
      title: "Alpine Reserves & Safe-Haven Enclaves: The Zermatt & St. Moritz Report",
      slug: "alpine-reserves-safe-haven-enclaves-zermatt-st-moritz",
      category: "Market Monograph",
      volume: "Volume IV",
      subtitle: "Analyzing Valuations and Strict Lex Koller Regulations in High-Altitude Sanctuaries",
      summary: "Reviewing trophy chalet supply deficits and the unprecedented premium commanded by unobstructed Matterhorn vistas and ski-in/ski-out infrastructure.",
      content: "Supply in top-tier Swiss alpine enclaves remains structurally constrained due to stringent zoning regulations and foreign national purchase caps. Trophy chalets that qualify under primary residence or commercial leisure permits command upwards of 35,000 CHF per square meter.",
      coverImage: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1200&q=85",
      pdfUrl: "/reports/swiss-alpine-report.pdf",
    },
  });

  // 8. Create Appointments & VIP Itinerary
  await prisma.appointment.create({
    data: {
      agentId: agentProfile.id,
      clientName: "Lord Alistair Sterling",
      clientEmail: "a.sterling@sterling-holdings.co.uk",
      clientPhone: "+44 20 7946 0888",
      type: AppointmentType.VIP_AVIATION,
      transferType: "PRIVATE_AVIATION",
      date: new Date(Date.now() + 86400000 * 2),
      timeSlot: "14:00 - 17:30 CET",
      status: AppointmentStatus.CONFIRMED,
      notes: "Private Gulfstream G650 landing at Geneva (GVA) VIP terminal. Chauffeur escort to Palais de la Rive dock.",
    },
  });

  // 9. Create System Audit Log
  await prisma.auditLog.create({
    data: {
      userId: adminUser.id,
      action: "PLATFORM_INITIALIZATION",
      entityType: "SYSTEM",
      entityId: "ROOT",
      details: "EstatePro Private Reserve Database initialized on MySQL port 3305 with sovereign cryptographic telemetry.",
      ipAddress: "127.0.0.1",
    },
  });

  console.log("✅ Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
