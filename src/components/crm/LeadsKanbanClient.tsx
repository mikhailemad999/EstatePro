"use client";

import React, { useState } from "react";
import { LeadData } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface LeadsKanbanClientProps {
  initialLeads: LeadData[];
}

export default function LeadsKanbanClient({ initialLeads }: LeadsKanbanClientProps) {
  const [leads, setLeads] = useState<LeadData[]>(initialLeads);
  const [modalOpen, setModalOpen] = useState(false);
  const [newLeadName, setNewLeadName] = useState("");
  const [newLeadEmail, setNewLeadEmail] = useState("");
  const [newLeadBudget, setNewLeadBudget] = useState(25000000);
  const [newLeadSource, setNewLeadSource] = useState("Private Bank Desk");

  const stages = [
    { key: "NEW", label: "New Inquiries", color: "border-secondary" },
    { key: "CONTACTED", label: "Contacted", color: "border-outline" },
    { key: "QUALIFIED", label: "KYC Qualified", color: "border-chart-accent" },
    { key: "VIEWING_SCHEDULED", label: "VIP Viewing", color: "border-status-pending" },
    { key: "NEGOTIATION", label: "Negotiation", color: "border-purple-400" },
    { key: "OFFER_SUBMITTED", label: "Term Sheet", color: "border-yellow-400" },
    { key: "WON", label: "Escrow Won", color: "border-status-verified" },
  ] as const;

  const moveLead = async (leadId: string, direction: "next" | "prev") => {
    const leadIndex = leads.findIndex((l) => l.id === leadId);
    if (leadIndex === -1) return;

    const currentLead = leads[leadIndex];
    const currentStageIndex = stages.findIndex((s) => s.key === currentLead.stage);
    if (currentStageIndex === -1) return;

    const nextStageIndex = direction === "next" ? currentStageIndex + 1 : currentStageIndex - 1;
    if (nextStageIndex < 0 || nextStageIndex >= stages.length) return;

    const nextStage = stages[nextStageIndex].key;

    // Optimistic state update
    const updated = [...leads];
    updated[leadIndex] = { ...currentLead, stage: nextStage as any };
    setLeads(updated);

    // Call API route
    try {
      await fetch("/api/crm/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId, stage: nextStage }),
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddLead = async (e: React.FormEvent) => {
    e.preventDefault();
    const newLead: LeadData = {
      id: `lead-${Date.now()}`,
      name: newLeadName,
      email: newLeadEmail,
      stage: "NEW",
      score: 90,
      source: newLeadSource,
      budget: Number(newLeadBudget),
      createdAt: new Date().toISOString(),
    };

    setLeads([newLead, ...leads]);
    setModalOpen(false);
    setNewLeadName("");
    setNewLeadEmail("");

    try {
      const res = await fetch("/api/crm/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLead),
      });
      const data = await res.json();
      if (data?.data?.id) {
        setLeads((current) =>
          current.map((l) => (l.id === newLead.id ? { ...l, id: data.data.id } : l))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl text-primary font-normal">
            Sovereign Pipeline Kanban
          </h2>
          <p className="text-xs text-secondary font-light">
            Drag, prioritize, and progress HNW private client mandates through escrow closing.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-semibold uppercase tracking-wider hover:bg-primary-container transition-all flex items-center gap-2 shadow"
        >
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          <span>Capture Private Lead</span>
        </button>
      </div>

      {/* Kanban Board Columns */}
      <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar min-h-[600px]">
        {stages.map((stage) => {
          const stageLeads = leads.filter((l) => l.stage === stage.key);
          const totalVolume = stageLeads.reduce((acc, l) => acc + l.budget, 0);

          return (
            <div
              key={stage.key}
              className="w-72 shrink-0 bg-surface-container-low rounded-2xl border border-border-subtle flex flex-col justify-between p-3 space-y-3"
            >
              {/* Column Header */}
              <div className="p-2 border-b border-border-subtle">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-primary">{stage.label}</span>
                  <span className="w-5 h-5 rounded-full bg-surface-container-high text-[10px] font-bold text-outline flex items-center justify-center">
                    {stageLeads.length}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-outline block mt-0.5">
                  Volume: {formatCurrency(totalVolume)}
                </span>
              </div>

              {/* Cards Container */}
              <div className="flex-1 space-y-3 overflow-y-auto max-h-[500px]">
                {stageLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-4 rounded-xl bg-surface-card border border-border-subtle shadow-md space-y-3 hover:border-outline-variant transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-serif text-sm text-primary font-medium">{lead.name}</h4>
                        <span className="text-[10px] font-mono text-outline block">{lead.email}</span>
                      </div>
                      <span className="text-status-verified font-mono text-xs font-bold">{lead.score}</span>
                    </div>

                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between text-secondary">
                        <span>Mandate Cap:</span>
                        <span className="text-primary font-serif font-medium">{formatCurrency(lead.budget)}</span>
                      </div>
                      <div className="flex justify-between text-secondary">
                        <span>Lead Source:</span>
                        <span className="text-outline text-[11px] truncate max-w-[120px]">{lead.source}</span>
                      </div>
                    </div>

                    {lead.notes && (
                      <p className="text-[11px] text-secondary/80 bg-surface-container/50 p-2 rounded line-clamp-2 font-light">
                        "{lead.notes}"
                      </p>
                    )}

                    {/* Stage shift buttons */}
                    <div className="pt-2 border-t border-border-subtle flex items-center justify-between text-xs">
                      <button
                        onClick={() => moveLead(lead.id, "prev")}
                        disabled={stage.key === "NEW"}
                        className="p-1 rounded hover:bg-surface-container text-outline hover:text-primary disabled:opacity-20"
                        title="Move to previous stage"
                      >
                        ←
                      </button>
                      <span className="text-[9px] uppercase font-mono text-outline">Move Stage</span>
                      <button
                        onClick={() => moveLead(lead.id, "next")}
                        disabled={stage.key === "WON"}
                        className="p-1 rounded hover:bg-surface-container text-outline hover:text-primary disabled:opacity-20"
                        title="Advance to next stage"
                      >
                        →
                      </button>
                    </div>
                  </div>
                ))}

                {stageLeads.length === 0 && (
                  <div className="py-12 text-center text-outline text-xs">
                    No leads in this stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Lead Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-surface-elevated border border-border-hairline rounded-2xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl text-primary">Capture Sovereign Lead</h3>
              <button onClick={() => setModalOpen(false)} className="text-outline hover:text-primary">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleAddLead} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-secondary">Principal Name</label>
                <input
                  type="text"
                  required
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  placeholder="e.g. Duke of Westminster"
                  className="w-full px-3 py-2 rounded-lg bg-surface-container text-primary border border-white/10 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-secondary">Confidential Contact</label>
                <input
                  type="email"
                  required
                  value={newLeadEmail}
                  onChange={(e) => setNewLeadEmail(e.target.value)}
                  placeholder="e.g. principal@familyoffice.com"
                  className="w-full px-3 py-2 rounded-lg bg-surface-container text-primary border border-white/10 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-secondary">Acquisition Budget ($ USD)</label>
                <input
                  type="number"
                  required
                  value={newLeadBudget}
                  onChange={(e) => setNewLeadBudget(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-surface-container text-primary border border-white/10 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-secondary">Lead Source Desk</label>
                <select
                  value={newLeadSource}
                  onChange={(e) => setNewLeadSource(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-surface-container text-primary border border-white/10 focus:outline-none"
                >
                  <option value="Zurich Private Bank Referral">Zurich Private Bank Referral</option>
                  <option value="London Family Office Forum">London Family Office Forum</option>
                  <option value="Direct Sovereign Mandate">Direct Sovereign Mandate</option>
                  <option value="EstatePro Private Reserve Inquiry">EstatePro Private Reserve Inquiry</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-primary text-on-primary text-xs font-semibold uppercase tracking-wider hover:bg-primary-container transition-all shadow"
                >
                  Confirm Lead Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
