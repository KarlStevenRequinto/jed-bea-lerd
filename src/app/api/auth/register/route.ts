/**
 * POST /api/auth/register
 *
 * Creates the user profile in the database after email verification.
 * The Supabase Auth account is already created during the send-verification step.
 * The user must be authenticated (session established via verify-otp).
 */

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      // Personal Information
      firstName,
      lastName,
      dateOfBirth,
      phoneNumber,
      profilePhotoUrl,

      // Address Information
      streetAddress,
      city,
      province,
      zipCode,
      country,

      // Identity Verification
      idType,
      idNumber,
      documentUrl,

      // Preferences
      interests,
      bio,
    } = body

    // Get the authenticated user from the session
    const supabase = await createClient()
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Not authenticated. Please verify your email first.' },
        { status: 401 }
      )
    }

    // Upsert profile so this works whether step-2 already created a partial row or not.
    const adminClient = createAdminClient()
    const { error: profileError } = await adminClient
      .from('profiles')
      .upsert({
        id: user.id,
        email: user.email,
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
      }, { onConflict: 'id' })

    if (profileError) {
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
      message: 'Registration successful. Welcome to HomeNDrive!',
      user: {
        id: user.id,
        email: user.email,
        emailVerified: true,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
