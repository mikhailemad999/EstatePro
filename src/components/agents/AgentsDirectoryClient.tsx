"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

interface AgentItem {
  id: string;
  title: string;
  licenseNumber: string | null;
  grossMandateBook: number;
  activeMandates: number;
  rating: number;
  specializations: string | null;
  bio: string | null;
  user: {
    name: string;
    email: string;
    phone: string | null;
    avatar: string | null;
  };
  agency?: {
    name: string;
    country: string | null;
  } | null;
}

export default function AgentsDirectoryClient({ initialAgents }: { initialAgents: AgentItem[] }) {
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [sortBy, setSortBy] = useState<"book_desc" | "mandates_desc" | "rating_desc" | "name_asc">("book_desc");
  const [consultModalAgent, setConsultModalAgent] = useState<AgentItem | null>(null);
  const [consultSuccess, setConsultSuccess] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientNotes, setClientNotes] = useState("");

  const specializationTags = [
    { id: "ALL", label: "All Disciplines" },
    { id: "PENTHOUSE", label: "Trophy Penthouses" },
    { id: "CHALET", label: "Alpine Chalets" },
    { id: "ISLAND", label: "Private Islands" },
    { id: "PALAZZO", label: "Historic Palazzos" },
    { id: "TRUST", label: "Family Office Trusts" },
  ];

  const filteredAgents = useMemo(() => {
    let list = [...initialAgents];

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (a) =>
          a.user.name.toLowerCase().includes(q) ||
          (a.title && a.title.toLowerCase().includes(q)) ||
          (a.agency?.name && a.agency.name.toLowerCase().includes(q)) ||
          (a.specializations && a.specializations.toLowerCase().includes(q)) ||
          (a.licenseNumber && a.licenseNumber.toLowerCase().includes(q))
      );
    }

    if (selectedTag !== "ALL") {
      const tagLower = selectedTag.toLowerCase();
      list = list.filter((a) => {
        const spec = (a.specializations || "").toLowerCase();
        const title = (a.title || "").toLowerCase();
        return spec.includes(tagLower) || title.includes(tagLower);
      });
    }

    list.sort((a, b) => {
      if (sortBy === "book_desc") return b.grossMandateBook - a.grossMandateBook;
      if (sortBy === "mandates_desc") return b.activeMandates - a.activeMandates;
      if (sortBy === "rating_desc") return b.rating - a.rating;
      if (sortBy === "name_asc") return a.user.name.localeCompare(b.user.name);
      return 0;
    });

    return list;
  }, [initialAgents, query, selectedTag, sortBy]);

  const totalBookBillions = useMemo(() => {
    const sum = initialAgents.reduce((acc, a) => acc + (a.grossMandateBook || 0), 0);
    return (sum / 1000000000).toFixed(2);
  }, [initialAgents]);

  const totalActiveMandates = useMemo(() => {
    return initialAgents.reduce((acc, a) => acc + (a.activeMandates || 0), 0);
  }, [initialAgents]);

  const handleBookConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    setConsultSuccess(true);
    setTimeout(() => {
      setConsultSuccess(false);
      setConsultModalAgent(null);
      setClientName("");
      setClientEmail("");
      setClientNotes("");
    }, 2400);
  };

  return (
    <div className="space-y-10">
      {/* Top Search & Filter Bar */}
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
              placeholder="Search by advisor name, guild firm, or specialization..."
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

          <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
            <span className="text-xs text-secondary font-mono">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-surface border border-border-subtle text-xs text-primary rounded-xl px-3 py-2 outline-none cursor-pointer"
            >
              <option value="book_desc">Gross Mandate Book (Highest)</option>
              <option value="mandates_desc">Active Mandate Volume</option>
              <option value="rating_desc">Highest Advisor Rating</option>
              <option value="name_asc">Advisor Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
          {specializationTags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => setSelectedTag(tag.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-mono text-[11px] transition-all ${
                selectedTag === tag.id
                  ? "bg-primary text-on-primary font-bold shadow-xs"
                  : "bg-surface-container text-secondary hover:text-primary"
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>

      {/* Aggregate Telemetry Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-surface-card border border-border-subtle p-4 rounded-xl">
          <span className="text-[10px] uppercase font-mono text-outline block">Accredited Advisors</span>
          <span className="font-serif text-2xl text-primary font-medium">{filteredAgents.length}</span>
          <span className="text-[10px] text-secondary block mt-0.5">Vetted institutional leads</span>
        </div>
        <div className="bg-surface-card border border-border-subtle p-4 rounded-xl">
          <span className="text-[10px] uppercase font-mono text-outline block">Combined Mandate Volume</span>
          <span className="font-serif text-2xl text-primary font-medium">${totalBookBillions}B</span>
          <span className="text-[10px] text-secondary block mt-0.5">Sovereign advisory assets</span>
        </div>
        <div className="bg-surface-card border border-border-subtle p-4 rounded-xl">
          <span className="text-[10px] uppercase font-mono text-outline block">Active Private Portfolios</span>
          <span className="font-serif text-2xl text-primary font-medium">{totalActiveMandates}</span>
          <span className="text-[10px] text-secondary block mt-0.5">Exclusive off-market</span>
        </div>
        <div className="bg-surface-card border border-border-subtle p-4 rounded-xl">
          <span className="text-[10px] uppercase font-mono text-outline block">Global Jurisdictions</span>
          <span className="font-serif text-2xl text-primary font-medium">18</span>
          <span className="text-[10px] text-secondary block mt-0.5">Zurich • London • Dubai</span>
        </div>
      </div>

      {/* Roster Grid */}
      {filteredAgents.length === 0 ? (
        <div className="bg-surface-card border border-border-subtle rounded-2xl p-12 text-center space-y-3">
          <span className="material-symbols-outlined text-outline text-4xl">person_search</span>
          <h3 className="font-serif text-xl text-primary font-medium">No Sovereign Advisors Found</h3>
          <p className="text-xs text-secondary max-w-md mx-auto">
            No private advisors currently match your active search terms. Try clearing your filters or changing specializations.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setSelectedTag("ALL");
            }}
            className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-semibold uppercase tracking-wider"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAgents.map((agent) => (
            <div
              key={agent.id}
              className="rounded-2xl bg-surface-card border border-border-subtle p-6 flex flex-col justify-between space-y-6 hover:border-outline-variant transition-all duration-300 shadow-xl"
            >
              <div className="flex items-start gap-4">
                <img
                  src={agent.user.avatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"}
                  alt={agent.user.name}
                  className="w-20 h-20 rounded-full object-cover border border-white/10 shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="font-serif text-lg text-primary font-medium truncate">{agent.user.name}</h3>
                    <span className="material-symbols-outlined text-chart-accent text-[18px]">verified</span>
                  </div>
                  <p className="text-xs text-secondary leading-snug mt-0.5">{agent.title}</p>
                  <span className="text-[10px] uppercase font-mono text-outline block mt-1 truncate">
                    {agent.agency?.name || "Sovereign Guild Partner"}
                  </span>
                  <span className="text-[10px] font-mono text-status-verified block mt-0.5">
                    {agent.licenseNumber || "FINMA-SOV-84920"}
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-border-subtle text-xs">
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="bg-surface-container p-2.5 rounded-lg">
                    <span className="text-[9px] uppercase font-mono text-outline block">Gross Mandate</span>
                    <span className="font-serif text-base text-primary font-medium">
                      ${(agent.grossMandateBook / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <div className="bg-surface-container p-2.5 rounded-lg">
                    <span className="text-[9px] uppercase font-mono text-outline block">Active Mandates</span>
                    <span className="font-serif text-base text-primary font-medium">
                      {agent.activeMandates} Portfolios
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-secondary font-light line-clamp-2">
                  Specializations: {agent.specializations || "Cross-Border Trophy Acquisitions, High-Altitude Chalets, Offshore Trusts"}
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <Link
                  href={`/agents/${agent.id}`}
                  className="w-full py-2.5 rounded-lg bg-primary text-on-primary text-xs font-semibold uppercase tracking-wider block text-center hover:bg-primary-container transition-all shadow"
                >
                  View Partner Monograph
                </Link>
                <button
                  onClick={() => setConsultModalAgent(agent)}
                  className="w-full py-2 rounded-lg border border-border-subtle hover:bg-surface-container text-xs text-primary font-mono font-medium tracking-wide transition-all"
                >
                  Schedule Private Consultation
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Private Consultation Modal */}
      {consultModalAgent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-card border border-border-subtle max-w-md w-full rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <div>
                <h3 className="font-serif text-lg text-primary">Confidential Advisory Session</h3>
                <span className="text-xs text-secondary font-mono">
                  With {consultModalAgent.user.name} ({consultModalAgent.agency?.name || "Sovereign Guild"})
                </span>
              </div>
              <button onClick={() => setConsultModalAgent(null)} className="text-secondary hover:text-primary">
                ✕
              </button>
            </div>

            {consultSuccess ? (
              <div className="p-6 text-center space-y-2">
                <span className="material-symbols-outlined text-status-verified text-4xl">check_circle</span>
                <h4 className="font-serif text-lg text-primary">Consultation Dispatched</h4>
                <p className="text-xs text-secondary font-light">
                  Your encrypted mandate request has been securely delivered to {consultModalAgent.user.name}'s private desk. Expect outreach within 2 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookConsultation} className="space-y-3 text-xs">
                <div>
                  <label className="block text-secondary mb-1">Your Full Name / Entity</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Al-Mansoor Family Office"
                    className="w-full p-2.5 rounded-xl bg-surface border border-border-subtle text-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-secondary mb-1">Confidential Direct Email</label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="advisor@familyoffice.ch"
                    className="w-full p-2.5 rounded-xl bg-surface border border-border-subtle text-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-secondary mb-1">Acquisition Scope & Mandate Notes</label>
                  <textarea
                    rows={3}
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                    placeholder="Target capital deployment, target jurisdictions, private requirements..."
                    className="w-full p-2.5 rounded-xl bg-surface border border-border-subtle text-primary outline-none leading-relaxed"
                  />
                </div>
                <div className="pt-2 flex justify-end gap-2 border-t border-border-subtle">
                  <button
                    type="button"
                    onClick={() => setConsultModalAgent(null)}
                    className="px-4 py-2 rounded-xl text-secondary hover:bg-surface-container"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-primary text-on-primary font-semibold shadow"
                  >
                    Submit Private Mandate
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
