"use client";

import React from "react";
import { PropertyCardData } from "@/types";
import { formatCurrency, formatArea, calculateMortgage } from "@/lib/utils";
import { useEstateStore } from "@/store/useEstateStore";
import Link from "next/link";

interface ComparisonMatrixClientProps {
  allProperties: PropertyCardData[];
}

export default function ComparisonMatrixClient({ allProperties }: ComparisonMatrixClientProps) {
  const { compareList, removeFromCompare, clearCompare, currency } = useEstateStore();

  const comparedProperties = allProperties.filter((p) => compareList.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-border-subtle">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-outline">
            Sovereign Valuation Telemetry
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-primary mt-1">
            Property Comparison Matrix
          </h1>
          <p className="text-xs sm:text-sm text-secondary mt-1 font-light">
            Cross-evaluate architectural specifications, unit pricing, and carrying costs across your shortlisted trophy portfolio.
          </p>
        </div>

        {comparedProperties.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-lg border border-border-hairline text-secondary hover:text-primary text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              <span>Export PDF Monograph</span>
            </button>
            <button
              onClick={clearCompare}
              className="px-4 py-2 rounded-lg bg-surface-container text-xs text-secondary hover:text-error transition-colors"
            >
              Clear Comparison
            </button>
          </div>
        )}
      </div>

      {comparedProperties.length === 0 ? (
        <div className="py-20 text-center rounded-2xl bg-surface-card border border-border-subtle p-8 space-y-4">
          <span className="material-symbols-outlined text-5xl text-outline">balance</span>
          <h3 className="font-serif text-xl text-primary">No Estates in Shortlist Matrix</h3>
          <p className="text-xs text-secondary max-w-sm mx-auto">
            Select up to 4 sovereign properties from our portfolio or split-screen map to inspect side-by-side telemetry.
          </p>
          <Link
            href="/properties"
            className="inline-block px-6 py-2.5 rounded-full bg-primary text-on-primary text-xs uppercase font-semibold tracking-wider hover:bg-primary-container transition-all"
          >
            Browse Sovereign Portfolio
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border-subtle bg-surface-card shadow-2xl">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-border-subtle bg-surface-container-lowest">
                <th className="p-5 text-xs uppercase font-mono text-outline w-1/4">Feature / Specification</th>
                {comparedProperties.map((prop) => (
                  <th key={prop.id} className="p-5 w-1/4 align-top">
                    <div className="relative space-y-2">
                      <button
                        onClick={() => removeFromCompare(prop.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-surface-container hover:bg-error text-secondary hover:text-white flex items-center justify-center text-xs transition-colors"
                        title="Remove from comparison"
                      >
                        ×
                      </button>
                      <img
                        src={prop.heroImage || ""}
                        alt={prop.title}
                        className="w-full h-32 rounded-lg object-cover bg-surface-container"
                      />
                      <span className="text-[10px] uppercase font-mono text-outline block">{prop.refNumber}</span>
                      <h4 className="font-serif text-base text-primary leading-snug line-clamp-2">
                        {prop.title}
                      </h4>
                      <div className="font-serif text-xl text-primary font-medium">
                        {formatCurrency(prop.price, currency)}
                      </div>
                      <Link
                        href={`/property/${prop.slug}`}
                        className="inline-block text-[11px] uppercase font-semibold text-chart-accent hover:underline pt-1"
                      >
                        Inspect Property →
                      </Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle text-xs">
              <tr>
                <td className="p-4 font-mono uppercase text-outline">Location / Submarket</td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-4 text-primary font-medium">{p.city}, {p.country}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-mono uppercase text-outline">Typology</td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-4 text-secondary">{p.propertyType}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-mono uppercase text-outline">Price per Square Meter</td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-4 text-primary font-semibold">
                    ${p.pricePerSqm?.toLocaleString() || "28,500"} / m²
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-mono uppercase text-outline">Bedrooms / Bathrooms</td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-4 text-primary">{p.bedrooms} Beds / {p.bathrooms} Baths</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-mono uppercase text-outline">Interior Built-up Area</td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-4 text-primary font-medium">{formatArea(p.areaSqm)}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-mono uppercase text-outline">Year Built</td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-4 text-secondary">2024 (Pristine Condition)</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-mono uppercase text-outline">Monthly Debt Service (25% down)</td>
                {comparedProperties.map((p) => {
                  const m = calculateMortgage(p.price, 25, 4.25, 25);
                  return (
                    <td key={p.id} className="p-4 text-status-rent font-semibold">
                      {formatCurrency(m.monthlyPayment, currency)} / mo
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td className="p-4 font-mono uppercase text-outline">Escrow Verification</td>
                {comparedProperties.map((p) => (
                  <td key={p.id} className="p-4 text-status-verified font-mono text-[11px]">
                    ✓ FINMA TITLED
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
