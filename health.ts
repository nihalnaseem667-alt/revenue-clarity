// ============================================
// src/calculators/index.ts
// Single entry point — runs a full report
// ============================================

import type { BusinessInput, FullReport } from '@/types'
import { validateInput } from '@/utils/validate'
import { calculateRevenueMetrics } from './revenue'
import { calculateCustomerMetrics } from './customer'
import { calculateBreakEven } from './breakeven'
import { calculateHealthScore } from './health'

/**
 * Generate a complete business financial report
 * from a single BusinessInput object
 */
export function generateReport(raw: unknown, cashOnHand?: number): FullReport {
  const validation = validateInput(raw)

  if (!validation.success || !validation.data) {
    throw new Error(
      `Invalid input: ${JSON.stringify(validation.errors)}`
    )
  }

  const input: BusinessInput = validation.data

  const revenue   = calculateRevenueMetrics(input, cashOnHand)
  const customer  = calculateCustomerMetrics(input, revenue.grossMarginPercent)
  const breakEven = calculateBreakEven(input)
  const health    = calculateHealthScore(revenue, customer, breakEven)

  return {
    input,
    revenue,
    customer,
    breakEven,
    healthScore: health,
    generatedAt: new Date().toISOString(),
  }
}

// Re-export individual calculators for direct use
export { calculateRevenueMetrics } from './revenue'
export { calculateCustomerMetrics } from './customer'
export { calculateBreakEven } from './breakeven'
export { calculateHealthScore } from './health'
