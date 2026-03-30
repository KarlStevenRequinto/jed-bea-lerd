import {
    ProfileConnection,
    ProfileData,
    ProfileListing,
    ProfileStats,
} from '@/lib/types/profile'
import { formatMonthYear } from '@/lib/utils/formatters'

export const usePublicProfileSidebarViewModel = (
    profile: ProfileData,
    stats: ProfileStats,
    followers: ProfileConnection[],
    following: ProfileConnection[],
    listings: ProfileListing[]
) => {
    const identityRows = [
        {
            label: 'Verification',
            value: profile.verified ? 'Verified member' : 'Standard member',
        },
        {
            label: 'Marketplace activity',
            value: `${stats.listingsCount} active ${stats.listingsCount === 1 ? 'listing' : 'listings'}`,
        },
        {
            label: 'Joined',
            value: profile.createdAt ? formatMonthYear(profile.createdAt) : 'Recently',
        },
    ]

    const networkPreview = [
        ...followers.slice(0, 2).map((connection) => ({
            ...connection,
            direction: 'Follower',
        })),
        ...following.slice(0, 2).map((connection) => ({
            ...connection,
            direction: 'Following',
        })),
    ].slice(0, 4)

    const featuredListings = listings.slice(0, 3)

    return {
        identityRows,
        networkPreview,
        featuredListings,
    }
}
