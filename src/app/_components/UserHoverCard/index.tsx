"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { useUserHoverCardViewModel } from "./useViewModel";
import { buildProfileSlugFromName } from "@/lib/utils/profile";

interface UserHoverCardProps {
    userId: string | undefined;
    children: React.ReactNode;
}

const VerifiedBadge = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <circle cx="12" cy="12" r="10" fill="var(--color-brand)" />
        <path
            d="M9 12l2 2 4-4"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const UserHoverCard = ({ userId, children }: UserHoverCardProps) => {
    const {
        triggerRef,
        isVisible,
        cardData,
        isLoading,
        isFollowLoading,
        position,
        avatarError,
        setAvatarError,
        loggedIn,
        handleTriggerMouseEnter,
        handleTriggerMouseLeave,
        handleCardMouseEnter,
        handleCardMouseLeave,
        handleFollowToggle,
    } = useUserHoverCardViewModel(userId);

    // Avoid SSR mismatch — only portal-render on the client
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const floatingCard = isVisible ? (
        <div
            style={{
                position: "fixed",
                top: position.top,
                left: position.left,
                zIndex: 9999,
                width: 288,
            }}
            onMouseEnter={handleCardMouseEnter}
            onMouseLeave={handleCardMouseLeave}
        >
            <div className="rounded-xl border border-[var(--color-green-200)] bg-white shadow-[0_8px_32px_rgba(39,102,58,0.18)]">
                {isLoading && !cardData ? (
                    <div className="flex items-center justify-center p-6">
                        <div className="h-5 w-5 rounded-full border-2 border-[var(--color-brand)] border-t-transparent animate-spin" />
                    </div>
                ) : cardData ? (
                    <div className="p-4">
                        {/* Avatar + name row */}
                        <div className="flex items-center gap-3 mb-3">
                            <div className="shrink-0">
                                {cardData.photoUrl && !avatarError ? (
                                    <Image
                                        src={cardData.photoUrl}
                                        alt={cardData.name}
                                        width={48}
                                        height={48}
                                        className="h-12 w-12 rounded-full object-cover"
                                        onError={() => setAvatarError(true)}
                                    />
                                ) : (
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-brand)] text-base font-semibold text-white">
                                        {cardData.initials}
                                    </div>
                                )}
                            </div>

                            <div className="min-w-0">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                    <p className="text-sm font-semibold text-gray-900 leading-tight">
                                        {cardData.name}
                                    </p>
                                    {cardData.verified && <VerifiedBadge />}
                                </div>
                                {cardData.location && (
                                    <p className="text-xs text-gray-400 mt-0.5 truncate">
                                        {cardData.location}
                                    </p>
                                )}
                                <p className="text-xs text-gray-500 mt-0.5">
                                    {cardData.followersCount.toLocaleString()}{" "}
                                    {cardData.followersCount === 1 ? "follower" : "followers"}
                                </p>
                            </div>
                        </div>

                        {/* Bio */}
                        {cardData.bio && (
                            <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">
                                {cardData.bio}
                            </p>
                        )}

                        {/* Divider */}
                        <div className="border-t border-gray-100 mb-3" />

                        {/* Follow button — only for logged-in users viewing someone else's card */}
                        {loggedIn && !cardData.isOwnProfile ? (
                            <div className="space-y-2">
                                <button
                                    type="button"
                                    onClick={handleFollowToggle}
                                    disabled={isFollowLoading}
                                    className={`w-full cursor-pointer rounded-full py-2 text-sm font-semibold transition-colors disabled:opacity-60 ${
                                        cardData.isFollowing
                                            ? "border border-[var(--color-brand)] text-[var(--color-brand)] hover:border-red-400 hover:text-red-500"
                                            : "bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-dark)]"
                                    }`}
                                >
                                    {isFollowLoading
                                        ? "..."
                                        : cardData.isFollowing
                                          ? "Unfollow"
                                          : "Follow"}
                                </button>
                                <Link
                                    href={`/profile/${buildProfileSlugFromName(cardData.name)}`}
                                    className="block w-full cursor-pointer rounded-full border border-[var(--color-green-200)] bg-[var(--color-green-50)] py-2 text-center text-sm font-semibold text-[var(--color-gray-800)] transition-colors hover:border-[var(--color-brand)] hover:text-[var(--color-brand-dark)]"
                                >
                                    View profile
                                </Link>
                            </div>
                        ) : !loggedIn ? (
                            <p className="text-center text-xs text-gray-400">
                                Sign in to follow
                            </p>
                        ) : cardData.isOwnProfile ? (
                            <Link
                                href="/profile"
                                className="block w-full cursor-pointer rounded-full border border-[var(--color-green-200)] bg-[var(--color-green-50)] py-2 text-center text-sm font-semibold text-[var(--color-gray-800)] transition-colors hover:border-[var(--color-brand)] hover:text-[var(--color-brand-dark)]"
                            >
                                Open profile
                            </Link>
                        ) : null}
                    </div>
                ) : null}
            </div>
        </div>
    ) : null;

    return (
        <div
            ref={triggerRef}
            onMouseEnter={handleTriggerMouseEnter}
            onMouseLeave={handleTriggerMouseLeave}
        >
            {children}
            {mounted && createPortal(floatingCard, document.body)}
        </div>
    );
};

export default UserHoverCard;
