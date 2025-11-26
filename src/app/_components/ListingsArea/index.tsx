"use client";

import { useListingsAreaViewModel } from "./useViewModel";
import ProductCard from "@/components/common/ProductCard";
import BaseButton from "@/components/common/BaseButton";

const ListingsArea = () => {
    const { listings } = useListingsAreaViewModel();

    return (
        <div className="flex-1 flex flex-col gap-4">
            {/* Info Banner */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-blue-600 text-xl">ℹ️</span>
                    <p className="text-sm text-blue-900">
                        Browse listings for free. Sign up to save favorites, contact sellers, and get personalized recommendations.
                    </p>
                </div>
                <BaseButton className="bg-blue-600 text-white px-6 py-2 text-sm font-semibold rounded-lg whitespace-nowrap">
                    Register Here
                </BaseButton>
            </div>

            {/* View Toggle */}
            <div className="flex justify-end gap-2">
                <button className="p-2 border border-gray-300 rounded bg-white hover:bg-gray-50">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <rect x="2" y="2" width="7" height="7" />
                        <rect x="11" y="2" width="7" height="7" />
                        <rect x="2" y="11" width="7" height="7" />
                        <rect x="11" y="11" width="7" height="7" />
                    </svg>
                </button>
                <button className="p-2 border border-gray-300 rounded bg-blue-500 text-white">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <rect x="2" y="2" width="16" height="4" />
                        <rect x="2" y="8" width="16" height="4" />
                        <rect x="2" y="14" width="16" height="4" />
                    </svg>
                </button>
            </div>

            {/* Listings - Scrollable */}
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
        </div>
    );
};

export default ListingsArea;
