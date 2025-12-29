/**
 * POST /api/auth/register
 *
 * Registers a new user with Supabase Auth and creates user profile.
 * This handles the complete registration flow from your multi-step form.
 */

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      // Step 1: Email & Password
      email,
      password,

      // Step 2: Personal Information
      firstName,
      lastName,
      dateOfBirth,
      phoneNumber,
      profilePhotoUrl,

      // Step 3: Address Information
      streetAddress,
      city,
      province,
      zipCode,
      country,

      // Step 4: Identity Verification
      idType,
      idNumber,
      documentUrl,

      // Step 5: Preferences
      interests, // Array of interest strings
      bio,
    } = body

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Step 1: Create Supabase Auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    })

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      )
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      )
    }

    // Step 2: Create user profile in database using admin client
    // Use admin client to bypass RLS for user creation
    const adminClient = createAdminClient()
    const { error: profileError } = await adminClient
      .from('profiles')
      .insert({
        id: authData.user.id,
        email: email, // Store email for easier querying
        first_name: firstName,
        last_name: lastName,
        date_of_birth: dateOfBirth,
        phone_number: phoneNumber,
        profile_photo_url: profilePhotoUrl,
        street_address: streetAddress,
        city,
        province,
        zip_code: zipCode,
        country,
        id_type: idType,
        id_number: idNumber,
        document_url: documentUrl,
        interests,
        bio,
        // Don't set created_at and updated_at - they have defaults
      })

    if (profileError) {
      console.error('Profile creation error:', profileError)
      // User is created but profile failed - you may want to handle this
      return NextResponse.json(
        {
          error: 'Failed to create user profile',
          details: profileError.message,
          code: profileError.code,
          hint: profileError.hint
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Registration successful. Please check your email to verify your account.',
      user: {
        id: authData.user.id,
        email: authData.user.email,
        emailVerified: false,
      },
      // Note: Supabase may auto-confirm email depending on your settings
      // Check your Supabase Auth settings for email confirmation requirements
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
