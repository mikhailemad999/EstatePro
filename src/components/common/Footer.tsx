import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-surface-lowest border-t border-white/[0.06] pt-16 pb-12 text-on-surface-variant">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded bg-primary flex items-center justify-center text-on-primary font-serif font-bold text-sm">
                EP
              </div>
              <span className="font-serif text-lg text-primary tracking-tight uppercase">
                EstatePro Private Reserve
              </span>
            </div>
            <p className="text-sm text-secondary leading-relaxed max-w-sm font-light">
              The sovereign institutional standard for ultra-prime architectural real estate, heritage compounds, and cross-border family office wealth preservation.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-outline">
              <span className="inline-block w-2 h-2 rounded-full bg-status-verified"></span>
              <span>Encrypted FINMA &amp; SEC Escrow Protocols</span>
            </div>
          </div>

          {/* Portfolios */}
          <div className="space-y-3">
            <h4 className="font-sans text-xs uppercase tracking-widest text-primary font-semibold">
              Portfolios
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/properties?typology=Brutalist Villa" className="hover:text-primary transition-colors">
                  Brutalist Villas
                </Link>
              </li>
              <li>
                <Link href="/properties?typology=Penthouse & Duplex" className="hover:text-primary transition-colors">
                  Sky Penthouses
                </Link>
              </li>
              <li>
                <Link href="/properties?typology=Waterfront Compound" className="hover:text-primary transition-colors">
                  Waterfront Estates
                </Link>
              </li>
              <li>
                <Link href="/properties?typology=Historic Palazzo" className="hover:text-primary transition-colors">
                  Historic Palazzos
                </Link>
              </li>
              <li>
                <Link href="/developments" className="hover:text-primary transition-colors">
                  Architectural Developments
                </Link>
              </li>
            </ul>
          </div>

          {/* Services & Financials */}
          <div className="space-y-3">
            <h4 className="font-sans text-xs uppercase tracking-widest text-primary font-semibold">
              Institutional
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/mortgage-calculator" className="hover:text-primary transition-colors">
                  Private Wealth Mortgage
                </Link>
              </li>
              <li>
                <Link href="/vip-viewing" className="hover:text-primary transition-colors">
                  VIP Aviation Itinerary
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-primary transition-colors">
                  Comparison Matrix
                </Link>
              </li>
              <li>
                <Link href="/agents" className="hover:text-primary transition-colors">
                  Sovereign Brokers Roster
                </Link>
              </li>
              <li>
                <Link href="/reports" className="hover:text-primary transition-colors">
                  Market Monographs
                </Link>
              </li>
            </ul>
          </div>

          {/* Governance & Portals */}
          <div className="space-y-3">
            <h4 className="font-sans text-xs uppercase tracking-widest text-primary font-semibold">
              Governance
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/dashboard" className="hover:text-primary transition-colors">
                  Private Investor Portal
                </Link>
              </li>
              <li>
                <Link href="/agent/dashboard" className="hover:text-primary transition-colors">
                  Agent CRM Command
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-primary transition-colors">
                  Overseer Administration
                </Link>
              </li>
              <li>
                <Link href="/admin/approvals" className="hover:text-primary transition-colors">
                  Listing Compliance Queue
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-outline font-light">
          <p>© {new Date().getFullYear()} EstatePro Sovereign Capital SA. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-primary transition-colors cursor-pointer">Security Vault</span>
            <span className="hover:text-primary transition-colors cursor-pointer">Privacy Charter</span>
            <span className="hover:text-primary transition-colors cursor-pointer">Regulatory Disclosures</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
