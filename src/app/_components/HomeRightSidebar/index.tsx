"use client";

import Image from "next/image";
import Link from "next/link";
import { FormattedListing } from "@/lib/types/listing";

interface HomeRightSidebarProps {
    initialListings: FormattedListing[];
}

const HomeRightSidebar = ({ initialListings }: HomeRightSidebarProps) => {
    const previewListings = initialListings.slice(0, 4);

    return (
        <div className="flex flex-col gap-4">
            {previewListings.length > 0 && (
                <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                    <p className="mb-3 text-sm font-semibold text-gray-800">Active Listings</p>
                    <div className="flex flex-col gap-3">
                        {previewListings.map((listing) => (
                            <div key={listing.id} className="flex items-center gap-3">
                                {listing.image && (
                                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                                        <Image
                                            src={listing.image}
                                            alt={listing.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-xs font-semibold text-gray-800">{listing.title}</p>
                                    <p className="text-xs font-bold text-[var(--color-brand)]">{listing.price}</p>
                                    <p className="truncate text-[10px] text-gray-400">{listing.location}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Link
                        href="/products"
                        className="mt-4 block text-center text-xs font-semibold text-[var(--color-brand)] hover:underline"
                    >
                        View all listings
                    </Link>
                </div>
            )}

            <div className="rounded-xl border border-[var(--color-gray-200)] bg-[color-mix(in_srgb,var(--color-brand-muted)_40%,white)] p-4 shadow-sm">
                <div className="mb-4 flex items-center gap-2.5 text-[var(--color-brand-darker)]">
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <path d="M4 16l6-6 4 4 6-8" />
                        <path d="M16 6h4v4" />
                    </svg>
                    <h3 className="text-sm font-semibold leading-none">Trending Now</h3>
                </div>

                <div className="space-y-5 text-[var(--color-brand-darker)]">
                    <div>
                        <p className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--color-gray-500)]">
                            Marketplace - Hot
                        </p>
                        <p className="text-xl font-bold leading-tight tracking-[-0.02em]">Vintage Leica Cameras</p>
                        <p className="mt-1 text-sm text-[var(--color-gray-500)]">1,240 listings today</p>
                    </div>

                    <div>
                        <p className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--color-gray-500)]">
                            Real Estate - Rising
                        </p>
                        <p className="text-xl font-bold leading-tight tracking-[-0.02em]">Sustainable Micro-Lofts</p>
                        <p className="mt-1 text-sm text-[var(--color-gray-500)]">42 new in your area</p>
                    </div>

                    <div>
                        <p className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--color-gray-500)]">
                            Community
                        </p>
                        <p className="text-xl font-bold leading-tight tracking-[-0.02em]">#MinimalistDesign</p>
                        <p className="mt-1 text-sm text-[var(--color-gray-500)]">12.5k people talking</p>
                    </div>
                </div>

                <button
                    type="button"
                    className="mt-5 w-full cursor-pointer rounded-full border border-[var(--color-gray-300)] bg-white/70 px-4 py-2.5 text-sm font-semibold text-[var(--color-brand)] transition-colors hover:bg-white"
                >
                    See All Trends
                </button>
            </div>
        </div>
    );
};

export default HomeRightSidebar;
