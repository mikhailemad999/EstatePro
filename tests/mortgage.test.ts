import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { calculateMortgage } from "../src/lib/utils.ts";

describe("Mortgage & Amortization Mechanics", () => {
  test("calculates standard 20% down payment on a $50M sovereign estate", () => {
    const estatePrice = 50_000_000;
    const downPaymentPercent = 20;
    const interestRate = 4.5;
    const durationYears = 30;

    const result = calculateMortgage(estatePrice, downPaymentPercent, interestRate, durationYears);

    assert.equal(result.downPayment, 10_000_000);
    assert.equal(result.loanAmount, 40_000_000);
    assert.ok(result.monthlyPayment > 200_000);
    assert.ok(result.totalRepayment > result.loanAmount);
    assert.equal(result.totalRepayment, result.loanAmount + result.totalInterest);
  });

  test("calculates high down payment (50%) correctly", () => {
    const estatePrice = 28_000_000;
    const downPaymentPercent = 50;
    const interestRate = 3.8;
    const durationYears = 15;

    const result = calculateMortgage(estatePrice, downPaymentPercent, interestRate, durationYears);

    assert.equal(result.downPayment, 14_000_000);
    assert.equal(result.loanAmount, 14_000_000);
    assert.ok(result.monthlyPayment > 0);
  });

  test("calculates short duration 5-year bridge loan", () => {
    const principal = 5_000_000;
    const downPaymentPercent = 10;
    const interestRate = 6.0;
    const durationYears = 5;

    const result = calculateMortgage(principal, downPaymentPercent, interestRate, durationYears);

    assert.equal(result.downPayment, 500_000);
    assert.equal(result.loanAmount, 4_500_000);
    // 5-year loan should have monthly repayment around ~87,000
    assert.ok(result.monthlyPayment > 80_000 && result.monthlyPayment < 95_000);
  });

  test("calculates 100% cash financing (0 loan amount)", () => {
    const principal = 20_000_000;
    const downPaymentPercent = 100;
    const interestRate = 4.0;
    const durationYears = 20;

    const result = calculateMortgage(principal, downPaymentPercent, interestRate, durationYears);

    assert.equal(result.downPayment, 20_000_000);
    assert.equal(result.loanAmount, 0);
    assert.equal(result.monthlyPayment, 0);
    assert.equal(result.totalInterest, 0);
    assert.equal(result.totalRepayment, 0);
  });
});
