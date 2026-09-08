import React from "react";
import { prisma } from "@/lib/prisma";
import AgentSidebar from "@/components/dashboards/AgentSidebar";
import LeadsKanbanClient from "@/components/crm/LeadsKanbanClient";
import RoleSwitcher from "@/components/common/RoleSwitcher";

export const revalidate = 0;

export default async function AgentLeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      property: true,
    },
  });

  const formattedLeads = leads.map((l) => ({
    ...l,
    stage: l.stage as any,
    createdAt: l.createdAt.toISOString(),
  }));

  return (
    <div className="min-h-screen bg-surface flex">
      <AgentSidebar />
      <div className="flex-1 md:pl-72 flex flex-col min-w-0">
        <header className="h-20 bg-surface/80 backdrop-blur-xl border-b border-border-subtle px-6 sm:px-8 flex items-center justify-between gap-4 sticky top-0 z-40">
          <div className="flex items-center gap-2 text-xs font-mono text-outline">
            <span>CRM PIPELINE</span>
            <span>•</span>
            <span className="text-status-verified font-bold">SOVEREIGN KANBAN DESK</span>
          </div>
          <RoleSwitcher />
        </header>

        <main className="flex-1 p-6 sm:p-8">
          <LeadsKanbanClient initialLeads={formattedLeads} />
        </main>
      </div>
    </div>
  );
}
