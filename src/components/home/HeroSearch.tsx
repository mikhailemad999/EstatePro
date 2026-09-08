"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroSearch() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"BUY" | "RENT" | "COMMERCIAL" | "DEVELOPMENTS">("BUY");
  const [submarket, setSubmarket] = useState("Zurich • Lake District");
  const [typology, setTypology] = useState("All Typologies");
  const [assetValue, setAssetValue] = useState("$10M – $25M");

  const tabs = [
    { key: "BUY", label: "Buy", listingType: "FOR_SALE" },
    { key: "RENT", label: "Rent", listingType: "FOR_RENT" },
    { key: "COMMERCIAL", label: "Commercial", listingType: "COMMERCIAL_SALE" },
    { key: "DEVELOPMENTS", label: "New Developments", listingType: "DEVELOPMENTS" },
  ] as const;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === "DEVELOPMENTS") {
      router.push("/developments");
      return;
    }

    const currentTabObj = tabs.find((t) => t.key === activeTab);
    const params = new URLSearchParams();
    if (currentTabObj) params.set("listingType", currentTabObj.listingType);
    if (submarket && submarket !== "All Markets") params.set("location", submarket.split("•")[0].trim());
    if (typology && typology !== "All Typologies") params.set("propertyType", typology);
    if (assetValue) params.set("priceRange", assetValue);

    router.push(`/properties?${params.toString()}`);
  };

  const taxonomyChips = [
    "Waterfront Villas",
    "Brutalist Villa",
    "Penthouse & Duplex",
    "Historic Palazzo",
    "Alpine Chalets",
  ];

  return (
    <div className="w-full max-w-5xl rounded-xl bg-surface-elevated/90 backdrop-blur-xl border border-white/10 shadow-2xl p-4 sm:p-5 text-left">
      {/* Tabs */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border-subtle overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === tab.key
                ? "bg-primary text-on-primary shadow-lg"
                : "bg-transparent text-secondary hover:text-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Form Fields Row */}
      <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
        {/* Submarket Input */}
        <div className="lg:col-span-4 bg-surface-container rounded-lg p-3 group focus-within:bg-surface-container-high transition-colors border border-white/5">
          <span className="block text-[10px] uppercase font-mono text-outline tracking-widest mb-1">
            Location / Submarket
          </span>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[18px]">location_on</span>
            <input
              type="text"
              value={submarket}
              onChange={(e) => setSubmarket(e.target.value)}
              placeholder="Geneva, Tribeca, Mayfair, Kyoto..."
              className="w-full bg-transparent text-xs text-primary placeholder-on-surface-variant/60 focus:outline-none font-medium"
            />
          </div>
        </div>

        {/* Typology Select */}
        <div className="lg:col-span-3 bg-surface-container rounded-lg p-3 group focus-within:bg-surface-container-high transition-colors border border-white/5">
          <span className="block text-[10px] uppercase font-mono text-outline tracking-widest mb-1">
            Architectural Typology
          </span>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[18px]">villa</span>
            <select
              value={typology}
              onChange={(e) => setTypology(e.target.value)}
              className="w-full bg-transparent text-xs text-primary focus:outline-none cursor-pointer font-medium"
            >
              <option value="All Typologies" className="bg-surface-elevated text-primary">All Typologies</option>
              <option value="Brutalist Villa" className="bg-surface-elevated text-primary">Brutalist Villa</option>
              <option value="Penthouse & Duplex" className="bg-surface-elevated text-primary">Penthouse &amp; Duplex</option>
              <option value="Waterfront Compound" className="bg-surface-elevated text-primary">Waterfront Compound</option>
              <option value="Historic Palazzo" className="bg-surface-elevated text-primary">Historic Palazzo</option>
              <option value="Townhouse" className="bg-surface-elevated text-primary">Townhouse</option>
              <option value="Alpine Chalets" className="bg-surface-elevated text-primary">Alpine Chalets</option>
            </select>
          </div>
        </div>

        {/* Asset Value Select */}
        <div className="lg:col-span-3 bg-surface-container rounded-lg p-3 group focus-within:bg-surface-container-high transition-colors border border-white/5">
          <span className="block text-[10px] uppercase font-mono text-outline tracking-widest mb-1">
            Asset Value
          </span>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[18px]">payments</span>
            <select
              value={assetValue}
              onChange={(e) => setAssetValue(e.target.value)}
              className="w-full bg-transparent text-xs text-primary focus:outline-none cursor-pointer font-medium"
            >
              <option value="$5M – $10M" className="bg-surface-elevated text-primary">$5M – $10M</option>
              <option value="$10M – $25M" className="bg-surface-elevated text-primary">$10M – $25M</option>
              <option value="$25M – $50M" className="bg-surface-elevated text-primary">$25M – $50M</option>
              <option value="$50M+ Trophy Tier" className="bg-surface-elevated text-primary">$50M+ Trophy Tier</option>
            </select>
          </div>
        </div>

        {/* Search CTA */}
        <div className="lg:col-span-2 h-full flex">
          <button
            type="submit"
            className="w-full h-full min-h-[50px] bg-primary text-on-primary rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-primary-container transition-all shadow-lg hover:-translate-y-0.5"
          >
            <span className="material-symbols-outlined text-[18px]">travel_explore</span>
            <span>Search</span>
          </button>
        </div>
      </form>

      {/* Quick Taxonomy Chips */}
      <div className="flex flex-wrap items-center gap-2 pt-4 mt-2">
        <span className="text-[10px] uppercase font-mono text-outline tracking-widest mr-1">
          Curated Portfolios:
        </span>
        {taxonomyChips.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => router.push(`/properties?propertyType=${encodeURIComponent(chip)}`)}
            className="px-3 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-secondary-fixed text-xs transition-colors border border-white/5"
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}
