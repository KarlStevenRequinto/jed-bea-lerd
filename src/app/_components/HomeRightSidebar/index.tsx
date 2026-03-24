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
                <div className="rounded-xl border border-[var(--color-green-100)] bg-white p-4 shadow-[0_18px_45px_rgba(39,102,58,0.08)]">
                    <p className="mb-3 text-sm font-semibold text-gray-800">Active Listings</p>
                    <div className="flex flex-col gap-3">
                        {previewListings.map((listing) => {
                            const isVehicle = listing.category === "VEHICLE";

                            return (
                            <div
                                key={listing.id}
                                className={`flex cursor-pointer items-center gap-3 rounded-xl border px-2.5 py-2 transition-all duration-200 hover:-translate-y-0.5 ${
                                    isVehicle
                                        ? "border-[var(--color-vehicle-light)] bg-[var(--color-vehicle-muted)]/45 hover:border-[var(--color-vehicle-primary)] hover:bg-[var(--color-vehicle-muted)] hover:shadow-[0_12px_22px_rgba(47,111,237,0.12)]"
                                        : "border-[var(--color-green-100)] bg-[var(--color-brand-muted)]/40 hover:border-[var(--color-brand)] hover:bg-[var(--color-brand-muted)] hover:shadow-[0_12px_22px_rgba(39,102,58,0.10)]"
                                }`}
                            >
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
                                    <p
                                        className={`text-xs font-bold ${
                                            isVehicle
                                                ? "text-[var(--color-vehicle-dark)]"
                                                : "text-[var(--color-brand-dark)]"
                                        }`}
                                    >
                                        {listing.price}
                                    </p>
                                    <p className="truncate text-[10px] text-gray-400">{listing.location}</p>
                                </div>
                            </div>
                        )})}
                    </div>
                    <Link
                        href="/products?listingType=all"
                        className="mt-4 block text-center text-xs font-semibold text-[var(--color-brand)] hover:underline"
                    >
                        View all listings
                    </Link>
                </div>
            )}

            <div className="relative overflow-hidden rounded-xl border border-[color-mix(in_srgb,var(--color-brand)_22%,var(--color-gray-200))] bg-[linear-gradient(180deg,#fcfdfc_0%,color-mix(in_srgb,var(--color-brand-muted)_78%,white)_100%)] p-3.5 shadow-[0_18px_45px_rgba(39,102,58,0.10)]">
                <div className="pointer-events-none absolute -right-8 top-0 h-24 w-24 rounded-full bg-[color-mix(in_srgb,var(--color-attention-light)_72%,white)] opacity-45 blur-2xl" />

                <div className="relative mb-3 flex items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2.5 text-[var(--color-brand-darker)]">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--color-attention-light)_82%,white)] text-[var(--color-attention-deep)]">
                            <svg
                                width="16"
                                height="16"
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
                        </div>
                        <div>
                            <span className="mb-1 inline-flex rounded-full border border-[color-mix(in_srgb,var(--color-brand)_10%,var(--color-gray-300))] bg-white/90 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-[var(--color-gray-500)]">
                                Spotlight
                            </span>
                            <h3 className="mt-0.5 text-sm font-semibold leading-none text-[var(--color-brand-darker)]">Trending Now</h3>
                        </div>
                    </div>

                    <span className="rounded-full bg-[color-mix(in_srgb,var(--color-attention-light)_80%,white)] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.22em] text-[var(--color-attention-deep)]">
                        Hot
                    </span>
                </div>

                <div className="relative space-y-2">
                    <div className="cursor-pointer rounded-[18px] border border-white/80 bg-white/55 p-3 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--color-attention)_28%,var(--color-brand))] hover:bg-white/88 hover:shadow-[0_14px_28px_rgba(39,102,58,0.10)]">
                        <p className="mb-1 text-[8px] font-medium uppercase tracking-[0.18em] text-[var(--color-gray-500)]">
                            Marketplace - Hot
                        </p>
                        <p className="text-[1.12rem] font-bold leading-[1.02] tracking-[-0.025em] text-[var(--color-brand-darker)]">Vintage Leica Cameras</p>
                        <p className="mt-0.5 text-[13px] text-[var(--color-gray-500)]">1,240 listings today</p>
                    </div>

                    <div className="cursor-pointer rounded-[18px] border border-white/75 bg-white/42 p-3 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--color-attention)_24%,var(--color-brand))] hover:bg-white/82 hover:shadow-[0_14px_28px_rgba(39,102,58,0.09)]">
                        <p className="mb-1 text-[8px] font-medium uppercase tracking-[0.18em] text-[var(--color-gray-500)]">
                            Real Estate - Rising
                        </p>
                        <p className="text-[1.12rem] font-bold leading-[1.02] tracking-[-0.025em] text-[var(--color-brand-darker)]">Sustainable Micro-Lofts</p>
                        <p className="mt-0.5 text-[13px] text-[var(--color-gray-500)]">42 new in your area</p>
                    </div>

                    <div className="cursor-pointer rounded-[18px] border border-white/75 bg-white/42 p-3 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--color-attention)_24%,var(--color-brand))] hover:bg-white/82 hover:shadow-[0_14px_28px_rgba(39,102,58,0.09)]">
                        <p className="mb-1 text-[8px] font-medium uppercase tracking-[0.18em] text-[var(--color-gray-500)]">
                            Community
                        </p>
                        <p className="text-[1.12rem] font-bold leading-[1.02] tracking-[-0.025em] text-[var(--color-brand-darker)]">#MinimalistDesign</p>
                        <p className="mt-0.5 text-[13px] text-[var(--color-gray-500)]">12.5k people talking</p>
                    </div>
                </div>

                <Link
                    href="/trends"
                    className="relative mt-4 block w-full cursor-pointer rounded-full border border-[color-mix(in_srgb,var(--color-brand)_15%,var(--color-gray-300))] bg-white px-4 py-2 text-center text-sm font-semibold text-[var(--color-brand-dark)] transition-colors hover:border-[color-mix(in_srgb,var(--color-attention)_35%,var(--color-brand))] hover:bg-[color-mix(in_srgb,var(--color-attention-light)_36%,white)] hover:text-[var(--color-attention-deep)]"
                >
                    See All Trends
                </Link>
            </div>
        </div>
    );
};

export default HomeRightSidebar;
