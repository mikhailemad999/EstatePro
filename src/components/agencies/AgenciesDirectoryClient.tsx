"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

interface AgencyItem {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  country: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  tier: string | null;
  description: string | null;
  grossVolume: number;
  propertiesCount?: number;
  agents: {
    id: string;
    title: string;
    user: {
      name: string;
      avatar: string | null;
    };
  }[];
}

export default function AgenciesDirectoryClient({ initialAgencies }: { initialAgencies: AgencyItem[] }) {
  const [query, setQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("ALL");
  const [inquiryModalAgency, setInquiryModalAgency] = useState<AgencyItem | null>(null);
  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [inquiryEntity, setInquiryEntity] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");

  const regions = [
    { id: "ALL", label: "All Regions" },
    { id: "CH", label: "Switzerland" },
    { id: "UAE", label: "United Arab Emirates" },
    { id: "MC", label: "Monaco & Riviera" },
    { id: "UK", label: "United Kingdom" },
    { id: "US", label: "Americas" },
  ];

  const filteredAgencies = useMemo(() => {
    let list = [...initialAgencies];

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          (a.country && a.country.toLowerCase().includes(q)) ||
          (a.address && a.address.toLowerCase().includes(q)) ||
          (a.description && a.description.toLowerCase().includes(q))
      );
    }

    if (selectedRegion !== "ALL") {
      const reg = selectedRegion.toLowerCase();
      list = list.filter(
        (a) =>
          (a.country && a.country.toLowerCase().includes(reg)) ||
          (reg === "ch" && ((a.country && a.country.toLowerCase().includes("switz")) || (a.address && (a.address.toLowerCase().includes("zurich") || a.address.toLowerCase().includes("geneva"))))) ||
          (reg === "uae" && ((a.country && a.country.toLowerCase().includes("emirates")) || (a.address && a.address.toLowerCase().includes("dubai")))) ||
          (reg === "mc" && (a.country && (a.country.toLowerCase().includes("monaco") || a.country.toLowerCase().includes("france")))) ||
          (reg === "uk" && ((a.country && a.country.toLowerCase().includes("kingdom")) || (a.address && a.address.toLowerCase().includes("london")))) ||
          (reg === "us" && ((a.country && a.country.toLowerCase().includes("united states")) || (a.address && (a.address.toLowerCase().includes("york") || a.address.toLowerCase().includes("miami")))))
      );
    }

    return list;
  }, [initialAgencies, query, selectedRegion]);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySuccess(true);
    setTimeout(() => {
      setInquirySuccess(false);
      setInquiryModalAgency(null);
      setInquiryEntity("");
      setInquiryEmail("");
    }, 2400);
  };

  return (
    <div className="space-y-10">
      {/* Search & Filter Bar */}
      <div className="bg-surface-card border border-border-subtle p-5 rounded-2xl shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[18px]">
              search
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by agency name, country, or private jurisdiction..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-border-subtle text-xs text-primary placeholder-outline focus:border-outline-variant outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary text-xs"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto">
            {regions.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedRegion(r.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-mono text-[11px] transition-all ${
                  selectedRegion === r.id
                    ? "bg-primary text-on-primary font-bold shadow-xs"
                    : "bg-surface-container text-secondary hover:text-primary"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredAgencies.map((agency) => (
          <div
            key={agency.id}
            className="rounded-2xl bg-surface-card border border-border-subtle p-8 flex flex-col justify-between space-y-6 hover:border-outline-variant transition-all duration-300 shadow-xl"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-status-verified/15 text-status-verified text-[10px] font-mono uppercase font-bold tracking-wider">
                  {agency.tier || "Sovereign Member"}
                </span>
                <span className="text-xs text-secondary font-mono">
                  {agency.address || agency.country || "Global Headquarters"}
                </span>
              </div>

              <h3 className="font-serif text-2xl text-primary font-medium">{agency.name}</h3>
              <p className="text-xs text-secondary font-light leading-relaxed line-clamp-3">
                {agency.description ||
                  "Premier global advisory for trophy architectural acquisitions, heritage palazzos, and sovereign private islands."}
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-border-subtle">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface-container p-3 rounded-xl text-center">
                  <span className="text-[10px] uppercase font-mono text-outline block">Historical Volume</span>
                  <span className="font-serif text-lg text-primary font-medium">
                    ${(agency.grossVolume / 1000000).toFixed(0)}M+
                  </span>
                </div>
                <div className="bg-surface-container p-3 rounded-xl text-center">
                  <span className="text-[10px] uppercase font-mono text-outline block">Accredited Partners</span>
                  <span className="font-serif text-lg text-primary font-medium">
                    {agency.agents.length} Leads
                  </span>
                </div>
              </div>

              {agency.agents.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-mono text-outline block">
                    Managing Partner Delegation
                  </span>
                  <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                    {agency.agents.map((ag) => (
                      <Link
                        key={ag.id}
                        href={`/agents/${ag.id}`}
                        className="flex items-center gap-2 bg-surface border border-border-subtle px-2.5 py-1.5 rounded-lg hover:border-outline-variant transition-all shrink-0"
                      >
                        <img
                          src={ag.user.avatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"}
                          alt={ag.user.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-[11px] text-primary font-mono">{ag.user.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2 flex items-center gap-3">
                <Link
                  href={`/agencies/${agency.slug || agency.id}`}
                  className="flex-1 py-2.5 rounded-lg bg-primary text-on-primary text-xs font-semibold uppercase tracking-wider block text-center hover:bg-primary-container transition-all shadow"
                >
                  Explore Desk Portfolios
                </Link>
                <button
                  onClick={() => setInquiryModalAgency(agency)}
                  className="py-2.5 px-4 rounded-lg border border-border-subtle hover:bg-surface-container text-xs text-primary font-mono font-medium transition-all"
                >
                  Retain Agency
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Retain Agency Modal */}
      {inquiryModalAgency && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-card border border-border-subtle max-w-md w-full rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <div>
                <h3 className="font-serif text-lg text-primary">Retain Institutional Desk</h3>
                <span className="text-xs text-secondary font-mono">{inquiryModalAgency.name}</span>
              </div>
              <button onClick={() => setInquiryModalAgency(null)} className="text-secondary hover:text-primary">
                ✕
              </button>
            </div>

            {inquirySuccess ? (
              <div className="p-6 text-center space-y-2">
                <span className="material-symbols-outlined text-status-verified text-4xl">check_circle</span>
                <h4 className="font-serif text-lg text-primary">Mandate Received</h4>
                <p className="text-xs text-secondary font-light">
                  Institutional contact protocols have been initiated with {inquiryModalAgency.name}. Their managing partner will contact your family office desk.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-secondary mb-1">Purchaser / Institution Entity</label>
                  <input
                    type="text"
                    required
                    value={inquiryEntity}
                    onChange={(e) => setInquiryEntity(e.target.value)}
                    placeholder="e.g. Sovereign Wealth Fund / Family Office"
                    className="w-full p-2.5 rounded-xl bg-surface border border-border-subtle text-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-secondary mb-1">Confidential Liaison Email</label>
                  <input
                    type="email"
                    required
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    placeholder="mandate@institution.com"
                    className="w-full p-2.5 rounded-xl bg-surface border border-border-subtle text-primary outline-none"
                  />
                </div>
                <div className="pt-2 flex justify-end gap-2 border-t border-border-subtle">
                  <button
                    type="button"
                    onClick={() => setInquiryModalAgency(null)}
                    className="px-4 py-2 rounded-xl text-secondary hover:bg-surface-container"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-primary text-on-primary font-semibold shadow"
                  >
                    Initiate Institutional Retainer
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
