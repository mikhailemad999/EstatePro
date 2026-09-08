"use client";

import React, { useState } from "react";
import Link from "next/link";
import { calculateMortgage, formatCurrency } from "@/lib/utils";
import { useEstateStore } from "@/store/useEstateStore";

export default function MortgagePreview() {
  const { currency } = useEstateStore();
  const [propertyPrice, setPropertyPrice] = useState(25000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(25);
  const [interestRate, setInterestRate] = useState(4.25);
  const [durationYears, setDurationYears] = useState(25);

  const calc = calculateMortgage(propertyPrice, downPaymentPercent, interestRate, durationYears);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-2xl bg-surface-card border border-border-subtle p-6 sm:p-10 shadow-2xl">
      {/* Controls Column */}
      <div className="lg:col-span-7 space-y-6">
        <div>
          <span className="text-[10px] uppercase font-mono text-outline tracking-widest">
            Private Wealth Capital Advisory
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-primary mt-1">
            Institutional Financing &amp; Liquidity Simulation
          </h3>
          <p className="text-xs text-secondary mt-2 leading-relaxed">
            Model structured debt facilities, jumbo cross-border collateralizations, and multi-currency amortization for trophy acquisitions.
          </p>
        </div>

        {/* Asset Value Slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-secondary font-medium">Asset Acquisition Value</span>
            <span className="text-primary font-semibold font-serif text-sm">{formatCurrency(propertyPrice, currency)}</span>
          </div>
          <input
            type="range"
            min={5000000}
            max={75000000}
            step={500000}
            value={propertyPrice}
            onChange={(e) => setPropertyPrice(Number(e.target.value))}
            className="w-full accent-primary bg-surface-container h-1.5 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Down Payment & Tenure Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-secondary">Down Payment ({downPaymentPercent}%)</span>
              <span className="text-primary font-semibold">{formatCurrency(calc.downPayment, currency)}</span>
            </div>
            <input
              type="range"
              min={15}
              max={50}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-primary bg-surface-container h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-secondary">Loan Duration ({durationYears} Yrs)</span>
              <span className="text-primary font-semibold">{interestRate}% fixed</span>
            </div>
            <input
              type="range"
              min={10}
              max={30}
              step={5}
              value={durationYears}
              onChange={(e) => setDurationYears(Number(e.target.value))}
              className="w-full accent-primary bg-surface-container h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Summary Output Box */}
      <div className="lg:col-span-5 bg-surface-container rounded-xl p-6 border border-border-hairline/30 flex flex-col justify-between space-y-6">
        <div>
          <span className="text-[10px] uppercase font-mono text-outline tracking-widest block mb-1">
            Estimated Monthly Service
          </span>
          <div className="text-3xl sm:text-4xl font-serif text-primary font-medium">
            {formatCurrency(calc.monthlyPayment, currency)}
            <span className="text-xs font-sans text-secondary font-normal ml-1">/ month</span>
          </div>
        </div>

        <div className="space-y-2 pt-4 border-t border-border-subtle text-xs">
          <div className="flex justify-between text-secondary">
            <span>Financed Loan Principal:</span>
            <span className="text-primary font-semibold">{formatCurrency(calc.loanAmount, currency)}</span>
          </div>
          <div className="flex justify-between text-secondary">
            <span>Total Cumulative Interest:</span>
            <span className="text-primary font-semibold">{formatCurrency(calc.totalInterest, currency)}</span>
          </div>
          <div className="flex justify-between text-secondary">
            <span>Underwriting Desk:</span>
            <span className="text-status-verified font-mono text-[10px]">UBS / Credit Suisse Prime</span>
          </div>
        </div>

        <Link
          href="/mortgage-calculator"
          className="w-full py-3 rounded-lg bg-primary text-on-primary text-xs font-semibold uppercase tracking-wider text-center hover:bg-primary-container transition-all shadow"
        >
          Open Detailed Amortization Matrix →
        </Link>
      </div>
    </div>
  );
}
