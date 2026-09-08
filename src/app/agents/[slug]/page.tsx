import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import PropertyCard from "@/components/common/PropertyCard";
import Link from "next/link";

export const revalidate = 0;

interface AgentDetailPageProps {
  params: { slug: string };
}

export default async function AgentDetailPage({ params }: AgentDetailPageProps) {
  const agent = await prisma.agentProfile.findFirst({
    where: {
      OR: [{ id: params.slug }, { user: { email: { contains: params.slug } } }],
    },
    include: {
      user: true,
      agency: true,
      properties: {
        where: { status: "PUBLISHED" },
        include: {
          images: { orderBy: { order: "asc" } },
          amenities: true,
        },
      },
    },
  });

  if (!agent) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-outline">
            <Link href="/" className="hover:text-primary transition-colors">EstatePro</Link>
            <span>/</span>
            <Link href="/agents" className="hover:text-primary transition-colors">Brokers</Link>
            <span>/</span>
            <span className="text-secondary">{agent.user.name}</span>
          </div>

          {/* Profile Hero Card */}
          <div className="rounded-2xl bg-surface-card border border-border-subtle p-8 sm:p-10 shadow-2xl space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <img
                  src={agent.user.avatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"}
                  alt={agent.user.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-white/20 shadow-xl"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="font-serif text-2xl sm:text-4xl text-primary font-medium">{agent.user.name}</h1>
                    <span className="material-symbols-outlined text-chart-accent text-[22px]">verified</span>
                  </div>
                  <p className="text-sm text-secondary mt-1">{agent.title}</p>
                  <span className="text-xs uppercase font-mono text-outline block mt-1">
                    {agent.agency?.name || "Sotheby's Sovereign Capital"} • {agent.officeLocation || "Geneva & Tokyo"}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/vip-viewing"
                  className="px-6 py-3 rounded-full bg-primary text-on-primary font-semibold text-xs uppercase tracking-wider hover:bg-primary-container transition-all shadow"
                >
                  Direct Consultation
                </Link>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-border-subtle text-center text-xs">
              <div className="p-3 bg-surface-container rounded-xl">
                <span className="text-[10px] uppercase font-mono text-outline block">Gross Mandate Book</span>
                <span className="font-serif text-2xl text-primary font-medium mt-1 block">
                  ${(agent.grossMandateBook / 1000000).toFixed(1)}M
                </span>
              </div>
              <div className="p-3 bg-surface-container rounded-xl">
                <span className="text-[10px] uppercase font-mono text-outline block">Experience Tenure</span>
                <span className="font-serif text-2xl text-primary font-medium mt-1 block">
                  {agent.experienceYears} Years
                </span>
              </div>
              <div className="p-3 bg-surface-container rounded-xl">
                <span className="text-[10px] uppercase font-mono text-outline block">Client Approval Score</span>
                <span className="font-serif text-2xl text-primary font-medium mt-1 block">
                  {agent.rating} / 5.0
                </span>
              </div>
              <div className="p-3 bg-surface-container rounded-xl">
                <span className="text-[10px] uppercase font-mono text-outline block">Regulatory Node</span>
                <span className="font-mono text-xs text-status-verified font-bold mt-2 block">
                  {agent.licenseNumber || "FINMA-SOV-84920"}
                </span>
              </div>
            </div>
          </div>

          {/* Active Mandates Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl text-primary">Active Sovereign Mandates ({agent.properties.length})</h2>
              <span className="text-xs text-secondary font-mono">100% Exclusive</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agent.properties.map((prop) => (
                <PropertyCard
                  key={prop.id}
                  property={{
                    ...prop,
                    listingType: prop.listingType as any,
                    status: prop.status as any,
                    agent: {
                      id: agent.id,
                      title: agent.title,
                      rating: agent.rating,
                      user: {
                        name: agent.user.name,
                        avatar: agent.user.avatar,
                      },
                    },
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
