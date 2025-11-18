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

    // TODO: Fetch additional profile data from your profiles table
    // For now, return just the auth user data
    /*
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    */

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        emailVerified: user.email_confirmed_at !== null,
        createdAt: user.created_at,
        // ...profile, // Uncomment after creating profiles table
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
