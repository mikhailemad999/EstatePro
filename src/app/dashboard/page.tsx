import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import BuyerSidebar from "@/components/dashboards/BuyerSidebar";
import PropertyCard from "@/components/common/PropertyCard";
import RoleSwitcher from "@/components/common/RoleSwitcher";
import { formatCurrency } from "@/lib/utils";

export const revalidate = 0;

export default async function BuyerDashboardPage() {
  const properties = await prisma.property.findMany({
    where: { status: "PUBLISHED" },
    include: {
      images: { orderBy: { order: "asc" } },
      amenities: true,
      agent: { include: { user: true } },
    },
    take: 3,
  });

  const appointments = await prisma.appointment.findMany({
    orderBy: { date: "asc" },
  });

  const escrow = await prisma.escrowTransaction.findFirst({
    include: { property: true, documents: true },
  });

  return (
    <div className="min-h-screen bg-surface flex">
      <BuyerSidebar />
      <div className="flex-1 md:pl-72 flex flex-col min-w-0">
        <header className="h-20 bg-surface/80 backdrop-blur-xl border-b border-border-subtle px-6 sm:px-8 flex items-center justify-between gap-4 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <Link href="/" className="md:hidden text-primary font-bold font-serif text-lg">
              EP
            </Link>
            <div className="flex items-center gap-2 text-xs font-mono text-outline">
              <span>FAMILY OFFICE INVESTOR VAULT</span>
              <span>•</span>
              <span className="text-status-verified font-bold">SOVEREIGN ALLOCATION</span>
            </div>
          </div>
          <RoleSwitcher />
        </header>

        <main className="flex-1 p-6 sm:p-8 space-y-8 max-w-7xl">
          {/* Welcome Header */}
          <div className="space-y-1.5 pb-2">
            <span className="text-[10px] uppercase font-mono tracking-widest text-secondary">
              Sterling Family Office • Mandate #SFO-2026
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-primary font-normal">
              Private Investor Vault • Lord Alistair Sterling
            </h1>
            <p className="text-xs text-secondary font-light">
              Overview of vaulted watchlists, scheduled private aviation viewings, and digital escrow closings.
            </p>
          </div>

          {/* 4 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 rounded-xl bg-surface-card border border-border-subtle space-y-2">
              <span className="text-[10px] uppercase font-mono text-outline block">Watchlist Asset Value</span>
              <div className="font-serif text-3xl text-primary font-medium">$115.0M</div>
              <span className="text-[11px] text-secondary">3 Shortlisted Trophy Estates</span>
            </div>

            <div className="p-6 rounded-xl bg-surface-card border border-border-subtle space-y-2">
              <span className="text-[10px] uppercase font-mono text-outline block">Escrow In Progress</span>
              <div className="font-serif text-3xl text-primary font-medium">1 Active</div>
              <span className="text-[11px] text-status-verified font-mono">Stage: Title Clearance</span>
            </div>

            <div className="p-6 rounded-xl bg-surface-card border border-border-subtle space-y-2">
              <span className="text-[10px] uppercase font-mono text-outline block">VIP Viewing Flights</span>
              <div className="font-serif text-3xl text-primary font-medium">{appointments.length} Scheduled</div>
              <span className="text-[11px] text-chart-accent">Gulfstream G650 Cleared</span>
            </div>

            <div className="p-6 rounded-xl bg-surface-card border border-border-subtle space-y-2">
              <span className="text-[10px] uppercase font-mono text-outline block">Financing Pre-Approval</span>
              <div className="font-serif text-3xl text-status-verified font-medium">$50.0M</div>
              <span className="text-[11px] text-secondary">UBS Prime Structured Facility</span>
            </div>
          </div>

          {/* Active Escrow Closing Banner */}
          {escrow && (
            <div className="rounded-2xl bg-surface-card border border-primary/30 p-6 sm:p-8 space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-status-verified animate-ping"></span>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-status-verified font-bold">
                      Active Multi-Sig Escrow Closing
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-primary">{escrow.property.title}</h3>
                  <p className="text-xs text-secondary">
                    Total: {formatCurrency(escrow.totalAmount)} • Earnest Deposit: {formatCurrency(escrow.earnestDeposit)} Vaulted
                  </p>
                </div>

                <Link
                  href="/escrow/solis-sanctuary"
                  className="px-6 py-3 rounded-full bg-primary text-on-primary text-xs uppercase font-semibold tracking-wider hover:bg-primary-container transition-all shadow"
                >
                  Enter Escrow Data Room →
                </Link>
              </div>
            </div>
          )}

          {/* Watchlist Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl text-primary">Private Shortlisted Watchlist</h2>
              <Link href="/properties" className="text-xs text-chart-accent hover:underline font-semibold">
                Explore More Properties →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          </div>
        </main>
      </div>
    </div>
  );
}
