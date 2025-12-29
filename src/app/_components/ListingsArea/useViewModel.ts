/**
 * Listings Area View Model
 *
 * Manages view mode state and client-side filtering for listings.
 * Accepts server-fetched listings as initial data.
 */

import { useState, useMemo } from "react";
import { FormattedListing } from "@/lib/types/listing";

type ViewMode = "grid" | "list";

export const useListingsAreaViewModel = (initialListings: FormattedListing[]) => {
    const [viewMode, setViewMode] = useState<ViewMode>("grid");
    const [filters, setFilters] = useState<{
        category?: string;
        priceRange?: [number, number];
        location?: string;
    }>({});

    // Apply client-side filters if needed (optional - for real-time filtering without server roundtrip)
    const filteredListings = useMemo(() => {
        let result = [...initialListings];

        // Apply category filter
        if (filters.category) {
            result = result.filter((listing) => listing.category === filters.category);
        }

        // Apply location filter
        if (filters.location) {
            result = result.filter((listing) =>
                listing.location.toLowerCase().includes(filters.location!.toLowerCase())
            );
        }

        // Add more filters as needed

        return result;
    }, [initialListings, filters]);

    const handleViewModeChange = (mode: ViewMode) => {
        setViewMode(mode);
    };

    const handleFilterChange = (newFilters: typeof filters) => {
        setFilters((prev) => ({ ...prev, ...newFilters }));
    };

    return {
        listings: filteredListings,
        viewMode,
        handleViewModeChange,
        handleFilterChange,
    };
};
