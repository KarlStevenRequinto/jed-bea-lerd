"use client";

import Image from "next/image";
import CategoryBadge from "@/components/common/CategoryBadge";
import EmptyState from "@/components/common/EmptyState";
import { ProfileListing } from "@/lib/types/profile";
import { usePublicProfileListingsViewModel } from "./useViewModel";

interface PublicProfileListingsProps {
    listings: ProfileListing[];
    sellerName: string;
}

const PublicProfileListings = ({
    listings,
    sellerName,
}: PublicProfileListingsProps) => {
    const {
        activeTab,
        filteredListings,
        counts,
        highlightTransform,
        transitionClasses,
        highlightWidth,
        handleTabChange,
    } = usePublicProfileListingsViewModel(listings);

    return (
        <section
            id="seller-listings"
            className="rounded-[24px] border border-[var(--color-gray-200)] bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.05)]"
        >
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-[var(--color-gray-900)]">
                        Active listings
                    </h2>
                    <p className="mt-1 text-sm text-[var(--color-gray-500)]">
                        Inventory from {sellerName} displayed in the same marketplace rhythm as the homepage.
                    </p>
                </div>
                <div className="rounded-full border border-[var(--color-green-100)] bg-[var(--color-green-50)] px-4 py-2 text-sm font-medium text-[var(--color-brand-dark)]">
                    {counts.all} live {counts.all === 1 ? "listing" : "listings"}
                </div>
            </div>

            <div className="relative mb-6 flex rounded-full bg-[var(--color-brand)] p-1">
                <div
                    className={`absolute top-1/2 -translate-y-1/2 h-[calc(100%-8px)] rounded-full bg-white ${transitionClasses}`}
                    style={{ transform: highlightTransform, width: highlightWidth }}
                    aria-hidden="true"
                />
                <TabButton
                    label={`All (${counts.all})`}
                    isActive={activeTab === "all"}
                    onClick={() => handleTabChange("all")}
                />
                <TabButton
                    label={`Properties (${counts.properties})`}
                    isActive={activeTab === "properties"}
                    onClick={() => handleTabChange("properties")}
                />
                <TabButton
                    label={`Vehicles (${counts.vehicles})`}
                    isActive={activeTab === "vehicles"}
                    onClick={() => handleTabChange("vehicles")}
                />
            </div>

            {filteredListings.length === 0 ? (
                <EmptyState
                    message="No active listings in this category yet."
                    className="py-14"
                />
            ) : (
                <div className="grid gap-5 md:grid-cols-2">
                    {filteredListings.map((listing) => (
                        <article
                            key={listing.id}
                            className="overflow-hidden rounded-[22px] border border-[var(--color-gray-200)] bg-white transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(15,23,42,0.08)]"
                        >
                            <div className="relative h-[220px] overflow-hidden bg-[var(--color-gray-100)]">
                                {listing.image ? (
                                    <Image
                                        src={listing.image}
                                        alt={listing.title}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(103,188,120,0.12),rgba(27,94,32,0.18))]" />
                                )}

                                <div className="absolute left-4 top-4">
                                    <CategoryBadge category={listing.category} />
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 bg-[linear-gradient(180deg,transparent,rgba(17,24,39,0.84))] px-4 pb-4 pt-12">
                                    <div className="flex items-end justify-between gap-4">
                                        <div className="min-w-0">
                                            <h3 className="line-clamp-2 text-base font-semibold text-white">
                                                {listing.title}
                                            </h3>
                                            <p className="mt-1 text-xs uppercase tracking-[0.12em] text-white/70">
                                                {listing.location}
                                            </p>
                                        </div>
                                        <p
                                            className={`shrink-0 text-lg font-semibold ${
                                                listing.category === "vehicle"
                                                    ? "text-[var(--color-vehicle-primary)]"
                                                    : "text-[var(--color-green-100)]"
                                            }`}
                                        >
                                            {listing.price}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4">
                                <div className="mb-3 flex flex-wrap gap-2">
                                    {listing.specs.map((spec) => (
                                        <span
                                            key={`${listing.id}-${spec}`}
                                            className="rounded-full bg-[var(--color-gray-100)] px-3 py-1 text-xs font-medium text-[var(--color-gray-600)]"
                                        >
                                            {spec}
                                        </span>
                                    ))}
                                </div>

                                <p className="line-clamp-3 text-sm leading-6 text-[var(--color-gray-600)]">
                                    {listing.description || "Listing details are available when you open the full product view."}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
};

const TabButton = ({
    label,
    isActive,
    onClick,
}: {
    label: string;
    isActive: boolean;
    onClick: () => void;
}) => (
    <button
        type="button"
        onClick={onClick}
        className={`relative z-10 flex-1 rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-300 cursor-pointer ${
            isActive ? "text-[var(--color-brand)]" : "text-white hover:text-[var(--color-gray-100)]"
        }`}
    >
        {label}
    </button>
);

export default PublicProfileListings;
