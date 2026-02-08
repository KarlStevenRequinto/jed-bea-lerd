/**
 * POST /api/auth/verify-otp
 *
 * Verifies the 6-digit OTP code from the signup confirmation email.
 * On success, Supabase confirms the user's email and establishes a session.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { email, token } = await request.json()

    if (!email || !token) {
      return NextResponse.json(
        { error: 'Email and verification code are required' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'signup',
    })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({
      message: 'Email verified successfully',
      success: true,
      userId: data.user?.id,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to verify code' },
      { status: 500 }
    )
  }
}
