/**
 * Listings Area View Model
 *
 * Manages client-side filtering for listings.
 * Accepts server-fetched listings as initial data.
 */

import { useEffect, useMemo, useState } from "react";
import { FormattedListing } from "@/lib/types/listing";
import { useAppSelector } from "@/store";

type CategoryTab = "all" | "PROPERTY" | "VEHICLE";

export const useListingsAreaViewModel = (initialListings: FormattedListing[]) => {
    const [mounted, setMounted] = useState(false);
    const isLoggedIn = useAppSelector((state) => state.auth.loggedIn);
    const [activeTab, setActiveTab] = useState<CategoryTab>("all");

    const listings = useMemo(() => {
        if (activeTab === "all") return initialListings;
        return initialListings.filter((listing) => listing.category === activeTab);
    }, [initialListings, activeTab]);

    useEffect(() => {
        setMounted(true);
    }, []);

    return {
        listings,
        mounted,
        isLoggedIn,
        activeTab,
        setActiveTab,
    };
};
