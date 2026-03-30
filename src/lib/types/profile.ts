/**
 * Profile Domain Types
 *
 * Types for the user profile page and related features.
 */

export interface ProfileData {
    id: string
    email: string
    firstName: string | null
    lastName: string | null
    phoneNumber: string | null
    city: string | null
    province: string | null
    country: string | null
    bio: string | null
    profilePhotoUrl: string | null
    verified: boolean
    idType: string | null
    createdAt: string
}

export interface ProfileStats {
    followersCount: number
    followingCount: number
    listingsCount: number
    reviewsCount: number
}

export interface ProfileConnection {
    id: string
    userId: string
    name: string
    location: string
    avatarUrl: string | null
}

export interface ProfileReview {
    id: string
    reviewerName: string
    reviewerAvatarUrl: string | null
    rating: number
    comment: string | null
    helpfulCount: number
    createdAt: string
}

export interface ProfileListing {
    id: string
    title: string
    location: string
    price: string
    image: string
    category: 'property' | 'vehicle'
    specs: string[]
    description: string
}

export interface ProfileRecentlyViewed {
    id: string
    listingId: string
    title: string
    price: string
    image: string
    category: 'vehicle' | 'property'
}

export interface PublicProfileRelationship {
    viewerId: string | null
    isOwnProfile: boolean
    isFollowing: boolean
}
