// ============================================
// src/calculators/breakeven.ts
// Break-even point and contribution margin analysis
// ============================================

import type { BusinessInput, BreakEvenAnalysis } from '@/types'
import { round } from '@/utils/format'

/**
 * Contribution Margin per Unit
 * Revenue per unit minus variable cost per unit
 * This is what each sale contributes toward covering fixed costs
 */
export function calculateContributionMargin(
  revenuePerUnit: number,
  variableCostPerUnit: number
): number {
  return round(revenuePerUnit - variableCostPerUnit)
}

/**
 * Contribution Margin Ratio
 * % of each revenue dollar that contributes to fixed costs & profit
 * Benchmark: Higher = better. >60% is strong
 */
export function calculateContributionMarginRatio(
  contributionMargin: number,
  revenuePerUnit: number
): number {
  if (revenuePerUnit === 0) return 0
  return round((contributionMargin / revenuePerUnit) * 100)
}

/**
 * Break-Even Revenue
 * Monthly revenue needed to cover all costs
 * Below this = losing money, above this = profit
 */
export function calculateBreakEvenRevenue(
  fixedCosts: number,
  contributionMarginRatio: number
): number {
  if (contributionMarginRatio === 0) return 0
  return round(fixedCosts / (contributionMarginRatio / 100))
}

/**
 * Break-Even Units
 * Number of customers/sales needed per month to break even
 */
export function calculateBreakEvenUnits(
  fixedCosts: number,
  contributionMargin: number
): number {
  if (contributionMargin === 0) return 0
  return Math.ceil(fixedCosts / contributionMargin)
}

/**
 * Margin of Safety
 * How far current revenue is above break-even (%)
 * Positive = safe, Negative = below break-even
 */
export function calculateMarginOfSafety(
  currentRevenue: number,
  breakEvenRevenue: number
): number {
  if (breakEvenRevenue === 0) return 100
  return round(((currentRevenue - breakEvenRevenue) / currentRevenue) * 100)
}

/**
 * Full Break-Even Analysis — runs all calculations in one call
 */
export function calculateBreakEven(input: BusinessInput): BreakEvenAnalysis {
  const variableCostPerUnit = input.costOfGoodsSold / (input.totalCustomers || 1)
  const contributionMargin = calculateContributionMargin(
    input.avgRevenuePerCustomer,
    variableCostPerUnit
  )
  const contributionMarginRatio = calculateContributionMarginRatio(
    contributionMargin,
    input.avgRevenuePerCustomer
  )
  const breakEvenRevenue = calculateBreakEvenRevenue(
    input.operatingExpenses,
    contributionMarginRatio
  )
  const breakEvenUnits = calculateBreakEvenUnits(
    input.operatingExpenses,
    contributionMargin
  )
  const marginOfSafety = calculateMarginOfSafety(input.monthlyRevenue, breakEvenRevenue)

  return {
    breakEvenRevenue,
    breakEvenUnits,
    marginOfSafety,
    contributionMargin,
    contributionMarginRatio,
  }
}
