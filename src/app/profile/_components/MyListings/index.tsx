"use client";

import Image from "next/image";
import { useMyListingsViewModel, Listing, ListingTab } from "./useViewModel";
import BaseButton from "@/components/common/BaseButton";

const MyListings = () => {
    const {
        activeTab,
        listings,
        counts,
        highlightTransform,
        transitionClasses,
        highlightWidth,
        handleTabChange,
        handleAddListing,
        handleViewDetails,
        handleSeeMoreListings,
    } = useMyListingsViewModel();

    return (
        <div className="bg-white rounded-lg border border-[var(--color-gray-200)] p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-[var(--color-gray-900)] mb-1">
                        My Listings
                    </h3>
                    <p className="text-sm text-[var(--color-gray-500)]">
                        Properties and vehicles I&apos;m selling
                    </p>
                </div>
                <BaseButton
                    onClick={handleAddListing}
                    className="bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-dark)] px-4 py-2 text-sm"
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-1"
                    >
                        <path
                            d="M12 5V19M5 12H19"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    Add Listing
                </BaseButton>
            </div>

            {/* Tabs */}
            <div className="relative flex bg-[var(--color-brand)] rounded-lg p-1 mb-6">
                {/* Sliding highlight */}
                <div
                    className={`absolute top-1/2 -translate-y-1/2 h-[calc(100%-8px)] rounded-md bg-white ${transitionClasses}`}
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

            {/* Listings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {listings.map((listing) => (
                    <ListingCard
                        key={listing.id}
                        listing={listing}
                        onViewDetails={() => handleViewDetails(listing.id)}
                    />
                ))}
            </div>

            {/* Empty State */}
            {listings.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-[var(--color-gray-500)]">
                        No listings found in this category.
                    </p>
                </div>
            )}

            {/* See More */}
            {listings.length > 0 && (
                <button
                    onClick={handleSeeMoreListings}
                    className="w-full text-center text-sm text-[var(--color-gray-900)] hover:text-[var(--color-brand)] mt-6 py-2 font-medium hover:underline"
                >
                    See more listings
                </button>
            )}
        </div>
    );
};

interface TabButtonProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const TabButton = ({ label, isActive, onClick }: TabButtonProps) => (
    <button
        onClick={onClick}
        className={`relative z-10 flex-1 text-sm font-medium py-2.5 px-4 rounded-md transition-colors duration-300 ${
            isActive
                ? "text-[var(--color-brand)]"
                : "text-white hover:text-[var(--color-gray-100)]"
        }`}
    >
        {label}
    </button>
);

interface ListingCardProps {
    listing: Listing;
    onViewDetails: () => void;
}

const ListingCard = ({ listing, onViewDetails }: ListingCardProps) => (
    <div className="border border-[var(--color-gray-200)] rounded-lg overflow-hidden">
        {/* Image */}
        <div className="relative h-[200px] bg-[var(--color-gray-200)]">
            {listing.image ? (
                <Image
                    src={listing.image}
                    alt={listing.title}
                    fill
                    className="object-cover"
                />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                            stroke="var(--color-gray-400)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M9 22V12H15V22"
                            stroke="var(--color-gray-400)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            )}
            {/* Category Badge */}
            <div className="absolute top-3 left-3">
                <span
                    className={`text-[10px] font-medium px-2 py-1 rounded ${
                        listing.category === "property"
                            ? "bg-[var(--color-success)] text-white"
                            : "bg-[var(--color-brand)] text-white"
                    }`}
                >
                    {listing.category === "property" ? "PROPERTY" : "VEHICLE"}
                </span>
            </div>
            {/* Price Badge */}
            <div className="absolute bottom-3 left-3">
                <span className="bg-white text-[var(--color-gray-900)] text-sm font-semibold px-3 py-1 rounded">
                    {listing.price}
                </span>
            </div>
        </div>

        {/* Content */}
        <div className="p-4">
            <h4 className="text-sm font-bold text-[var(--color-gray-900)] mb-1 line-clamp-2 uppercase">
                {listing.title}
            </h4>
            <p className="text-xs text-[var(--color-gray-500)] mb-2 uppercase">
                {listing.location}
            </p>

            {/* Specs */}
            <div className="flex gap-2 mb-3">
                {listing.specs.map((spec, index) => (
                    <span
                        key={index}
                        className="text-[10px] text-[var(--color-gray-600)]"
                    >
                        {spec}
                        {index < listing.specs.length - 1 && (
                            <span className="ml-2">·</span>
                        )}
                    </span>
                ))}
            </div>

            {/* Description */}
            <p className="text-xs text-[var(--color-gray-600)] line-clamp-2 mb-4">
                {listing.description}
            </p>

            {/* View Details Button */}
            <button
                onClick={onViewDetails}
                className="w-full border border-[var(--color-gray-300)] text-[var(--color-gray-900)] text-xs font-medium py-2 px-4 rounded-lg hover:bg-[var(--color-gray-50)] transition-colors"
            >
                VIEW DETAILS
            </button>
        </div>
    </div>
);

export default MyListings;
