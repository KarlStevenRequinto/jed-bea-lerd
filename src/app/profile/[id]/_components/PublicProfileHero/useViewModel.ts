'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
    ProfileData,
    ProfileStats,
    PublicProfileRelationship,
} from '@/lib/types/profile'
import { formatMonthYear } from '@/lib/utils/formatters'

export const usePublicProfileHeroViewModel = (
    profile: ProfileData,
    stats: ProfileStats,
    relationship: PublicProfileRelationship
) => {
    const router = useRouter()
    const [isFollowLoading, setIsFollowLoading] = useState(false)
    const [isFollowing, setIsFollowing] = useState(relationship.isFollowing)
    const [followersCount, setFollowersCount] = useState(stats.followersCount)

    const displayName =
        `${profile.firstName ?? ''} ${profile.lastName ?? ''}`.trim() || 'Unknown User'

    const location =
        [profile.city, profile.province, profile.country].filter(Boolean).join(', ') || ''

    const memberSince = profile.createdAt ? formatMonthYear(profile.createdAt) : 'Recently'

    const headline = profile.bio?.trim()
        ? profile.bio
        : `${displayName} shares active listings on HomeNDrive${location ? ` from ${location}` : ''}.`

    const primaryActionLabel = relationship.isOwnProfile
        ? 'This is your profile'
        : isFollowing
          ? 'Following'
          : 'Follow seller'

    const handlePrimaryAction = async () => {
        if (relationship.isOwnProfile || isFollowLoading) return

        setIsFollowLoading(true)
        try {
            const response = await fetch(`/api/profile/${profile.id}/follow`, {
                method: isFollowing ? 'DELETE' : 'POST',
            })

            if (!response.ok) {
                return
            }

            setIsFollowing((prev) => !prev)
            setFollowersCount((prev) => prev + (isFollowing ? -1 : 1))
            router.refresh()
        } catch {
            // Match the existing lightweight follow UX by failing quietly.
        } finally {
            setIsFollowLoading(false)
        }
    }

    return {
        displayName,
        location,
        memberSince,
        headline,
        primaryActionLabel,
        isFollowLoading,
        isFollowing,
        followersCount,
        handlePrimaryAction,
    }
}
