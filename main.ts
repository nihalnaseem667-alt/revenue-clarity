// ============================================
// tests/calculators.test.ts
// Unit tests for all calculators
// ============================================

import { describe, it, expect } from 'vitest'
import {
  calculateMRR,
  calculateARR,
  calculateGrossMargin,
  calculateNetProfit,
  calculateNetMargin,
} from '../src/calculators/revenue'
import {
  calculateCAC,
  calculateLTV,
  calculateLTVCACRatio,
  calculateChurnRate,
  calculatePaybackPeriod,
} from '../src/calculators/customer'
import {
  calculateBreakEvenRevenue,
  calculateBreakEvenUnits,
  calculateMarginOfSafety,
  calculateContributionMarginRatio,
} from '../src/calculators/breakeven'
import { generateReport } from '../src/calculators'

// ── Revenue ───────────────────────────────────────────

describe('Revenue Calculators', () => {
  it('calculates MRR from recurringRevenue', () => {
    expect(calculateMRR({ recurringRevenue: 420_000, monthlyRevenue: 500_000 })).toBe(420_000)
  })

  it('falls back to monthlyRevenue when recurringRevenue is absent', () => {
    expect(calculateMRR({ monthlyRevenue: 500_000 })).toBe(500_000)
  })

  it('calculates ARR as MRR × 12', () => {
    expect(calculateARR(100_000)).toBe(1_200_000)
  })

  it('calculates gross margin correctly', () => {
    expect(calculateGrossMargin(500_000, 150_000)).toBe(70)
  })

  it('returns 0 gross margin when revenue is 0', () => {
    expect(calculateGrossMargin(0, 0)).toBe(0)
  })

  it('calculates net profit correctly', () => {
    expect(calculateNetProfit(500_000, 150_000, 200_000)).toBe(150_000)
  })

  it('calculates net margin correctly', () => {
    expect(calculateNetMargin(500_000, 150_000)).toBe(30)
  })
})

// ── Customer ──────────────────────────────────────────

describe('Customer Calculators', () => {
  it('calculates CAC correctly', () => {
    expect(calculateCAC(80_000, 40_000, 30)).toBe(4_000)
  })

  it('returns 0 CAC when no new customers', () => {
    expect(calculateCAC(80_000, 40_000, 0)).toBe(0)
  })

  it('calculates LTV correctly', () => {
    expect(calculateLTV(2_500, 24)).toBe(60_000)
  })

  it('calculates LTV with gross margin adjustment', () => {
    expect(calculateLTV(2_500, 24, 70)).toBe(42_000)
  })

  it('calculates LTV:CAC ratio', () => {
    expect(calculateLTVCACRatio(42_000, 4_000)).toBe(10.5)
  })

  it('calculates churn rate', () => {
    expect(calculateChurnRate(8, 200)).toBe(4)
  })

  it('calculates payback period', () => {
    const payback = calculatePaybackPeriod(4_000, 2_500, 70)
    expect(payback).toBeGreaterThan(0)
  })
})

// ── Break-Even ────────────────────────────────────────

describe('Break-Even Calculators', () => {
  it('calculates contribution margin ratio', () => {
    expect(calculateContributionMarginRatio(1_750, 2_500)).toBe(70)
  })

  it('calculates break-even revenue', () => {
    const ber = calculateBreakEvenRevenue(200_000, 70)
    expect(ber).toBeCloseTo(285_714, -2)
  })

  it('calculates break-even units', () => {
    expect(calculateBreakEvenUnits(200_000, 1_750)).toBe(115)
  })

  it('calculates positive margin of safety', () => {
    expect(calculateMarginOfSafety(500_000, 285_714)).toBeGreaterThan(0)
  })
})

// ── Full Report ───────────────────────────────────────

describe('Full Report Generation', () => {
  const validInput = {
    monthlyRevenue: 500_000,
    recurringRevenue: 420_000,
    costOfGoodsSold: 150_000,
    operatingExpenses: 200_000,
    totalCustomers: 200,
    newCustomersPerMonth: 30,
    lostCustomersPerMonth: 8,
    avgCustomerLifespanMonths: 24,
    totalMarketingSpend: 80_000,
    totalSalesSpend: 40_000,
    avgRevenuePerCustomer: 2_500,
  }

  it('generates a full report without errors', () => {
    const report = generateReport(validInput, 2_000_000)
    expect(report).toBeDefined()
    expect(report.revenue.mrr).toBe(420_000)
    expect(report.customer.cac).toBe(4_000)
    expect(report.healthScore.score).toBeGreaterThan(0)
    expect(['A', 'B', 'C', 'D', 'F']).toContain(report.healthScore.grade)
  })

  it('throws on invalid input', () => {
    expect(() => generateReport({ monthlyRevenue: -1000 })).toThrow()
  })
})
