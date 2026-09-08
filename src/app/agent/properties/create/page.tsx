import React from "react";
import AgentSidebar from "@/components/dashboards/AgentSidebar";
import ListingWizard from "@/components/wizard/ListingWizard";
import RoleSwitcher from "@/components/common/RoleSwitcher";

export default function CreatePropertyPage() {
  return (
    <div className="min-h-screen bg-surface flex">
      <AgentSidebar />
      <div className="flex-1 md:pl-72 flex flex-col min-w-0">
        <header className="h-20 bg-surface/80 backdrop-blur-xl border-b border-border-subtle px-6 sm:px-8 flex items-center justify-between gap-4 sticky top-0 z-40">
          <div className="flex items-center gap-2 text-xs font-mono text-outline">
            <span>SOVEREIGN MANDATES</span>
            <span>•</span>
            <span className="text-primary font-bold">CREATE LISTING WIZARD</span>
          </div>
          <RoleSwitcher />
        </header>

        <main className="flex-1 p-6 sm:p-8">
          <ListingWizard />
        </main>
      </div>
    </div>
  );
}
