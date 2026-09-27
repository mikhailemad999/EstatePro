"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { PropertyCardData } from "@/types";
import { formatCurrency, formatArea } from "@/lib/utils";
import { useEstateStore } from "@/store/useEstateStore";

interface MapExplorerClientProps {
  initialProperties: PropertyCardData[];
}

export default function MapExplorerClient({ initialProperties }: MapExplorerClientProps) {
  const { currency, favorites, toggleFavorite } = useEstateStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypology, setSelectedTypology] = useState<string>("ALL");
  const [maxPrice, setMaxPrice] = useState<number>(100000000);
  const [selectedId, setSelectedId] = useState<string | null>(initialProperties[0]?.id || null);
  const [isSatellite, setIsSatellite] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [radiusKm, setRadiusKm] = useState(25);

  const typologies = ["ALL", "Brutalist Villa", "Waterfront Compound", "Penthouse & Duplex", "Historic Palazzo", "Alpine Chalet"];

  const filtered = useMemo(() => {
    return initialProperties.filter((p) => {
      const matchesSearch =
        searchQuery === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.address.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTypology = selectedTypology === "ALL" || p.propertyType.toLowerCase().includes(selectedTypology.toLowerCase());
      const matchesPrice = p.price <= maxPrice;

      return matchesSearch && matchesTypology && matchesPrice;
    });
  }, [initialProperties, searchQuery, selectedTypology, maxPrice]);

  const selectedProperty = useMemo(() => {
    return initialProperties.find((p) => p.id === selectedId) || filtered[0] || initialProperties[0];
  }, [initialProperties, selectedId, filtered]);

  // Approximate relative positioning on a stylized map canvas
  const getPinPosition = (index: number) => {
    const coords = [
      { top: "35%", left: "32%" }, // Big Sur
      { top: "42%", left: "54%" }, // Geneva
      { top: "30%", left: "42%" }, // New York
      { top: "50%", left: "78%" }, // Kyoto
      { top: "25%", left: "48%" }, // London
      { top: "46%", left: "56%" }, // Zermatt
      { top: "38%", left: "68%" }, // Dubai
      { top: "44%", left: "52%" }, // Monaco
    ];
    return coords[index % coords.length];
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-surface">
      {/* Top Controls Bar */}
      <div className="h-16 border-b border-border-subtle bg-surface-lowest/90 px-4 sm:px-6 flex items-center justify-between gap-4 shrink-0 overflow-x-auto">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative w-48 sm:w-64">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search location or estate..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-surface-container border border-border-subtle text-xs text-primary placeholder:text-outline focus:outline-none focus:border-primary"
            />
          </div>

          {/* Typology Pills */}
          <div className="hidden md:flex items-center gap-1.5 overflow-x-auto">
            {typologies.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTypology(t)}
                className={`px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-colors ${
                  selectedTypology === t
                    ? "bg-primary text-on-primary font-semibold"
                    : "bg-surface-container text-secondary hover:text-primary hover:bg-surface-container-high"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Radius & Count Filter */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-secondary">
            <span>Radius:</span>
            <select
              value={radiusKm}
              onChange={(e) => setRadiusKm(Number(e.target.value))}
              className="bg-surface-container border border-border-subtle rounded px-2 py-1 text-primary text-xs focus:outline-none"
            >
              <option value={10}>10 km</option>
              <option value={25}>25 km</option>
              <option value={50}>50 km</option>
              <option value={100}>100 km Global</option>
            </select>
          </div>

          <span className="text-xs font-mono text-status-verified">
            {filtered.length} Pinpoints
          </span>
        </div>
      </div>

      {/* Main Split Body: Map (Left) + Property Drawer (Right) */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0 relative">
        {/* Map Viewport Container */}
        <div className="flex-1 relative bg-[#090909] overflow-hidden select-none min-h-[350px]">
          {/* Architectural Vector Grid Background */}
          <div
            className={`absolute inset-0 transition-opacity duration-700 ${
              isSatellite ? "opacity-30" : "opacity-80"
            }`}
            style={{
              backgroundImage: `
                radial-gradient(circle at 50% 50%, rgba(30, 29, 29, 0.7) 0%, rgba(8, 8, 8, 0.98) 100%),
                linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
              `,
              backgroundSize: "100% 100%, 48px 48px, 48px 48px",
              transform: `scale(${zoomLevel})`,
              transformOrigin: "center center",
              transition: "transform 0.3s ease-out",
            }}
          >
            <svg className="w-full h-full opacity-20" viewBox="0 0 1000 600" fill="none" stroke="currentColor">
              <path d="M120,140 Q210,120 290,170 T380,310 T240,440 Z" strokeWidth="1" />
              <path d="M480,110 Q600,90 680,150 T730,270 T580,390 Z" strokeWidth="1" />
              <path d="M760,170 Q830,150 900,230 T860,350 Z" strokeWidth="1" />
              <circle cx="280" cy="350" r="180" strokeDasharray="3 3" strokeWidth="0.5" />
              <circle cx="620" cy="220" r="150" strokeDasharray="3 3" strokeWidth="0.5" />
            </svg>
          </div>

          {/* Interactive Zoom & Layer Toggle Controls */}
          <div className="absolute top-4 right-4 z-30 flex flex-col gap-2">
            <div className="bg-surface-elevated/90 backdrop-blur-md rounded-lg border border-border-subtle p-1 flex flex-col shadow-xl">
              <button
                onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 2.0))}
                className="w-8 h-8 flex items-center justify-center text-secondary hover:text-primary hover:bg-surface-container rounded transition-colors"
                title="Zoom In"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
              </button>
              <div className="w-full h-px bg-border-subtle my-0.5"></div>
              <button
                onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 0.75))}
                className="w-8 h-8 flex items-center justify-center text-secondary hover:text-primary hover:bg-surface-container rounded transition-colors"
                title="Zoom Out"
              >
                <span className="material-symbols-outlined text-[18px]">remove</span>
              </button>
            </div>

            <button
              onClick={() => setIsSatellite(!isSatellite)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider backdrop-blur-md border shadow-xl transition-all ${
                isSatellite
                  ? "bg-primary text-on-primary border-primary"
                  : "bg-surface-elevated/90 text-secondary border-border-subtle hover:text-primary"
              }`}
            >
              {isSatellite ? "Satellite" : "Vector"}
            </button>
          </div>

          {/* Bottom-left Geodetic Coordinate Badge */}
          <div className="absolute bottom-4 left-4 z-20 text-[10px] uppercase font-mono tracking-widest text-outline bg-surface-lowest/80 backdrop-blur px-3 py-1.5 rounded border border-white/5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-status-verified animate-pulse"></span>
            <span>Geospatial Radar Node • WGS-84 • {filtered.length} Verified Coordinates</span>
          </div>

          {/* Interactive Property Map Pins */}
          {filtered.map((prop, idx) => {
            const pos = getPinPosition(idx);
            const isSelected = selectedId === prop.id;

            return (
              <div
                key={prop.id}
                className="absolute z-20 transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ top: pos.top, left: pos.left }}
                onClick={() => setSelectedId(prop.id)}
              >
                <div
                  className={`px-3 py-1 rounded-full text-xs font-semibold tracking-tight shadow-2xl flex items-center gap-1.5 transition-all duration-200 border ${
                    isSelected
                      ? "bg-primary text-on-primary scale-110 border-primary ring-4 ring-primary/30"
                      : "bg-surface-container-high/95 text-primary border-white/20 group-hover:bg-primary group-hover:text-on-primary group-hover:scale-105"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-status-verified"></span>
                  <span>{formatCurrency(prop.price, currency)}</span>
                </div>
                <div
                  className={`w-2 h-2 mx-auto transform rotate-45 -mt-1 ${
                    isSelected ? "bg-primary" : "bg-surface-container-high group-hover:bg-primary"
                  }`}
                ></div>
              </div>
            );
          })}
        </div>

        {/* Right Drawer: Properties List / Selected Detail */}
        <div className="w-full lg:w-96 xl:w-[420px] bg-surface-container-lowest border-t lg:border-t-0 lg:border-l border-border-subtle flex flex-col shrink-0 overflow-hidden">
          <div className="p-4 border-b border-border-subtle flex items-center justify-between">
            <h3 className="font-serif text-base text-primary font-medium">
              Trophy Asset Inventory ({filtered.length})
            </h3>
            <span className="text-[10px] font-mono text-outline uppercase tracking-wider">
              Prime Submarkets
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-border-subtle p-3 space-y-3">
            {filtered.map((prop) => {
              const isSelected = selectedId === prop.id;
              const isFav = favorites.includes(prop.id);

              return (
                <div
                  key={prop.id}
                  onClick={() => setSelectedId(prop.id)}
                  className={`p-3.5 rounded-xl cursor-pointer transition-all border ${
                    isSelected
                      ? "bg-surface-container-high/60 border-primary/50 shadow-lg"
                      : "bg-surface-card border-border-subtle hover:border-outline-variant hover:bg-surface-container/30"
                  }`}
                >
                  <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-surface-container mb-3">
                    <img
                      src={prop.heroImage || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80"}
                      alt={prop.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-0.5 rounded text-[9px] uppercase font-mono tracking-widest bg-surface-lowest/90 text-primary border border-white/10">
                        {prop.refNumber}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(prop.id);
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-surface-lowest/80 text-on-surface-variant hover:text-error transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {isFav ? "favorite" : "favorite_border"}
                      </span>
                    </button>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase text-secondary">
                        {prop.propertyType}
                      </span>
                      <span className="font-serif text-lg text-primary font-medium">
                        {formatCurrency(prop.price, currency)}
                      </span>
                    </div>

                    <h4 className="font-serif text-base text-primary font-medium leading-snug line-clamp-1">
                      {prop.title}
                    </h4>
                    <p className="text-xs text-secondary truncate">{prop.address}</p>

                    <div className="pt-2 flex items-center justify-between text-xs text-outline font-mono">
                      <span>{prop.bedrooms} BEDS • {prop.bathrooms} BATHS</span>
                      <span>{formatArea(prop.areaSqm)}</span>
                    </div>

                    <div className="pt-3 flex items-center justify-between">
                      <Link
                        href={`/property/${prop.slug}`}
                        className="text-xs text-chart-accent hover:underline font-semibold flex items-center gap-1"
                      >
                        Inspect Dossier →
                      </Link>
                      <Link
                        href="/vip-viewing"
                        className="px-2.5 py-1 rounded bg-surface-container hover:bg-surface-container-highest text-[10px] uppercase font-mono text-primary font-semibold transition-colors"
                      >
                        Book VIP Flight
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
