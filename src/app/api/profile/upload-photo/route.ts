/**
 * POST /api/profile/upload-photo
 *
 * Accepts a multipart/form-data request with a `photo` field.
 * Validates the file, uploads it to Supabase Storage under the user's folder,
 * updates profiles.profile_photo_url, and returns the new public URL.
 */

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const MAX_SIZE_BYTES = 5 * 1024 * 1024 // 5 MB

export async function POST(request: NextRequest) {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    let formData: FormData
    try {
        formData = await request.formData()
    } catch {
        return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
    }

    const file = formData.get('photo') as File | null
    if (!file || file.size === 0) {
        return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json(
            { error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' },
            { status: 422 }
        )
    }

    if (file.size > MAX_SIZE_BYTES) {
        return NextResponse.json(
            { error: 'File too large. Maximum size is 5 MB.' },
            { status: 422 }
        )
    }

    // Use a stable path per user so re-uploads automatically overwrite the old one.
    // Path: {userId}/avatar — no extension so the path never changes regardless of format.
    const storagePath = `${user.id}/avatar`

    const admin = createAdminClient()
    const { error: uploadError } = await admin.storage
        .from('profile-photos')
        .upload(storagePath, file, {
            upsert: true,
            contentType: file.type,
        })

    if (uploadError) {
        console.error('[upload-photo] Storage error:', uploadError)
        return NextResponse.json(
            { error: uploadError.message || 'Upload failed' },
            { status: 500 }
        )
    }

    // Append a cache-busting timestamp so the browser re-fetches after update.
    const { data: { publicUrl } } = admin.storage
        .from('profile-photos')
        .getPublicUrl(storagePath)

    const photoUrl = `${publicUrl}?t=${Date.now()}`

    const { error: dbError } = await admin
        .from('profiles')
        .upsert(
            { id: user.id, email: user.email!, profile_photo_url: photoUrl },
            { onConflict: 'id' }
        )

    if (dbError) {
        return NextResponse.json(
            { error: 'Failed to save photo URL', details: dbError.message },
            { status: 500 }
        )
    }

    return NextResponse.json({ photoUrl })
}
