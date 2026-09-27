"use client";

import React, { useState } from "react";

export default function ContactFormClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    mandateType: "ACQUISITION",
    targetJurisdiction: "Switzerland",
    budgetRange: "25M_50M",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Call CRM leads API to store this mandate
    try {
      await fetch("/api/crm/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          stage: "NEW",
          score: 95,
          source: `Direct Website Mandate: ${formData.mandateType} (${formData.targetJurisdiction})`,
          budget: formData.budgetRange === "100M_PLUS" ? 100000000 : 35000000,
          netWorth: "> $100M",
          notes: formData.notes,
        }),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 rounded-xl bg-surface-container-high text-center space-y-4 border border-status-verified/40 animate-in fade-in duration-300">
        <div className="w-12 h-12 rounded-full bg-status-verified/20 text-status-verified flex items-center justify-center mx-auto">
          <span className="material-symbols-outlined text-2xl">check_circle</span>
        </div>
        <h4 className="font-serif text-2xl text-primary font-medium">Mandate Dossier Vaulted</h4>
        <p className="text-xs text-secondary font-light max-w-md mx-auto leading-relaxed">
          Your confidential acquisition parameters have been securely transmitted to the Senior Managing Partner Desk. A dedicated principal liaison will reach out directly.
        </p>
        <span className="text-[10px] font-mono text-outline block">
          Reference Mandate Code: #EST-MND-{Math.floor(10000 + Math.random() * 90000)}
        </span>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: "",
              email: "",
              phone: "",
              mandateType: "ACQUISITION",
              targetJurisdiction: "Switzerland",
              budgetRange: "25M_50M",
              notes: "",
            });
          }}
          className="mt-2 text-xs text-chart-accent hover:underline font-semibold"
        >
          Submit Another Mandate →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-[11px] font-mono uppercase text-secondary block mb-1">
            Principal / Representative Name *
          </label>
          <input
            type="text"
            required
            placeholder="Lord / Baron / Family Office Director"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container border border-border-subtle text-xs text-primary placeholder:text-outline focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="text-[11px] font-mono uppercase text-secondary block mb-1">
            Confidential Email *
          </label>
          <input
            type="email"
            required
            placeholder="principal@familyoffice.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container border border-border-subtle text-xs text-primary placeholder:text-outline focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="text-[11px] font-mono uppercase text-secondary block mb-1">
            Secure Phone / Signal
          </label>
          <input
            type="tel"
            placeholder="+41 22 ... / +1 ..."
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container border border-border-subtle text-xs text-primary placeholder:text-outline focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="text-[11px] font-mono uppercase text-secondary block mb-1">
            Mandate Typology
          </label>
          <select
            value={formData.mandateType}
            onChange={(e) => setFormData({ ...formData, mandateType: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container border border-border-subtle text-xs text-primary focus:outline-none focus:border-primary"
          >
            <option value="ACQUISITION">Trophy Acquisition</option>
            <option value="DISINVESTMENT">Private Off-Market Sale</option>
            <option value="SYNDICATION">Development Syndication</option>
            <option value="FINANCING">Structured Mortgage Facility</option>
          </select>
        </div>

        <div>
          <label className="text-[11px] font-mono uppercase text-secondary block mb-1">
            Capital Allocation Range
          </label>
          <select
            value={formData.budgetRange}
            onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container border border-border-subtle text-xs text-primary focus:outline-none focus:border-primary"
          >
            <option value="10M_25M">$10M – $25M USD</option>
            <option value="25M_50M">$25M – $50M USD</option>
            <option value="50M_100M">$50M – $100M USD</option>
            <option value="100M_PLUS">$100M+ Sovereign Sovereign</option>
          </select>
        </div>
      </div>

      <div>
        <label className="text-[11px] font-mono uppercase text-secondary block mb-1">
          Target Submarket / Jurisdiction
        </label>
        <select
          value={formData.targetJurisdiction}
          onChange={(e) => setFormData({ ...formData, targetJurisdiction: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container border border-border-subtle text-xs text-primary focus:outline-none focus:border-primary"
        >
          <option value="Switzerland">Switzerland (Geneva / Zurich / Zermatt)</option>
          <option value="United Kingdom">United Kingdom (London Mayfair / Belgravia)</option>
          <option value="United Arab Emirates">United Arab Emirates (Dubai Palm / DIFC)</option>
          <option value="Monaco">Monaco (Carré d'Or / Larvotto)</option>
          <option value="United States">United States (New York / Big Sur / Palm Beach)</option>
          <option value="Japan">Japan (Tokyo Minato / Kyoto)</option>
        </select>
      </div>

      <div>
        <label className="text-[11px] font-mono uppercase text-secondary block mb-1">
          Confidential Mandate Specifications &amp; Architectural Preferences
        </label>
        <textarea
          rows={4}
          placeholder="Specify waterfront requirements, private helipad nodes, art vaults, or Lex Koller residency considerations..."
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container border border-border-subtle text-xs text-primary placeholder:text-outline focus:outline-none focus:border-primary resize-none"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-lg bg-primary text-on-primary text-xs uppercase font-semibold tracking-wider hover:bg-primary-container transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <span>Encrypting &amp; Vaulting Mandate...</span>
        ) : (
          <>
            <span className="material-symbols-outlined text-[16px]">lock</span>
            <span>Vault Mandate &amp; Transmit to Managing Partners →</span>
          </>
        )}
      </button>
    </form>
  );
}
