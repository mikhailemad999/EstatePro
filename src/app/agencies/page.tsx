import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

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
              84 Global Member Nodes
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {agencies.map((agency) => (
              <div
                key={agency.id}
                className="rounded-2xl bg-surface-card border border-border-subtle p-8 flex flex-col justify-between space-y-6 hover:border-outline-variant transition-all duration-300 shadow-xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-status-verified/15 text-status-verified text-[10px] font-mono uppercase font-bold tracking-wider">
                      {agency.tier || "Sovereign Member"}
                    </span>
                    <span className="text-xs text-secondary font-mono">{agency.country}</span>
                  </div>

                  <h3 className="font-serif text-2xl text-primary font-medium">{agency.name}</h3>
                  <p className="text-xs text-secondary font-light leading-relaxed">
                    {agency.description || "Premier global advisory for trophy architectural acquisitions, heritage palazzos, and sovereign private islands."}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center text-xs pt-4 border-t border-border-subtle">
                  <div className="bg-surface-container p-2.5 rounded-lg">
                    <span className="text-[9px] uppercase font-mono text-outline block">Total Volume</span>
                    <span className="font-serif text-base text-primary font-medium">
                      ${(agency.grossVolume / 1000000).toFixed(0)}M
                    </span>
                  </div>
                  <div className="bg-surface-container p-2.5 rounded-lg">
                    <span className="text-[9px] uppercase font-mono text-outline block">Private Advisors</span>
                    <span className="font-serif text-base text-primary font-medium">
                      {agency.agents.length} Partners
                    </span>
                  </div>
                  <div className="bg-surface-container p-2.5 rounded-lg">
                    <span className="text-[9px] uppercase font-mono text-outline block">Mandate Listings</span>
                    <span className="font-serif text-base text-primary font-medium">
                      {agency.properties.length} Estates
                    </span>
                  </div>
                </div>

                <Link
                  href={`/agencies/${agency.slug}`}
                  className="w-full py-2.5 rounded-lg bg-primary text-on-primary text-xs font-semibold uppercase tracking-wider block text-center hover:bg-primary-container transition-all shadow"
                >
                  Inspect Agency Portfolio &amp; Advisors
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
