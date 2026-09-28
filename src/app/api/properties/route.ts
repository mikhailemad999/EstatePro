import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || searchParams.get("query");
    const city = searchParams.get("city") || searchParams.get("location");
    const propertyType = searchParams.get("propertyType") || searchParams.get("typology");
    const listingType = searchParams.get("listingType");
    const minPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined;
    const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined;
    const bedrooms = searchParams.get("bedrooms") ? Number(searchParams.get("bedrooms")) : undefined;
    const status = searchParams.get("status");
    const sortBy = searchParams.get("sortBy") || "createdAt_desc";

    const where: any = {};

    if (q) {
      where.OR = [
        { title: { contains: q } },
        { description: { contains: q } },
        { city: { contains: q } },
        { district: { contains: q } },
        { country: { contains: q } },
        { refNumber: { contains: q } },
      ];
    }

    if (city && city !== "ALL" && city !== "All Markets") {
      where.city = { contains: city };
    }

    // Handle listingType (FOR_SALE, FOR_RENT, COMMERCIAL_SALE, COMMERCIAL_RENT)
    if (listingType && listingType !== "ALL") {
      const ltUpper = listingType.toUpperCase();
      if (ltUpper === "FOR_SALE") {
        where.listingType = "FOR_SALE";
      } else if (ltUpper === "FOR_RENT") {
        where.listingType = "FOR_RENT";
      } else if (ltUpper.includes("COMMERCIAL")) {
        where.listingType = { in: ["COMMERCIAL_SALE", "COMMERCIAL_RENT"] };
      } else {
        where.listingType = listingType;
      }
    }

    // Handle propertyType / typology
    if (propertyType && propertyType !== "ALL" && propertyType !== "All Typologies") {
      if (propertyType.toLowerCase() === "commercial") {
        where.OR = [
          ...(where.OR || []),
          { propertyType: { contains: "Commercial" } },
          { listingType: "COMMERCIAL_SALE" },
          { listingType: "COMMERCIAL_RENT" },
        ];
      } else {
        where.propertyType = { contains: propertyType };
      }
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    if (bedrooms) {
      where.bedrooms = { gte: bedrooms };
    }

    if (status) {
      where.status = status;
    } else {
      where.status = "PUBLISHED";
    }

    let orderBy: any = { createdAt: "desc" };
    if (sortBy === "price_desc") orderBy = { price: "desc" };
    else if (sortBy === "price_asc") orderBy = { price: "asc" };
    else if (sortBy === "area_desc") orderBy = { areaSqm: "desc" };
    else if (sortBy === "bedrooms_desc") orderBy = { bedrooms: "desc" };

    const properties = await prisma.property.findMany({
      where,
      orderBy,
      include: {
        agent: {
          include: {
            user: true,
          },
        },
        amenities: true,
        images: { orderBy: { order: "asc" } },
      },
    });

    return NextResponse.json({ success: true, count: properties.length, data: properties });
  } catch (error: any) {
    console.error("GET /api/properties error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    let agentId = body.agentId;
    if (!agentId) {
      const defaultAgent = await prisma.agentProfile.findFirst();
      if (defaultAgent) agentId = defaultAgent.id;
    }

    const price = Number(body.price) || 10000000;
    const areaSqm = Number(body.areaSqm) || 500;
    const pricePerSqm = price / areaSqm;

    let baseSlug = (body.slug || body.title || "luxury-estate")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    
    let uniqueSlug = baseSlug;
    let counter = 1;
    while (await prisma.property.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    const refNumber = body.refNumber || `EST-${Math.floor(10000 + Math.random() * 90000)}`;

    const newProperty = await prisma.property.create({
      data: {
        title: body.title || "Trophy Sovereign Estate",
        slug: uniqueSlug,
        refNumber,
        description: body.description || "An ultra-prime architectural landmark estate.",
        propertyType: body.propertyType || "PALATIAL_MANOR",
        listingType: body.listingType || "FOR_SALE",
        price,
        pricePerSqm,
        areaSqm,
        landAreaSqm: body.landAreaSqm ? Number(body.landAreaSqm) : undefined,
        bedrooms: Number(body.bedrooms) || 5,
        bathrooms: Number(body.bathrooms) || 6,
        livingRooms: Number(body.livingRooms) || 3,
        kitchenCount: Number(body.kitchenCount) || 2,
        buildingYear: body.buildingYear ? Number(body.buildingYear) : 2024,
        parkingSpaces: Number(body.parkingSpaces) || 4,
        country: body.country || "United Arab Emirates",
        city: body.city || "Dubai",
        district: body.district || "Palm Jumeirah",
        address: body.address || "Frond G Sovereign Enclave",
        status: body.status || "PUBLISHED",
        heroImage: body.heroImage || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85",
        featured: true,
        verified: true,
        agentId,
      },
    });

    if (Array.isArray(body.amenities) && body.amenities.length > 0) {
      await prisma.propertyAmenity.createMany({
        data: body.amenities.map((name: string) => ({
          propertyId: newProperty.id,
          name,
          category: "LUXURY",
        })),
      });
    }

    await prisma.auditLog.create({
      data: {
        action: "PROPERTY_CREATED",
        entityType: "PROPERTY",
        entityId: newProperty.id,
        details: `Estate [${newProperty.title}] created and cataloged under ref ${newProperty.refNumber}.`,
        ipAddress: "127.0.0.1",
      },
    });

    return NextResponse.json({ success: true, data: newProperty }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/properties error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
