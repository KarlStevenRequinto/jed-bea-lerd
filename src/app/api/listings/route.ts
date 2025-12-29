/**
 * GET /api/listings
 *
 * Returns all listings with optional filtering, pagination, and sorting.
 *
 * Query Parameters:
 * - category: 'VEHICLE' | 'PROPERTY'
 * - status: 'active' | 'sold' | 'archived' | 'pending'
 * - minPrice: number
 * - maxPrice: number
 * - location: string (partial match)
 * - year: string
 * - fuelType: string
 * - bodyType: string
 * - page: number (pagination)
 * - limit: number (pagination)
 * - field: 'created_at' | 'price' | 'title' (sort field)
 * - order: 'asc' | 'desc' (sort order)
 */

import { NextRequest, NextResponse } from 'next/server'
import { getListings } from '@/lib/services/listings'
import { ListingFilters, ListingQueryParams } from '@/lib/types/listing'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl

    // Parse filters from query parameters
    const filters: ListingFilters = {}
    const queryParams: ListingQueryParams = {}

    // Category filter
    const category = searchParams.get('category')
    if (category === 'VEHICLE' || category === 'PROPERTY') {
      filters.category = category
    }

    // Status filter
    const status = searchParams.get('status')
    if (status && ['active', 'sold', 'archived', 'pending'].includes(status)) {
      filters.status = status as 'active' | 'sold' | 'archived' | 'pending'
    }

    // Price range filters
    const minPrice = searchParams.get('minPrice')
    if (minPrice) {
      const parsed = parseFloat(minPrice)
      if (!isNaN(parsed)) {
        filters.minPrice = parsed
      }
    }

    const maxPrice = searchParams.get('maxPrice')
    if (maxPrice) {
      const parsed = parseFloat(maxPrice)
      if (!isNaN(parsed)) {
        filters.maxPrice = parsed
      }
    }

    // Location filter
    const location = searchParams.get('location')
    if (location) {
      filters.location = location
    }

    // Specs filters
    const year = searchParams.get('year')
    if (year) {
      filters.year = year
    }

    const fuelType = searchParams.get('fuelType')
    if (fuelType) {
      filters.fuelType = fuelType
    }

    const bodyType = searchParams.get('bodyType')
    if (bodyType) {
      filters.bodyType = bodyType
    }

    // Pagination
    const page = searchParams.get('page')
    if (page) {
      const parsed = parseInt(page, 10)
      if (!isNaN(parsed) && parsed > 0) {
        queryParams.page = parsed
      }
    }

    const limit = searchParams.get('limit')
    if (limit) {
      const parsed = parseInt(limit, 10)
      if (!isNaN(parsed) && parsed > 0 && parsed <= 100) {
        queryParams.limit = parsed
      }
    }

    // Sorting
    const field = searchParams.get('field')
    if (field && ['created_at', 'price', 'title'].includes(field)) {
      queryParams.field = field as 'created_at' | 'price' | 'title'
    }

    const order = searchParams.get('order')
    if (order && ['asc', 'desc'].includes(order)) {
      queryParams.order = order as 'asc' | 'desc'
    }

    // Fetch listings
    const result = await getListings(filters, queryParams)

    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    console.error('Error in GET /api/listings:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch listings',
        listings: [],
        total: 0,
      },
      { status: 500 }
    )
  }
}
