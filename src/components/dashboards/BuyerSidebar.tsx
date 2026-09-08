"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BuyerSidebar() {
  const pathname = usePathname();

  const links = [
    { label: "Investor Overview", href: "/dashboard", icon: "dashboard" },
    { label: "Encrypted Inquiries", href: "/dashboard/messages", icon: "chat" },
    { label: "Saved Estates & Watchlist", href: "/dashboard/saved", icon: "favorite" },
    { label: "Scheduled VIP Viewings", href: "/dashboard/appointments", icon: "calendar_month" },
    { label: "Escrow Closing Room", href: "/escrow/solis-sanctuary", icon: "lock" },
    { label: "Browse Marketplace", href: "/properties", icon: "travel_explore" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-surface-container-lowest border-r border-border-subtle z-50 flex flex-col justify-between hidden md:flex">
      <div className="flex flex-col h-full">
        {/* Brand & Mandate */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-border-subtle">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-on-primary font-serif font-bold text-sm">
              SH
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base tracking-tight text-primary font-semibold">Private Investor</span>
              <span className="text-[10px] text-on-surface-variant uppercase tracking-wider">Family Office Vault</span>
            </div>
          </Link>
        </div>

        {/* Section Header */}
        <div className="px-6 py-4">
          <span className="text-[10px] uppercase font-mono text-outline tracking-widest">Mandate Portfolio</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                  active
                    ? "bg-primary text-on-primary shadow"
                    : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Investor Status */}
        <div className="p-4 mt-auto border-t border-border-subtle">
          <div className="bg-surface-card rounded-xl p-4 border border-border-subtle">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-chart-accent text-[20px]">verified_user</span>
              <span className="text-xs font-semibold text-on-surface uppercase tracking-wider">Sovereign Tier</span>
            </div>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              Lord Alistair Sterling • Family Office Principal.
            </p>
            <div className="mt-3 pt-3 border-t border-border-subtle flex items-center justify-between text-[10px] text-outline">
              <Link href="/" className="hover:text-primary transition-colors">
                ← Exit Portal
              </Link>
              <span className="text-status-verified font-mono">KYC CLEARED</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
