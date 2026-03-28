// ============================================
// src/utils/format.ts
// Number formatting and display helpers
// ============================================

/**
 * Format a number as currency (INR by default)
 */
export function formatCurrency(
  value: number,
  currency: string = 'INR',
  locale: string = 'en-IN'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value)
}

/**
 * Format a number as a percentage
 */
export function formatPercent(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`
}

/**
 * Format a ratio like LTV:CAC
 */
export function formatRatio(value: number, decimals: number = 2): string {
  return `${value.toFixed(decimals)}x`
}

/**
 * Format months into a human-readable string
 */
export function formatMonths(months: number): string {
  if (months < 1) return `${Math.round(months * 30)} days`
  if (months < 12) return `${months.toFixed(1)} months`
  const years = Math.floor(months / 12)
  const rem = Math.round(months % 12)
  return rem > 0 ? `${years}y ${rem}m` : `${years} year${years > 1 ? 's' : ''}`
}

/**
 * Format large numbers with K / L / Cr suffixes (Indian system)
 */
export function formatShort(value: number): string {
  if (value >= 1_00_00_000) return `₹${(value / 1_00_00_000).toFixed(2)} Cr`
  if (value >= 1_00_000) return `₹${(value / 1_00_000).toFixed(2)} L`
  if (value >= 1_000) return `₹${(value / 1_000).toFixed(1)}K`
  return `₹${value.toFixed(0)}`
}

/**
 * Round to N decimal places safely
 */
export function round(value: number, decimals: number = 2): number {
  return Math.round(value * 10 ** decimals) / 10 ** decimals
}

/**
 * Clamp a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
