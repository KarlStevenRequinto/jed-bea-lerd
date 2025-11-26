"use client";

import { useListingsSidebarViewModel } from "./useViewModel";
import BaseButton from "@/components/common/BaseButton";

const ListingsSidebar = () => {
    const { activeFilter, setActiveFilter } = useListingsSidebarViewModel();

    return (
        <div className="w-full lg:w-80 flex flex-col gap-6">
            {/* Filter Buttons */}
            <div className="flex flex-col gap-3">
                <BaseButton
                    onClick={() => setActiveFilter("all")}
                    className={`w-full justify-start px-6 py-4 text-base font-medium rounded-lg ${
                        activeFilter === "all"
                            ? "bg-[var(--color-blue-light)] text-white border-transparent"
                            : "bg-white text-foreground border border-gray-300"
                    }`}
                >
                    <span className="mr-2">🛍️</span> ALL LISTING
                </BaseButton>
                <BaseButton
                    onClick={() => setActiveFilter("properties")}
                    className={`w-full justify-start px-6 py-4 text-base font-medium rounded-lg ${
                        activeFilter === "properties"
                            ? "bg-[var(--color-blue-light)] text-white border-transparent"
                            : "bg-white text-foreground border border-gray-300"
                    }`}
                >
                    <span className="mr-2">🏠</span> PROPERTIES
                </BaseButton>
                <BaseButton
                    onClick={() => setActiveFilter("vehicles")}
                    className={`w-full justify-start px-6 py-4 text-base font-medium rounded-lg ${
                        activeFilter === "vehicles"
                            ? "bg-[var(--color-blue-light)] text-white border-transparent"
                            : "bg-white text-foreground border border-gray-300"
                    }`}
                >
                    <span className="mr-2">🚗</span> VEHICLES
                </BaseButton>
            </div>

            {/* Google Ads Placeholder */}
            <div className="w-full h-96 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center text-white">
                <div className="text-center p-6">
                    <div className="text-6xl mb-4">📢</div>
                    <p className="text-xl font-bold mb-2">PIONEER INSURANCE</p>
                    <p className="text-sm opacity-90">
                        Secure your life's biggest investments — Pioneer insurance keeps your home and your vehicle safe.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ListingsSidebar;
