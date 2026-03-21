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
            {/* Sponsored ad */}
            <div className="bg-gradient-to-br from-[var(--color-brand)] to-[var(--color-blue-light)] rounded-xl p-5 text-white shadow-sm">
                <p className="text-[10px] font-semibold uppercase tracking-widest opacity-60 mb-3">Sponsored</p>
                <div className="text-3xl mb-2">📢</div>
                <p className="text-base font-bold leading-tight mb-1">Pioneer Insurance</p>
                <p className="text-xs opacity-80 leading-relaxed">
                    Secure your home and vehicle — Pioneer Insurance keeps your biggest investments protected.
                </p>
                <button
                    type="button"
                    className="cursor-pointer mt-4 w-full rounded-lg bg-white py-1.5 text-xs font-semibold text-[var(--color-brand)] hover:bg-gray-50 transition-colors"
                >
                    Learn More
                </button>
            </div>

            {/* Active listings preview */}
            {previewListings.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                    <p className="text-sm font-semibold text-gray-800 mb-3">Active Listings</p>
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
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-gray-800 truncate">{listing.title}</p>
                                    <p className="text-xs font-bold text-[var(--color-brand)]">{listing.price}</p>
                                    <p className="text-[10px] text-gray-400 truncate">{listing.location}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Link
                        href="/products"
                        className="mt-4 block text-center text-xs font-semibold text-[var(--color-brand)] hover:underline"
                    >
                        View all listings →
                    </Link>
                </div>
            )}
        </div>
    );
};

export default HomeRightSidebar;
