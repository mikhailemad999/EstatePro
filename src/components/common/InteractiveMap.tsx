"use client";

import React, { useState } from "react";
import { PropertyCardData } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { useEstateStore } from "@/store/useEstateStore";
import Link from "next/link";

interface InteractiveMapProps {
  properties: PropertyCardData[];
  selectedPropertyId?: string | null;
  onSelectProperty?: (id: string) => void;
}

export default function InteractiveMap({
  properties,
  selectedPropertyId,
  onSelectProperty,
}: InteractiveMapProps) {
  const { currency } = useEstateStore();
  const [activeProperty, setActiveProperty] = useState<PropertyCardData | null>(null);
  const [isSatellite, setIsSatellite] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Approximate relative positioning on a stylized map canvas
  const getPinPosition = (index: number) => {
    const coords = [
      { top: "35%", left: "28%" }, // Big Sur
      { top: "42%", left: "62%" }, // Geneva
      { top: "32%", left: "38%" }, // New York
      { top: "48%", left: "82%" }, // Kyoto
      { top: "28%", left: "54%" }, // London
      { top: "45%", left: "60%" }, // Zermatt
    ];
    return coords[index % coords.length];
  };

  return (
    <div className="relative w-full h-full min-h-[500px] bg-[#0c0c0c] overflow-hidden rounded-xl border border-border-subtle select-none">
      {/* Stylized Architectural Dark Vector Map Background */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          isSatellite ? "opacity-30" : "opacity-80"
        }`}
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(32, 31, 31, 0.6) 0%, rgba(10, 10, 10, 0.95) 100%),
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 40px 40px, 40px 40px",
          transform: `scale(${zoomLevel})`,
          transformOrigin: "center center",
          transition: "transform 0.3s ease-out",
        }}
      >
        {/* World Landmass Silhouettes (Minimalist Topography Lines) */}
        <svg className="w-full h-full opacity-20" viewBox="0 0 1000 600" fill="none" stroke="currentColor">
          <path d="M150,150 Q220,130 300,180 T400,320 T250,450 Z" strokeWidth="1" />
          <path d="M500,120 Q620,100 700,160 T750,280 T600,400 Z" strokeWidth="1" />
          <path d="M780,180 Q850,160 920,240 T880,360 Z" strokeWidth="1" />
          <circle cx="280" cy="350" r="180" strokeDasharray="3 3" strokeWidth="0.5" />
          <circle cx="620" cy="220" r="150" strokeDasharray="3 3" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Map Interactive Controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
        <div className="bg-surface-elevated/90 backdrop-blur-md rounded-lg border border-border-subtle p-1 flex flex-col shadow-xl">
          <button
            onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.8))}
            className="w-8 h-8 flex items-center justify-center text-secondary hover:text-primary hover:bg-surface-container rounded transition-colors"
            title="Zoom In"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
          </button>
          <div className="w-full h-px bg-border-subtle my-0.5"></div>
          <button
            onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
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

      {/* Map Telemetry Watermark */}
      <div className="absolute bottom-4 left-4 z-10 text-[10px] uppercase font-mono tracking-widest text-outline bg-surface-lowest/70 backdrop-blur px-2.5 py-1 rounded border border-white/5">
        Geodetic Grid • WGS-84 • {properties.length} Active Nodes
      </div>

      {/* Render Property Pins */}
      {properties.map((prop, idx) => {
        const pos = getPinPosition(idx);
        const isSelected = selectedPropertyId === prop.id || activeProperty?.id === prop.id;

        return (
          <div
            key={prop.id}
            className="absolute z-20 transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{ top: pos.top, left: pos.left }}
            onClick={() => {
              setActiveProperty(prop);
              if (onSelectProperty) onSelectProperty(prop.id);
            }}
          >
            {/* Price Tag Bubble */}
            <div
              className={`px-2.5 py-1 rounded-full text-xs font-semibold tracking-tight shadow-xl flex items-center gap-1.5 transition-all duration-200 border ${
                isSelected
                  ? "bg-primary text-on-primary scale-110 border-primary ring-4 ring-primary/20"
                  : "bg-surface-container-high/95 text-primary border-white/20 group-hover:bg-primary group-hover:text-on-primary group-hover:scale-105"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-status-verified"></span>
              <span>{formatCurrency(prop.price, currency)}</span>
            </div>

            {/* Pin pointer tip */}
            <div
              className={`w-1.5 h-1.5 mx-auto transform rotate-45 -mt-0.5 ${
                isSelected ? "bg-primary" : "bg-surface-container-high group-hover:bg-primary"
              }`}
            ></div>
          </div>
        );
      })}

      {/* Selected Property Popup Card */}
      {activeProperty && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 w-11/12 max-w-sm bg-surface-elevated/95 backdrop-blur-xl border border-white/10 rounded-xl p-3 shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex gap-3">
            <img
              src={activeProperty.heroImage || ""}
              alt={activeProperty.title}
              className="w-24 h-20 rounded-lg object-cover bg-surface-container shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-mono text-outline">{activeProperty.refNumber}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveProperty(null);
                  }}
                  className="text-outline hover:text-primary"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>
              <h4 className="font-serif text-sm text-primary truncate mt-0.5">{activeProperty.title}</h4>
              <p className="text-xs text-secondary truncate">{activeProperty.address}</p>
              <div className="mt-1 flex items-center justify-between">
                <span className="font-serif text-base text-primary font-medium">
                  {formatCurrency(activeProperty.price, currency)}
                </span>
                <Link
                  href={`/property/${activeProperty.slug}`}
                  className="text-[11px] uppercase tracking-wider text-chart-accent hover:underline font-semibold"
                >
                  Inspect →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
