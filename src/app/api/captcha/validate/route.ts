/**
 * POST /api/captcha/validate
 *
 * Validates a CAPTCHA code against the stored session.
 */

import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const { captchaId, code } = await request.json()

    if (!captchaId || !code) {
      return NextResponse.json(
        { error: 'CAPTCHA ID and code are required', valid: false },
        { status: 400 }
      )
    }

    const cookieStore = await cookies()
    const storedCode = cookieStore.get(`captcha_${captchaId}`)?.value

    if (!storedCode) {
      return NextResponse.json(
        { error: 'CAPTCHA expired or invalid', valid: false },
        { status: 400 }
      )
    }

    // Case-insensitive comparison
    const isValid = storedCode.toLowerCase() === code.toLowerCase()

    // Delete the captcha after validation attempt (one-time use)
    cookieStore.delete(`captcha_${captchaId}`)

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid CAPTCHA code', valid: false },
        { status: 400 }
      )
    }

    return NextResponse.json({ valid: true })
  } catch (error) {
    console.error('CAPTCHA validation error:', error)
    return NextResponse.json(
      { error: 'Failed to validate CAPTCHA', valid: false },
      { status: 500 }
    )
  }
}
