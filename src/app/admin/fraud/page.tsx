import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AdminSidebar from "@/components/dashboards/AdminSidebar";
import RoleSwitcher from "@/components/common/RoleSwitcher";
import { formatCurrency } from "@/lib/utils";

export const revalidate = 0;

export default async function AdminFraudPage() {
  const escrows = await prisma.escrowTransaction.findMany({
    take: 5,
    include: { property: true },
    orderBy: { createdAt: "desc" },
  });

  const suspiciousCases = [
    {
      id: "AML-90214-SG",
      entity: "Offshore Entity #8991 Ltd (BVI)",
      targetProperty: "The Peninsula Sovereign Manor",
      amount: 48500000,
      riskLevel: "CRITICAL",
      reason: "Layered wire transfer attempted from high-risk jurisdiction without notarized UBO disclosure.",
      timestamp: "12 mins ago",
      flaggedBy: "Automated AML Engine v4.2",
      status: "HELD_FOR_CLEARANCE",
    },
    {
      id: "AML-88319-MC",
      entity: "Family Trust Apex Alpha",
      targetProperty: "Le Rocher Sky Palace",
      amount: 62000000,
      riskLevel: "ELEVATED",
      reason: "Inconsistent passport biometric hash detected during Tier-2 cryptographic notary verification.",
      timestamp: "2 hours ago",
      flaggedBy: "Biometric Identity Guard",
      status: "UNDER_REVIEW",
    },
    {
      id: "AML-77142-DXB",
      entity: "Vanguard Global Holdings",
      targetProperty: "Villa Imperiale sul Mare",
      amount: 32000000,
      riskLevel: "MODERATE",
      reason: "Rapid consecutive viewing charter requests from disparate VPN exit nodes.",
      timestamp: "5 hours ago",
      flaggedBy: "Behavioral Geo-Fence Node",
      status: "INVESTIGATING",
    },
    {
      id: "AML-65120-CH",
      entity: "Helvetia Capital Syndicate",
      targetProperty: "Villa Paradiso sul Lago",
      amount: 27500000,
      riskLevel: "CLEARED",
      reason: "Swiss banking source of funds notarized by Credit Suisse Private Banking trustee.",
      timestamp: "Yesterday",
      flaggedBy: "Compliance Counsel",
      status: "DISMISSED_CLEARED",
    },
  ];

  return (
    <div className="min-h-screen bg-surface flex">
      <AdminSidebar />
      <div className="flex-1 md:pl-72 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 bg-surface/80 backdrop-blur-xl border-b border-border-subtle px-6 sm:px-8 flex items-center justify-between gap-4 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <Link href="/" className="md:hidden text-primary font-bold font-serif text-lg">
              T0
            </Link>
            <div className="flex items-center gap-2 text-xs font-mono text-outline">
              <span className="material-symbols-outlined text-[16px] text-error">gavel</span>
              <span className="text-on-surface">Compliance &amp; Financial Intelligence // AML / Fraud Shield</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <RoleSwitcher />
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-high border border-error/30 text-xs font-mono text-error">
              <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></span>
              <span>Sanctions &amp; PEP Engine: ACTIVE</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 sm:p-8 space-y-8 max-w-7xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl text-primary font-normal">
                Financial Crime &amp; Fraud Telemetry
              </h1>
              <p className="text-xs text-secondary font-light">
                Automated Bank Secrecy Act (BSA), FinCEN AML screening, and cryptographic source-of-wealth monitoring.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-lg bg-surface-card border border-border-subtle text-xs text-primary font-mono">
                Active Monitors: 4 Nodes
              </span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-surface-card border border-border-subtle">
              <span className="text-[10px] uppercase font-mono text-outline tracking-wider block">
                Flagged Escrows
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-serif text-error font-medium">1</span>
                <span className="text-xs text-secondary font-mono">/ {escrows.length} Active Wires</span>
              </div>
              <span className="text-[10px] text-secondary mt-1 block">Immediate hold enacted</span>
            </div>

            <div className="p-5 rounded-2xl bg-surface-card border border-border-subtle">
              <span className="text-[10px] uppercase font-mono text-outline tracking-wider block">
                Suspicious Volume (7D)
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-serif text-primary font-medium">$142.5M</span>
                <span className="text-xs text-status-verified font-mono">92% Cleared</span>
              </div>
              <span className="text-[10px] text-secondary mt-1 block">3 jurisdictions analyzed</span>
            </div>

            <div className="p-5 rounded-2xl bg-surface-card border border-border-subtle">
              <span className="text-[10px] uppercase font-mono text-outline tracking-wider block">
                PEP / Sanctions Scans
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-serif text-primary font-medium">844</span>
                <span className="text-xs text-status-verified font-mono">100% Match Rate</span>
              </div>
              <span className="text-[10px] text-secondary mt-1 block">OFAC, EU, UN Watchlists</span>
            </div>

            <div className="p-5 rounded-2xl bg-surface-card border border-border-subtle">
              <span className="text-[10px] uppercase font-mono text-outline tracking-wider block">
                False Positive Index
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-serif text-status-verified font-medium">0.8%</span>
                <span className="text-xs text-secondary font-mono">-0.4% from avg</span>
              </div>
              <span className="text-[10px] text-secondary mt-1 block">High confidence threshold</span>
            </div>
          </div>

          {/* Cases Table */}
          <div className="rounded-2xl border border-border-subtle bg-surface-card overflow-hidden shadow-xl">
            <div className="p-5 border-b border-border-subtle flex items-center justify-between">
              <div>
                <h3 className="font-serif text-base text-primary font-medium">
                  Active Sanction &amp; UBO Audits
                </h3>
                <p className="text-[11px] text-secondary font-light">
                  Cases requiring legal determination prior to releasing title notary keys.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-error/15 text-error border border-error/30">
                1 Case Under Enforcement Freeze
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border-subtle text-outline font-mono uppercase bg-surface-container-lowest">
                    <th className="py-4 px-5">Case Reference</th>
                    <th className="py-4 px-5">Transacting Entity</th>
                    <th className="py-4 px-5">Target Estate</th>
                    <th className="py-4 px-5">Nominal Sum</th>
                    <th className="py-4 px-5">Threat Assessment</th>
                    <th className="py-4 px-5">Status</th>
                    <th className="py-4 px-5 text-right">Overseer Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {suspiciousCases.map((c) => (
                    <tr key={c.id} className="hover:bg-surface-container/50 transition-colors">
                      <td className="py-4 px-5 font-mono text-[11px] text-on-surface">
                        {c.id}
                        <span className="block text-[9px] text-secondary">{c.timestamp}</span>
                      </td>
                      <td className="py-4 px-5 font-medium text-primary">
                        {c.entity}
                        <span className="block text-[10px] text-secondary font-light">{c.reason}</span>
                      </td>
                      <td className="py-4 px-5 text-secondary">{c.targetProperty}</td>
                      <td className="py-4 px-5 font-serif font-medium text-primary">
                        {formatCurrency(c.amount)}
                      </td>
                      <td className="py-4 px-5">
                        <span
                          className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider ${
                            c.riskLevel === "CRITICAL"
                              ? "bg-error text-on-error"
                              : c.riskLevel === "ELEVATED"
                              ? "bg-status-pending text-on-surface"
                              : c.riskLevel === "MODERATE"
                              ? "bg-chart-accent/20 text-chart-accent border border-chart-accent/40"
                              : "bg-status-verified/20 text-status-verified border border-status-verified/40"
                          }`}
                        >
                          {c.riskLevel}
                        </span>
                      </td>
                      <td className="py-4 px-5 font-mono text-[10px] text-secondary">
                        {c.status}
                      </td>
                      <td className="py-4 px-5 text-right space-x-2">
                        {c.status !== "DISMISSED_CLEARED" ? (
                          <>
                            <button className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest border border-border-hairline text-primary text-[10px] font-semibold uppercase tracking-wider transition-colors">
                              Audit UBO
                            </button>
                            <button className="px-3 py-1.5 rounded-lg bg-error hover:bg-red-700 text-white text-[10px] font-semibold uppercase tracking-wider transition-colors shadow">
                              Freeze
                            </button>
                          </>
                        ) : (
                          <span className="text-[10px] font-mono text-status-verified">Audited &amp; Released</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
