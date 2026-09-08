"use client";

import React, { useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function SubscriptionsPage() {
  const [billingCycle, setBillingCycle] = useState<"annual" | "monthly">("annual");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const plans = [
    {
      id: "advisor",
      name: "Private Advisor Node",
      tagline: "For elite solo brokers managing ultra-HNW private mandates.",
      annualPrice: 1500,
      monthlyPrice: 1800,
      badge: "Individual Node",
      features: [
        "Up to 15 Trophy Listings in Sovereign Reserve",
        "Direct Encrypted E2EE Client Inquiry Channel",
        "CRM 7-Stage Pipeline Kanban Access",
        "Integrated Mortgage Pre-Approval Routing",
        "Private VIP Aviation Charter Booking Privileges",
        "Standard FINMA / SEC Compliance Support",
      ],
      cta: "Join as Private Advisor",
      featured: false,
    },
    {
      id: "firm",
      name: "Sovereign Member Firm",
      tagline: "For accredited boutique luxury brokerages and family offices.",
      annualPrice: 4800,
      monthlyPrice: 5500,
      badge: "Most Selected",
      features: [
        "Up to 60 Trophy Listings in Sovereign Reserve",
        "Multi-Broker Team Management (Up to 12 Partners)",
        "Dedicated Escrow Digital Data Room Portal",
        "Priority Listing Compliance Certification (2-Hour SLA)",
        "Exclusive Off-Plan Masterplan Development Access",
        "Branded Institutional Agency Dossier Page",
        "Real-Time Mandate Telemetry & Geographic Heatmaps",
      ],
      cta: "Accredit Firm Mandate",
      featured: true,
    },
    {
      id: "syndicate",
      name: "Global Syndicate Enterprise",
      tagline: "For international sovereign wealth funds and multinational networks.",
      annualPrice: 12500,
      monthlyPrice: 15000,
      badge: "Institutional Tier",
      features: [
        "Unlimited Sovereign Reserve Mandates",
        "Unlimited Accredited Partners & Brokers",
        "Multi-Sig Crypto & SWIFT Fedwire Settlement Escrow",
        "Custom Automated AML / Sanctions Screening Webhooks",
        "Dedicated Institutional Portfolio Concierge Director",
        "API Data Feeds & Custom White-Label Monograph Reports",
        "24/7 Dedicated Legal Counsel Clearing Support",
      ],
      cta: "Establish Sovereign Syndicate",
      featured: false,
    },
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setModalOpen(true);
    setPaymentSuccess(false);
  };

  const handleConfirmMembership = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentSuccess(true);
    setTimeout(() => {
      setModalOpen(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-[10px] uppercase font-mono tracking-widest text-outline">
              Sovereign Network Entitlement
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-primary font-normal leading-tight">
              Institutional Membership &amp; Node Tiers
            </h1>
            <p className="text-xs sm:text-sm text-secondary font-light">
              Join the world's most exclusive network of accredited private advisors, family office syndicates, and sovereign wealth developers.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-3 p-1.5 rounded-full bg-surface-card border border-border-subtle mt-4">
              <button
                onClick={() => setBillingCycle("annual")}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  billingCycle === "annual" ? "bg-primary text-on-primary shadow" : "text-secondary hover:text-primary"
                }`}
              >
                Annual Settlement (Save 20%)
              </button>
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  billingCycle === "monthly" ? "bg-primary text-on-primary shadow" : "text-secondary hover:text-primary"
                }`}
              >
                Monthly Wire
              </button>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan) => {
              const price = billingCycle === "annual" ? plan.annualPrice : plan.monthlyPrice;

              return (
                <div
                  key={plan.id}
                  className={`rounded-2xl p-8 flex flex-col justify-between space-y-8 transition-all duration-300 relative shadow-2xl ${
                    plan.featured
                      ? "bg-surface-card border-2 border-primary ring-1 ring-primary/30"
                      : "bg-surface-card border border-border-subtle hover:border-outline-variant"
                  }`}
                >
                  {plan.featured && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-on-primary text-[10px] font-mono font-bold uppercase tracking-widest shadow-md">
                      {plan.badge}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-mono text-outline tracking-wider">
                        {plan.badge}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl text-primary font-medium">{plan.name}</h3>
                    <p className="text-xs text-secondary font-light min-h-[36px]">{plan.tagline}</p>

                    <div className="pt-4 border-t border-border-subtle flex items-baseline gap-2">
                      <span className="font-serif text-4xl text-primary font-medium">${price.toLocaleString()}</span>
                      <span className="text-xs text-secondary font-mono">/ month billed {billingCycle}</span>
                    </div>

                    <ul className="space-y-3 pt-6 border-t border-border-subtle text-xs">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5 text-secondary">
                          <span className="material-symbols-outlined text-[16px] text-status-verified shrink-0 mt-0.5">
                            check_circle
                          </span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`w-full py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all shadow ${
                      plan.featured
                        ? "bg-primary text-on-primary hover:bg-primary-container"
                        : "bg-surface-container hover:bg-surface-container-high text-primary border border-border-hairline"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Membership Confirmation Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="w-full max-w-md bg-surface-card border border-border-hairline rounded-2xl p-6 shadow-2xl space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl text-primary">Sovereign Membership Node</h3>
                <button onClick={() => setModalOpen(false)} className="text-outline hover:text-primary">
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              {paymentSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <span className="material-symbols-outlined text-5xl text-status-verified">verified</span>
                  <h4 className="font-serif text-lg text-primary">Membership Node Accreditated!</h4>
                  <p className="text-xs text-secondary font-light">
                    Your institutional clearance keys have been issued. Welcome to the Sovereign Reserve network.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleConfirmMembership} className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="text-secondary">Accredited Firm / Principal Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rothschild Sovereign Private Capital"
                      className="w-full px-3 py-2 rounded-lg bg-surface-container text-primary border border-white/10 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-secondary">Settlement Method</label>
                    <select className="w-full px-3 py-2 rounded-lg bg-surface-container text-primary border border-white/10 focus:outline-none cursor-pointer">
                      <option>Swiss Interbank Clearing (SIC / SWIFT Wire)</option>
                      <option>Fedwire Settlement (USD Institutional Account)</option>
                      <option>USDC / USDT Cryptographic Treasury Wire</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-secondary">Corporate Email &amp; LEI Identifier</label>
                    <input
                      type="email"
                      required
                      placeholder="partners@sovereign-firm.ch"
                      className="w-full px-3 py-2 rounded-lg bg-surface-container text-primary border border-white/10 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-primary text-on-primary text-xs font-semibold uppercase tracking-wider hover:bg-primary-container transition-all shadow mt-2"
                  >
                    Execute Membership Accreditation
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
