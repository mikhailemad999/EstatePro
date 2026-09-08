import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import BuyerSidebar from "@/components/dashboards/BuyerSidebar";
import PropertyCard from "@/components/common/PropertyCard";
import RoleSwitcher from "@/components/common/RoleSwitcher";

export const revalidate = 0;

export default async function SavedPropertiesPage() {
  const properties = await prisma.property.findMany({
    where: { status: "PUBLISHED" },
    include: {
      images: { orderBy: { order: "asc" } },
      amenities: true,
      agent: { include: { user: true } },
    },
    take: 6,
  });

  return (
    <div className="min-h-screen bg-surface flex">
      <BuyerSidebar />
      <div className="flex-1 md:pl-72 flex flex-col min-w-0">
        <header className="h-20 bg-surface/80 backdrop-blur-xl border-b border-border-subtle px-6 sm:px-8 flex items-center justify-between gap-4 sticky top-0 z-40">
          <div className="flex items-center gap-2 text-xs font-mono text-outline">
            <span>SAVED WATCHLIST</span>
            <span>•</span>
            <span className="text-primary font-bold">SOVEREIGN PRIVATE ASSETS ({properties.length})</span>
          </div>
          <RoleSwitcher />
        </header>

        <main className="flex-1 p-6 sm:p-8 space-y-6 max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl text-primary font-normal">
                Vaulted Real Estate Watchlist
              </h1>
              <p className="text-xs text-secondary font-light">
                Private saved portfolios and notified price-action alerts.
              </p>
            </div>
            <Link
              href="/compare"
              className="px-5 py-2.5 rounded-full bg-primary text-on-primary text-xs uppercase font-semibold tracking-wider hover:bg-primary-container transition-all shadow"
            >
              Open Comparison Matrix
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={{
                  ...prop,
                  listingType: prop.listingType as any,
                  status: prop.status as any,
                  agent: prop.agent
                    ? {
                        id: prop.agent.id,
                        title: prop.agent.title,
                        rating: prop.agent.rating,
                        user: {
                          name: prop.agent.user.name,
                          avatar: prop.agent.user.avatar,
                        },
                      }
                    : null,
                }}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
