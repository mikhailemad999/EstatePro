"use client";

import React, { useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { calculateMortgage, formatCurrency } from "@/lib/utils";
import { useEstateStore } from "@/store/useEstateStore";

export default function MortgageCalculatorPage() {
  const { currency } = useEstateStore();
  const [propertyPrice, setPropertyPrice] = useState(30000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(25);
  const [interestRate, setInterestRate] = useState(4.25);
  const [durationYears, setDurationYears] = useState(25);
  const [annualPropertyTax, setAnnualPropertyTax] = useState(120000);
  const [annualInsurance, setAnnualInsurance] = useState(45000);

  // Form submission state
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");

  const calc = calculateMortgage(propertyPrice, downPaymentPercent, interestRate, durationYears);
  const monthlyTax = Math.round(annualPropertyTax / 12);
  const monthlyInsurance = Math.round(annualInsurance / 12);
  const totalMonthlyPayment = calc.monthlyPayment + monthlyTax + monthlyInsurance;

  // Generate 5-year sample amortization milestones
  const amortizationSchedule = [];
  let currentBalance = calc.loanAmount;
  const annualPrincipalRate = calc.loanAmount / durationYears;

  for (let yr = 1; yr <= Math.min(durationYears, 10); yr++) {
    const interestPaid = Math.round(currentBalance * (interestRate / 100));
    const principalPaid = Math.round(calc.monthlyPayment * 12 - interestPaid);
    const endingBalance = Math.max(0, currentBalance - principalPaid);

    amortizationSchedule.push({
      year: yr,
      startBalance: currentBalance,
      principalPaid,
      interestPaid,
      endBalance: endingBalance,
    });

    currentBalance = endingBalance;
  }

  const handlePreApproval = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/mortgage/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicantName: clientName,
          applicantEmail: clientEmail,
          loanAmount: calc.loanAmount,
          downPayment: calc.downPayment,
          durationYears,
          interestRate,
          monthlyPayment: totalMonthlyPayment,
        }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[10px] uppercase font-mono tracking-widest text-outline">
              Institutional Capital Engine
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-primary">
              Private Wealth Mortgage &amp; Debt Calculator
            </h1>
            <p className="text-sm text-secondary font-light">
              Model bespoke debt structures, multi-currency financing, and amortization schedules for ultra-prime trophy acquisitions.
            </p>
          </div>

          {/* Calculator Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Controls Column */}
            <div className="lg:col-span-7 bg-surface-card rounded-2xl border border-border-subtle p-6 sm:p-8 space-y-6 shadow-xl">
              <h3 className="font-serif text-xl text-primary">Acquisition Parameters</h3>

              {/* Asset Price */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-secondary font-medium">Asset Acquisition Price</span>
                  <span className="text-primary font-semibold font-serif text-base">{formatCurrency(propertyPrice, currency)}</span>
                </div>
                <input
                  type="range"
                  min={5000000}
                  max={100000000}
                  step={1000000}
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(Number(e.target.value))}
                  className="w-full accent-primary h-1.5 bg-surface-container appearance-none cursor-pointer"
                />
              </div>

              {/* Down Payment */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-secondary font-medium">Down Payment ({downPaymentPercent}%)</span>
                  <span className="text-primary font-semibold">{formatCurrency(calc.downPayment, currency)}</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={60}
                  step={5}
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full accent-primary h-1.5 bg-surface-container appearance-none cursor-pointer"
                />
              </div>

              {/* Rate & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-secondary font-medium">Fixed Interest Rate</span>
                    <span className="text-primary font-semibold">{interestRate}%</span>
                  </div>
                  <input
                    type="range"
                    min={2.0}
                    max={8.0}
                    step={0.25}
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full accent-primary h-1.5 bg-surface-container appearance-none cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-secondary font-medium">Amortization Tenure</span>
                    <span className="text-primary font-semibold">{durationYears} Years</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={30}
                    step={5}
                    value={durationYears}
                    onChange={(e) => setDurationYears(Number(e.target.value))}
                    className="w-full accent-primary h-1.5 bg-surface-container appearance-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Taxes & Insurance */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border-subtle">
                <div className="space-y-1">
                  <label className="text-xs text-secondary">Est. Annual Property Tax</label>
                  <input
                    type="number"
                    value={annualPropertyTax}
                    onChange={(e) => setAnnualPropertyTax(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-surface-container text-xs text-primary border border-white/5 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-secondary">Est. Annual Property Insurance</label>
                  <input
                    type="number"
                    value={annualInsurance}
                    onChange={(e) => setAnnualInsurance(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-surface-container text-xs text-primary border border-white/5 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Right Summary & Pre-Approval Submission */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="bg-surface-card rounded-2xl border border-border-subtle p-6 sm:p-8 space-y-6 shadow-xl">
                <div>
                  <span className="text-[10px] uppercase font-mono text-outline tracking-widest block">
                    Total Estimated Monthly Obligation
                  </span>
                  <div className="font-serif text-4xl sm:text-5xl text-primary font-medium mt-1">
                    {formatCurrency(totalMonthlyPayment, currency)}
                    <span className="text-xs font-sans text-secondary font-normal ml-1">/ mo</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-border-subtle text-xs">
                  <div className="flex justify-between text-secondary">
                    <span>Principal &amp; Interest:</span>
                    <span className="text-primary font-semibold">{formatCurrency(calc.monthlyPayment, currency)}</span>
                  </div>
                  <div className="flex justify-between text-secondary">
                    <span>Property Taxes (Monthly):</span>
                    <span className="text-primary font-semibold">{formatCurrency(monthlyTax, currency)}</span>
                  </div>
                  <div className="flex justify-between text-secondary">
                    <span>Homeowners Insurance:</span>
                    <span className="text-primary font-semibold">{formatCurrency(monthlyInsurance, currency)}</span>
                  </div>
                  <div className="flex justify-between text-secondary pt-2 border-t border-border-subtle">
                    <span>Total Financed Principal:</span>
                    <span className="text-primary font-semibold">{formatCurrency(calc.loanAmount, currency)}</span>
                  </div>
                  <div className="flex justify-between text-secondary">
                    <span>Cumulative Lifetime Interest:</span>
                    <span className="text-primary font-semibold">{formatCurrency(calc.totalInterest, currency)}</span>
                  </div>
                </div>

                {/* Pre-Approval Form */}
                <div className="pt-4 border-t border-border-subtle">
                  {submitted ? (
                    <div className="p-4 rounded-xl bg-surface-container text-center space-y-2">
                      <span className="material-symbols-outlined text-3xl text-status-verified">verified</span>
                      <h4 className="font-serif text-base text-primary">Pre-Qualification Lodged</h4>
                      <p className="text-xs text-secondary">
                        A private wealth underwriting officer will contact you regarding facility terms.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handlePreApproval} className="space-y-3">
                      <span className="text-[10px] uppercase font-mono text-outline block">
                        Institutional Pre-Approval Request
                      </span>
                      <input
                        type="text"
                        placeholder="Principal Client Name"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        required
                        className="w-full px-3 py-2 rounded-lg bg-surface-container text-xs text-primary border border-white/5 focus:outline-none"
                      />
                      <input
                        type="email"
                        placeholder="Family Office Email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 rounded-lg bg-surface-container text-xs text-primary border border-white/5 focus:outline-none"
                      />
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-3 rounded-lg bg-primary text-on-primary text-xs font-semibold uppercase tracking-wider hover:bg-primary-container transition-all shadow"
                      >
                        {submitting ? "Submitting Request..." : "Request Underwriter Pre-Approval"}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Amortization Table */}
          <div className="rounded-2xl bg-surface-card border border-border-subtle p-6 sm:p-8 space-y-6 shadow-xl">
            <div>
              <span className="text-[10px] uppercase font-mono text-outline tracking-widest">
                Ten-Year Forecast Schedule
              </span>
              <h3 className="font-serif text-2xl text-primary mt-1">
                Amortization &amp; Equity Growth Schedule
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border-subtle text-outline font-mono uppercase">
                    <th className="py-3 px-4">Year</th>
                    <th className="py-3 px-4">Starting Balance</th>
                    <th className="py-3 px-4">Annual Principal</th>
                    <th className="py-3 px-4">Annual Interest</th>
                    <th className="py-3 px-4">Ending Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {amortizationSchedule.map((row) => (
                    <tr key={row.year} className="hover:bg-surface-container/50">
                      <td className="py-3 px-4 font-mono font-bold text-primary">Year {row.year}</td>
                      <td className="py-3 px-4 text-secondary">{formatCurrency(row.startBalance, currency)}</td>
                      <td className="py-3 px-4 text-status-rent font-medium">{formatCurrency(row.principalPaid, currency)}</td>
                      <td className="py-3 px-4 text-error font-medium">{formatCurrency(row.interestPaid, currency)}</td>
                      <td className="py-3 px-4 text-primary font-semibold">{formatCurrency(row.endBalance, currency)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
