"use client";

import { useListingsAreaViewModel } from "./useViewModel";
import ProductCard from "@/components/common/ProductCard";
import GridProductCard from "@/components/common/GridProductCard";
import BaseButton from "@/components/common/BaseButton";
import BulletedListIconSvg from "@/components/svg-icons/bulleted-list";
import GridIconSvg from "@/components/svg-icons/grid";

const ListingsArea = () => {
    const { listings, viewMode, handleViewModeChange } = useListingsAreaViewModel();

    return (
        <div className="flex-1 flex flex-col gap-4">
            {/* Info Banner */}
            <div className="bg-blue-50 rounded-lg px-4 h-[60px] flex items-center justify-between border border-[var(--color-blue-border)]">
                <div className="flex items-center gap-3">
                    <span className="text-blue-600 text-xl">ℹ️</span>
                    <p className="text-sm text-[var(--color-blue-border)]">
                        Browse listings for free. Sign up to save favorites, contact sellers, and get personalized recommendations.
                    </p>
                </div>
                <BaseButton className="text-white px-6 py-2 text-sm font-semibold rounded-lg whitespace-nowrap bg-[var(--color-brand-dark)]">
                    Register Here
                </BaseButton>
            </div>

            {/* View Toggle */}
            <div className="flex justify-end">
                <div className="flex overflow-hidden w-[100px] h-[43px] rounded-[10px] border border-[var(--color-blue-border)]">
                    <button
                        onClick={() => handleViewModeChange("grid")}
                        className={`flex-1 flex items-center justify-center transition-colors cursor-pointer ${
                            viewMode === "grid" ? "bg-[var(--color-brand-dark)] hover:bg-[var(--color-brand-darker)]" : "bg-white hover:bg-gray-50"
                        }`}
                    >
                        <GridIconSvg color={viewMode === "grid" ? "white" : "black"} />
                    </button>
                    <button
                        onClick={() => handleViewModeChange("list")}
                        className={`flex-1 flex items-center justify-center transition-colors cursor-pointer ${
                            viewMode === "list" ? "bg-[var(--color-brand-dark)] hover:bg-[var(--color-brand-darker)]" : "bg-white hover:bg-gray-50"
                        }`}
                    >
                        <BulletedListIconSvg color={viewMode === "list" ? "white" : "black"} />
                    </button>
                </div>
            </div>

            {/* Listings */}
            {viewMode === "list" ? (
                <div className="flex flex-col gap-6">
                    {listings.map((listing) => (
                        <ProductCard
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
                            onContactClick={() => console.log("Contact clicked:", listing.id)}
                            onViewDetailsClick={() => console.log("View details clicked:", listing.id)}
                        />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {listings.map((listing) => (
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
                            onContactClick={() => console.log("Contact clicked:", listing.id)}
                            onViewDetailsClick={() => console.log("View details clicked:", listing.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ListingsArea;
