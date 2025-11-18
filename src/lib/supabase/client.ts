/**
 * Supabase Client for Browser/Client-Side Usage
 *
 * This client should be used in:
 * - React components
 * - Client-side event handlers
 * - Browser-based authentication flows
 */

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
