import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import PropertyCard from "@/components/common/PropertyCard";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

export const revalidate = 0;

interface AgencyDetailPageProps {
  params: { slug: string };
}

export default async function AgencyDetailPage({ params }: AgencyDetailPageProps) {
  const agency = await prisma.agency.findFirst({
    where: {
      OR: [{ slug: params.slug }, { id: params.slug }],
    },
    include: {
      agents: {
        include: { user: true },
      },
      properties: {
        where: { status: "PUBLISHED" },
        include: {
          amenities: true,
          agent: {
            include: { user: true },
          },
        },
      },
    },
  });

  if (!agency) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {/* Cover Header */}
        <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-surface-container-lowest">
          <img
            src={agency.coverImage || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85"}
            alt={agency.name}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent"></div>

          <div className="absolute bottom-6 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-surface-card border border-border-hairline p-2 shadow-2xl flex items-center justify-center">
                <img
                  src={agency.logo || "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=200&q=80"}
                  alt={agency.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-status-verified/20 text-status-verified text-[10px] font-mono uppercase font-bold tracking-wider border border-status-verified/30">
                    {agency.tier || "Sovereign Member Node"}
                  </span>
                  <span className="text-xs font-mono text-outline">{agency.country}</span>
                </div>
                <h1 className="font-serif text-2xl sm:text-4xl text-primary font-medium mt-1">
                  {agency.name}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/agents"
                className="px-5 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-semibold uppercase tracking-wider hover:bg-primary-container transition-all shadow"
              >
                Inquire With Agency
              </Link>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
          {/* Overview & Credentials Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-serif text-xl text-primary">Institutional Mandate Profile</h3>
              <p className="text-sm text-secondary font-light leading-relaxed">
                {agency.description ||
                  "Premier global advisory for trophy architectural acquisitions, heritage palazzos, and sovereign private islands."}
              </p>
              <div className="pt-4 border-t border-border-subtle grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                <div>
                  <span className="text-outline block uppercase text-[10px]">Headquarters</span>
                  <span className="text-primary">{agency.address || "Rue du Rhône 42, Geneva"}</span>
                </div>
                <div>
                  <span className="text-outline block uppercase text-[10px]">Encrypted Contact</span>
                  <span className="text-primary">{agency.email || "sovereign@reserve.ch"}</span>
                </div>
                <div>
                  <span className="text-outline block uppercase text-[10px]">Direct Wire</span>
                  <span className="text-primary">{agency.phone || "+41 22 700 9000"}</span>
                </div>
              </div>
            </div>

            {/* Key Stats Card */}
            <div className="p-6 rounded-2xl bg-surface-card border border-border-subtle space-y-4 shadow-xl">
              <h4 className="font-serif text-sm text-primary uppercase tracking-wider">Custody &amp; Mandate Volume</h4>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between py-2 border-b border-border-subtle">
                  <span className="text-secondary">Gross Transaction Vol</span>
                  <span className="text-primary font-bold">{formatCurrency(agency.grossVolume)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border-subtle">
                  <span className="text-secondary">Licensed Advisors</span>
                  <span className="text-primary font-bold">{agency.agents.length} Partners</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-secondary">Active Mandates</span>
                  <span className="text-primary font-bold">{agency.properties.length} Estates</span>
                </div>
              </div>
            </div>
          </div>

          {/* Active Partners / Agents */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
              <h3 className="font-serif text-xl sm:text-2xl text-primary">Senior Private Advisors</h3>
              <span className="text-xs font-mono text-secondary">{agency.agents.length} Accredited Partners</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {agency.agents.map((agent) => (
                <Link
                  key={agent.id}
                  href={`/agents/${agent.id}`}
                  className="p-6 rounded-2xl bg-surface-card border border-border-subtle hover:border-outline-variant transition-all space-y-4 group block shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={agent.user.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"}
                      alt={agent.user.name}
                      className="w-14 h-14 rounded-full object-cover border border-white/10"
                    />
                    <div>
                      <h4 className="font-serif text-base text-primary font-medium group-hover:text-chart-accent transition-colors">
                        {agent.user.name}
                      </h4>
                      <p className="text-xs text-secondary">{agent.title}</p>
                      <span className="text-[10px] font-mono text-status-verified block mt-0.5">
                        ★ {agent.rating.toFixed(2)} • {agent.experienceYears} yrs experience
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Active Property Portfolio */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
              <h3 className="font-serif text-xl sm:text-2xl text-primary">Active Landmark Mandates</h3>
              <span className="text-xs font-mono text-secondary">{agency.properties.length} Curated Estates</span>
            </div>

            {agency.properties.length === 0 ? (
              <p className="text-xs text-secondary py-8 text-center">No active public mandates currently cataloged for this agency.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {agency.properties.map((prop) => (
                  <PropertyCard key={prop.id} property={prop as any} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
