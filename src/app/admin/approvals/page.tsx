import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AdminSidebar from "@/components/dashboards/AdminSidebar";
import RoleSwitcher from "@/components/common/RoleSwitcher";
import ApprovalsQueueClient from "@/components/admin/ApprovalsQueueClient";

export const revalidate = 0;

export default async function AdminApprovalsPage() {
  const properties = await prisma.property.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      agent: {
        include: {
          user: true,
        },
      },
    },
  });

  return (
    <div className="min-h-screen bg-surface flex">
      <AdminSidebar />
      <div className="flex-1 md:pl-72 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-20 bg-surface/80 backdrop-blur-xl border-b border-border-subtle px-6 sm:px-8 flex items-center justify-between gap-4 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <Link href="/" className="md:hidden text-primary font-bold font-serif text-lg">
              T0
            </Link>
            <div className="flex items-center gap-2 text-xs font-mono text-outline">
              <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
              <span className="text-on-surface">Compliance Registry // Verification Queue</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <RoleSwitcher />
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-high border border-status-verified/20 text-xs font-mono text-status-verified">
              <span className="w-1.5 h-1.5 rounded-full bg-status-verified"></span>
              <span>Overseer Clearance: Tier-0</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 sm:p-8 space-y-8 max-w-7xl">
          <ApprovalsQueueClient initialProperties={properties as any} />
        </main>
      </div>
    </div>
  );
}
