/**
 * GET /api/listings/[id]
 *
 * Returns a single listing by ID.
 *
 * Path Parameters:
 * - id: Listing UUID
 */

import { NextRequest, NextResponse } from 'next/server'
import { getListingById } from '@/lib/services/listings'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    // Validate UUID format (basic check)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(id)) {
      return NextResponse.json({ error: 'Invalid listing ID format' }, { status: 400 })
    }

    // Fetch listing
    const listing = await getListingById(id)

    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
    }

    return NextResponse.json({ listing }, { status: 200 })
  } catch (error) {
    console.error('Error in GET /api/listings/[id]:', error)
    return NextResponse.json({ error: 'Failed to fetch listing' }, { status: 500 })
  }
}
