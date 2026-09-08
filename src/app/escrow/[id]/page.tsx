"use client";

import React, { useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

export default function EscrowClosingPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<"milestones" | "documents">("milestones");
  const [currentStep, setCurrentStep] = useState(2); // Step 2 (Title Deed in progress)

  const steps = [
    { title: "Escrow Agreement Executed", status: "COMPLETED", date: "2026-02-28", desc: "Dual signatures registered on sovereign contract." },
    { title: "FINMA / SEC AML & KYC Clearances", status: "COMPLETED", date: "2026-03-02", desc: "Clean proof of funds and source-of-wealth verified." },
    { title: "Sovereign Title Deed Notarization", status: "IN_PROGRESS", date: "Est. 2026-03-12", desc: "Swiss cantonal notary public legal review in progress." },
    { title: "Irrevocable Wire Transfer Settlement", status: "PENDING", date: "Est. 2026-03-18", desc: "Release of $34.65M completion funds." },
    { title: "Cryptographic Title Key Handover", status: "PENDING", date: "Est. 2026-03-20", desc: "Physical estate possession and biometric node handover." },
  ];

  const documents = [
    { title: "Sovereign Title Deed Search Certificate", status: "NOTARIZED", size: "4.8 MB", date: "2026-03-01" },
    { title: "FINMA / SEC Compliance & Source of Funds Clearance", status: "CLEARED", size: "2.4 MB", date: "2026-03-02" },
    { title: "Irrevocable Multi-Sig Escrow Purchase Agreement", status: "SIGNED", size: "12.1 MB", date: "2026-02-28" },
    { title: "Cantonal Notary Transfer Deed Protocol", status: "PENDING_SIGNATURE", size: "6.5 MB", date: "Awaiting Notary" },
  ];

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-outline">
            <Link href="/" className="hover:text-primary transition-colors">EstatePro</Link>
            <span>/</span>
            <Link href="/dashboard" className="hover:text-primary transition-colors">Investor Vault</Link>
            <span>/</span>
            <span className="text-secondary">Virtual Escrow Closing Room</span>
          </div>

          {/* Header Card */}
          <div className="rounded-2xl bg-surface-card border border-border-subtle p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-status-verified animate-ping"></span>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-status-verified font-semibold">
                    Encrypted Multi-Sig Escrow Active
                  </span>
                </div>
                <h1 className="font-serif text-2xl sm:text-4xl text-primary font-medium">
                  Virtual Data Room &amp; Closing Room
                </h1>
                <p className="text-xs text-secondary font-light">
                  Transaction: The Solis Cliffside Brutalist Sanctuary • Escrow ID: <strong>ESC-SOLIS-84920</strong>
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-mono text-outline block">Total Acquisition Value</span>
                <span className="font-serif text-3xl sm:text-4xl text-primary font-medium">$38,500,000</span>
                <span className="text-xs text-status-verified font-mono block mt-0.5">
                  10% Earnest Deposit ($3,850,000) Vaulted
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2 pt-4 border-t border-border-subtle">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-secondary uppercase">Milestone Progress: 45% Complete</span>
                <span className="text-primary font-bold">Stage 3 of 5</span>
              </div>
              <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: "45%" }}></div>
              </div>
            </div>
          </div>

          {/* Stepper & Document Vault Tabs */}
          <div className="flex items-center gap-2 border-b border-border-subtle pb-3">
            <button
              onClick={() => setActiveTab("milestones")}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${
                activeTab === "milestones" ? "bg-primary text-on-primary shadow" : "text-secondary hover:text-primary"
              }`}
            >
              Closing Milestones (5)
            </button>
            <button
              onClick={() => setActiveTab("documents")}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${
                activeTab === "documents" ? "bg-primary text-on-primary shadow" : "text-secondary hover:text-primary"
              }`}
            >
              Legal Data Room Vault (4)
            </button>
          </div>

          {activeTab === "milestones" ? (
            <div className="space-y-4">
              {steps.map((s, idx) => (
                <div
                  key={idx}
                  className={`rounded-xl border p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors ${
                    s.status === "COMPLETED"
                      ? "bg-surface-card border-border-subtle"
                      : s.status === "IN_PROGRESS"
                      ? "bg-surface-elevated border-primary/50 ring-1 ring-primary/20 shadow-lg"
                      : "bg-surface-container-lowest/50 border-white/5 opacity-60"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                        s.status === "COMPLETED"
                          ? "bg-status-verified text-on-primary"
                          : s.status === "IN_PROGRESS"
                          ? "bg-primary text-on-primary animate-pulse"
                          : "bg-surface-container text-outline"
                      }`}
                    >
                      {s.status === "COMPLETED" ? "✓" : idx + 1}
                    </div>
                    <div>
                      <h4 className="font-serif text-base text-primary font-medium">{s.title}</h4>
                      <p className="text-xs text-secondary mt-0.5">{s.desc}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <span className="font-mono text-outline">{s.date}</span>
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                        s.status === "COMPLETED"
                          ? "bg-status-verified/20 text-status-verified border border-status-verified/30"
                          : s.status === "IN_PROGRESS"
                          ? "bg-status-pending/20 text-status-pending border border-status-pending/30"
                          : "bg-surface-container text-outline"
                      }`}
                    >
                      {s.status.replace("_", " ")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documents.map((doc, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-surface-card border border-border-subtle flex flex-col justify-between space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-chart-accent text-3xl">description</span>
                      <div>
                        <h4 className="font-serif text-sm text-primary font-medium leading-snug">{doc.title}</h4>
                        <span className="text-[10px] font-mono text-outline block mt-0.5">{doc.size} • {doc.date}</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-surface-container text-[10px] font-mono uppercase text-status-verified font-bold">
                      {doc.status}
                    </span>
                  </div>

                  <button
                    onClick={() => window.print()}
                    className="w-full py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs text-primary font-semibold flex items-center justify-center gap-1.5 transition-colors border border-white/5 active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[16px]">download</span>
                    <span>Download Cryptographic Deed Copy</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
