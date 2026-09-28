import React from "react";
import { prisma } from "@/lib/prisma";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import AgenciesDirectoryClient from "@/components/agencies/AgenciesDirectoryClient";

export const revalidate = 0;

export default async function AgenciesPage() {
  const agencies = await prisma.agency.findMany({
    include: {
      agents: {
        include: { user: true },
      },
      properties: true,
    },
    orderBy: { grossVolume: "desc" },
  });

  const formattedAgencies = agencies.map((a) => ({
    id: a.id,
    name: a.name,
    slug: a.slug,
    logo: a.logo,
    country: a.country,
    address: a.address,
    phone: a.phone,
    email: a.email,
    tier: a.tier,
    description: a.description,
    grossVolume: a.grossVolume,
    propertiesCount: a.properties.length,
    agents: a.agents.map((ag) => ({
      id: ag.id,
      title: ag.title,
      user: {
        name: ag.user.name,
        avatar: ag.user.avatar,
      },
    })),
  }));

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border-subtle">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-outline">
                Sovereign Brokerage Hubs
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl text-primary mt-1">
                Institutional Sovereign Agencies
              </h1>
              <p className="text-xs sm:text-sm text-secondary mt-1 font-light max-w-2xl">
                Accredited real estate institutions, global luxury brokerages, and private family office advisory firms.
              </p>
            </div>
            <span className="text-xs font-mono text-status-verified">
              {agencies.length} Global Member Nodes
            </span>
          </div>

          <AgenciesDirectoryClient initialAgencies={formattedAgencies} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
