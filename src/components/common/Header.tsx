"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEstateStore } from "@/store/useEstateStore";
import { useAuthStore } from "@/store/useAuthStore";
import RoleSwitcher from "./RoleSwitcher";
import CurrencySwitcher from "./CurrencySwitcher";

export default function Header() {
  const pathname = usePathname();
  const { favorites, compareList } = useEstateStore();
  const { user, isAuthenticated } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Buy", href: "/properties?listingType=FOR_SALE" },
    { label: "Rent", href: "/properties?listingType=FOR_RENT" },
    { label: "Commercial", href: "/properties?propertyType=Commercial" },
    { label: "Developments", href: "/developments" },
    { label: "Agents", href: "/agents" },
    { label: "Mortgage", href: "/mortgage-calculator" },
    { label: "Reports", href: "/reports" },
  ];

  // Determine portal URL based on user role
  const portalUrl =
    user.role === "SUPER_ADMIN"
      ? "/admin"
      : user.role === "AGENT"
      ? "/agent/dashboard"
      : "/dashboard";

  return (
    <header className="fixed top-0 w-full z-50 bg-surface-lowest/90 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo & Reserve Title */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-on-primary font-serif font-bold text-lg tracking-tighter group-hover:bg-primary-container transition-colors">
              EP
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-tight text-primary uppercase font-medium">
                EstatePro
              </span>
              <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-secondary -mt-1">
                Private Reserve
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => {
            const active = pathname.startsWith(link.href.split("?")[0]) && link.href !== "/";
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-xs uppercase tracking-wider transition-colors font-medium ${
                  active
                    ? "text-primary font-bold"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls & User Suite */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Currency / Language Switcher */}
          <div className="hidden md:flex">
            <CurrencySwitcher />
          </div>

          {/* Role Switcher */}
          <RoleSwitcher />

          {/* Comparison Tray Link */}
          <Link
            href="/compare"
            className="relative p-2 text-on-surface-variant hover:text-on-surface transition-colors"
            title="Comparison Matrix"
          >
            <span className="material-symbols-outlined text-[20px]">balance</span>
            {compareList.length > 0 && (
              <span className="absolute top-1.5 right-1 w-4 h-4 rounded-full bg-chart-accent text-[9px] font-bold text-on-primary flex items-center justify-center">
                {compareList.length}
              </span>
            )}
          </Link>

          {/* Saved Properties Link */}
          <Link
            href="/dashboard/saved"
            className="relative p-2 text-on-surface-variant hover:text-on-surface transition-colors"
            title="Saved Estates"
          >
            <span className="material-symbols-outlined text-[20px]">favorite</span>
            {favorites.length > 0 && (
              <span className="absolute top-1.5 right-1 w-4 h-4 rounded-full bg-surface-container-high text-[9px] font-bold text-primary flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* List Property CTA */}
          <Link
            href="/agent/properties/create"
            className="hidden sm:inline-flex items-center text-xs uppercase tracking-wider px-3.5 py-2 rounded-full border border-border-hairline hover:bg-surface-elevated text-secondary hover:text-primary transition-all font-medium"
          >
            List Property
          </Link>

          {/* Portal Access / User Profile Link */}
          <Link
            href={portalUrl}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider px-4 py-2 rounded-full bg-primary text-on-primary hover:bg-primary-container transition-all font-semibold shadow-md"
          >
            <span>{user.role === "GUEST" ? "Sign In" : "Portal"}</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-on-surface-variant hover:text-primary"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface-container-low border-b border-border-subtle px-6 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-border-subtle">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-on-surface-variant hover:text-primary py-1.5"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-between pt-2">
            <CurrencySwitcher />
            <Link
              href="/agent/properties/create"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs uppercase tracking-wider text-primary font-semibold"
            >
              + Create Listing
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
