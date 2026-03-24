"use client";

import Image from "next/image";
import { HomePageFeedPost as FeedPostType } from "../HomePageContent/useViewModel";

interface FeedPostProps {
    post: FeedPostType;
    onLike: () => void;
}

const UserHeader = ({ user, timeAgo }: { user: FeedPostType["user"]; timeAgo: string }) => (
    <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-3">
            <div className="shrink-0">
                {user.avatarUrl ? (
                    <Image
                        src={user.avatarUrl}
                        alt={user.name}
                        width={42}
                        height={42}
                        className="h-[42px] w-[42px] rounded-full object-cover"
                    />
                ) : (
                    <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[var(--color-brand)] text-sm font-semibold text-white">
                        {user.initials}
                    </div>
                )}
            </div>
            <div>
                <p className="text-sm font-semibold text-gray-800 leading-tight">{user.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                    {user.role} · {timeAgo}
                </p>
            </div>
        </div>
        <button
            type="button"
            className="cursor-pointer rounded-full p-1.5 text-gray-400 hover:bg-gray-100 transition-colors"
        >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="5" cy="12" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="19" cy="12" r="2" />
            </svg>
        </button>
    </div>
);

const ActionBar = ({
    likes,
    comments,
    liked,
    onLike,
}: {
    likes: number;
    comments: number;
    liked: boolean;
    onLike: () => void;
}) => (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
        <div className="flex items-center gap-4">
            <button
                type="button"
                onClick={onLike}
                className={`flex cursor-pointer items-center gap-1.5 text-sm font-medium transition-colors ${
                    liked ? "text-[var(--color-brand)]" : "text-gray-400 hover:text-[var(--color-brand)]"
                }`}
            >
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill={liked ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                <span>{likes}</span>
            </button>

            <button
                type="button"
                className="flex cursor-pointer items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span>{comments}</span>
            </button>
        </div>

        <button
            type="button"
            className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
        >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
        </button>
    </div>
);

const FeedPost = ({ post, onLike }: FeedPostProps) => {
    const isTextOnly = post.postType === "social" && !post.images?.length;

    /* ─── Vehicle listing card ─── */
    if (post.postType === "vehicle" && post.vehicleData) {
        const v = post.vehicleData;
        return (
            <div className="overflow-hidden rounded-xl border border-[var(--color-green-100)] bg-white shadow-[0_18px_45px_rgba(39,102,58,0.08)]">
                <UserHeader user={post.user} timeAgo={post.timeAgo} />

                {post.content && (
                    <p className="px-4 pb-3 text-sm text-gray-600 leading-relaxed">{post.content}</p>
                )}

                {/* Full-width image + badge */}
                <div className="relative aspect-video overflow-hidden">
                    <Image src={v.imageUrl} alt={v.title} fill className="object-cover" />
                    <span className="absolute top-3 right-3 rounded-full bg-[var(--color-brand)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow">
                        {v.badge}
                    </span>
                </div>

                {/* Title + price */}
                <div className="flex items-start justify-between gap-3 px-4 pt-4">
                    <div className="min-w-0">
                        <p className="text-base font-bold text-gray-900 leading-tight">{v.title}</p>
                        <p className="mt-0.5 text-xs text-gray-400">{v.location}</p>
                    </div>
                    <p className="shrink-0 text-lg font-bold text-[var(--color-brand)]">{v.price}</p>
                </div>

                {/* Specs row */}
                {(v.mileage || v.fuel || v.transmission) && (
                    <div className="mx-4 mt-3 grid grid-cols-3 gap-2">
                        {[
                            { label: "Mileage", value: v.mileage },
                            { label: "Fuel", value: v.fuel },
                            { label: "Transmission", value: v.transmission },
                        ].map(
                            ({ label, value }) =>
                                value && (
                                    <div key={label} className="rounded-lg bg-gray-50 py-2 text-center">
                                        <p className="text-[9px] font-semibold uppercase tracking-wider text-gray-400">{label}</p>
                                        <p className="mt-0.5 text-xs font-semibold text-gray-700">{value}</p>
                                    </div>
                                )
                        )}
                    </div>
                )}

                {/* CTA row */}
                <div className="flex items-center gap-2.5 px-4 py-4">
                    <button
                        type="button"
                        className="flex-1 cursor-pointer rounded-full bg-[var(--color-brand)] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-brand-dark)]"
                    >
                        View Details
                    </button>
                    <button
                        type="button"
                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-colors hover:border-red-300 hover:text-red-400"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                    </button>
                </div>

                <ActionBar likes={post.likes} comments={post.comments} liked={post.liked} onLike={onLike} />
            </div>
        );
    }

    /* ─── Property listing card ─── */
    if (post.postType === "property" && post.propertyData) {
        const p = post.propertyData;
        return (
            <div className="overflow-hidden rounded-xl border border-[var(--color-green-100)] bg-white shadow-[0_18px_45px_rgba(39,102,58,0.08)]">
                <UserHeader user={post.user} timeAgo={post.timeAgo} />

                {post.content && (
                    <p className="px-4 pb-3 text-sm text-gray-600 leading-relaxed">{post.content}</p>
                )}

                {/* Image with overlay */}
                <div className="relative aspect-video overflow-hidden">
                    <Image src={p.imageUrl} alt={p.title} fill className="object-cover" />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

                    {/* Badge top-left */}
                    <span className="absolute left-3 top-3 rounded-full bg-[var(--color-green-primary)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                        {p.badge}
                    </span>

                    {/* Bottom overlay: title + location + explore */}
                    <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-3 px-4 pb-4">
                        <div className="min-w-0">
                            <p className="text-base font-bold leading-tight text-white">{p.title}</p>
                            <p className="mt-0.5 text-xs text-white/75">
                                {p.location} · {p.price}
                            </p>
                        </div>
                        <button
                            type="button"
                            className="shrink-0 cursor-pointer rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-gray-800 transition-colors hover:bg-gray-100"
                        >
                            Explore
                        </button>
                    </div>
                </div>

                {/* Specs row */}
                {(p.beds || p.baths || p.sqft) && (
                    <div className="flex items-center justify-around border-b border-gray-50 px-4 py-3">
                        {p.beds && (
                            <div className="flex items-center gap-1.5 text-sm text-gray-600">
                                <span>🛏</span>
                                <span>{p.beds} Beds</span>
                            </div>
                        )}
                        {p.baths && (
                            <div className="flex items-center gap-1.5 text-sm text-gray-600">
                                <span>🛁</span>
                                <span>{p.baths} Baths</span>
                            </div>
                        )}
                        {p.sqft && (
                            <div className="flex items-center gap-1.5 text-sm text-gray-600">
                                <span>📐</span>
                                <span>{p.sqft}</span>
                            </div>
                        )}
                    </div>
                )}

                <ActionBar likes={post.likes} comments={post.comments} liked={post.liked} onLike={onLike} />
            </div>
        );
    }

    /* ─── Regular social post ─── */
    return (
        <div
            className={`bg-white rounded-xl shadow-sm overflow-hidden ${
                isTextOnly
                    ? "border border-[var(--color-green-100)] border-l-4 border-l-[var(--color-brand)]"
                    : "border border-[var(--color-green-100)]"
            }`}
        >
            <UserHeader user={post.user} timeAgo={post.timeAgo} />

            {post.content && (
                <p className="px-4 pb-3 text-sm text-gray-700 leading-relaxed">{post.content}</p>
            )}

            {/* Media */}
            {post.media && post.media.length > 0 && (
                <div className={post.media.length === 1 ? "" : "grid grid-cols-2 gap-0.5"}>
                    {post.media.map((mediaItem) => (
                        <div key={mediaItem.id} className="relative aspect-video overflow-hidden bg-black">
                            {mediaItem.type === "video" ? (
                                <video
                                    src={mediaItem.url}
                                    controls
                                    playsInline
                                    preload="metadata"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <Image src={mediaItem.url} alt="Post image" fill className="object-cover" />
                            )}
                        </div>
                    ))}
                </div>
            )}

            <ActionBar likes={post.likes} comments={post.comments} liked={post.liked} onLike={onLike} />
        </div>
    );
};

export default FeedPost;
