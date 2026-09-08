import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AdminSidebar from "@/components/dashboards/AdminSidebar";
import RoleSwitcher from "@/components/common/RoleSwitcher";
import { formatCurrency } from "@/lib/utils";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const properties = await prisma.property.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { agent: { include: { user: true } } },
  });

  const auditLogs = await prisma.auditLog.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  const usersCount = await prisma.user.count();
  const propertiesCount = await prisma.property.count();
  const agenciesCount = await prisma.agency.count();

  return (
    <div className="min-h-screen bg-surface flex">
      <AdminSidebar />
      <div className="flex-1 md:pl-72 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-20 bg-surface/80 backdrop-blur-xl border-b border-border-subtle px-6 sm:px-8 flex items-center justify-between gap-4 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <Link href="/" className="md:hidden text-primary font-bold font-serif text-lg">
              T0
            </Link>
            <div className="flex items-center gap-2 text-xs font-mono text-outline">
              <span className="material-symbols-outlined text-[16px] text-chart-accent">database</span>
              <span className="text-on-surface">MySQL Cluster 3305: Synced</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <RoleSwitcher />
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-high border border-status-verified/20 text-xs font-mono text-status-verified">
              <span className="w-1.5 h-1.5 rounded-full bg-status-verified"></span>
              <span>Overseer Clearance Level: 0</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 sm:p-8 space-y-8 max-w-7xl">
          {/* Executive Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-status-verified animate-ping"></span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-secondary">
                  Sovereign Protocol // Clearance Level: Overseer Tier-0
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl text-primary font-normal">
                Executive Platform Operations &amp; Telemetry
              </h1>
              <p className="text-xs text-secondary font-light">
                Real-time global asset reconciliation, cryptographic title validation, and sovereign institutional liquidity orchestration.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/admin/approvals"
                className="px-5 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-semibold uppercase tracking-wider hover:bg-primary-container transition-all flex items-center gap-2 shadow"
              >
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Approval Queue</span>
              </Link>
              <Link
                href="/admin/fraud"
                className="px-4 py-2.5 rounded-xl bg-surface-container hover:bg-error-container text-error text-xs font-semibold uppercase tracking-wider transition-colors border border-white/5 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">gavel</span>
                <span>Incident Center</span>
              </Link>
            </div>
          </div>

          {/* 5 High-Impact Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 rounded-xl bg-surface-card border border-border-subtle flex flex-col justify-between space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-mono text-outline">Gross Merchandise Value</span>
                <span className="px-2 py-0.5 rounded-full bg-status-verified/20 text-status-verified text-[10px] font-bold">
                  +24.2% MoM
                </span>
              </div>
              <div>
                <div className="font-serif text-3xl text-primary font-medium">$1.42B</div>
                <p className="text-[11px] text-secondary mt-0.5">Under Sovereign Vault Custody</p>
              </div>
              <div className="text-[10px] text-outline pt-2 border-t border-border-subtle">
                FINMA Multi-Sig Reconciled
              </div>
            </div>

            <div className="p-6 rounded-xl bg-surface-card border border-border-subtle flex flex-col justify-between space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-mono text-outline">Brokerage Nodes</span>
                <span className="px-2 py-0.5 rounded-full bg-chart-accent/20 text-chart-accent text-[10px] font-bold">
                  {agenciesCount} Active
                </span>
              </div>
              <div>
                <div className="font-serif text-3xl text-primary font-medium">84 Hubs</div>
                <p className="text-[11px] text-secondary mt-0.5">Geneva, Tokyo, London, NYC</p>
              </div>
              <div className="text-[10px] text-status-verified pt-2 border-t border-border-subtle font-mono">
                98.2% Node Health
              </div>
            </div>

            <div className="p-6 rounded-xl bg-surface-card border border-border-subtle flex flex-col justify-between space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-mono text-outline">Total Estate Listings</span>
                <span className="px-2 py-0.5 rounded-full bg-status-verified/20 text-status-verified text-[10px] font-bold">
                  {propertiesCount} In Registry
                </span>
              </div>
              <div>
                <div className="font-serif text-3xl text-primary font-medium">{propertiesCount} Estates</div>
                <p className="text-[11px] text-secondary mt-0.5">Avg Valuation: $34.5M</p>
              </div>
              <div className="text-[10px] text-outline pt-2 border-t border-border-subtle">
                100% Deeds Inspected
              </div>
            </div>

            <div className="p-6 rounded-xl bg-surface-card border border-border-subtle flex flex-col justify-between space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-mono text-outline">Registered Principals</span>
                <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-bold">
                  {usersCount} Users
                </span>
              </div>
              <div>
                <div className="font-serif text-3xl text-primary font-medium">{usersCount} Accounts</div>
                <p className="text-[11px] text-secondary mt-0.5">HNW Buyers &amp; Sovereign Agents</p>
              </div>
              <div className="text-[10px] text-outline pt-2 border-t border-border-subtle">
                Zero Unauthorized Breaches
              </div>
            </div>
          </div>

          {/* Pending Approvals Queue Preview */}
          <div className="rounded-2xl bg-surface-card border border-border-subtle p-6 sm:p-8 space-y-5 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl text-primary">Compliance Review &amp; Title Verification Queue</h3>
                <p className="text-xs text-secondary font-light">Recent sovereign listings requiring overseer publication certification</p>
              </div>
              <Link href="/admin/approvals" className="text-xs text-chart-accent hover:underline font-semibold">
                Manage Queue →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border-subtle text-outline font-mono uppercase bg-surface-container-lowest">
                    <th className="py-3 px-4">Estate Title</th>
                    <th className="py-3 px-4">Mandate Lead Agent</th>
                    <th className="py-3 px-4">Valuation</th>
                    <th className="py-3 px-4">Clearance Status</th>
                    <th className="py-3 px-4 text-right">Review Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {properties.map((p) => (
                    <tr key={p.id} className="hover:bg-surface-container/50">
                      <td className="py-3 px-4">
                        <span className="font-serif text-sm text-primary font-medium block">{p.title}</span>
                        <span className="text-[10px] font-mono text-outline">{p.refNumber} • {p.city}</span>
                      </td>
                      <td className="py-3 px-4 text-secondary">{p.agent?.user.name || "Kenjiro Takahashi"}</td>
                      <td className="py-3 px-4 font-serif font-medium text-primary text-sm">{formatCurrency(p.price)}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full bg-status-verified/20 text-status-verified font-mono text-[10px] font-bold">
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Link
                          href={`/property/${p.slug}`}
                          className="px-3 py-1 rounded bg-surface-container hover:bg-surface-container-high text-primary text-xs font-medium"
                        >
                          Inspect Monograph
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* System Audit Logs */}
          <div className="rounded-2xl bg-surface-card border border-border-subtle p-6 sm:p-8 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl text-primary">Immutable Sovereign Audit Trail</h3>
              <Link href="/admin/audit" className="text-xs text-chart-accent hover:underline font-semibold">
                Full Cryptographic Log →
              </Link>
            </div>

            <div className="space-y-2 font-mono text-xs">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-3 rounded-lg bg-surface-container flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-status-verified font-bold">[{log.action}]</span>
                    <span className="text-primary">{log.details}</span>
                  </div>
                  <span className="text-outline text-[10px]">{log.createdAt.toISOString()}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
