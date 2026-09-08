import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import PropertyCard from "@/components/common/PropertyCard";
import HeroSearch from "@/components/home/HeroSearch";
import MortgagePreview from "@/components/home/MortgagePreview";

export const revalidate = 0; // Dynamic data

export default async function HomePage() {
  // Fetch real seeded data from MySQL on port 3305
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
    take: 6,
    orderBy: { price: "desc" },
  });

  const agents = await prisma.agentProfile.findMany({
    include: { user: true, agency: true },
    take: 3,
  });

  const monographs = await prisma.monographReport.findMany({
    take: 2,
    orderBy: { publishedAt: "desc" },
  });

  const development = await prisma.developmentProject.findFirst({
    include: { developer: true },
  });

  return (
    <div className="w-full min-h-screen bg-surface flex flex-col">
      <Header />

      <main className="w-full pt-20 flex-1">
        {/* 1. Architectural Hero Banner */}
        <section className="relative w-full -mt-20 pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden">
          {/* Ambient Scrim & Architectural Background */}
          <div className="absolute inset-0 z-0">
            <div
              className="w-full h-full bg-cover bg-center transform scale-105 transition-transform duration-1000 ease-out"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD_VEasvn44zxHvit6O03KiBxy1S05Jd7GuMERiYJ9dwBkrxs4F3YisKmox9H3PSQNlY7nxr4IwcFHodvlTfndO0sbworx3JiGfdRxUhSMQutkDCEiTdNvn5V_tqAkyW-kqe1IHviRZ9d_0F29H0nf-CEst-3VE8aK8cY7XYGDxo5Oci-67rpRmn5r763WpXYgdz0HFPXhcmnXojt77OihedBvehSSjI45BPokZyX-ZSFbBoOEg37cInw')",
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-surface-lowest/90 via-surface/80 to-surface"></div>
            <div className="absolute inset-0 bg-radial from-transparent via-surface/40 to-surface-lowest"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
            {/* Monograph Overline */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-white/20"></span>
              <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-secondary">
                Volume IV • Sovereign Private Reserve Collection
              </span>
              <span className="w-8 h-px bg-white/20"></span>
            </div>

            {/* Hero Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-primary max-w-5xl tracking-tight leading-[1.1] mb-6 font-normal">
              Curated Architectural Living &amp; Prime Real Estate
            </h1>

            <p className="text-sm sm:text-lg text-secondary max-w-2xl font-light mb-10 leading-relaxed">
              Explore iconic private residences, penthouse sanctuaries, and premier commercial holdings across the world's most coveted destinations.
            </p>

            {/* Search Bar Widget */}
            <HeroSearch />
          </div>
        </section>

        {/* 2. Real-Time Prime Market Pulse */}
        <section className="w-full py-12 bg-surface-container-lowest border-y border-white/[0.04]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-outline">
                  Global Capital Telemetry
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-primary mt-1">
                  Real-Time Prime Market Pulse
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs text-status-verified font-mono">
                <span className="w-2 h-2 rounded-full bg-status-verified animate-ping"></span>
                <span>FINMA / SEC SYNCHRONIZED FEED</span>
              </div>
            </div>

            {/* 4 Stat Telemetry Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-xl bg-surface-card border border-border-subtle shadow-sm flex flex-col justify-between">
                <span className="text-[10px] uppercase font-mono text-outline">Global Prime Index</span>
                <div className="my-2">
                  <span className="font-serif text-3xl text-primary">+14.2%</span>
                  <span className="text-xs text-status-verified ml-2 font-medium">YoY Expansion</span>
                </div>
                <span className="text-xs text-secondary">128 Verified Sovereign Nodes</span>
              </div>

              <div className="p-5 rounded-xl bg-surface-card border border-border-subtle shadow-sm flex flex-col justify-between">
                <span className="text-[10px] uppercase font-mono text-outline">Super-Prime PSQM</span>
                <div className="my-2">
                  <span className="font-serif text-3xl text-primary">$31,800</span>
                  <span className="text-xs text-secondary ml-1">/ m² avg</span>
                </div>
                <span className="text-xs text-secondary">Geneva • Tokyo • Tribeca • Mayfair</span>
              </div>

              <div className="p-5 rounded-xl bg-surface-card border border-border-subtle shadow-sm flex flex-col justify-between">
                <span className="text-[10px] uppercase font-mono text-outline">Total Escrow Vault Book</span>
                <div className="my-2">
                  <span className="font-serif text-3xl text-primary">$1.42B</span>
                  <span className="text-xs text-chart-accent ml-2 font-medium">Under Custody</span>
                </div>
                <span className="text-xs text-secondary">99.4% Settlement Reliability</span>
              </div>

              <div className="p-5 rounded-xl bg-surface-card border border-border-subtle shadow-sm flex flex-col justify-between">
                <span className="text-[10px] uppercase font-mono text-outline">Private Client Liquidity</span>
                <div className="my-2">
                  <span className="font-serif text-3xl text-primary">&gt; $85M</span>
                  <span className="text-xs text-secondary ml-1">Avg Lead Net Worth</span>
                </div>
                <span className="text-xs text-secondary">100% KYC / AML Pre-Cleared</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Curated Trophy Portfolios (Featured Properties) */}
        <section className="w-full py-20 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-outline">
                  Curated Sanctuaries
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-primary mt-1">
                  Featured Sovereign Residences
                </h2>
                <p className="text-xs sm:text-sm text-secondary mt-1 font-light max-w-xl">
                  Each residence is inspected, authenticated, and held under sovereign mandate.
                </p>
              </div>

              <Link
                href="/properties"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-primary hover:text-secondary-fixed transition-colors font-semibold"
              >
                <span>View All Properties ({properties.length})</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

            <div className="mt-12 text-center">
              <Link
                href="/properties"
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-primary text-on-primary font-semibold text-xs uppercase tracking-wider hover:bg-primary-container transition-all shadow-xl hover:-translate-y-0.5"
              >
                <span>Explore Split Map &amp; Full Search</span>
                <span className="material-symbols-outlined text-[18px]">map</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 4. Landmark Architectural Development Masterplan Spotlight */}
        {development && (
          <section className="w-full py-20 bg-surface-container-lowest border-y border-white/[0.04]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                {/* Media Column */}
                <div className="lg:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden bg-surface-card border border-border-subtle shadow-2xl group">
                  <img
                    src={development.heroImage || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85"}
                    alt={development.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                    <div>
                      <span className="px-2.5 py-1 rounded bg-surface-container-high/90 text-[10px] font-mono uppercase tracking-widest text-primary border border-white/10">
                        {development.status}
                      </span>
                      <h3 className="font-serif text-2xl text-primary mt-2">{development.title}</h3>
                      <p className="text-xs text-secondary mt-0.5">{development.location}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-mono text-outline block">Remaining</span>
                      <span className="font-serif text-xl text-primary font-medium">{development.availableUnits} / {development.totalUnits} Units</span>
                    </div>
                  </div>
                </div>

                {/* Content Column */}
                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-outline tracking-widest">
                      Landmark Masterplan Spotlight
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-primary mt-1">
                      {development.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-secondary mt-3 leading-relaxed font-light">
                      {development.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 rounded-lg bg-surface-card border border-border-subtle">
                      <span className="text-[10px] uppercase font-mono text-outline block">Starting Asset Floor</span>
                      <span className="font-serif text-lg text-primary mt-1 block">From $12.5M</span>
                    </div>
                    <div className="p-3.5 rounded-lg bg-surface-card border border-border-subtle">
                      <span className="text-[10px] uppercase font-mono text-outline block">Completion Handover</span>
                      <span className="font-serif text-lg text-primary mt-1 block">Q4 2026</span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <Link
                      href={`/developments/${development.slug}`}
                      className="px-6 py-3 rounded-full bg-primary text-on-primary font-semibold text-xs uppercase tracking-wider hover:bg-primary-container transition-all shadow"
                    >
                      Inspect Masterplan &amp; Units
                    </Link>
                    <Link
                      href="/developments"
                      className="px-5 py-3 rounded-full border border-border-hairline text-secondary hover:text-primary transition-colors text-xs uppercase tracking-wider"
                    >
                      All Developments
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 5. Verified Sovereign Private Advisors (Agents) */}
        <section className="w-full py-20 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-outline">
                  Sovereign Advisory Guild
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-primary mt-1">
                  Private Advisors &amp; Partners
                </h2>
                <p className="text-xs sm:text-sm text-secondary mt-1 font-light">
                  Direct access to licensed private partners managing cross-border family office mandates.
                </p>
              </div>

              <Link
                href="/agents"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-primary hover:text-secondary-fixed font-semibold"
              >
                <span>Directory Roster</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  className="rounded-xl bg-surface-card border border-border-subtle p-6 flex flex-col justify-between space-y-6 group hover:border-outline-variant transition-all duration-300 shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={agent.user.avatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"}
                      alt={agent.user.name}
                      className="w-16 h-16 rounded-full object-cover border border-white/10 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-serif text-base text-primary font-medium">{agent.user.name}</h4>
                        <span className="material-symbols-outlined text-chart-accent text-[16px]">verified</span>
                      </div>
                      <p className="text-xs text-secondary leading-snug mt-0.5">{agent.title}</p>
                      <span className="text-[10px] font-mono uppercase text-outline mt-1 block">
                        {agent.agency?.name || "Sovereign Guild"}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border-subtle grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-surface-container/60 p-2 rounded">
                      <span className="text-[9px] uppercase font-mono text-outline block">Mandate Book</span>
                      <span className="font-semibold text-primary font-serif text-sm">
                        ${(agent.grossMandateBook / 1000000).toFixed(1)}M
                      </span>
                    </div>
                    <div className="bg-surface-container/60 p-2 rounded">
                      <span className="text-[9px] uppercase font-mono text-outline block">Client Score</span>
                      <span className="font-semibold text-primary font-serif text-sm">
                        {agent.rating} / 5.0 ({agent.reviewCount})
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/agents`}
                    className="w-full py-2.5 rounded-lg border border-border-hairline text-secondary hover:text-primary hover:bg-surface-container text-center text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    Consult Advisor
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Private Wealth Mortgage Calculator Preview */}
        <section className="w-full py-16 bg-surface-container-lowest border-y border-white/[0.04]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MortgagePreview />
          </div>
        </section>

        {/* 7. Prime Market Intelligence & Monographs */}
        <section className="w-full py-20 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-outline">
                  Editorial &amp; Research
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-primary mt-1">
                  Prime Market Intelligence
                </h2>
                <p className="text-xs sm:text-sm text-secondary mt-1 font-light">
                  Quarterly research monographs analyzing macro liquidity and trophy valuations.
                </p>
              </div>

              <Link
                href="/reports"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-primary hover:text-secondary-fixed font-semibold"
              >
                <span>Read All Monographs</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {monographs.map((mono) => (
                <div
                  key={mono.id}
                  className="rounded-xl bg-surface-card border border-border-subtle overflow-hidden flex flex-col md:flex-row group hover:border-outline-variant transition-all duration-300 shadow-lg"
                >
                  <div className="md:w-2/5 aspect-[4/3] md:aspect-auto overflow-hidden bg-surface-container relative">
                    <img
                      src={mono.coverImage || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80"}
                      alt={mono.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6 md:w-3/5 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-[10px] font-mono uppercase text-outline">
                        <span>{mono.volume}</span>
                        <span>•</span>
                        <span className="text-chart-accent">{mono.category}</span>
                      </div>
                      <h3 className="font-serif text-lg sm:text-xl text-primary mt-1 line-clamp-2 leading-snug">
                        {mono.title}
                      </h3>
                      <p className="text-xs text-secondary mt-2 line-clamp-3 font-light leading-relaxed">
                        {mono.summary}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border-subtle text-xs">
                      <span className="text-outline">{mono.publishedAt.toISOString().split("T")[0]}</span>
                      <Link
                        href={`/reports/${mono.slug}`}
                        className="text-primary font-semibold hover:underline flex items-center gap-1"
                      >
                        <span>Examine Report</span>
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
