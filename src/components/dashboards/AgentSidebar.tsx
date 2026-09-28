"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function AgentSidebar() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);

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
    <>
      {/* Mobile Floating Menu Trigger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed bottom-6 right-6 z-50 px-4 py-3 rounded-full bg-primary text-on-primary font-semibold text-xs uppercase tracking-wider shadow-2xl flex items-center gap-2 active:scale-95 transition-transform border border-white/20"
        aria-label="Open Agent Menu"
      >
        <span className="material-symbols-outlined text-[18px]">menu</span>
        <span>Agent CRM</span>
      </button>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative w-80 max-w-[85vw] h-full bg-[#111111] border-r border-border-subtle flex flex-col justify-between p-4 z-10 animate-slide-down">
            <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
              <Link href="/agent/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded bg-primary flex items-center justify-center text-on-primary font-serif font-bold text-sm">
                  EP
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-sm tracking-tight text-primary font-semibold">EstatePro</span>
                  <span className="text-[9px] text-secondary uppercase">Brokerage CRM</span>
                </div>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-lg text-secondary hover:text-primary"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="py-3">
              <Link
                href="/agent/properties/create"
                onClick={() => setMobileOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-primary text-on-primary font-semibold text-xs uppercase tracking-wider"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                <span>List New Estate</span>
              </Link>
            </div>

            <nav className="flex-1 py-2 space-y-1 overflow-y-auto">
              {links.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                      active
                        ? "bg-primary text-on-primary shadow"
                        : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-border-subtle flex items-center justify-between text-xs">
              <Link href="/" onClick={() => setMobileOpen(false)} className="text-secondary hover:text-primary">
                ← Back to Marketplace
              </Link>
            </div>
          </aside>
        </div>
      )}

      {/* Desktop Persistent Sidebar */}
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
    </>
  );
}
