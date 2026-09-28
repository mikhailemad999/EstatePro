import React from "react";
import { prisma } from "@/lib/prisma";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import AgentsDirectoryClient from "@/components/agents/AgentsDirectoryClient";

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

  const formattedAgents = agents.map((a) => ({
    id: a.id,
    title: a.title,
    licenseNumber: a.licenseNumber,
    grossMandateBook: a.grossMandateBook,
    activeMandates: a.activeMandates,
    rating: a.rating,
    specializations: a.specializations,
    bio: a.user.bio,
    user: {
      name: a.user.name,
      email: a.user.email,
      phone: a.user.phone,
      avatar: a.user.avatar,
    },
    agency: a.agency
      ? {
          name: a.agency.name,
          country: a.agency.country,
        }
      : null,
  }));

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

          <AgentsDirectoryClient initialAgents={formattedAgents} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
