/**
 * Formatting Utilities
 *
 * Helper functions for formatting data for display.
 */

import { Listing, FormattedListing } from '@/lib/types/listing'

/**
 * Format price with currency symbol
 *
 * @param price - Price as number
 * @returns Formatted price string (e.g., "₱1,195,000")
 */
export function formatPrice(price: number): string {
  return `₱${price.toLocaleString('en-PH', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`
}

/**
 * Format date to readable string
 *
 * @param dateString - ISO date string
 * @returns Formatted date string
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Format listing from database format to display format
 *
 * Converts Listing (database) to FormattedListing (UI)
 *
 * @param listing - Raw listing from database
 * @returns Formatted listing for UI display
 */
export function formatListing(listing: Listing): FormattedListing {
  return {
    id: listing.id,
    category: listing.category,
    price: formatPrice(listing.price),
    priceValue: Number(listing.price),
    title: listing.title,
    location: listing.location,
    year: listing.specs.year || 'N/A',
    color: listing.specs.color || 'N/A',
    mileage: listing.specs.mileage || 'N/A',
    fuelType: listing.specs.fuelType || 'N/A',
    bodyType: listing.specs.bodyType || 'N/A',
    brand: listing.specs.brand || listing.specs.bodyType || 'N/A',
    description: listing.description?.trim() || '',
    image: listing.image_url || '/images/placeholder.jpg',
    status: listing.status,
    createdAt: listing.created_at,
    updatedAt: listing.updated_at,
  }
}

/**
 * Format multiple listings
 *
 * @param listings - Array of raw listings
 * @returns Array of formatted listings
 */
export function formatListings(listings: Listing[]): FormattedListing[] {
  return listings.map(formatListing)
}

/**
 * Truncate text to specified length
 *
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

/**
 * Format a date string as a relative time ago string
 *
 * @param dateString - ISO date string
 * @returns Relative time string (e.g., "2 weeks ago")
 */
export function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 14) return '1 week ago'
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  if (diffDays < 60) return '1 month ago'
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
  return `${Math.floor(diffDays / 365)} years ago`
}

/**
 * Format a date string as month and year only
 *
 * @param dateString - ISO date string
 * @returns Formatted string (e.g., "January 2026")
 */
export function formatMonthYear(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
}
