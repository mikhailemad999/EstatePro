import React from "react";
import Link from "next/link";
import BuyerSidebar from "@/components/dashboards/BuyerSidebar";
import RoleSwitcher from "@/components/common/RoleSwitcher";

export default function SavedSearchesPage() {
  const savedSearches = [
    {
      id: "search-1",
      title: "Alpine Trophy Sanctuaries (Lex Koller Exempt)",
      query: "Zermatt, St. Moritz, Gstaad • Chalets & Waterfront",
      criteria: "Price: $20M - $80M • Min 5 Beds • Helipad / Ski-In",
      frequency: "Instant Alert (Signal + Email)",
      matchedCount: 4,
      lastRun: "2 hours ago",
      active: true,
    },
    {
      id: "search-2",
      title: "Lake Geneva Deep-Water Private Mooring Compounds",
      query: "Cologny, Bellevue, Montreux • Waterfront Compounds",
      criteria: "Price: > $35M • Deep-Water Dock • Art Vault",
      frequency: "Daily Intelligence Briefing",
      matchedCount: 2,
      lastRun: "Yesterday",
      active: true,
    },
    {
      id: "search-3",
      title: "Mayfair & Belgravia Historic Palazzos / Townhouses",
      query: "London W1, SW1 • Grade-I / Grade-II Listed",
      criteria: "Price: > £25M • Mews House • Private Garden",
      frequency: "Weekly Digest",
      matchedCount: 3,
      lastRun: "3 days ago",
      active: true,
    },
    {
      id: "search-4",
      title: "Dubai Palm Jumeirah Billionaires' Row Beachfront Villas",
      query: "Palm Jumeirah Fronds • Signature Beachfront",
      criteria: "Price: > AED 120M • Private Beach Access • 8+ Beds",
      frequency: "Instant Alert",
      matchedCount: 5,
      lastRun: "4 hours ago",
      active: false,
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
              <span>SAVED ALERTS</span>
              <span>•</span>
              <span className="text-primary font-bold">AUTOMATED MARKET TELEMETRY</span>
            </div>
          </div>
          <RoleSwitcher />
        </header>

        <main className="flex-1 p-6 sm:p-8 space-y-8 max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl text-primary font-normal">
                Saved Search Parameters &amp; Instant Triggers
              </h1>
              <p className="text-xs text-secondary font-light">
                Autonomous background scanning for off-market releases and price adjustments meeting strict family office mandates.
              </p>
            </div>
            <Link
              href="/properties"
              className="px-5 py-2.5 rounded-full bg-primary text-on-primary text-xs uppercase font-semibold tracking-wider hover:bg-primary-container transition-all shadow"
            >
              + Create New Search Alert
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savedSearches.map((s) => (
              <div
                key={s.id}
                className="p-6 rounded-2xl bg-surface-card border border-border-subtle space-y-4 hover:border-outline-variant transition-all shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-outline">
                      {s.id.toUpperCase()}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold tracking-wider ${
                        s.active
                          ? "bg-status-verified/20 text-status-verified border border-status-verified/30"
                          : "bg-surface-container text-outline"
                      }`}
                    >
                      {s.active ? "Radar Active" : "Paused"}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg text-primary font-medium">{s.title}</h3>
                  <p className="text-xs text-secondary font-light">{s.query}</p>
                  
                  <div className="p-3 rounded-lg bg-surface-container text-[11px] font-mono text-outline space-y-1">
                    <div>{s.criteria}</div>
                    <div className="text-chart-accent">Frequency: {s.frequency}</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border-subtle flex items-center justify-between text-xs">
                  <span className="text-secondary font-mono text-[11px]">
                    Matched: <strong className="text-primary">{s.matchedCount} Estates</strong>
                  </span>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary text-[11px] font-semibold transition-colors">
                      {s.active ? "Pause" : "Resume"}
                    </button>
                    <Link
                      href="/properties"
                      className="px-3 py-1.5 rounded-lg bg-primary text-on-primary text-[11px] font-semibold transition-colors"
                    >
                      View Results →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
