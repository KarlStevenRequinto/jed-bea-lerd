/**
 * Auth Callback Route
 *
 * Handles email verification and OAuth callbacks from Supabase.
 * When users click the confirmation link in their email, they are redirected here.
 */

import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') || '/'

  if (code) {
    const supabase = await createClient()

    // Exchange the code for a session
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Redirect to the specified route or homepage
      return NextResponse.redirect(new URL(next, request.url))
    }

    // If there's an error, redirect to login with error message
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(error.message)}`, request.url)
    )
  }

  // No code provided, redirect to homepage
  return NextResponse.redirect(new URL('/', request.url))
}
