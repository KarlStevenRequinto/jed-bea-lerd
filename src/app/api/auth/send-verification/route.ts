/**
 * POST /api/auth/send-verification
 *
 * Creates a new user account via Supabase Auth and triggers a confirmation
 * email with a 6-digit OTP code. For resend requests, uses Supabase's
 * dedicated resend API instead of creating a duplicate account.
 *
 * Supabase Dashboard Setup Required:
 * 1. Authentication → Email Templates → "Confirm signup"
 * 2. Include {{ .Token }} in the template to show the 6-digit code
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password, isResend } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    if (isResend) {
      // Resend confirmation email for an existing unconfirmed account
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      })

      if (error) {
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        )
      }

      return NextResponse.json({
        message: 'Verification code resent to your email',
        success: true,
      })
    }

    // Initial signup — create the account, Supabase sends confirmation email
    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({
      message: 'Verification code sent to your email',
      success: true,
      userId: data.user?.id,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send verification code' },
      { status: 500 }
    )
  }
}
