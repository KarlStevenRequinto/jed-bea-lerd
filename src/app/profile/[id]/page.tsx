import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import {
    getFollowers,
    getFollowing,
    getProfileData,
    getProfileStats,
    getPublicProfileRelationship,
    getReviews,
    getUserProfileListings,
    resolveProfileIdFromIdentifier,
} from '@/lib/services/profile'
import PublicProfileHero from './_components/PublicProfileHero'
import PublicProfileAbout from './_components/PublicProfileAbout'
import PublicProfileListings from './_components/PublicProfileListings'
import PublicProfileReviews from './_components/PublicProfileReviews'
import PublicProfileSidebar from './_components/PublicProfileSidebar'

interface PublicProfilePageProps {
    params: Promise<{ id: string }>
}

export default async function PublicProfilePage({ params }: PublicProfilePageProps) {
    const { id: identifier } = await params
    const resolvedProfileId = await resolveProfileIdFromIdentifier(identifier)

    if (!resolvedProfileId) {
        notFound()
    }

    const supabase = await createClient()
    const {
        data: { user: currentUser },
    } = await supabase.auth.getUser()

    if (currentUser?.id === resolvedProfileId) {
        redirect('/profile')
    }

    const [profile, stats, followers, following, reviews, listings, relationship] =
        await Promise.all([
            getProfileData(resolvedProfileId),
            getProfileStats(resolvedProfileId),
            getFollowers(resolvedProfileId),
            getFollowing(resolvedProfileId),
            getReviews(resolvedProfileId),
            getUserProfileListings(resolvedProfileId),
            getPublicProfileRelationship(resolvedProfileId, currentUser?.id ?? null),
        ])

    if (!profile) {
        notFound()
    }

    const sellerName =
        `${profile.firstName ?? ''} ${profile.lastName ?? ''}`.trim() || 'Seller'

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(103,188,120,0.18),_transparent_32%),linear-gradient(180deg,_rgba(244,251,245,0.9)_0%,_rgba(255,255,255,1)_24%)]">
            <div className="container mx-auto px-6 py-8">
                <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[var(--color-gray-500)]">
                    <Link
                        href="/"
                        className="transition-colors hover:text-[var(--color-brand)]"
                    >
                        Home
                    </Link>
                    <span>/</span>
                    <span className="text-[var(--color-gray-700)]">Seller Profile</span>
                </div>

                <div className="flex flex-col gap-6 lg:flex-row">
                    <div className="min-w-0 flex-1 space-y-6">
                        <PublicProfileHero
                            profile={profile}
                            stats={stats}
                            relationship={relationship}
                        />
                        <PublicProfileAbout profile={profile} stats={stats} />
                        <PublicProfileListings
                            listings={listings}
                            sellerName={sellerName}
                        />
                        <PublicProfileReviews
                            reviews={reviews}
                            sellerName={sellerName}
                        />
                    </div>

                    <div className="w-full shrink-0 space-y-6 lg:w-[340px]">
                        <PublicProfileSidebar
                            profile={profile}
                            stats={stats}
                            followers={followers}
                            following={following}
                            listings={listings}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
