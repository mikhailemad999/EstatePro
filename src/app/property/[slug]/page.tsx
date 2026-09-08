import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import PropertyDetailsClient from "@/components/property/PropertyDetailsClient";

export const revalidate = 0;

interface PropertyDetailPageProps {
  params: { slug: string };
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const property = await prisma.property.findFirst({
    where: {
      OR: [
        { slug: params.slug },
        { refNumber: params.slug },
        { id: params.slug },
      ],
    },
    include: {
      images: { orderBy: { order: "asc" } },
      amenities: true,
      agent: {
        include: {
          user: true,
          agency: true,
        },
      },
    },
  });

  if (!property) {
    notFound();
  }

  const similarProperties = await prisma.property.findMany({
    where: {
      id: { not: property.id },
      status: "PUBLISHED",
    },
    take: 3,
    include: {
      images: { orderBy: { order: "asc" } },
    },
  });

  const formattedProp = {
    ...property,
    listingType: property.listingType as any,
    status: property.status as any,
    agent: property.agent
      ? {
          id: property.agent.id,
          title: property.agent.title,
          licenseNumber: property.agent.licenseNumber,
          rating: property.agent.rating,
          reviewCount: property.agent.reviewCount,
          user: {
            name: property.agent.user.name,
            phone: property.agent.user.phone,
            email: property.agent.user.email,
            avatar: property.agent.user.avatar,
          },
          agency: property.agent.agency
            ? {
                name: property.agent.agency.name,
              }
            : null,
        }
      : null,
  };

  const formattedSimilar = similarProperties.map((p) => ({
    ...p,
    listingType: p.listingType as any,
    status: p.status as any,
  }));

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <PropertyDetailsClient property={formattedProp} similarProperties={formattedSimilar} />
      </main>
      <Footer />
    </div>
  );
}
