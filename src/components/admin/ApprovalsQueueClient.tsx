"use client";

import React, { useState } from "react";
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
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingId(null);
    }
  };

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

      <div className="rounded-2xl border border-border-subtle bg-surface-card overflow-hidden shadow-xl">
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
              {properties.map((p) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
