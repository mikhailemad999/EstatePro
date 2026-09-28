import React, { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import PropertiesSearchClient from "@/components/properties/PropertiesSearchClient";

export const revalidate = 0;

export default async function PropertiesPage() {
  const properties = await prisma.property.findMany({
    where: { status: "PUBLISHED" },
    include: {
      images: { orderBy: { order: "asc" } },
      amenities: true,
      agent: {
        include: {
          user: true,
        },
      },
    },
    orderBy: { price: "desc" },
  });

  const formattedProperties = properties.map((p) => ({
    ...p,
    listingType: p.listingType as any,
    status: p.status as any,
    agent: p.agent
      ? {
          id: p.agent.id,
          title: p.agent.title,
          rating: p.agent.rating,
          user: {
            name: p.agent.user.name,
            avatar: p.agent.user.avatar,
          },
        }
      : null,
  }));

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <Suspense
          fallback={
            <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
              <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto" />
              <p className="text-xs font-mono text-secondary">Synchronizing Sovereign Market Listings...</p>
            </div>
          }
        >
          <PropertiesSearchClient initialProperties={formattedProperties} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
