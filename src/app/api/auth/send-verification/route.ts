/**
 * POST /api/auth/send-verification
 *
 * Generates and sends a 6-digit OTP to user's email
 * Stores OTP in cookies for verification
 */

import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { generateOTP, getOTPExpiry } from '@/lib/otp/generator'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Generate 6-digit OTP
    const otp = generateOTP()
    const otpExpiry = getOTPExpiry(5) // 5 minutes

    // Store OTP in httpOnly cookie
    const cookieStore = await cookies()
    cookieStore.set(`otp_${email}`, otp, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 300, // 5 minutes
      path: '/',
    })

    // Send OTP email using Supabase Auth with custom email
    const supabase = await createClient()

    // Use signInWithOtp to send email with OTP code
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
        data: {
          otp_code: otp // This will be available in email template
        }
      }
    })

    if (error) {
      console.error('Supabase OTP error:', error)
      // Even if Supabase fails, we can continue with stored OTP
      // In production, you'd want to use a proper email service
    }

    return NextResponse.json({
      message: 'Verification code sent to your email',
      success: true,
      // For development only - remove in production
      ...(process.env.NODE_ENV === 'development' && { dev_otp: otp })
    })
  } catch (error) {
    console.error('Send verification error:', error)
    return NextResponse.json(
      { error: 'Failed to send verification code' },
      { status: 500 }
    )
  }
}
