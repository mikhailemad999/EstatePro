import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AgentSidebar from "@/components/dashboards/AgentSidebar";
import RoleSwitcher from "@/components/common/RoleSwitcher";
import { formatCurrency, formatArea } from "@/lib/utils";

export const revalidate = 0;

export default async function AgentPropertiesPage() {
  const properties = await prisma.property.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      images: { take: 1 },
    },
  });

  return (
    <div className="min-h-screen bg-surface flex">
      <AgentSidebar />
      <div className="flex-1 md:pl-72 flex flex-col min-w-0">
        <header className="h-20 bg-surface/80 backdrop-blur-xl border-b border-border-subtle px-6 sm:px-8 flex items-center justify-between gap-4 sticky top-0 z-40">
          <div className="flex items-center gap-2 text-xs font-mono text-outline">
            <span>PORTFOLIO INVENTORY</span>
            <span>•</span>
            <span className="text-primary font-bold">ACTIVE MANDATES ({properties.length})</span>
          </div>
          <RoleSwitcher />
        </header>

        <main className="flex-1 p-6 sm:p-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-primary font-normal">
                Managed Mandate Portfolio
              </h2>
              <p className="text-xs text-secondary font-light">
                Monitor status, views telemetry, and escrow clearance across your active listings.
              </p>
            </div>

            <Link
              href="/agent/properties/create"
              className="px-5 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-semibold uppercase tracking-wider hover:bg-primary-container transition-all flex items-center gap-2 shadow"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>New Listing</span>
            </Link>
          </div>

          <div className="rounded-2xl border border-border-subtle bg-surface-card overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border-subtle text-outline font-mono uppercase bg-surface-container-lowest">
                    <th className="py-4 px-4">Estate Monograph</th>
                    <th className="py-4 px-4">Typology</th>
                    <th className="py-4 px-4">Location</th>
                    <th className="py-4 px-4">Asking Price</th>
                    <th className="py-4 px-4">Status</th>
                    <th className="py-4 px-4">Telemetry</th>
                    <th className="py-4 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {properties.map((p) => (
                    <tr key={p.id} className="hover:bg-surface-container/50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.images?.[0]?.url || p.heroImage || ""}
                            alt={p.title}
                            className="w-16 h-12 rounded object-cover bg-surface-container shrink-0"
                          />
                          <div>
                            <span className="font-serif text-sm text-primary font-medium block truncate max-w-xs">{p.title}</span>
                            <span className="text-[10px] font-mono text-outline">{p.refNumber}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-secondary">{p.propertyType}</td>
                      <td className="py-4 px-4 text-primary">{p.city}, {p.country}</td>
                      <td className="py-4 px-4 font-serif font-medium text-primary text-sm">{formatCurrency(p.price)}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase font-mono tracking-wider ${
                            p.status === "PUBLISHED"
                              ? "bg-status-verified/20 text-status-verified border border-status-verified/30"
                              : "bg-status-pending/20 text-status-pending border border-status-pending/30"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-outline font-mono text-[11px]">
                        {p.viewsCount.toLocaleString()} views • {p.favoritesCount} saved
                      </td>
                      <td className="py-4 px-4 text-right space-x-2">
                        <Link
                          href={`/property/${p.slug}`}
                          className="px-3 py-1.5 rounded bg-surface-container hover:bg-surface-container-high text-primary text-xs font-medium"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
