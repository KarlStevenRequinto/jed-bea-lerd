import { ProfileData, ProfileStats } from '@/lib/types/profile'
import { formatMonthYear } from '@/lib/utils/formatters'

export const usePublicProfileAboutViewModel = (
    profile: ProfileData,
    stats: ProfileStats
) => {
    const displayName =
        `${profile.firstName ?? ''} ${profile.lastName ?? ''}`.trim() || 'This seller'
    const firstName = profile.firstName?.trim() || displayName
    const heading = `About ${firstName}`

    const infoRows = [
        {
            label: 'Bio',
            value:
                profile.bio?.trim() ||
                `${displayName} is building visibility through HomeNDrive listings and profile credibility.`,
        },
        {
            label: 'Location',
            value:
                [profile.city, profile.province, profile.country].filter(Boolean).join(', ') ||
                'Location not shared',
        },
        {
            label: 'Member since',
            value: profile.createdAt ? formatMonthYear(profile.createdAt) : 'Recently joined',
        },
        {
            label: 'Contact readiness',
            value: profile.phoneNumber
                ? 'Phone details available on request'
                : 'Direct phone not shown on public profile',
        },
    ]

    const trustRows = [
        {
            label: profile.verified ? 'Identity verification completed' : 'Identity verification not shown',
            description: profile.verified
                ? 'This account carries a verified status, which reduces trust friction for buyers.'
                : 'The profile is still browsable, but buyers may rely more on reviews and listing quality.',
        },
        {
            label: `${stats.listingsCount} active listings`,
            description:
                stats.listingsCount > 0
                    ? 'An active inventory usually signals recency, responsiveness, and continued marketplace activity.'
                    : 'No active listings are visible right now.',
        },
        {
            label: `${stats.reviewsCount} public reviews`,
            description:
                stats.reviewsCount > 0
                    ? 'Buyer feedback gives this profile social proof before a conversation even starts.'
                    : 'No public reviews yet.',
        },
    ]

    return {
        heading,
        infoRows,
        trustRows,
    }
}
