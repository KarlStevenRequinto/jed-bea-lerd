"use client";

import Skeleton from "@/components/common/Skeleton";
import ProductsFilterSidebar from "../ProductsFilterSidebar";
import ProductsGrid from "../ProductsGrid";
import PopularBrands from "../PopularBrands";
import { makeEmptyProductFilters, VEHICLE_PRICE_MAX } from "./useViewModel";

const ProductsMarketplaceSkeleton = () => {
    const skeletonFilters = makeEmptyProductFilters();

    return (
        <div className="min-h-screen bg-[var(--color-gray-50)]">
            <div className="lg:hidden sticky top-16 z-30 bg-white border-b border-[var(--color-gray-200)] px-4 py-3 flex items-center justify-between">
                <Skeleton className="h-10 w-28 rounded-lg" />
                <Skeleton className="h-4 w-20" />
            </div>

            <div className="container mx-auto px-6 py-6">
                <div className="flex gap-6 items-start">
                    <aside className="hidden lg:flex flex-col gap-4 w-[270px] xl:w-[285px] flex-shrink-0 sticky top-24">
                        <ProductsFilterSidebar
                            isLoading
                            filters={skeletonFilters}
                            totalCount={0}
                            activePriceMax={VEHICLE_PRICE_MAX}
                            hasActiveFilters={false}
                            onListingTypeChange={() => undefined}
                            onPriceRangeChange={() => undefined}
                            onLocationChange={() => undefined}
                            onVehicleTypeToggle={() => undefined}
                            onFuelTypeToggle={() => undefined}
                            onPropertyTypeToggle={() => undefined}
                            onClearFilters={() => undefined}
                            onShowResults={() => undefined}
                        />
                        <PopularBrands isLoading title="" subtitle="" items={[]} />
                        <div className="bg-white rounded-xl border border-[var(--color-gray-200)] p-5 w-full">
                            <Skeleton className="h-72 w-full rounded-lg" />
                        </div>
                    </aside>

                    <div className="flex-1 min-w-0">
                        <ProductsGrid
                            isLoading
                            listings={[]}
                            totalCount={0}
                            currentPage={1}
                            totalPages={1}
                            listingType={skeletonFilters.listingType}
                            onPageChange={() => undefined}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsMarketplaceSkeleton;
