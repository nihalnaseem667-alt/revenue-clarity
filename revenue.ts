// ============================================
// src/calculators/customer.ts
// Customer acquisition, retention & value metrics
// ============================================

import type { BusinessInput, CustomerMetrics } from '@/types'
import { round } from '@/utils/format'

/**
 * Customer Acquisition Cost (CAC)
 * Total cost to acquire one new customer
 * Benchmark: Lower is better. LTV should be 3x+ CAC
 */
export function calculateCAC(
  totalMarketingSpend: number,
  totalSalesSpend: number,
  newCustomers: number
): number {
  if (newCustomers === 0) return 0
  return round((totalMarketingSpend + totalSalesSpend) / newCustomers)
}

/**
 * Customer Lifetime Value (LTV)
 * Total revenue a customer generates over their entire relationship with you
 * Benchmark: LTV:CAC > 3:1 is healthy
 */
export function calculateLTV(
  avgRevenuePerCustomer: number,
  avgLifespanMonths: number,
  grossMarginPercent?: number
): number {
  const rawLTV = avgRevenuePerCustomer * avgLifespanMonths
  if (grossMarginPercent !== undefined) {
    return round(rawLTV * (grossMarginPercent / 100))
  }
  return round(rawLTV)
}

/**
 * LTV:CAC Ratio
 * How much value you get per dollar spent on acquisition
 * Benchmark: 3:1 = healthy, 1:1 = losing money, 5:1+ = great
 */
export function calculateLTVCACRatio(ltv: number, cac: number): number {
  if (cac === 0) return 0
  return round(ltv / cac)
}

/**
 * Churn Rate
 * % of customers lost in a given period
 * Benchmark: <2%/month for SaaS is good, <5% is acceptable
 */
export function calculateChurnRate(
  lostCustomers: number,
  totalCustomers: number
): number {
  if (totalCustomers === 0) return 0
  return round((lostCustomers / totalCustomers) * 100)
}

/**
 * Retention Rate
 * % of customers who stayed
 */
export function calculateRetentionRate(churnRate: number): number {
  return round(100 - churnRate)
}

/**
 * Average Revenue Per User (ARPU)
 * Revenue per customer per month
 */
export function calculateARPU(monthlyRevenue: number, totalCustomers: number): number {
  if (totalCustomers === 0) return 0
  return round(monthlyRevenue / totalCustomers)
}

/**
 * CAC Payback Period
 * How many months to recover what you spent acquiring a customer
 * Benchmark: <12 months is good, <6 months is excellent
 */
export function calculatePaybackPeriod(cac: number, arpu: number, grossMarginPercent: number): number {
  const monthlyGrossProfit = arpu * (grossMarginPercent / 100)
  if (monthlyGrossProfit === 0) return 0
  return round(cac / monthlyGrossProfit)
}

/**
 * Full Customer Metrics — runs all calculations in one call
 */
export function calculateCustomerMetrics(
  input: BusinessInput,
  grossMarginPercent: number
): CustomerMetrics {
  const cac = calculateCAC(input.totalMarketingSpend, input.totalSalesSpend, input.newCustomersPerMonth)
  const ltv = calculateLTV(input.avgRevenuePerCustomer, input.avgCustomerLifespanMonths, grossMarginPercent)
  const ltvCacRatio = calculateLTVCACRatio(ltv, cac)
  const churnRate = calculateChurnRate(input.lostCustomersPerMonth, input.totalCustomers)
  const retentionRate = calculateRetentionRate(churnRate)
  const avgRevenuePerUser = calculateARPU(input.monthlyRevenue, input.totalCustomers)
  const paybackPeriodMonths = calculatePaybackPeriod(cac, avgRevenuePerUser, grossMarginPercent)

  return {
    cac,
    ltv,
    ltvCacRatio,
    churnRate,
    retentionRate,
    avgRevenuePerUser,
    paybackPeriodMonths,
  }
}
