import React from "react";
import { prisma } from "@/lib/prisma";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import MapExplorerClient from "@/components/properties/MapExplorerClient";

export const revalidate = 0;

export default async function MapSearchPage() {
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

  const formatted = properties.map((p) => ({
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
      <main className="flex-1 pt-20 flex flex-col h-[calc(100vh-80px)]">
        <MapExplorerClient initialProperties={formatted} />
      </main>
    </div>
  );
}
