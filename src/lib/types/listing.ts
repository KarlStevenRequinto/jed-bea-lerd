/**
 * Listing Domain Types
 *
 * Type definitions for vehicle and property listings.
 * These types map to the Supabase listings table schema.
 */

// =====================================================
// CORE TYPES
// =====================================================

/**
 * Listing category types
 */
export type ListingCategory = 'VEHICLE' | 'PROPERTY'

/**
 * Listing status types
 */
export type ListingStatus = 'active' | 'sold' | 'archived' | 'pending'

/**
 * Listing specifications (stored as JSONB in database)
 * Contains category-specific metadata
 */
export interface ListingSpecs {
  year?: string
  color?: string
  mileage?: string
  fuelType?: string
  bodyType?: string
  // Add more fields as needed for future expansion
  [key: string]: string | undefined
}

/**
 * Main Listing interface
 * Represents a vehicle or property listing from the database
 */
export interface Listing {
  id: string
  user_id: string
  category: ListingCategory
  title: string
  description: string | null
  price: number
  location: string
  image_url: string | null
  specs: ListingSpecs
  status: ListingStatus
  created_at: string
  updated_at: string
}

// =====================================================
// REQUEST/RESPONSE TYPES
// =====================================================

/**
 * Filters for querying listings
 */
export interface ListingFilters {
  category?: ListingCategory
  status?: ListingStatus
  minPrice?: number
  maxPrice?: number
  location?: string
  year?: string
  fuelType?: string
  bodyType?: string
  userId?: string
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page?: number
  limit?: number
}

/**
 * Sort parameters
 */
export interface SortParams {
  field?: 'created_at' | 'price' | 'title'
  order?: 'asc' | 'desc'
}

/**
 * Complete query parameters for listing requests
 */
export interface ListingQueryParams extends ListingFilters, PaginationParams, SortParams {}

/**
 * Request payload for creating a new listing
 */
export interface CreateListingRequest {
  category: ListingCategory
  title: string
  description?: string
  price: number
  location: string
  image_url?: string
  specs?: ListingSpecs
}

/**
 * Request payload for updating an existing listing
 */
export interface UpdateListingRequest {
  title?: string
  description?: string
  price?: number
  location?: string
  image_url?: string
  specs?: ListingSpecs
  status?: ListingStatus
}

/**
 * Response for listing operations
 */
export interface ListingResponse {
  listing: Listing
}

/**
 * Response for multiple listings
 */
export interface ListingsResponse {
  listings: Listing[]
  total?: number
  page?: number
  limit?: number
}

// =====================================================
// VIEW MODEL TYPES (for frontend presentation)
// =====================================================

/**
 * Formatted listing for UI display
 * Converts database values to display-ready formats
 */
export interface FormattedListing {
  id: string
  category: string
  price: string // Formatted with currency symbol
  title: string
  location: string
  year: string
  color: string
  mileage: string
  fuelType: string
  bodyType: string
  description: string
  image: string
  status: ListingStatus
  createdAt: string
  updatedAt: string
}

// =====================================================
// TYPE GUARDS
// =====================================================

/**
 * Type guard to check if a value is a valid ListingCategory
 */
export function isListingCategory(value: string): value is ListingCategory {
  return value === 'VEHICLE' || value === 'PROPERTY'
}

/**
 * Type guard to check if a value is a valid ListingStatus
 */
export function isListingStatus(value: string): value is ListingStatus {
  return ['active', 'sold', 'archived', 'pending'].includes(value)
}

// =====================================================
// UTILITY TYPES
// =====================================================

/**
 * Partial listing for updates (all fields optional)
 */
export type PartialListing = Partial<Listing>

/**
 * Listing without timestamps (for creation)
 */
export type ListingWithoutTimestamps = Omit<Listing, 'created_at' | 'updated_at'>

/**
 * Listing database insert type
 */
export type ListingInsert = Omit<Listing, 'id' | 'created_at' | 'updated_at'>
