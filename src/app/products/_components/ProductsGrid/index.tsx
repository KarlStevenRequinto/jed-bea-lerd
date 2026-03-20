"use client";

import { useMemo, useState } from "react";
import GridProductCard from "@/components/common/GridProductCard";
import ListingDetailsModal, { ListingDetailsModalData } from "@/components/common/ListingDetailsModal";
import Pagination from "@/components/common/Pagination";
import { FormattedListing } from "@/lib/types/listing";
import { ListingTypeFilter } from "../ProductsMarketplace/useViewModel";
import ProductsGridSkeleton from "./ProductsGridSkeleton";

interface ProductsGridProps {
    isLoading?: boolean;
    listings: FormattedListing[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
    listingType: ListingTypeFilter;
    onPageChange: (page: number) => void;
}

// ─── Header icons ─────────────────────────────────────────────────────────────

const VehicleIcon = () => (
    <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <rect width="36" height="36" rx="8" fill="var(--color-brand-muted)" />
        <path
            d="M8 21l2.5-7h15l2.5 7"
            stroke="var(--color-brand)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <rect x="6" y="21" width="24" height="6" rx="2" stroke="var(--color-brand)" strokeWidth="1.8" />
        <circle cx="11" cy="27" r="1.8" fill="var(--color-brand)" />
        <circle cx="25" cy="27" r="1.8" fill="var(--color-brand)" />
        <path d="M11 18h14" stroke="var(--color-brand)" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
);

const PropertyIcon = () => (
    <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <rect width="36" height="36" rx="8" fill="#f0fdf4" />
        <path
            d="M7 18L18 9l11 9"
            stroke="var(--color-green-primary)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M10 16v11h6v-5h4v5h6V16"
            stroke="var(--color-green-primary)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const AllListingsIcon = () => (
    <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <rect width="36" height="36" rx="8" fill="var(--color-brand-muted)" />
        <path
            d="M7 20l2-5.5h8l2 5.5"
            stroke="var(--color-brand)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <rect x="5" y="20" width="14" height="5" rx="1.5" stroke="var(--color-brand)" strokeWidth="1.6" />
        <circle cx="9" cy="25" r="1.3" fill="var(--color-brand)" />
        <circle cx="17" cy="25" r="1.3" fill="var(--color-brand)" />
        <path
            d="M20 19l5-6 5 5"
            stroke="var(--color-green-primary)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M21 17.5v7.5h4v-3h2v3h4v-7.5"
            stroke="var(--color-green-primary)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

// ─── Header config ────────────────────────────────────────────────────────────

const HEADER_CONFIG: Record<
    ListingTypeFilter,
    { icon: React.ReactNode; title: string; countLabel: (n: number) => string }
> = {
    vehicles: {
        icon: <VehicleIcon />,
        title: "Vehicles",
        countLabel: (n) => `${n} Vehicle${n !== 1 ? "s" : ""} Available`,
    },
    properties: {
        icon: <PropertyIcon />,
        title: "Property",
        countLabel: (n) => `${n} ${n !== 1 ? "Properties" : "Property"} Available`,
    },
    all: {
        icon: <AllListingsIcon />,
        title: "All Listings",
        countLabel: (n) => `${n} Listing${n !== 1 ? "s" : ""} Available`,
    },
};

// ─── Empty state ──────────────────────────────────────────────────────────────

const EmptyState = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-[var(--color-brand-muted)] flex items-center justify-center mb-4">
            <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-brand)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
            </svg>
        </div>
        <p className="text-base font-semibold text-[var(--color-gray-800)] mb-1">No listings found</p>
        <p className="text-sm text-[var(--color-gray-500)]">
            Try adjusting your filters to find what you&apos;re looking for.
        </p>
    </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const ProductsGrid = ({
    isLoading = false,
    listings,
    totalCount,
    currentPage,
    totalPages,
    listingType,
    onPageChange,
}: ProductsGridProps) => {
    const [selectedListingId, setSelectedListingId] = useState<string | null>(null);
    const { icon, title, countLabel } = HEADER_CONFIG[listingType];
    const selectedListing = useMemo<ListingDetailsModalData | null>(() => {
        if (!selectedListingId) return null;
        return listings.find((listing) => listing.id === selectedListingId) ?? null;
    }, [listings, selectedListingId]);

    if (isLoading) {
        return <ProductsGridSkeleton />;
    }

    return (
        <section id="products-results">
            {/* Page Header */}
            <div className="flex items-center gap-3 mb-1">
                {icon}
                <h1 className="text-2xl font-bold text-[var(--color-gray-900)]">{title}</h1>
            </div>
            <p className="text-sm text-[var(--color-gray-500)] mb-6 ml-[48px]">
                {countLabel(totalCount)}
            </p>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {listings.length === 0 ? (
                    <EmptyState />
                ) : (
                    listings.map((listing) => (
                        <GridProductCard
                            key={listing.id}
                            category={listing.category}
                            price={listing.price}
                            title={listing.title}
                            location={listing.location}
                            year={listing.year}
                            color={listing.color}
                            mileage={listing.mileage}
                            fuelType={listing.fuelType}
                            bodyType={listing.bodyType}
                            description={listing.description}
                            image={listing.image}
                            onViewDetailsClick={() => setSelectedListingId(listing.id)}
                        />
                    ))
                )}
            </div>

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
            />

            <ListingDetailsModal isOpen={Boolean(selectedListing)} listing={selectedListing} onClose={() => setSelectedListingId(null)} />
        </section>
    );
};

export default ProductsGrid;
