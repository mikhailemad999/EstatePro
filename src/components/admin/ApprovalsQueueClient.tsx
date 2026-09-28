"use client";

import React, { useState, useMemo } from "react";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

interface PropertyApprovalItem {
  id: string;
  title: string;
  slug: string;
  refNumber: string;
  propertyType: string;
  price: number;
  city: string;
  country: string;
  status: string;
  agent?: { user: { name: string } } | null;
}

export default function ApprovalsQueueClient({
  initialProperties,
}: {
  initialProperties: PropertyApprovalItem[];
}) {
  const [properties, setProperties] = useState(initialProperties);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [filterTab, setFilterTab] = useState<"ALL" | "PENDING" | "APPROVED" | "REJECTED">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const handleAction = async (propertyId: string, action: "APPROVED" | "REJECTED") => {
    setLoadingId(propertyId);
    try {
      const res = await fetch("/api/admin/approvals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId, status: action }),
      });

      if (res.ok) {
        setProperties(
          properties.map((p) => (p.id === propertyId ? { ...p, status: action } : p))
        );
        const estate = properties.find((p) => p.id === propertyId);
        setActionNotice(
          `Estate [${estate?.title || propertyId}] ${
            action === "APPROVED" ? "certified & published to marketplace" : "rejected from publication"
          }.`
        );
        setTimeout(() => setActionNotice(null), 4000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingId(null);
    }
  };

  const filteredProperties = useMemo(() => {
    let list = [...properties];

    if (filterTab === "PENDING") {
      list = list.filter((p) => p.status === "PENDING_REVIEW" || p.status === "PENDING");
    } else if (filterTab === "APPROVED") {
      list = list.filter((p) => p.status === "APPROVED" || p.status === "PUBLISHED");
    } else if (filterTab === "REJECTED") {
      list = list.filter((p) => p.status === "REJECTED");
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.refNumber.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          (p.agent?.user.name && p.agent.user.name.toLowerCase().includes(q))
      );
    }

    return list;
  }, [properties, filterTab, searchQuery]);

  const pendingCount = properties.filter((p) => p.status === "PENDING_REVIEW" || p.status === "PENDING").length;
  const approvedCount = properties.filter((p) => p.status === "APPROVED" || p.status === "PUBLISHED").length;
  const rejectedCount = properties.filter((p) => p.status === "REJECTED").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl text-primary font-normal">
            Listing Compliance &amp; Title Verification Queue
          </h2>
          <p className="text-xs text-secondary font-light">
            Review submitted trophy estates, verify proof of ownership and structural deeds, and approve for marketplace publication.
          </p>
        </div>
      </div>

      {actionNotice && (
        <div className="p-3.5 rounded-xl bg-status-verified/15 border border-status-verified/30 text-status-verified text-xs flex items-center justify-between">
          <span>{actionNotice}</span>
          <button onClick={() => setActionNotice(null)} className="font-bold">✕</button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 bg-surface-container p-1 rounded-xl text-xs font-mono w-full sm:w-auto overflow-x-auto no-scrollbar">
          <button
            onClick={() => setFilterTab("ALL")}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              filterTab === "ALL" ? "bg-primary text-on-primary font-bold shadow-xs" : "text-secondary hover:text-primary"
            }`}
          >
            All Submissions ({properties.length})
          </button>
          <button
            onClick={() => setFilterTab("PENDING")}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              filterTab === "PENDING" ? "bg-status-pending text-black font-bold shadow-xs" : "text-secondary hover:text-primary"
            }`}
          >
            Pending Review ({pendingCount})
          </button>
          <button
            onClick={() => setFilterTab("APPROVED")}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              filterTab === "APPROVED" ? "bg-status-verified text-black font-bold shadow-xs" : "text-secondary hover:text-primary"
            }`}
          >
            Certified ({approvedCount})
          </button>
          <button
            onClick={() => setFilterTab("REJECTED")}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              filterTab === "REJECTED" ? "bg-error text-white font-bold shadow-xs" : "text-secondary hover:text-primary"
            }`}
          >
            Rejected ({rejectedCount})
          </button>
        </div>

        <div className="w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search queue by title, ref, city..."
            className="w-full px-3.5 py-2 rounded-xl bg-surface border border-border-subtle text-xs text-primary placeholder-outline outline-none"
          />
        </div>
      </div>

      {/* Responsive Cards for Mobile View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredProperties.length === 0 ? (
          <div className="p-8 text-center text-xs text-secondary bg-surface-card rounded-2xl border border-border-subtle">
            No properties found in this queue.
          </div>
        ) : (
          filteredProperties.map((p) => (
            <div key={p.id} className="p-4 rounded-xl bg-surface-card border border-border-subtle space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-serif text-sm text-primary font-medium">{p.title}</h4>
                  <span className="text-[10px] font-mono text-outline">{p.refNumber} • {p.city}, {p.country}</span>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase font-mono tracking-wider ${
                    p.status === "APPROVED" || p.status === "PUBLISHED"
                      ? "bg-status-verified/20 text-status-verified border border-status-verified/30"
                      : p.status === "REJECTED"
                      ? "bg-error/20 text-error border border-error/30"
                      : "bg-status-pending/20 text-status-pending border border-status-pending/30"
                  }`}
                >
                  {p.status}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-border-subtle">
                <span className="text-secondary font-mono">Agent: {p.agent?.user.name || "Sovereign Desk"}</span>
                <span className="font-serif font-medium text-primary">{formatCurrency(p.price)}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => handleAction(p.id, "APPROVED")}
                  disabled={loadingId === p.id || p.status === "PUBLISHED" || p.status === "APPROVED"}
                  className="py-2 rounded-lg bg-primary text-on-primary text-[11px] font-semibold uppercase tracking-wider hover:bg-primary-container disabled:opacity-30 transition-colors shadow text-center"
                >
                  Certify
                </button>
                <button
                  onClick={() => handleAction(p.id, "REJECTED")}
                  disabled={loadingId === p.id || p.status === "REJECTED"}
                  className="py-2 rounded-lg border border-border-hairline text-error hover:bg-error-container disabled:opacity-30 text-[11px] font-semibold uppercase tracking-wider transition-colors text-center"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block rounded-2xl border border-border-subtle bg-surface-card overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border-subtle text-outline font-mono uppercase bg-surface-container-lowest">
                <th className="py-4 px-4">Estate Title</th>
                <th className="py-4 px-4">Mandate Lead Agent</th>
                <th className="py-4 px-4">Valuation</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4 text-right">Overseer Determination</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filteredProperties.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-secondary">
                    No submissions in queue matching active filter.
                  </td>
                </tr>
              ) : (
                filteredProperties.map((p) => (
                  <tr key={p.id} className="hover:bg-surface-container/50 transition-colors">
                    <td className="py-4 px-4">
                      <span className="font-serif text-sm text-primary font-medium block">{p.title}</span>
                      <span className="text-[10px] font-mono text-outline">{p.refNumber} • {p.city}, {p.country}</span>
                    </td>
                    <td className="py-4 px-4 text-secondary">{p.agent?.user.name || "Kenjiro Takahashi"}</td>
                    <td className="py-4 px-4 font-serif font-medium text-primary text-sm">{formatCurrency(p.price)}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase font-mono tracking-wider ${
                          p.status === "APPROVED" || p.status === "PUBLISHED"
                            ? "bg-status-verified/20 text-status-verified border border-status-verified/30"
                            : p.status === "REJECTED"
                            ? "bg-error/20 text-error border border-error/30"
                            : "bg-status-pending/20 text-status-pending border border-status-pending/30"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleAction(p.id, "APPROVED")}
                        disabled={loadingId === p.id || p.status === "PUBLISHED" || p.status === "APPROVED"}
                        className="px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold uppercase tracking-wider hover:bg-primary-container disabled:opacity-30 transition-colors shadow"
                      >
                        Certify &amp; Publish
                      </button>
                      <button
                        onClick={() => handleAction(p.id, "REJECTED")}
                        disabled={loadingId === p.id || p.status === "REJECTED"}
                        className="px-3 py-1.5 rounded-lg border border-border-hairline text-error hover:bg-error-container disabled:opacity-30 text-xs font-semibold uppercase tracking-wider transition-colors"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
