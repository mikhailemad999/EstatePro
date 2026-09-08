import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AgentSidebar from "@/components/dashboards/AgentSidebar";
import RoleSwitcher from "@/components/common/RoleSwitcher";
import { formatCurrency } from "@/lib/utils";

export const revalidate = 0;

export default async function AgentDashboardPage() {
  const agent = await prisma.agentProfile.findFirst({
    include: {
      user: true,
      agency: true,
      properties: { take: 4 },
      leads: { take: 6, orderBy: { score: "desc" } },
      appointments: { take: 3, orderBy: { date: "asc" } },
    },
  });

  const allLeads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Fixed Agent Sidebar */}
      <AgentSidebar />

      {/* Main Content Pane */}
      <div className="flex-1 md:pl-72 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-20 bg-surface/80 backdrop-blur-xl border-b border-border-subtle px-6 sm:px-8 flex items-center justify-between gap-4 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <Link href="/" className="md:hidden text-primary font-bold font-serif text-lg">
              EP
            </Link>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low text-xs border border-white/5">
              <span className="material-symbols-outlined text-[16px] text-outline">account_tree</span>
              <span className="font-mono text-outline uppercase text-[10px]">Active Mandate:</span>
              <span className="text-primary font-semibold">Sotheby's Private Portfolio / Geneva &amp; Tokyo</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <RoleSwitcher />

            <div className="flex items-center gap-3">
              <img
                src={agent?.user.avatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"}
                alt={agent?.user.name || "Agent"}
                className="w-8 h-8 rounded-full object-cover border border-white/10"
              />
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-semibold text-primary">{agent?.user.name}</span>
                <span className="text-[10px] uppercase font-mono text-status-verified">Tier 1 Sovereign Lead</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="flex-1 p-6 sm:p-8 space-y-8 max-w-7xl">
          {/* Welcome & Action Controls */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-status-verified animate-ping"></span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-secondary">
                  Sovereign Vault • Real-Time Telemetry Active
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl text-primary font-normal">
                Welcome back, {agent?.user.name || "Kenjiro Takahashi"}
              </h1>
              <p className="text-xs text-secondary font-light">
                {agent?.title || "Managing Partner, Asia-Pacific Private Client Group • Tokyo Central Node"}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/agent/properties/create"
                className="px-5 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-semibold uppercase tracking-wider hover:bg-primary-container transition-all flex items-center gap-2 shadow"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                <span>Create New Listing</span>
              </Link>
              <Link
                href="/agent/leads"
                className="px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold uppercase tracking-wider transition-colors border border-white/5 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">filter_alt</span>
                <span>CRM Pipeline</span>
              </Link>
            </div>
          </div>

          {/* 4 Telemetry Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="p-6 rounded-xl bg-surface-card border border-border-subtle flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-mono text-outline">Gross Mandate Book</span>
                <span className="px-2 py-0.5 rounded-full bg-status-verified/20 text-status-verified text-[10px] font-bold">
                  +18.4% YoY
                </span>
              </div>
              <div>
                <div className="font-serif text-3xl text-primary font-medium">$148.5M</div>
                <p className="text-[11px] text-secondary mt-0.5">Total Managed Portfolio Value</p>
              </div>
              <div className="flex justify-between items-center text-[10px] text-outline pt-2 border-t border-border-subtle">
                <span>Institutional Assets</span>
                <span className="material-symbols-outlined text-[16px] text-status-verified">trending_up</span>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-surface-card border border-border-subtle flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-mono text-outline">Sovereign Listings</span>
                <span className="px-2 py-0.5 rounded-full bg-status-pending/20 text-status-pending text-[10px] font-bold">
                  2 In Escrow
                </span>
              </div>
              <div>
                <div className="font-serif text-3xl text-primary font-medium">{agent?.activeMandates || 14} Active</div>
                <p className="text-[11px] text-secondary mt-0.5">Min. Unit Floor: $8.5M</p>
              </div>
              <div className="flex justify-between items-center text-[10px] text-outline pt-2 border-t border-border-subtle">
                <span>Tokyo, Geneva &amp; London</span>
                <span className="material-symbols-outlined text-[16px]">apartment</span>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-surface-card border border-border-subtle flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-mono text-outline">HNW Lead Pipeline</span>
                <span className="px-2 py-0.5 rounded-full bg-chart-accent/20 text-chart-accent text-[10px] font-bold">
                  {allLeads.length} In System
                </span>
              </div>
              <div>
                <div className="font-serif text-3xl text-primary font-medium">{allLeads.length} Leads</div>
                <p className="text-[11px] text-secondary mt-0.5">Avg Net Worth &gt; $85M</p>
              </div>
              <div className="flex justify-between items-center text-[10px] text-outline pt-2 border-t border-border-subtle">
                <span>100% KYC / AML Cleared</span>
                <span className="material-symbols-outlined text-[16px]">verified_user</span>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-surface-card border border-border-subtle flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-mono text-outline">YTD Projected Cut</span>
                <span className="px-2 py-0.5 rounded-full bg-status-verified/20 text-status-verified text-[10px] font-bold">
                  3.0% Spread
                </span>
              </div>
              <div>
                <div className="font-serif text-3xl text-primary font-medium">$4.45M</div>
                <p className="text-[11px] text-secondary mt-0.5">Commission Telemetry</p>
              </div>
              <div className="flex justify-between items-center text-[10px] text-outline pt-2 border-t border-border-subtle">
                <span>Next Settlement: 15 Mar</span>
                <span className="material-symbols-outlined text-[16px]">account_balance_wallet</span>
              </div>
            </div>
          </div>

          {/* Leads CRM Inbox Preview & Upcoming Viewings Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Leads Table */}
            <div className="lg:col-span-8 rounded-xl bg-surface-card border border-border-subtle p-6 space-y-5 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg text-primary">Private Client Lead Manifest</h3>
                  <p className="text-xs text-secondary font-light">High-priority inquiries requiring advisory response</p>
                </div>
                <Link href="/agent/leads" className="text-xs text-chart-accent hover:underline font-semibold">
                  Open Kanban Board →
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-border-subtle text-outline font-mono uppercase">
                      <th className="py-3 px-3">Client Principal</th>
                      <th className="py-3 px-3">Stage</th>
                      <th className="py-3 px-3">Budget</th>
                      <th className="py-3 px-3">Score</th>
                      <th className="py-3 px-3">Source</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle">
                    {allLeads.slice(0, 5).map((lead) => (
                      <tr key={lead.id} className="hover:bg-surface-container/50">
                        <td className="py-3 px-3 font-semibold text-primary">
                          {lead.name}
                          <span className="block text-[10px] font-mono text-outline font-normal">{lead.email}</span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full bg-surface-container text-[10px] font-mono uppercase text-secondary">
                            {lead.stage.replace("_", " ")}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-serif font-medium text-primary">
                          {formatCurrency(lead.budget)}
                        </td>
                        <td className="py-3 px-3">
                          <span className="text-status-verified font-bold font-mono">{lead.score} / 100</span>
                        </td>
                        <td className="py-3 px-3 text-secondary text-[11px]">{lead.source}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right: Upcoming VIP Viewings */}
            <div className="lg:col-span-4 rounded-xl bg-surface-card border border-border-subtle p-6 space-y-5 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg text-primary">Upcoming VIP Viewings</h3>
                <span className="material-symbols-outlined text-outline text-[18px]">calendar_month</span>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-surface-container border border-border-subtle space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-status-verified text-[10px] uppercase font-bold">Confirmed Flight</span>
                    <span className="text-outline text-[10px]">15 Mar • 14:00 CET</span>
                  </div>
                  <h4 className="font-serif text-sm text-primary">Lord Alistair Sterling</h4>
                  <p className="text-xs text-secondary font-light">
                    Palais de la Rive Waterfront Estate • GVA VIP Terminal Landing
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-surface-container border border-border-subtle space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-status-pending text-[10px] uppercase font-bold">Pending Clearance</span>
                    <span className="text-outline text-[10px]">18 Mar • 11:30 EST</span>
                  </div>
                  <h4 className="font-serif text-sm text-primary">Maximilian Chen</h4>
                  <p className="text-xs text-secondary font-light">
                    The Sky Pavilion Crown Duplex • Helipad Arrival
                  </p>
                </div>
              </div>

              <Link
                href="/vip-viewing"
                className="w-full py-2.5 rounded-lg border border-border-hairline text-secondary hover:text-primary text-xs font-semibold uppercase tracking-wider block text-center transition-colors"
              >
                Schedule New VIP Itinerary
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
