"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function AgentSidebar() {
  const pathname = usePathname();
  const { user } = useAuthStore();

  const links = [
    { label: "Overview / Dashboard", href: "/agent/dashboard", icon: "dashboard" },
    { label: "Encrypted Messages", href: "/agent/messages", icon: "forum" },
    { label: "My Properties", href: "/agent/properties", icon: "apartment" },
    { label: "Leads CRM Pipeline", href: "/agent/leads", icon: "filter_alt" },
    { label: "Mandate Analytics", href: "/agent/analytics", icon: "analytics" },
    { label: "Appointments & VIP Viewings", href: "/dashboard/appointments", icon: "calendar_month" },
    { label: "Mortgage Applications", href: "/mortgage-calculator", icon: "account_balance" },
    { label: "Public Directory", href: "/agents", icon: "badge" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-surface-container-lowest border-r border-border-subtle z-50 flex flex-col justify-between hidden md:flex">
      <div className="flex flex-col h-full">
        {/* Brand & Mandate */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-border-subtle">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-on-primary font-serif font-bold text-sm">
              EP
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base tracking-tight text-primary font-semibold">EstatePro</span>
              <span className="text-[10px] text-on-surface-variant uppercase tracking-wider">Brokerage CRM</span>
            </div>
          </Link>
        </div>

        {/* Create Listing CTA */}
        <div className="px-5 py-4">
          <Link
            href="/agent/properties/create"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary text-on-primary font-semibold text-xs uppercase tracking-wider transition-transform hover:-translate-y-0.5 shadow-lg"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>New Sovereign Listing</span>
          </Link>
        </div>

        {/* Section Header */}
        <div className="px-6 py-2">
          <span className="text-[10px] uppercase font-mono text-outline tracking-widest">Portfolio Management</span>
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

        {/* Bottom Agent Card */}
        <div className="p-4 mt-auto border-t border-border-subtle">
          <div className="bg-surface-card rounded-xl p-4 border border-border-subtle">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-chart-accent text-[20px]">verified</span>
              <span className="text-xs font-semibold text-on-surface uppercase tracking-wider">Private Reserve</span>
            </div>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              Managing mandate for {user.name}.
            </p>
            <div className="mt-3 pt-3 border-t border-border-subtle flex items-center justify-between">
              <Link href="/" className="text-[11px] text-secondary hover:text-primary transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                <span>Marketplace</span>
              </Link>
              <span className="text-[9px] uppercase font-mono text-status-verified font-bold tracking-widest">
                Tier 1 Node
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
