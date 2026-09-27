import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { formatCurrency, formatArea, formatNumber, calculateMortgage, cn } from "../src/lib/utils.ts";

describe("EstatePro Utilities & Financial Calculators", () => {
  describe("formatCurrency", () => {
    test("formats billions correctly with symbol", () => {
      assert.equal(formatCurrency(1_500_000_000, "USD"), "$1.50B");
      assert.equal(formatCurrency(2_100_000_000, "EUR"), "€2.10B");
    });

    test("formats millions with one decimal place", () => {
      assert.equal(formatCurrency(48_500_000, "USD"), "$48.5M");
      assert.equal(formatCurrency(32_000_000, "GBP"), "£32.0M");
      assert.equal(formatCurrency(27_500_000, "CHF"), "CHF 27.5M");
    });

    test("formats thousands with K suffix", () => {
      assert.equal(formatCurrency(450_000, "USD"), "$450K");
      assert.equal(formatCurrency(85_000, "EUR"), "€85K");
    });

    test("formats lower amounts with commas", () => {
      assert.equal(formatCurrency(950, "USD"), "$950");
    });
  });

  describe("formatArea", () => {
    test("formats sqm correctly", () => {
      assert.equal(formatArea(850, "sqm"), "850 m²");
    });

    test("converts sqm to sqft accurately", () => {
      // 100 sqm * 10.7639 = 1076.39 => 1,076 sq.ft
      assert.equal(formatArea(100, "sqft"), "1,076 sq.ft");
    });
  });

  describe("calculateMortgage", () => {
    test("calculates monthly payments and loan amounts correctly", () => {
      const result = calculateMortgage(10_000_000, 20, 5, 25);
      
      assert.equal(result.downPayment, 2_000_000);
      assert.equal(result.loanAmount, 8_000_000);
      assert.ok(result.monthlyPayment > 40_000 && result.monthlyPayment < 50_000);
      assert.ok(result.totalRepayment > result.loanAmount);
      assert.equal(result.totalInterest, result.totalRepayment - result.loanAmount);
    });

    test("handles zero percent interest rate gracefully", () => {
      const result = calculateMortgage(1_200_000, 0, 0, 10);
      assert.equal(result.loanAmount, 1_200_000);
      assert.equal(result.monthlyPayment, 10_000);
      assert.equal(result.totalInterest, 0);
    });
  });

  describe("cn class merging", () => {
    test("merges tailwind classes cleanly without collisions", () => {
      const merged = cn("px-4 py-2", "px-6", false && "hidden", "text-primary");
      assert.ok(merged.includes("px-6"));
      assert.ok(!merged.includes("px-4"));
      assert.ok(merged.includes("text-primary"));
    });
  });
});
