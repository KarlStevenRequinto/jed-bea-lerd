"use client";

import type { ReactNode } from "react";
import Avatar from "@/components/common/Avatar";
import { ProfileData, ProfileStats, PublicProfileRelationship } from "@/lib/types/profile";
import { usePublicProfileHeroViewModel } from "./useViewModel";

interface PublicProfileHeroProps {
    profile: ProfileData;
    stats: ProfileStats;
    relationship: PublicProfileRelationship;
}

const PublicProfileHero = ({
    profile,
    stats,
    relationship,
}: PublicProfileHeroProps) => {
    const {
        displayName,
        location,
        memberSince,
        headline,
        primaryActionLabel,
        isFollowLoading,
        isFollowing,
        followersCount,
        handlePrimaryAction,
    } = usePublicProfileHeroViewModel(profile, stats, relationship);

    return (
        <section className="overflow-hidden rounded-[28px] border border-[var(--color-green-100)] bg-white shadow-[0_22px_60px_rgba(39,102,58,0.12)]">
            <div className="relative overflow-hidden px-6 py-7 md:px-8 md:py-8">
                <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(135deg,rgba(103,188,120,0.22),rgba(255,255,255,0.1)_55%,rgba(39,102,58,0.12))]" />
                <div className="absolute right-[-46px] top-[-40px] h-44 w-44 rounded-full bg-[rgba(103,188,120,0.12)] blur-2xl" />

                <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="flex flex-col gap-5 md:flex-row md:items-center">
                        <div className="relative">
                            <div className="rounded-full bg-white p-1.5 shadow-[0_10px_30px_rgba(39,102,58,0.18)]">
                                <Avatar
                                    name={displayName}
                                    avatarUrl={profile.profilePhotoUrl}
                                    size={116}
                                />
                            </div>
                            {profile.verified && (
                                <div className="absolute bottom-2 right-1 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-[var(--color-brand)] text-white shadow-lg">
                                    <VerifiedCheck />
                                </div>
                            )}
                        </div>

                        <div className="max-w-2xl">
                            <div className="mb-3 flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-[rgba(103,188,120,0.14)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-dark)]">
                                    Seller Profile
                                </span>
                                {profile.verified && (
                                    <span className="rounded-full border border-[rgba(36,116,12,0.2)] bg-[rgba(36,116,12,0.08)] px-3 py-1 text-xs font-medium text-[var(--color-success-deep)]">
                                        Verified member
                                    </span>
                                )}
                            </div>

                            <div className="mb-2 flex flex-wrap items-center gap-2">
                                <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-gray-900)] md:text-[2.25rem]">
                                    {displayName}
                                </h1>
                                {profile.verified && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-brand)]/10 px-2.5 py-1 text-xs font-semibold text-[var(--color-brand-dark)]">
                                        <VerifiedCheck />
                                        Trusted
                                    </span>
                                )}
                            </div>

                            <p className="mb-4 max-w-xl text-sm leading-6 text-[var(--color-gray-600)] md:text-[15px]">
                                {headline}
                            </p>

                            <div className="flex flex-wrap gap-3 text-sm text-[var(--color-gray-500)]">
                                {location && (
                                    <MetadataPill label={location} icon={<LocationIcon />} />
                                )}
                                <MetadataPill label={`Member since ${memberSince}`} icon={<CalendarIcon />} />
                                <MetadataPill
                                    label={`${stats.listingsCount} active ${stats.listingsCount === 1 ? "listing" : "listings"}`}
                                    icon={<ListingIcon />}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex w-full flex-col gap-3 sm:w-auto sm:min-w-[240px]">
                        <button
                            type="button"
                            onClick={handlePrimaryAction}
                            disabled={relationship.isOwnProfile || isFollowLoading}
                            className={`rounded-full px-5 py-3 text-sm font-semibold transition-colors ${
                                relationship.isOwnProfile
                                    ? "cursor-default bg-[var(--color-gray-100)] text-[var(--color-gray-500)]"
                                    : isFollowing
                                      ? "cursor-pointer border border-[var(--color-brand)] text-[var(--color-brand)] hover:border-red-400 hover:text-red-500"
                                      : "cursor-pointer bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-dark)]"
                            } disabled:opacity-70`}
                        >
                            {isFollowLoading ? "Please wait..." : primaryActionLabel}
                        </button>
                        <a
                            href="#seller-listings"
                            className="cursor-pointer rounded-full border border-[var(--color-green-200)] bg-[var(--color-green-50)] px-5 py-3 text-center text-sm font-semibold text-[var(--color-gray-800)] transition-colors hover:border-[var(--color-brand)] hover:text-[var(--color-brand-dark)]"
                        >
                            Browse listings
                        </a>
                    </div>
                </div>

                <div className="relative mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">
                    <StatCard
                        label="Followers"
                        value={followersCount.toLocaleString()}
                        caption="People tracking this seller"
                    />
                    <StatCard
                        label="Following"
                        value={stats.followingCount.toLocaleString()}
                        caption="Profiles in this network"
                    />
                    <StatCard
                        label="Listings"
                        value={stats.listingsCount.toLocaleString()}
                        caption="Currently active inventory"
                    />
                    <StatCard
                        label="Reviews"
                        value={stats.reviewsCount.toLocaleString()}
                        caption="Public credibility signals"
                    />
                </div>
            </div>
        </section>
    );
};

const StatCard = ({
    label,
    value,
    caption,
}: {
    label: string;
    value: string;
    caption: string;
}) => (
    <div className="rounded-2xl border border-[var(--color-green-100)] bg-[linear-gradient(180deg,rgba(247,252,248,0.95),rgba(255,255,255,0.95))] px-4 py-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-gray-400)]">
            {label}
        </p>
        <p className="mt-2 text-2xl font-semibold text-[var(--color-gray-900)]">
            {value}
        </p>
        <p className="mt-1 text-xs text-[var(--color-gray-500)]">{caption}</p>
    </div>
);

const MetadataPill = ({
    icon,
    label,
}: {
    icon: ReactNode;
    label: string;
}) => (
    <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-green-100)] bg-white/85 px-3 py-1.5">
        <span className="text-[var(--color-brand)]">{icon}</span>
        <span>{label}</span>
    </div>
);

const VerifiedCheck = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
            d="M20 7L10 17L5 12"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const LocationIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
            d="M12 21C16 17 19 13.5 19 10A7 7 0 1 0 5 10C5 13.5 8 17 12 21Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2" />
    </svg>
);

const CalendarIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M16 3V7M8 3V7M3 11H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const ListingIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
            d="M4 10L12 4L20 10V20H4V10Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path d="M9 20V13H15V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

export default PublicProfileHero;
