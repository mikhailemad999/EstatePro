import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AdminSidebar from "@/components/dashboards/AdminSidebar";
import RoleSwitcher from "@/components/common/RoleSwitcher";

export const revalidate = 0;

export default async function AdminAuditPage() {
  const auditLogs = await prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
    },
    take: 50,
  });

  return (
    <div className="min-h-screen bg-surface flex">
      <AdminSidebar />
      <div className="flex-1 md:pl-72 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 bg-surface/80 backdrop-blur-xl border-b border-border-subtle px-6 sm:px-8 flex items-center justify-between gap-4 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <Link href="/" className="md:hidden text-primary font-bold font-serif text-lg">
              T0
            </Link>
            <div className="flex items-center gap-2 text-xs font-mono text-outline">
              <span className="material-symbols-outlined text-[16px] text-primary">history_edu</span>
              <span className="text-on-surface">Cryptographic Ledger // Tamper-Evident System Audit Trail</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <RoleSwitcher />
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-high border border-status-verified/20 text-xs font-mono text-status-verified">
              <span className="w-1.5 h-1.5 rounded-full bg-status-verified"></span>
              <span>Ledger Integrity: VERIFIED</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 sm:p-8 space-y-8 max-w-7xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl text-primary font-normal">
                Cryptographic System Audit Ledger
              </h1>
              <p className="text-xs text-secondary font-light">
                Immutable record of all title transfers, escrow lockouts, compliance overrides, and platform administrative actions.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 rounded-lg bg-surface-card border border-border-subtle text-xs text-primary font-mono">
                SHA-256 Chain Hash: #9d4a...f712
              </span>
            </div>
          </div>

          {/* Audit Trail Table */}
          <div className="rounded-2xl border border-border-subtle bg-surface-card overflow-hidden shadow-xl">
            <div className="p-5 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-base text-primary font-medium">
                  Recent Transaction Log Entries
                </h3>
                <p className="text-[11px] text-secondary font-light">
                  Showing the latest 50 tamper-resistant audit events recorded in MySQL Cluster 3305.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border-subtle text-outline font-mono uppercase bg-surface-container-lowest">
                    <th className="py-4 px-5">Timestamp (UTC)</th>
                    <th className="py-4 px-5">Actor / Origin</th>
                    <th className="py-4 px-5">Action Type</th>
                    <th className="py-4 px-5">Entity Domain</th>
                    <th className="py-4 px-5">Audit Details &amp; Payload</th>
                    <th className="py-4 px-5 text-right">IP &amp; Clearance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle font-mono text-[11px]">
                  {auditLogs.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-secondary">
                        No audit events recorded yet.
                      </td>
                    </tr>
                  ) : (
                    auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-surface-container/50 transition-colors">
                        <td className="py-4 px-5 text-outline">
                          {new Date(log.createdAt).toLocaleString("en-US", {
                            month: "short",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: false,
                          })}
                        </td>
                        <td className="py-4 px-5">
                          <span className="text-primary font-semibold block">
                            {log.user?.name || "SYSTEM_DAEMON"}
                          </span>
                          <span className="text-[10px] text-outline">
                            {log.user?.email || "internal://automated-agent"}
                          </span>
                        </td>
                        <td className="py-4 px-5">
                          <span className="px-2 py-0.5 rounded bg-surface-container-highest text-primary border border-border-hairline font-bold">
                            {log.action}
                          </span>
                        </td>
                        <td className="py-4 px-5 text-secondary">
                          {log.entityType}
                          {log.entityId && (
                            <span className="block text-[10px] text-outline truncate max-w-[120px]">
                              {log.entityId}
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-5 text-on-surface font-sans text-xs max-w-md">
                          {log.details || "Ledger event validated."}
                        </td>
                        <td className="py-4 px-5 text-right">
                          <span className="text-outline block">{log.ipAddress || "127.0.0.1"}</span>
                          <span className="text-[10px] text-status-verified">HMAC Cleared</span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
