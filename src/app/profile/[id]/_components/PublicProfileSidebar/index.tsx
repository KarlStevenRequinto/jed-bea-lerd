import Link from "next/link";
import Avatar from "@/components/common/Avatar";
import CategoryBadge from "@/components/common/CategoryBadge";
import { ProfileConnection, ProfileData, ProfileListing, ProfileStats } from "@/lib/types/profile";
import { usePublicProfileSidebarViewModel } from "./useViewModel";

interface PublicProfileSidebarProps {
    profile: ProfileData;
    stats: ProfileStats;
    followers: ProfileConnection[];
    following: ProfileConnection[];
    listings: ProfileListing[];
}

const PublicProfileSidebar = ({
    profile,
    stats,
    followers,
    following,
    listings,
}: PublicProfileSidebarProps) => {
    const { identityRows, networkPreview, featuredListings } =
        usePublicProfileSidebarViewModel(profile, stats, followers, following, listings);

    return (
        <div className="space-y-6 lg:sticky lg:top-24">
            <aside className="rounded-[24px] border border-[var(--color-green-100)] bg-[linear-gradient(180deg,rgba(43,141,74,0.96),rgba(31,115,59,0.98))] p-5 text-white shadow-[0_22px_50px_rgba(39,102,58,0.2)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                    Seller Snapshot
                </p>
                <h3 className="mt-2 text-xl font-semibold">
                    Why buyers stay on this page
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/80">
                    Familiar profile structure, visible social proof, and current inventory reduce decision fatigue.
                </p>

                <div className="mt-5 space-y-3">
                    {identityRows.map((row) => (
                        <div
                            key={row.label}
                            className="rounded-2xl border border-white/12 bg-white/8 px-4 py-3 backdrop-blur-sm"
                        >
                            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
                                {row.label}
                            </p>
                            <p className="mt-1 text-sm font-medium text-white">{row.value}</p>
                        </div>
                    ))}
                </div>
            </aside>

            <aside className="rounded-[24px] border border-[var(--color-gray-200)] bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <h3 className="text-base font-semibold text-[var(--color-gray-900)]">
                            Network preview
                        </h3>
                        <p className="mt-1 text-sm text-[var(--color-gray-500)]">
                            Followers and following
                        </p>
                    </div>
                    <div className="rounded-full bg-[var(--color-gray-100)] px-3 py-1 text-xs font-medium text-[var(--color-gray-600)]">
                        {networkPreview.length}
                    </div>
                </div>

                <div className="space-y-3">
                    {networkPreview.length === 0 ? (
                        <p className="rounded-2xl bg-[var(--color-gray-50)] px-4 py-6 text-sm text-[var(--color-gray-500)]">
                            No visible connections yet.
                        </p>
                    ) : (
                        networkPreview.map((connection) => (
                            <Link
                                key={`${connection.userId}-${connection.direction}`}
                                href={`/profile/${connection.userId}`}
                                className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[var(--color-gray-200)] px-3 py-3 transition-colors hover:border-[var(--color-green-200)] hover:bg-[var(--color-green-50)]"
                            >
                                <Avatar
                                    name={connection.name}
                                    avatarUrl={connection.avatarUrl}
                                    size={44}
                                />
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-semibold text-[var(--color-gray-900)]">
                                        {connection.name}
                                    </p>
                                    <p className="truncate text-xs text-[var(--color-gray-500)]">
                                        {connection.location || "HomeNDrive member"}
                                    </p>
                                </div>
                                <span className="rounded-full bg-[var(--color-gray-100)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-gray-500)]">
                                    {connection.direction}
                                </span>
                            </Link>
                        ))
                    )}
                </div>
            </aside>

            <aside className="rounded-[24px] border border-[var(--color-gray-200)] bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
                <div className="mb-4">
                    <h3 className="text-base font-semibold text-[var(--color-gray-900)]">
                        Featured inventory
                    </h3>
                    <p className="mt-1 text-sm text-[var(--color-gray-500)]">
                        A quick scan of what this seller is actively offering.
                    </p>
                </div>

                <div className="space-y-3">
                    {featuredListings.length === 0 ? (
                        <p className="rounded-2xl bg-[var(--color-gray-50)] px-4 py-6 text-sm text-[var(--color-gray-500)]">
                            No active inventory available.
                        </p>
                    ) : (
                        featuredListings.map((listing) => (
                            <div
                                key={listing.id}
                                className="rounded-2xl border border-[var(--color-gray-200)] px-4 py-3"
                            >
                                <div className="mb-2">
                                    <CategoryBadge category={listing.category} />
                                </div>
                                <p className="line-clamp-2 text-sm font-semibold text-[var(--color-gray-900)]">
                                    {listing.title}
                                </p>
                                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[var(--color-gray-400)]">
                                    {listing.location}
                                </p>
                                <p className="mt-2 text-sm font-semibold text-[var(--color-brand-dark)]">
                                    {listing.price}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </aside>
        </div>
    );
};

export default PublicProfileSidebar;
