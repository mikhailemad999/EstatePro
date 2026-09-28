"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BuyerSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: "Investor Overview", href: "/dashboard", icon: "dashboard" },
    { label: "Encrypted Inquiries", href: "/dashboard/messages", icon: "chat" },
    { label: "Saved Estates", href: "/dashboard/saved", icon: "favorite" },
    { label: "Saved Search Alerts", href: "/dashboard/searches", icon: "notifications_active" },
    { label: "Acquisition Mandates", href: "/dashboard/inquiries", icon: "assignment" },
    { label: "VIP Viewings", href: "/dashboard/appointments", icon: "calendar_month" },
    { label: "Notification Feed", href: "/dashboard/notifications", icon: "mark_email_unread" },
    { label: "Escrow Closing Room", href: "/escrow/solis-sanctuary", icon: "lock" },
    { label: "Geospatial Map", href: "/map", icon: "map" },
  ];

  return (
    <>
      {/* Mobile Floating Menu Trigger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed bottom-6 right-6 z-50 px-4 py-3 rounded-full bg-primary text-on-primary font-semibold text-xs uppercase tracking-wider shadow-2xl flex items-center gap-2 active:scale-95 transition-transform border border-white/20"
        aria-label="Open Dashboard Menu"
      >
        <span className="material-symbols-outlined text-[18px]">menu</span>
        <span>Dashboard</span>
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
              <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded bg-primary flex items-center justify-center text-on-primary font-serif font-bold text-sm">
                  SH
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-sm tracking-tight text-primary font-semibold">Private Investor</span>
                  <span className="text-[9px] text-secondary uppercase">Family Office</span>
                </div>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-lg text-secondary hover:text-primary"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
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
                ← Back to Main Site
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
    </>
  );
}
