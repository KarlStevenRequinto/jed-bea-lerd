/**
 * Listings Service Layer
 *
 * Handles all database operations for listings.
 * This service uses Supabase server client for server-side operations.
 *
 * Usage:
 * - Server Components: Import and call directly
 * - API Routes: Import and call directly
 * - Client Components: Call via API routes
 */

import { createClient } from '@/lib/supabase/server'
import {
  Listing,
  ListingFilters,
  ListingQueryParams,
  CreateListingRequest,
  UpdateListingRequest,
  ListingsResponse,
} from '@/lib/types/listing'

// =====================================================
// QUERY OPERATIONS
// =====================================================

/**
 * Get all active listings with optional filters
 *
 * @param filters - Optional filters to apply
 * @param queryParams - Pagination and sorting parameters
 * @returns Array of listings matching the criteria
 */
export async function getListings(
  filters?: ListingFilters,
  queryParams?: ListingQueryParams
): Promise<ListingsResponse> {
  try {
    const supabase = await createClient()

    // Start building the query
    let query = supabase
      .from('listings')
      .select('*', { count: 'exact' })

    // Apply status filter (default to active)
    const status = filters?.status || 'active'
    query = query.eq('status', status)

    // Apply category filter
    if (filters?.category) {
      query = query.eq('category', filters.category)
    }

    // Apply price range filters
    if (filters?.minPrice !== undefined) {
      query = query.gte('price', filters.minPrice)
    }
    if (filters?.maxPrice !== undefined) {
      query = query.lte('price', filters.maxPrice)
    }

    // Apply location filter (case-insensitive partial match)
    if (filters?.location) {
      query = query.ilike('location', `%${filters.location}%`)
    }

    // Apply user filter (for "my listings")
    if (filters?.userId) {
      query = query.eq('user_id', filters.userId)
    }

    // Apply JSONB specs filters
    if (filters?.year) {
      query = query.contains('specs', { year: filters.year })
    }
    if (filters?.fuelType) {
      query = query.contains('specs', { fuelType: filters.fuelType })
    }
    if (filters?.bodyType) {
      query = query.contains('specs', { bodyType: filters.bodyType })
    }

    // Apply sorting
    const sortField = queryParams?.field || 'created_at'
    const sortOrder = queryParams?.order || 'desc'
    query = query.order(sortField, { ascending: sortOrder === 'asc' })

    // Apply pagination
    if (queryParams?.page && queryParams?.limit) {
      const from = (queryParams.page - 1) * queryParams.limit
      const to = from + queryParams.limit - 1
      query = query.range(from, to)
    }

    // Execute query
    const { data, error, count } = await query

    if (error) {
      console.error('Error fetching listings:', error)
      throw new Error(`Failed to fetch listings: ${error.message}`)
    }

    return {
      listings: data || [],
      total: count || 0,
      page: queryParams?.page,
      limit: queryParams?.limit,
    }
  } catch (error) {
    console.error('Unexpected error in getListings:', error)
    return {
      listings: [],
      total: 0,
    }
  }
}

/**
 * Get a single listing by ID
 *
 * @param id - Listing UUID
 * @returns Listing object or null if not found
 */
export async function getListingById(id: string): Promise<Listing | null> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching listing by ID:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Unexpected error in getListingById:', error)
    return null
  }
}

/**
 * Get listings by user ID
 *
 * @param userId - User UUID
 * @returns Array of listings belonging to the user
 */
export async function getListingsByUserId(userId: string): Promise<Listing[]> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching user listings:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Unexpected error in getListingsByUserId:', error)
    return []
  }
}

// =====================================================
// MUTATION OPERATIONS
// =====================================================

/**
 * Create a new listing
 *
 * @param userId - ID of the user creating the listing
 * @param listingData - Listing data to insert
 * @returns Created listing object or null on error
 */
export async function createListing(
  userId: string,
  listingData: CreateListingRequest
): Promise<Listing | null> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('listings')
      .insert({
        user_id: userId,
        category: listingData.category,
        title: listingData.title,
        description: listingData.description || null,
        price: listingData.price,
        location: listingData.location,
        image_url: listingData.image_url || null,
        specs: listingData.specs || {},
        status: 'active',
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating listing:', error)
      throw new Error(`Failed to create listing: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error('Unexpected error in createListing:', error)
    return null
  }
}

/**
 * Update an existing listing
 *
 * @param id - Listing UUID
 * @param listingData - Partial listing data to update
 * @returns Updated listing object or null on error
 */
export async function updateListing(
  id: string,
  listingData: UpdateListingRequest
): Promise<Listing | null> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('listings')
      .update(listingData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating listing:', error)
      throw new Error(`Failed to update listing: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error('Unexpected error in updateListing:', error)
    return null
  }
}

/**
 * Delete a listing (soft delete by setting status to 'archived')
 *
 * @param id - Listing UUID
 * @returns True if successful, false otherwise
 */
export async function deleteListing(id: string): Promise<boolean> {
  try {
    const supabase = await createClient()

    const { error } = await supabase
      .from('listings')
      .update({ status: 'archived' })
      .eq('id', id)

    if (error) {
      console.error('Error deleting listing:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Unexpected error in deleteListing:', error)
    return false
  }
}

/**
 * Hard delete a listing (permanent removal)
 *
 * @param id - Listing UUID
 * @returns True if successful, false otherwise
 */
export async function permanentlyDeleteListing(id: string): Promise<boolean> {
  try {
    const supabase = await createClient()

    const { error } = await supabase.from('listings').delete().eq('id', id)

    if (error) {
      console.error('Error permanently deleting listing:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Unexpected error in permanentlyDeleteListing:', error)
    return false
  }
}

// =====================================================
// AGGREGATE OPERATIONS
// =====================================================

/**
 * Get count of listings by category
 *
 * @returns Object with counts for each category
 */
export async function getListingsCount(): Promise<{
  total: number
  vehicles: number
  properties: number
}> {
  try {
    const supabase = await createClient()

    const [totalResult, vehiclesResult, propertiesResult] = await Promise.all([
      supabase.from('listings').select('*', { count: 'exact', head: true }).eq('status', 'active'),
      supabase
        .from('listings')
        .select('*', { count: 'exact', head: true })
        .eq('category', 'VEHICLE')
        .eq('status', 'active'),
      supabase
        .from('listings')
        .select('*', { count: 'exact', head: true })
        .eq('category', 'PROPERTY')
        .eq('status', 'active'),
    ])

    return {
      total: totalResult.count || 0,
      vehicles: vehiclesResult.count || 0,
      properties: propertiesResult.count || 0,
    }
  } catch (error) {
    console.error('Unexpected error in getListingsCount:', error)
    return {
      total: 0,
      vehicles: 0,
      properties: 0,
    }
  }
}
