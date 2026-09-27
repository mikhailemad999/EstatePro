import React from "react";
import Link from "next/link";
import BuyerSidebar from "@/components/dashboards/BuyerSidebar";
import RoleSwitcher from "@/components/common/RoleSwitcher";
import { formatCurrency } from "@/lib/utils";

export default function BuyerInquiriesPage() {
  const mandates = [
    {
      id: "MND-98421",
      propertyTitle: "The Solis Cliffside Brutalist Sanctuary",
      propertyLocation: "Big Sur, California, USA",
      offerAmount: 37000000,
      listingPrice: 38500000,
      status: "DUE_DILIGENCE",
      statusLabel: "In Due Diligence & Cantonal Audit",
      statusColor: "bg-status-pending/20 text-status-pending border-status-pending/30",
      assignedAgent: "Kenjiro Takahashi (Senior Partner)",
      submittedDate: "2026-03-01",
      closingRoomUrl: "/escrow/solis-sanctuary",
      notes: "Environmental survey complete. Geotechnical bedrock core sampling notarized.",
    },
    {
      id: "MND-87319",
      propertyTitle: "Palais de la Rive Waterfront Estate",
      propertyLocation: "Lake Geneva, Cologny, Switzerland",
      offerAmount: 51000000,
      listingPrice: 52000000,
      status: "OFFER_UNDER_REVIEW",
      statusLabel: "Offer Under Board Review",
      statusColor: "bg-chart-accent/20 text-chart-accent border-chart-accent/30",
      assignedAgent: "Count Maximilian von Berg",
      submittedDate: "2026-03-04",
      closingRoomUrl: null,
      notes: "Counter-offer expected by Thursday afternoon following trustee consultation.",
    },
    {
      id: "MND-76210",
      propertyTitle: "The Mayfair Regency Heritage Townhouse",
      propertyLocation: "Belgrave Square, London W1, UK",
      offerAmount: 26000000,
      listingPrice: 28000000,
      status: "TERMS_DRAFTED",
      statusLabel: "Contract Heads of Terms Drafted",
      statusColor: "bg-purple-400/20 text-purple-300 border-purple-400/30",
      assignedAgent: "Lady Eleanor Kensington",
      submittedDate: "2026-02-24",
      closingRoomUrl: null,
      notes: "Heritage commission approved minor interior wine cellar restoration.",
    },
  ];

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
              <span>ACQUISITION MANDATES</span>
              <span>•</span>
              <span className="text-primary font-bold">SOVEREIGN PIPELINE</span>
            </div>
          </div>
          <RoleSwitcher />
        </header>

        <main className="flex-1 p-6 sm:p-8 space-y-8 max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl text-primary font-normal">
                Formal Acquisition Mandates &amp; Term Sheets
              </h1>
              <p className="text-xs text-secondary font-light">
                Binding Letters of Intent, legal escrow checkpoints, and cantonal title transfers currently in progress.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-full bg-primary text-on-primary text-xs uppercase font-semibold tracking-wider hover:bg-primary-container transition-all shadow"
            >
              + Initiate New Mandate
            </Link>
          </div>

          <div className="space-y-4">
            {mandates.map((m) => (
              <div
                key={m.id}
                className="p-6 rounded-2xl bg-surface-card border border-border-subtle shadow-xl space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border-subtle">
                  <div>
                    <span className="text-[10px] font-mono text-outline block">{m.id}</span>
                    <h3 className="font-serif text-xl text-primary font-medium">{m.propertyTitle}</h3>
                    <p className="text-xs text-secondary">{m.propertyLocation}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider border ${m.statusColor}`}>
                    {m.statusLabel}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                  <div className="p-3 rounded-lg bg-surface-container">
                    <span className="text-[9px] uppercase text-outline block">Submitted Offer</span>
                    <span className="font-serif text-lg text-primary font-medium">{formatCurrency(m.offerAmount)}</span>
                    <span className="text-[10px] text-secondary block">Asking: {formatCurrency(m.listingPrice)}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-surface-container">
                    <span className="text-[9px] uppercase text-outline block">Assigned Senior Counsel</span>
                    <span className="text-primary font-semibold block mt-0.5">{m.assignedAgent}</span>
                    <span className="text-[10px] text-secondary">Filing Date: {m.submittedDate}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-surface-container">
                    <span className="text-[9px] uppercase text-outline block">Status Telemetry</span>
                    <span className="text-chart-accent text-xs block mt-0.5 font-sans italic">{m.notes}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <Link
                    href="/dashboard/messages"
                    className="text-xs text-secondary hover:text-primary transition-colors flex items-center gap-1 font-semibold"
                  >
                    <span className="material-symbols-outlined text-[16px]">chat</span>
                    <span>Direct Counsel Channel</span>
                  </Link>

                  {m.closingRoomUrl && (
                    <Link
                      href={m.closingRoomUrl}
                      className="px-4 py-2 rounded-lg bg-primary text-on-primary text-xs uppercase font-semibold tracking-wider hover:bg-primary-container transition-all shadow"
                    >
                      Enter Escrow Data Room →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
