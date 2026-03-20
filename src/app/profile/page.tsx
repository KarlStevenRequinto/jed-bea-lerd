import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import {
    getProfileData,
    getProfileStats,
    getFollowing,
    getFollowers,
    getReviews,
    getUserProfileListings,
    getRecentlyViewed,
} from '@/lib/services/profile'
import ProfileHeader from './_components/ProfileHeader'
import ProfileInformation from './_components/ProfileInformation'
import VerificationStatus from './_components/VerificationStatus'
import Connections from './_components/Connections'
import ReviewsAndRatings from './_components/ReviewsAndRatings'
import RecentlyViewed from './_components/RecentlyViewed'
import SponsoredAd from './_components/SponsoredAd'
import MyListings from './_components/MyListings'

export default async function ProfilePage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const [profile, stats, following, followers, reviews, listings, recentlyViewed] =
        await Promise.all([
            getProfileData(user.id),
            getProfileStats(user.id),
            getFollowing(user.id),
            getFollowers(user.id),
            getReviews(user.id),
            getUserProfileListings(user.id),
            getRecentlyViewed(user.id),
        ])

    return (
        <div className="min-h-screen bg-[var(--color-gray-50)]">
            <div className="container mx-auto px-6 py-8">
                {/* Page Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-[var(--color-gray-900)] mb-1">
                        My Profile
                    </h1>
                    <p className="text-sm text-[var(--color-gray-500)]">
                        Manage your profile information and settings
                    </p>
                </div>

                {/* Main Content Layout */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Column */}
                    <div className="flex-1 space-y-6">
                        <ProfileHeader profile={profile} stats={stats} />
                        <ProfileInformation profile={profile} />
                        <ReviewsAndRatings reviews={reviews} />
                        <MyListings listings={listings} />
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="w-full lg:w-[320px] space-y-6">
                        <VerificationStatus profile={profile} />
                        <Connections following={following} followers={followers} />
                        <RecentlyViewed items={recentlyViewed} />
                        <SponsoredAd />
                    </div>
                </div>
            </div>
        </div>
    )
}
