/**
 * PATCH /api/profile/update
 *
 * Upserts profile data for the authenticated user.
 * Creates the profiles row if it doesn't exist yet.
 */

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(request: NextRequest) {
    const supabase = await createClient()
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    let body: Record<string, unknown>
    try {
        body = await request.json()
    } catch {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    const { firstName, lastName, phoneNumber, city, province, country, bio } = body as Record<string, string>

    const admin = createAdminClient()
    const { error } = await admin.from('profiles').upsert(
        {
            id: user.id,
            email: user.email!,
            first_name: firstName || null,
            last_name: lastName || null,
            phone_number: phoneNumber || null,
            city: city || null,
            province: province || null,
            country: country || null,
            bio: bio || null,
        },
        { onConflict: 'id' }
    )

    if (error) {
        return NextResponse.json(
            { error: 'Failed to update profile', details: error.message },
            { status: 500 }
        )
    }

    return NextResponse.json({ message: 'Profile updated successfully' })
}
