/**
 * POST /api/auth/verify-otp
 *
 * Verifies the OTP code sent to user's email
 */

import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const { email, token } = await request.json()

    if (!email || !token) {
      return NextResponse.json(
        { error: 'Email and verification code are required' },
        { status: 400 }
      )
    }

    const cookieStore = await cookies()
    const storedOTP = cookieStore.get(`otp_${email}`)?.value

    if (!storedOTP) {
      return NextResponse.json(
        { error: 'Verification code expired or not found' },
        { status: 400 }
      )
    }

    // Verify OTP matches
    if (storedOTP !== token) {
      return NextResponse.json(
        { error: 'Invalid verification code' },
        { status: 400 }
      )
    }

    // Delete OTP after successful verification
    cookieStore.delete(`otp_${email}`)

    return NextResponse.json({
      message: 'Email verified successfully',
      success: true
    })
  } catch (error) {
    console.error('OTP verification error:', error)
    return NextResponse.json(
      { error: 'Failed to verify code' },
      { status: 500 }
    )
  }
}
