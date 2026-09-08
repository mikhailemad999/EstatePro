import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AdminSidebar from "@/components/dashboards/AdminSidebar";
import RoleSwitcher from "@/components/common/RoleSwitcher";

export const revalidate = 0;

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      agentProfile: true,
      agency: true,
      developer: true,
    },
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
              <span className="material-symbols-outlined text-[16px] text-primary">manage_accounts</span>
              <span className="text-on-surface">Identity &amp; Access Control // RBAC Directory</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <RoleSwitcher />
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-high border border-status-verified/20 text-xs font-mono text-status-verified">
              <span className="w-1.5 h-1.5 rounded-full bg-status-verified"></span>
              <span>RBAC Authority: ACTIVE</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 sm:p-8 space-y-8 max-w-7xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl text-primary font-normal">
                Global Participant Directory &amp; RBAC Clearance
              </h1>
              <p className="text-xs text-secondary font-light">
                Comprehensive directory of verified sovereign principals, licensed private advisors, developer trusts, and platform overseers.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 rounded-lg bg-surface-card border border-border-subtle text-xs text-primary font-mono">
                Total Identities: {users.length}
              </span>
            </div>
          </div>

          {/* Directory Table */}
          <div className="rounded-2xl border border-border-subtle bg-surface-card overflow-hidden shadow-xl">
            <div className="p-5 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-base text-primary font-medium">
                  Active Cryptographic Identity Records
                </h3>
                <p className="text-[11px] text-secondary font-light">
                  Enforce strict clearance parameters and multi-signature authorization levels.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search identity or email..."
                  className="px-3 py-1.5 rounded-lg bg-surface-container-lowest border border-border-subtle text-xs text-primary placeholder:text-outline focus:outline-none focus:border-primary w-48 sm:w-64"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border-subtle text-outline font-mono uppercase bg-surface-container-lowest">
                    <th className="py-4 px-5">Principal / Entity</th>
                    <th className="py-4 px-5">Role Clearance</th>
                    <th className="py-4 px-5">Institutional Affiliation</th>
                    <th className="py-4 px-5">Biometric / KYC Verification</th>
                    <th className="py-4 px-5">Registered Since</th>
                    <th className="py-4 px-5 text-right">Clearance Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {users.map((u) => {
                    const roleColor =
                      u.role === "SUPER_ADMIN"
                        ? "bg-purple-950/60 text-purple-300 border-purple-800"
                        : u.role === "AGENT"
                        ? "bg-blue-950/60 text-blue-300 border-blue-800"
                        : u.role === "AGENCY_ADMIN"
                        ? "bg-amber-950/60 text-amber-300 border-amber-800"
                        : u.role === "DEVELOPER"
                        ? "bg-emerald-950/60 text-emerald-300 border-emerald-800"
                        : "bg-surface-container-high text-on-surface border-border-hairline";

                    return (
                      <tr key={u.id} className="hover:bg-surface-container/50 transition-colors">
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center font-serif text-xs font-bold text-primary">
                              {u.name.charAt(0)}
                            </div>
                            <div>
                              <span className="font-serif font-medium text-primary text-sm block">
                                {u.name}
                              </span>
                              <span className="text-[11px] font-mono text-outline block">
                                {u.email}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-5">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider border ${roleColor}`}
                          >
                            {u.role.replace("_", " ")}
                          </span>
                        </td>
                        <td className="py-4 px-5 text-secondary">
                          {u.agency?.name ||
                            u.developer?.companyName ||
                            (u.agentProfile ? "Licensed Broker" : "Private Portfolio")}
                        </td>
                        <td className="py-4 px-5">
                          {u.verified ? (
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono bg-status-verified/15 text-status-verified border border-status-verified/30">
                              <span className="material-symbols-outlined text-[12px]">verified</span>
                              KYC Tier-3 Cleared
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono bg-status-pending/15 text-status-pending border border-status-pending/30">
                              <span className="material-symbols-outlined text-[12px]">pending</span>
                              Pending Verification
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-5 font-mono text-[11px] text-outline">
                          {new Date(u.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td className="py-4 px-5 text-right space-x-2">
                          <button className="px-2.5 py-1 rounded-lg bg-surface-container-high hover:bg-surface-container-highest border border-border-hairline text-primary text-[10px] font-semibold uppercase tracking-wider transition-colors">
                            Audit Trail
                          </button>
                          <button className="px-2.5 py-1 rounded-lg bg-surface-container-high hover:bg-surface-container-highest border border-border-hairline text-secondary hover:text-primary text-[10px] font-semibold uppercase tracking-wider transition-colors">
                            Permissions
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
