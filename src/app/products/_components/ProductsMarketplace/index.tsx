"use client";

import { useRef } from "react";
import { FormattedListing } from "@/lib/types/listing";
import { useProductsMarketplaceViewModel } from "./useViewModel";
import ProductsFilterSidebar from "../ProductsFilterSidebar";
import ProductsGrid from "../ProductsGrid";
import PopularBrands from "../PopularBrands";
import SponsoredAd from "@/app/profile/_components/SponsoredAd";
import ProductsMarketplaceSkeleton from "./ProductsMarketplaceSkeleton";

const FilterIcon = () => (
    <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <line x1="4" y1="6" x2="20" y2="6" />
        <line x1="8" y1="12" x2="16" y2="12" />
        <line x1="11" y1="18" x2="13" y2="18" />
    </svg>
);

const CloseIcon = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M18 6 6 18M6 6l12 12" />
    </svg>
);

interface ProductsMarketplaceProps {
    initialListings?: FormattedListing[];
    isLoadingInitial?: boolean;
}

const ProductsMarketplace = ({ initialListings = [], isLoadingInitial = false }: ProductsMarketplaceProps) => {
    const {
        filters,
        paginatedListings,
        totalCount,
        currentPage,
        totalPages,
        activePriceMax,
        popularItems,
        popularTitle,
        popularSubtitle,
        hasActiveFilters,
        isMobileFilterOpen,
        setListingType,
        setPriceRange,
        setLocation,
        toggleVehicleType,
        toggleFuelType,
        togglePropertyType,
        clearAllFilters,
        goToPage,
        toggleMobileFilter,
        closeMobileFilter,
    } = useProductsMarketplaceViewModel(initialListings);

    const resultsRef = useRef<HTMLDivElement>(null);

    if (isLoadingInitial) {
        return <ProductsMarketplaceSkeleton />;
    }

    const scrollToResults = () => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        closeMobileFilter();
    };

    const filterSidebarProps = {
        filters,
        totalCount,
        activePriceMax,
        hasActiveFilters,
        onListingTypeChange: setListingType,
        onPriceRangeChange: setPriceRange,
        onLocationChange: setLocation,
        onVehicleTypeToggle: toggleVehicleType,
        onFuelTypeToggle: toggleFuelType,
        onPropertyTypeToggle: togglePropertyType,
        onClearFilters: clearAllFilters,
        onShowResults: scrollToResults,
    };

    return (
        <div className="min-h-screen bg-[var(--color-gray-50)]">
            {/* ── Mobile: Filter toggle bar ─────────────────────────────────── */}
            <div className="lg:hidden sticky top-16 z-30 bg-white border-b border-[var(--color-gray-200)] px-4 py-3 flex items-center justify-between">
                <button
                    type="button"
                    onClick={toggleMobileFilter}
                    className="flex items-center gap-2 text-sm font-medium text-[var(--color-gray-800)] bg-white border border-[var(--color-gray-300)] rounded-lg px-4 py-2 hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] transition-colors cursor-pointer"
                >
                    <FilterIcon />
                    Filters
                    {hasActiveFilters && (
                        <span className="w-2 h-2 rounded-full bg-[var(--color-brand)]" />
                    )}
                </button>
                <p className="text-sm text-[var(--color-gray-500)]">
                    {totalCount} result{totalCount !== 1 ? "s" : ""}
                </p>
            </div>

            {/* ── Mobile: Filter slide-over ─────────────────────────────────── */}
            {isMobileFilterOpen && (
                <>
                    <div
                        className="lg:hidden fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
                        onClick={closeMobileFilter}
                        aria-hidden="true"
                    />
                    <div className="lg:hidden fixed inset-y-0 left-0 z-50 w-[320px] max-w-[90vw] bg-[var(--color-gray-50)] overflow-y-auto flex flex-col">
                        <div className="flex items-center justify-between px-5 py-4 bg-white border-b border-[var(--color-gray-200)] sticky top-0 z-10">
                            <span className="text-base font-bold text-[var(--color-gray-900)]">
                                Filters
                            </span>
                            <button
                                type="button"
                                onClick={closeMobileFilter}
                                className="p-1.5 rounded-lg hover:bg-[var(--color-gray-100)] text-[var(--color-gray-500)] transition-colors cursor-pointer"
                                aria-label="Close filters"
                            >
                                <CloseIcon />
                            </button>
                        </div>
                        <div className="p-4 flex flex-col gap-4">
                            <ProductsFilterSidebar {...filterSidebarProps} />
                        </div>
                    </div>
                </>
            )}

            {/* ── Main layout ───────────────────────────────────────────────── */}
            <div className="container mx-auto px-6 py-6">
                <div className="flex gap-6 items-start">
                    {/* ── Left sidebar (desktop only) ───────────────────────── */}
                    <aside className="hidden lg:flex flex-col gap-4 w-[270px] xl:w-[285px] flex-shrink-0 sticky top-24">
                        <ProductsFilterSidebar {...filterSidebarProps} />
                        <PopularBrands
                            title={popularTitle}
                            subtitle={popularSubtitle}
                            items={popularItems}
                        />
                        <SponsoredAd />
                    </aside>

                    {/* ── Results area ──────────────────────────────────────── */}
                    <div ref={resultsRef} className="flex-1 min-w-0">
                        <ProductsGrid
                            listings={paginatedListings}
                            totalCount={totalCount}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            listingType={filters.listingType}
                            onPageChange={goToPage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsMarketplace;
