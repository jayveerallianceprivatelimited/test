import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"

/**
 * Combines multiple class names and resolves Tailwind CSS conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date using date-fns
 */
export function formatDate(date: Date | string, formatString: string = "PPP") {
  return format(new Date(date), formatString)
}

/**
 * Truncates a string to a specified length and adds an ellipsis
 */
export function truncateString(str: string, length: number = 30): string {
  return str.length > length ? `${str.substring(0, length)}...` : str
}

/**
 * Formats a number as currency
 */
export function formatCurrency(amount: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount)
}

/**
 * Formats a number with commas for thousands
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num)
}

/**
 * Generates a random ID
 */
export function generateId(length: number = 8): string {
  return Math.random().toString(36).substring(2, 2 + length)
}

/**
 * Debounces a function call
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null
  
  return function(...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Capitalizes the first letter of a string
 */
export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * Checks if an object is empty
 */
export function isEmptyObject(obj: Record<string, any>): boolean {
  return Object.keys(obj).length === 0
}

/**
 * Gets a random item from an array
 */
export function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

/**
 * Calculates percentage change between two numbers
 */
export function calculatePercentageChange(oldValue: number, newValue: number): number {
  if (oldValue === 0) return newValue > 0 ? 100 : 0
  return ((newValue - oldValue) / Math.abs(oldValue)) * 100
}
