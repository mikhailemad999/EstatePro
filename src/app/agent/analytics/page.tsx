import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AgentSidebar from "@/components/dashboards/AgentSidebar";
import RoleSwitcher from "@/components/common/RoleSwitcher";
import { formatCurrency } from "@/lib/utils";

export const revalidate = 0;

export default async function AgentAnalyticsPage() {
  const properties = await prisma.property.findMany({
    orderBy: { viewsCount: "desc" },
    take: 5,
  });

  const leads = await prisma.lead.findMany({
    orderBy: { budget: "desc" },
  });

  const totalViews = properties.reduce((acc, p) => acc + p.viewsCount, 0);
  const totalFavorites = properties.reduce((acc, p) => acc + p.favoritesCount, 0);
  const totalPipeline = leads.reduce((acc, l) => acc + l.budget, 0);

  return (
    <div className="min-h-screen bg-surface flex">
      <AgentSidebar />
      <div className="flex-1 md:pl-72 flex flex-col min-w-0">
        <header className="h-20 bg-surface/80 backdrop-blur-xl border-b border-border-subtle px-6 sm:px-8 flex items-center justify-between gap-4 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <Link href="/" className="md:hidden text-primary font-bold font-serif text-lg">
              EP
            </Link>
            <div className="flex items-center gap-2 text-xs font-mono text-outline">
              <span className="material-symbols-outlined text-[16px] text-chart-accent">analytics</span>
              <span className="text-on-surface">Private Mandate Telemetry // Performance Desk</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <RoleSwitcher />
          </div>
        </header>

        <main className="flex-1 p-6 sm:p-8 space-y-8 max-w-7xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl text-primary font-normal">
                Mandate Telemetry &amp; Investor Analytics
              </h1>
              <p className="text-xs text-secondary font-light">
                Real-time tracking of ultra-HNW engagement, geographic interest hubs, and pipeline velocity.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 rounded-lg bg-surface-card border border-border-subtle text-xs text-primary font-mono">
                Sampling Window: Last 30 Days
              </span>
            </div>
          </div>

          {/* Metric KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-surface-card border border-border-subtle">
              <span className="text-[10px] uppercase font-mono text-outline tracking-wider block">
                Total Mandate Pipeline
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-serif text-primary font-medium">{formatCurrency(totalPipeline)}</span>
              </div>
              <span className="text-[10px] text-status-verified mt-1 block">↑ 14.8% vs previous quarter</span>
            </div>

            <div className="p-5 rounded-2xl bg-surface-card border border-border-subtle">
              <span className="text-[10px] uppercase font-mono text-outline tracking-wider block">
                Monograph Views
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-serif text-primary font-medium">{totalViews.toLocaleString()}</span>
                <span className="text-xs text-secondary font-mono">Vetted HNW</span>
              </div>
              <span className="text-[10px] text-secondary mt-1 block">Avg duration: 4m 12s</span>
            </div>

            <div className="p-5 rounded-2xl bg-surface-card border border-border-subtle">
              <span className="text-[10px] uppercase font-mono text-outline tracking-wider block">
                Shortlisted / Saved
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-serif text-chart-accent font-medium">{totalFavorites}</span>
                <span className="text-xs text-secondary font-mono">Family Offices</span>
              </div>
              <span className="text-[10px] text-secondary mt-1 block">High acquisition intent</span>
            </div>

            <div className="p-5 rounded-2xl bg-surface-card border border-border-subtle">
              <span className="text-[10px] uppercase font-mono text-outline tracking-wider block">
                Closing Velocity
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-serif text-status-verified font-medium">48 Days</span>
              </div>
              <span className="text-[10px] text-status-verified mt-1 block">18 days faster than market avg</span>
            </div>
          </div>

          {/* Regional Demographics & Top Performing Mandates */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Top Properties */}
            <div className="lg:col-span-2 rounded-2xl bg-surface-card border border-border-subtle p-6 space-y-4 shadow-xl">
              <h3 className="font-serif text-base text-primary font-medium">
                Highest Engagement Trophy Mandates
              </h3>
              <div className="divide-y divide-border-subtle">
                {properties.map((prop) => (
                  <div key={prop.id} className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={prop.heroImage || ""}
                        alt={prop.title}
                        className="w-12 h-12 rounded-lg object-cover bg-surface-container shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="font-serif text-sm text-primary truncate block">{prop.title}</span>
                        <span className="text-[10px] font-mono text-outline">{prop.city}, {prop.country}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-serif text-sm text-primary font-medium block">
                        {formatCurrency(prop.price)}
                      </span>
                      <span className="text-[10px] font-mono text-status-verified">
                        {prop.viewsCount.toLocaleString()} views • {prop.favoritesCount} saved
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Regional Breakdown */}
            <div className="rounded-2xl bg-surface-card border border-border-subtle p-6 space-y-6 shadow-xl">
              <div>
                <h3 className="font-serif text-base text-primary font-medium">Investor Geographies</h3>
                <p className="text-[11px] text-secondary font-light">Origin of inquiries by sovereign jurisdiction.</p>
              </div>

              <div className="space-y-4">
                {[
                  { region: "Switzerland (Zurich & Geneva)", share: 38, color: "bg-primary" },
                  { region: "United States (NY & CA)", share: 27, color: "bg-chart-accent" },
                  { region: "United Kingdom (Mayfair)", share: 19, color: "bg-secondary" },
                  { region: "Japan & APAC (Tokyo/Kyoto)", share: 16, color: "bg-status-verified" },
                ].map((item) => (
                  <div key={item.region} className="space-y-1.5 text-xs">
                    <div className="flex justify-between font-mono">
                      <span className="text-secondary">{item.region}</span>
                      <span className="text-primary font-bold">{item.share}%</span>
                    </div>
                    <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: `${item.share}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
