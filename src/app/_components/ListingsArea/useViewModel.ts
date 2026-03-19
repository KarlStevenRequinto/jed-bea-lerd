/**
 * Listings Area View Model
 *
 * Manages client-side filtering for listings.
 * Accepts server-fetched listings as initial data.
 */

import { useEffect, useMemo, useState } from "react";
import { FormattedListing } from "@/lib/types/listing";
import { useAppSelector } from "@/store";

export const useListingsAreaViewModel = (initialListings: FormattedListing[]) => {
    const [mounted, setMounted] = useState(false);
    const isLoggedIn = useAppSelector((state) => state.auth.loggedIn);
    const [filters, setFilters] = useState<{
        category?: string;
        priceRange?: [number, number];
        location?: string;
    }>({});

    const filteredListings = useMemo(() => {
        let result = [...initialListings];

        if (filters.category) {
            result = result.filter((listing) => listing.category === filters.category);
        }

        if (filters.location) {
            result = result.filter((listing) =>
                listing.location.toLowerCase().includes(filters.location!.toLowerCase())
            );
        }

        return result;
    }, [initialListings, filters]);

    const handleFilterChange = (newFilters: typeof filters) => {
        setFilters((prev) => ({ ...prev, ...newFilters }));
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    return {
        listings: filteredListings,
        mounted,
        isLoggedIn,
        handleFilterChange,
    };
};
