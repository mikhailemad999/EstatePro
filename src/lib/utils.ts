import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  amount: number,
  currency: string = "USD"
): string {
  const symbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    CHF: "CHF ",
    GBP: "£",
    JPY: "¥",
  };

  const symbol = symbols[currency] || `${currency} `;
  
  if (amount >= 1_000_000_000) {
    return `${symbol}${(amount / 1_000_000_000).toFixed(2)}B`;
  }
  if (amount >= 1_000_000) {
    return `${symbol}${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    return `${symbol}${(amount / 1_000).toFixed(0)}K`;
  }

  return `${symbol}${amount.toLocaleString()}`;
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num);
}

export function formatArea(sqm: number, unit: "sqm" | "sqft" = "sqm"): string {
  if (unit === "sqft") {
    const sqft = Math.round(sqm * 10.7639);
    return `${formatNumber(sqft)} sq.ft`;
  }
  return `${formatNumber(Math.round(sqm))} m²`;
}

export function calculateMortgage(
  principal: number,
  downPaymentPercent: number,
  annualRatePercent: number,
  durationYears: number
) {
  const downPayment = principal * (downPaymentPercent / 100);
  const loanAmount = principal - downPayment;
  const monthlyRate = annualRatePercent / 100 / 12;
  const totalMonths = durationYears * 12;

  let monthlyPayment = 0;
  if (monthlyRate > 0) {
    monthlyPayment =
      (loanAmount *
        (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
  } else {
    monthlyPayment = loanAmount / totalMonths;
  }

  const totalRepayment = monthlyPayment * totalMonths;
  const totalInterest = totalRepayment - loanAmount;

  return {
    downPayment,
    loanAmount,
    monthlyPayment: Math.round(monthlyPayment),
    totalInterest: Math.round(totalInterest),
    totalRepayment: Math.round(totalRepayment),
  };
}
