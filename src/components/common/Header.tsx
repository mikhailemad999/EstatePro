"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEstateStore } from "@/store/useEstateStore";
import { useAuthStore } from "@/store/useAuthStore";
import RoleSwitcher from "./RoleSwitcher";
import CurrencySwitcher from "./CurrencySwitcher";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { favorites, compareList } = useEstateStore();
  const { user } = useAuthStore();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Dynamic scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on outside click or route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Primary navigation links visible on desktop
  const primaryNavLinks = [
    { label: "Buy", href: "/properties?listingType=FOR_SALE" },
    { label: "Rent", href: "/properties?listingType=FOR_RENT" },
    { label: "Commercial", href: "/properties?propertyType=Commercial" },
    { label: "Developments", href: "/developments" },
    { label: "Map", href: "/map" },
    { label: "Agents", href: "/agents" },
  ];

  // Secondary links placed in luxury "More" dropdown for clean layout
  const secondaryNavLinks = [
    { label: "Mortgage Calculator", href: "/mortgage-calculator", icon: "calculate" },
    { label: "Market Monographs", href: "/reports", icon: "monitoring" },
    { label: "Research & Blog", href: "/blog", icon: "article" },
    { label: "Membership & Pricing", href: "/pricing", icon: "workspace_premium" },
    { label: "Client FAQ", href: "/faq", icon: "quiz" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/properties?location=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  // Determine portal URL based on user role
  const portalUrl =
    user.role === "SUPER_ADMIN"
      ? "/admin"
      : user.role === "AGENT"
      ? "/agent/dashboard"
      : "/dashboard";

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "h-16 bg-[#0a0a0a]/95 backdrop-blur-2xl border-b border-white/[0.1] shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
            : "h-20 bg-surface-lowest/85 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
        }`}
      >
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 sm:gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
              <div
                className={`rounded bg-primary flex items-center justify-center text-on-primary font-serif font-bold tracking-tighter group-hover:bg-primary-container transition-all shadow-md ${
                  scrolled ? "w-7 h-7 text-base" : "w-8 h-8 text-lg"
                }`}
              >
                EP
              </div>
              <div className="flex flex-col">
                <span
                  className={`font-serif tracking-tight text-primary uppercase font-medium leading-tight transition-all ${
                    scrolled ? "text-base" : "text-lg"
                  }`}
                >
                  EstatePro
                </span>
                <span className="font-sans text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-secondary/80 -mt-0.5">
                  Private Reserve
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {primaryNavLinks.map((link) => {
              const active = pathname.startsWith(link.href.split("?")[0]) && link.href !== "/";
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative py-1 text-xs uppercase tracking-wider transition-all font-medium group ${
                    active
                      ? "text-primary font-bold"
                      : "text-on-surface-variant hover:text-primary"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full animate-fade-in-down shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                  )}
                  {!active && (
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-primary/60 transition-all duration-300 group-hover:w-full" />
                  )}
                </Link>
              );
            })}

            {/* "More" Dropdown Menu */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`flex items-center gap-1 text-xs uppercase tracking-wider transition-colors font-medium py-1 ${
                  moreDropdownOpen
                    ? "text-primary"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                <span>More</span>
                <span
                  className={`material-symbols-outlined text-[16px] transition-transform duration-200 ${
                    moreDropdownOpen ? "rotate-180 text-primary" : "text-outline"
                  }`}
                >
                  expand_more
                </span>
              </button>

              {moreDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 rounded-xl bg-surface-elevated/95 backdrop-blur-2xl border border-white/10 shadow-2xl p-2 z-50 animate-slide-down">
                  <div className="px-3 py-1.5 border-b border-border-subtle mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-outline">
                      Intelligence &amp; Tools
                    </span>
                  </div>
                  {secondaryNavLinks.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMoreDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs rounded-lg text-secondary hover:text-primary hover:bg-surface-container transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px] text-outline">
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Action Controls & User Suite */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Quick Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-full transition-all"
              title="Quick Search"
              aria-label="Open Search"
            >
              <span className="material-symbols-outlined text-[20px]">
                {searchOpen ? "close" : "search"}
              </span>
            </button>

            {/* Currency / Language Switcher */}
            <div className="hidden xl:flex">
              <CurrencySwitcher />
            </div>

            {/* Role Switcher */}
            <div className="hidden sm:block">
              <RoleSwitcher />
            </div>

            {/* Comparison Tray Link */}
            <Link
              href="/compare"
              className="relative p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-full transition-all"
              title="Comparison Matrix"
            >
              <span className="material-symbols-outlined text-[20px]">balance</span>
              {compareList.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-chart-accent text-[9px] font-bold text-on-primary flex items-center justify-center animate-pulse">
                  {compareList.length}
                </span>
              )}
            </Link>

            {/* Saved Properties Link */}
            <Link
              href="/dashboard/saved"
              className="relative p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-full transition-all"
              title="Saved Estates"
            >
              <span className="material-symbols-outlined text-[20px]">favorite</span>
              {favorites.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 text-[9px] font-bold text-white flex items-center justify-center shadow-sm">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* List Property CTA */}
            <Link
              href="/agent/properties/create"
              className="hidden md:inline-flex items-center text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-border-hairline hover:border-primary/40 hover:bg-surface-elevated text-secondary hover:text-primary transition-all font-medium"
            >
              List Property
            </Link>

            {/* Portal Access / User Profile Link */}
            <Link
              href={portalUrl}
              className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs uppercase tracking-wider px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary text-on-primary hover:bg-primary-container transition-all font-semibold shadow-md active:scale-95"
            >
              <span>{user.role === "GUEST" ? "Sign In" : "Portal"}</span>
              <span className="material-symbols-outlined text-[14px] sm:text-[16px]">
                arrow_forward
              </span>
            </Link>

            {/* Mobile menu hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-lg transition-colors ml-0.5"
              aria-label="Toggle navigation menu"
            >
              <span className="material-symbols-outlined text-[24px]">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Global Quick Search Dropdown Bar */}
        {searchOpen && (
          <div className="w-full bg-[#0d0d0d]/98 backdrop-blur-2xl border-b border-white/10 px-4 sm:px-6 py-3 shadow-2xl animate-slide-down">
            <div className="max-w-4xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-[22px]">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search destinations, villas, penthouses (e.g. Zurich, Geneva, Mayfair)..."
                  className="w-full bg-transparent text-sm sm:text-base text-primary placeholder-on-surface-variant/50 focus:outline-none font-light py-1"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-full bg-primary text-on-primary text-xs uppercase tracking-wider font-semibold hover:bg-primary-container transition-colors shrink-0"
                >
                  Search
                </button>
              </form>
              <div className="flex flex-wrap items-center gap-2 mt-2 pt-2 border-t border-white/[0.05] text-[11px] text-secondary/70">
                <span className="uppercase tracking-wider text-[10px] text-outline font-mono">
                  Quick Submarkets:
                </span>
                {["Zurich", "Geneva", "Tribeca", "Mayfair", "Tokyo"].map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => {
                      router.push(`/properties?location=${city}`);
                      setSearchOpen(false);
                    }}
                    className="hover:text-primary transition-colors underline-offset-2 hover:underline"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer Backdrop & Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 sm:top-20 z-40 lg:hidden">
          {/* Backdrop blur */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative bg-[#111111]/98 border-b border-white/10 shadow-2xl max-h-[calc(100vh-4rem)] overflow-y-auto p-5 sm:p-6 space-y-5 animate-slide-down">
            {/* Mobile Role Switcher for easy testing on mobile */}
            <div className="p-3 rounded-xl bg-surface-container border border-white/5 flex items-center justify-between">
              <span className="text-xs text-secondary font-medium">Clearance &amp; Role</span>
              <RoleSwitcher />
            </div>

            {/* Core Portfolios */}
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-outline block mb-2">
                Core Portfolios
              </span>
              <div className="grid grid-cols-2 gap-2">
                {primaryNavLinks.map((link) => {
                  const active = pathname.startsWith(link.href.split("?")[0]) && link.href !== "/";
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                        active
                          ? "bg-primary text-on-primary font-bold shadow-sm"
                          : "bg-surface-container text-on-surface hover:text-primary hover:bg-surface-container-high"
                      }`}
                    >
                      <span>{link.label}</span>
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Intelligence & Resources */}
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-outline block mb-2">
                Intelligence &amp; Advisory
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {secondaryNavLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-secondary hover:text-primary hover:bg-surface-container transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px] text-outline">
                      {link.icon}
                    </span>
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Footer Utility Actions */}
            <div className="pt-4 border-t border-border-subtle flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <CurrencySwitcher />
                <div className="flex items-center gap-4 text-xs text-secondary">
                  <Link
                    href="/compare"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-1.5 hover:text-primary"
                  >
                    <span className="material-symbols-outlined text-[18px]">balance</span>
                    <span>Compare ({compareList.length})</span>
                  </Link>
                  <Link
                    href="/dashboard/saved"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-1.5 hover:text-primary"
                  >
                    <span className="material-symbols-outlined text-[18px]">favorite</span>
                    <span>Saved ({favorites.length})</span>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link
                  href="/agent/properties/create"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center text-xs uppercase tracking-wider font-semibold rounded-lg border border-border-hairline text-primary hover:bg-surface-container transition-colors"
                >
                  + List Property
                </Link>
                <Link
                  href={portalUrl}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center text-xs uppercase tracking-wider font-semibold rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-colors shadow-md"
                >
                  Access Portal
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

