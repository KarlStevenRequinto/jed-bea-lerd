/**
 * Profile Service Layer
 *
 * Server-side data fetching for the profile page.
 * Uses admin client to bypass RLS when reading other users' profiles.
 */

import { createAdminClient } from '@/lib/supabase/admin'
import { formatPrice } from '@/lib/utils/formatters'
import { buildProfileSlug } from '@/lib/utils/profile'
import type {
    ProfileData,
    ProfileStats,
    ProfileConnection,
    ProfileReview,
    ProfileListing,
    ProfileRecentlyViewed,
    PublicProfileRelationship,
} from '@/lib/types/profile'

export async function getProfileData(userId: string): Promise<ProfileData | null> {
    const admin = createAdminClient()
    const { data, error } = await admin
        .from('profiles')
        .select('id, email, first_name, last_name, phone_number, city, province, country, bio, profile_photo_url, verified, id_type, created_at')
        .eq('id', userId)
        .single()

    if (error || !data) return null

    return {
        id: data.id,
        email: data.email,
        firstName: data.first_name,
        lastName: data.last_name,
        phoneNumber: data.phone_number,
        city: data.city,
        province: data.province,
        country: data.country,
        bio: data.bio,
        profilePhotoUrl: data.profile_photo_url,
        verified: data.verified ?? false,
        idType: data.id_type,
        createdAt: data.created_at,
    }
}

export async function getProfileStats(userId: string): Promise<ProfileStats> {
    const admin = createAdminClient()

    const [followers, following, listings, reviews] = await Promise.all([
        admin.from('user_follows').select('*', { count: 'exact', head: true }).eq('following_id', userId),
        admin.from('user_follows').select('*', { count: 'exact', head: true }).eq('follower_id', userId),
        admin.from('listings').select('*', { count: 'exact', head: true }).eq('user_id', userId).eq('status', 'active'),
        admin.from('reviews').select('*', { count: 'exact', head: true }).eq('reviewee_id', userId),
    ])

    return {
        followersCount: followers.count ?? 0,
        followingCount: following.count ?? 0,
        listingsCount: listings.count ?? 0,
        reviewsCount: reviews.count ?? 0,
    }
}

export async function getFollowing(userId: string): Promise<ProfileConnection[]> {
    const admin = createAdminClient()

    const { data: follows, error } = await admin
        .from('user_follows')
        .select('id, following_id')
        .eq('follower_id', userId)
        .order('created_at', { ascending: false })

    if (error || !follows || follows.length === 0) return []

    const followingIds = follows.map((f) => f.following_id)
    const { data: profiles } = await admin
        .from('profiles')
        .select('id, first_name, last_name, city, province, profile_photo_url')
        .in('id', followingIds)

    return follows.map((follow) => {
        const profile = profiles?.find((p) => p.id === follow.following_id)
        return {
            id: follow.id,
            userId: follow.following_id,
            name: profile
                ? `${profile.first_name ?? ''} ${profile.last_name ?? ''}`.trim() || 'Unknown User'
                : 'Unknown User',
            location: profile
                ? [profile.city, profile.province].filter(Boolean).join(', ')
                : '',
            avatarUrl: profile?.profile_photo_url ?? null,
        }
    })
}

export async function getFollowers(userId: string): Promise<ProfileConnection[]> {
    const admin = createAdminClient()

    const { data: follows, error } = await admin
        .from('user_follows')
        .select('id, follower_id')
        .eq('following_id', userId)
        .order('created_at', { ascending: false })

    if (error || !follows || follows.length === 0) return []

    const followerIds = follows.map((f) => f.follower_id)
    const { data: profiles } = await admin
        .from('profiles')
        .select('id, first_name, last_name, city, province, profile_photo_url')
        .in('id', followerIds)

    return follows.map((follow) => {
        const profile = profiles?.find((p) => p.id === follow.follower_id)
        return {
            id: follow.id,
            userId: follow.follower_id,
            name: profile
                ? `${profile.first_name ?? ''} ${profile.last_name ?? ''}`.trim() || 'Unknown User'
                : 'Unknown User',
            location: profile
                ? [profile.city, profile.province].filter(Boolean).join(', ')
                : '',
            avatarUrl: profile?.profile_photo_url ?? null,
        }
    })
}

export async function getReviews(userId: string): Promise<ProfileReview[]> {
    const admin = createAdminClient()

    const { data, error } = await admin
        .from('reviews')
        .select('id, reviewer_name, reviewer_avatar_url, rating, comment, helpful_count, created_at')
        .eq('reviewee_id', userId)
        .order('created_at', { ascending: false })

    if (error || !data) return []

    return data.map((r) => ({
        id: r.id,
        reviewerName: r.reviewer_name,
        reviewerAvatarUrl: r.reviewer_avatar_url,
        rating: r.rating,
        comment: r.comment,
        helpfulCount: r.helpful_count,
        createdAt: r.created_at,
    }))
}

export async function getUserProfileListings(userId: string): Promise<ProfileListing[]> {
    const admin = createAdminClient()

    const { data, error } = await admin
        .from('listings')
        .select('id, title, location, price, image_url, category, specs, description')
        .eq('user_id', userId)
        .eq('status', 'active')
        .order('created_at', { ascending: false })

    if (error || !data) return []

    return data.map((l) => ({
        id: l.id,
        title: l.title,
        location: l.location,
        price: formatPrice(Number(l.price)),
        image: l.image_url ?? '',
        category: l.category === 'VEHICLE' ? 'vehicle' : 'property',
        specs: buildSpecBadges(l.specs ?? {}, l.category),
        description: l.description ?? '',
    }))
}

function buildSpecBadges(specs: Record<string, string>, category: string): string[] {
    if (category === 'VEHICLE') {
        return [specs.year, specs.mileage, specs.fuelType].filter(Boolean) as string[]
    }
    return [specs.bodyType].filter(Boolean) as string[]
}

export async function getRecentlyViewed(userId: string): Promise<ProfileRecentlyViewed[]> {
    const admin = createAdminClient()

    const { data, error } = await admin
        .from('recently_viewed')
        .select('id, listing_id, listings(id, title, price, image_url, category)')
        .eq('user_id', userId)
        .order('viewed_at', { ascending: false })
        .limit(10)

    if (error || !data) return []

    return data
        .filter((r) => r.listings)
        .map((r) => {
            const listing = r.listings as unknown as {
                id: string
                title: string
                price: number
                image_url: string | null
                category: string
            }
            return {
                id: r.id,
                listingId: r.listing_id,
                title: listing.title,
                price: formatPrice(Number(listing.price)),
                image: listing.image_url ?? '',
                category: listing.category === 'VEHICLE' ? 'vehicle' : 'property' as 'vehicle' | 'property',
            }
        })
}

export async function getPublicProfileRelationship(
    targetUserId: string,
    viewerUserId?: string | null
): Promise<PublicProfileRelationship> {
    if (!viewerUserId) {
        return {
            viewerId: null,
            isOwnProfile: false,
            isFollowing: false,
        }
    }

    if (viewerUserId === targetUserId) {
        return {
            viewerId: viewerUserId,
            isOwnProfile: true,
            isFollowing: false,
        }
    }

    const admin = createAdminClient()
    const { data } = await admin
        .from('user_follows')
        .select('id')
        .eq('follower_id', viewerUserId)
        .eq('following_id', targetUserId)
        .maybeSingle()

    return {
        viewerId: viewerUserId,
        isOwnProfile: false,
        isFollowing: !!data,
    }
}

export async function resolveProfileIdFromIdentifier(
    identifier: string
): Promise<string | null> {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

    if (uuidRegex.test(identifier)) {
        return identifier
    }

    const admin = createAdminClient()
    const { data, error } = await admin
        .from('profiles')
        .select('id, first_name, last_name')

    if (error || !data) {
        return null
    }

    const match = data.find((profile) =>
        buildProfileSlug(profile.first_name, profile.last_name) === identifier
    )

    return match?.id ?? null
}
