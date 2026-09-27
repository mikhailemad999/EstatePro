import React from "react";
import Link from "next/link";
import BuyerSidebar from "@/components/dashboards/BuyerSidebar";
import RoleSwitcher from "@/components/common/RoleSwitcher";

export default function BuyerNotificationsPage() {
  const notifications = [
    {
      id: "notif-1",
      category: "ESCROW",
      badge: "Escrow Milestone",
      color: "bg-status-verified/20 text-status-verified border-status-verified/30",
      title: "Earnest Deposit Vaulted & Cryptographically Confirmed",
      description: "Escrow #ESC-89211 (The Solis Sanctuary): Wire of $7,700,000 confirmed by First American Title Trust. Multi-sig notary key 1 of 2 signed.",
      timestamp: "18 minutes ago",
      actionUrl: "/escrow/solis-sanctuary",
      actionLabel: "View Escrow Room",
      unread: true,
    },
    {
      id: "notif-2",
      category: "AVIATION",
      badge: "Flight Manifest",
      color: "bg-chart-accent/20 text-chart-accent border-chart-accent/30",
      title: "Gulfstream G650 Flight Plan Cleared: Zurich (ZRH) to Geneva (GVA)",
      description: "Charter viewing flight confirmed for Thursday 14:00 CET. Chauffeur S-Class pickup scheduled at Terminal VIP.",
      timestamp: "3 hours ago",
      actionUrl: "/dashboard/appointments",
      actionLabel: "View Itinerary",
      unread: true,
    },
    {
      id: "notif-3",
      category: "MARKET_ALERT",
      badge: "Watchlist Alert",
      color: "bg-purple-400/20 text-purple-300 border-purple-400/30",
      title: "New Prime Asset Matched: Villa Imperiale sul Mare",
      description: "Cap d'Antibes private waterfront compound listed at $32,000,000 matches your 'Mediterranean Compounds' alert criteria.",
      timestamp: "Yesterday",
      actionUrl: "/properties",
      actionLabel: "Inspect Estate",
      unread: false,
    },
    {
      id: "notif-4",
      category: "LEGAL",
      badge: "Title Disclosure",
      color: "bg-secondary/20 text-secondary border-secondary/30",
      title: "Cantonal Lex Koller Permit Approved",
      description: "Swiss Federal Land Registry confirmed foreign buyer exemption quota allocation for Zermatt Alpine Ridge Chalet.",
      timestamp: "2 days ago",
      actionUrl: "/dashboard/inquiries",
      actionLabel: "View Mandate",
      unread: false,
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
              <span>LIVE TELEMETRY</span>
              <span>•</span>
              <span className="text-status-verified font-bold">ESCROW &amp; MANDATE ALERTS</span>
            </div>
          </div>
          <RoleSwitcher />
        </header>

        <main className="flex-1 p-6 sm:p-8 space-y-6 max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl text-primary font-normal">
                Encrypted Notification &amp; Milestone Feed
              </h1>
              <p className="text-xs text-secondary font-light">
                Real-time telemetry on escrow transactions, aviation itineraries, and exclusive off-market releases.
              </p>
            </div>
            <button className="px-4 py-2 rounded-lg bg-surface-card border border-border-subtle text-xs text-secondary hover:text-primary transition-colors">
              Mark All As Read
            </button>
          </div>

          <div className="space-y-4">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`p-6 rounded-2xl border transition-all shadow-lg ${
                  n.unread
                    ? "bg-surface-card border-primary/40 ring-1 ring-primary/10"
                    : "bg-surface-card/60 border-border-subtle"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border ${n.color}`}>
                        {n.badge}
                      </span>
                      <span className="text-[11px] font-mono text-outline">{n.timestamp}</span>
                      {n.unread && (
                        <span className="w-2 h-2 rounded-full bg-status-verified animate-ping"></span>
                      )}
                    </div>

                    <h3 className="font-serif text-lg text-primary font-medium">{n.title}</h3>
                    <p className="text-xs text-secondary font-light max-w-3xl leading-relaxed">
                      {n.description}
                    </p>
                  </div>

                  <Link
                    href={n.actionUrl}
                    className="px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs text-primary font-semibold transition-colors shrink-0 self-start"
                  >
                    {n.actionLabel} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
