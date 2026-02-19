import { useMemo, useState } from "react";
import { FormattedListing } from "@/lib/types/listing";

interface UseProductsMarketplaceViewModelProps {
    initialListings: FormattedListing[];
}

const categoryTabs = ["All Listings", "Cars", "Residential Houses", "Apartments", "Lots", "Houses & Lots", "Trucks", "Rental Properties"];

const sidebarVehicleTypes = ["Sedan", "SUV", "Truck", "Convertible"];

export const useProductsMarketplaceViewModel = ({ initialListings }: UseProductsMarketplaceViewModelProps) => {
    const [activeCategory, setActiveCategory] = useState("All Listings");
    const [activePage, setActivePage] = useState(2);

    const listings = useMemo(() => {
        if (initialListings.length > 0) {
            return initialListings.slice(0, 6);
        }

        return [];
    }, [initialListings]);

    return {
        activeCategory,
        setActiveCategory,
        categoryTabs,
        sidebarVehicleTypes,
        listings,
        activePage,
        setActivePage,
    };
};
