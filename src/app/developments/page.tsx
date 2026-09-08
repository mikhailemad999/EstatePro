import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { formatCurrency } from "@/lib/utils";

export const revalidate = 0;

export default async function DevelopmentsPage() {
  const developments = await prisma.developmentProject.findMany({
    include: {
      developer: true,
      buildings: true,
    },
    orderBy: { createdAt: "desc" },
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
                Masterplan Development Portfolio
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary mt-1">
                Landmark Architectural Masterplans
              </h1>
              <p className="text-xs sm:text-sm text-secondary mt-1 font-light max-w-2xl">
                Curated residential developments, waterfront enclaves, and private island masterplans available for private reservation.
              </p>
            </div>
            <span className="text-xs font-mono text-status-verified">
              {developments.length} Active Masterplans
            </span>
          </div>

          {/* Development Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {developments.map((dev) => (
              <div
                key={dev.id}
                className="group rounded-2xl bg-surface-card border border-border-subtle overflow-hidden flex flex-col justify-between hover:border-outline-variant transition-all duration-300 shadow-xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
                  <img
                    src={dev.heroImage || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80"}
                    alt={dev.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-lowest/80 via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-surface-container-high/90 text-[10px] uppercase font-mono tracking-widest text-primary border border-white/10">
                      {dev.status}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <h3 className="font-serif text-2xl text-primary">{dev.title}</h3>
                      <p className="text-xs text-secondary mt-0.5">{dev.location}</p>
                    </div>
                    <span className="font-serif text-xl text-primary font-medium">
                      From {formatCurrency(dev.startingPrice)}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  <p className="text-xs text-secondary font-light line-clamp-3 leading-relaxed">
                    {dev.description}
                  </p>

                  <div className="grid grid-cols-3 gap-3 text-center text-xs pt-3 border-t border-border-subtle">
                    <div className="bg-surface-container p-2 rounded">
                      <span className="text-[9px] uppercase font-mono text-outline block">Total Units</span>
                      <span className="font-semibold text-primary">{dev.totalUnits} Units</span>
                    </div>
                    <div className="bg-surface-container p-2 rounded">
                      <span className="text-[9px] uppercase font-mono text-outline block">Available</span>
                      <span className="font-semibold text-status-verified">{dev.availableUnits} Remaining</span>
                    </div>
                    <div className="bg-surface-container p-2 rounded">
                      <span className="text-[9px] uppercase font-mono text-outline block">Completion</span>
                      <span className="font-semibold text-primary">{dev.completionDate || "Q4 2026"}</span>
                    </div>
                  </div>

                  <Link
                    href={`/developments/${dev.slug}`}
                    className="w-full py-3 rounded-lg bg-primary text-on-primary text-xs font-semibold uppercase tracking-wider block text-center hover:bg-primary-container transition-all shadow"
                  >
                    Inspect Masterplan &amp; Unit Availability →
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
