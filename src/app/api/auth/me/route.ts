/**
 * GET /api/auth/me
 *
 * Returns the currently authenticated user's information.
 */

import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error || !user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Fetch additional profile data from profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError) {
      console.error('Profile fetch error:', profileError)
      // Return basic user info if profile not found
      return NextResponse.json({
        user: {
          id: user.id,
          email: user.email,
          emailVerified: user.email_confirmed_at !== null,
          createdAt: user.created_at,
        },
      })
    }

    // Return merged user + profile data
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        emailVerified: user.email_confirmed_at !== null,
        createdAt: user.created_at,
        // Profile data
        firstName: profile?.first_name,
        lastName: profile?.last_name,
        dateOfBirth: profile?.date_of_birth,
        phoneNumber: profile?.phone_number,
        profilePhotoUrl: profile?.profile_photo_url,
        streetAddress: profile?.street_address,
        city: profile?.city,
        province: profile?.province,
        zipCode: profile?.zip_code,
        country: profile?.country,
        idType: profile?.id_type,
        idNumber: profile?.id_number,
        documentUrl: profile?.document_url,
        verified: profile?.verified || false,
        interests: profile?.interests || [],
        bio: profile?.bio,
      },
    })
  } catch (error) {
    console.error('Get user error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
