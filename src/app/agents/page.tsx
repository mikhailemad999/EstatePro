import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export const revalidate = 0;

export default async function AgentsPage() {
  const agents = await prisma.agentProfile.findMany({
    include: {
      user: true,
      agency: true,
      properties: { take: 2 },
    },
    orderBy: { grossMandateBook: "desc" },
  });

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border-subtle">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-outline">
                Sovereign Partner Directory
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl text-primary mt-1">
                Verified Sovereign Private Advisors
              </h1>
              <p className="text-xs sm:text-sm text-secondary mt-1 font-light max-w-2xl">
                Accredited senior managing partners and luxury brokerage leads representing institutional family office acquisitions.
              </p>
            </div>
            <span className="text-xs font-mono text-status-verified">
              {agents.length} Verified Sovereign Nodes
            </span>
          </div>

          {/* Roster Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="rounded-2xl bg-surface-card border border-border-subtle p-6 flex flex-col justify-between space-y-6 hover:border-outline-variant transition-all duration-300 shadow-xl"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={agent.user.avatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"}
                    alt={agent.user.name}
                    className="w-20 h-20 rounded-full object-cover border border-white/10 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-serif text-lg text-primary font-medium">{agent.user.name}</h3>
                      <span className="material-symbols-outlined text-chart-accent text-[18px]">verified</span>
                    </div>
                    <p className="text-xs text-secondary leading-snug mt-0.5">{agent.title}</p>
                    <span className="text-[10px] uppercase font-mono text-outline block mt-1">
                      {agent.agency?.name || "Sovereign Guild Partner"}
                    </span>
                    <span className="text-[10px] font-mono text-status-verified block mt-0.5">
                      {agent.licenseNumber || "FINMA-SOV-84920"}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-border-subtle text-xs">
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-surface-container p-2.5 rounded-lg">
                      <span className="text-[9px] uppercase font-mono text-outline block">Gross Mandate</span>
                      <span className="font-serif text-base text-primary font-medium">
                        ${(agent.grossMandateBook / 1000000).toFixed(1)}M
                      </span>
                    </div>
                    <div className="bg-surface-container p-2.5 rounded-lg">
                      <span className="text-[9px] uppercase font-mono text-outline block">Active Mandates</span>
                      <span className="font-serif text-base text-primary font-medium">
                        {agent.activeMandates} Portfolios
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-secondary font-light">
                    Specializations: {agent.specializations || "Cross-Border Trophy Acquisitions, High-Altitude Chalets, Offshore Trusts"}
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <Link
                    href={`/agents/${agent.id}`}
                    className="w-full py-2.5 rounded-lg bg-primary text-on-primary text-xs font-semibold uppercase tracking-wider block text-center hover:bg-primary-container transition-all shadow"
                  >
                    View Partner Monograph
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
