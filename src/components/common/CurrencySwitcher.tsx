"use client";

import React from "react";
import { useEstateStore } from "@/store/useEstateStore";
import { Currency } from "@/types";

export default function CurrencySwitcher() {
  const { currency, setCurrency } = useEstateStore();
  const currencies: Currency[] = ["USD", "EUR", "CHF", "GBP", "JPY"];

  return (
    <div className="flex items-center gap-1.5 text-xs text-secondary">
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value as Currency)}
        className="bg-transparent text-secondary hover:text-primary focus:outline-none cursor-pointer font-medium"
      >
        {currencies.map((c) => (
          <option key={c} value={c} className="bg-surface-elevated text-primary">
            {c}
          </option>
        ))}
      </select>
      <span className="text-outline">|</span>
      <span className="text-primary font-medium">EN</span>
    </div>
  );
}
