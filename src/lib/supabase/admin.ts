/**
 * Supabase Admin Client
 *
 * This client uses the service role key and bypasses Row Level Security.
 * ONLY use this for:
 * - User registration (creating profiles)
 * - Admin operations
 * - Trusted server-side operations
 *
 * DO NOT expose this client to the browser!
 */

import { createClient } from '@supabase/supabase-js'

export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

  if (!supabaseServiceKey) {
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY is not set. Please add it to your .env.local file.'
    )
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
