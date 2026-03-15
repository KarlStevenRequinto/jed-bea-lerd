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
import { enforceAuthEmailRateLimit, getClientIpAddress } from '@/lib/security/authRateLimit'

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
    const ipAddress = getClientIpAddress(request.headers)
    const limit = enforceAuthEmailRateLimit({
      bucket: 'send-verification',
      email,
      ipAddress,
    })

    if (!limit.allowed) {
      return NextResponse.json(
        {
          error: `Too many email attempts. Please try again in ${limit.retryAfterSeconds} seconds.`,
          retryAfterSeconds: limit.retryAfterSeconds,
        },
        { status: 429 }
      )
    }

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

      const response = NextResponse.json({
        message: 'Verification code resent to your email',
        success: true,
      })

      response.cookies.set('registration_email', email, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 30,
      })

      return response
    }

    // Initial signup — create the account, Supabase sends confirmation email
    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      )
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${siteUrl}/auth/callback`,
      },
    })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    const isLikelyExistingConfirmedUser = Array.isArray(data.user?.identities) && data.user?.identities.length === 0

    if (isLikelyExistingConfirmedUser) {
      return NextResponse.json(
        { error: 'This email is already registered. Please log in instead.' },
        { status: 409 }
      )
    }

    const response = NextResponse.json({
      message: 'Verification code sent to your email',
      success: true,
      userId: data.user?.id,
    })

    response.cookies.set('registration_email', email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 30,
    })

    return response
  } catch {
    return NextResponse.json(
      { error: 'Failed to send verification code' },
      { status: 500 }
    )
  }
}
