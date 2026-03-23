"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FormattedListing } from "@/lib/types/listing";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ListingTypeFilter = "all" | "vehicles" | "properties";

export interface ProductFilters {
    listingType: ListingTypeFilter;
    priceRange: [number, number];
    location: string;
    vehicleTypes: string[];
    fuelTypes: string[];
    propertyTypes: string[];
}

export interface PopularItem {
    name: string;
    count: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

export const ITEMS_PER_PAGE = 9;
export const PRICE_MIN = 0;
export const VEHICLE_PRICE_MAX = 5_000_000;
export const PROPERTY_PRICE_MAX = 150_000_000;

export const VEHICLE_TYPES = [
    "Sedan",
    "SUV",
    "Hatchback",
    "Pickup Truck",
    "Van / MPV",
    "Motorcycle",
] as const;

export const FUEL_TYPES = [
    "Gasoline",
    "Diesel",
    "Fully Electric (EV)",
    "Hybrid (Gas + Electric)",
] as const;

export const PROPERTY_TYPES = [
    "House and Lot",
    "Townhouse",
    "Condominium",
    "Apartment",
    "Commercial Building",
    "Residential Lot",
] as const;

// ─── Helper ───────────────────────────────────────────────────────────────────

const priceMaxForType = (type: ListingTypeFilter): number =>
    type === "properties" ? PROPERTY_PRICE_MAX : VEHICLE_PRICE_MAX;

// ─── ViewModel ────────────────────────────────────────────────────────────────

export const makeEmptyProductFilters = (type: ListingTypeFilter = "all"): ProductFilters => ({
    listingType: type,
    priceRange: [PRICE_MIN, priceMaxForType(type)],
    location: "",
    vehicleTypes: [],
    fuelTypes: [],
    propertyTypes: [],
});

export const useProductsMarketplaceViewModel = (initialListings: FormattedListing[] = []) => {
    const searchParams = useSearchParams();
    const initialListingTypeParam = searchParams.get("listingType");
    const initialListingType: ListingTypeFilter =
        initialListingTypeParam === "properties" || initialListingTypeParam === "vehicles"
            ? initialListingTypeParam
            : "all";

    const [filters, setFilters] = useState<ProductFilters>(() => makeEmptyProductFilters(initialListingType));
    const [currentPage, setCurrentPage] = useState(1);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    useEffect(() => {
        const listingTypeParam = searchParams.get("listingType");
        const nextListingType: ListingTypeFilter =
            listingTypeParam === "properties" || listingTypeParam === "vehicles"
                ? listingTypeParam
                : "all";

        setFilters((prev) => {
            if (prev.listingType === nextListingType) {
                return prev;
            }

            return makeEmptyProductFilters(nextListingType);
        });
        setCurrentPage(1);
    }, [searchParams]);

    // ── Derived: active price ceiling ─────────────────────────────────────────
    const activePriceMax = priceMaxForType(filters.listingType);

    // ── Derived: filtered listings ─────────────────────────────────────────────
    const filteredListings = useMemo(() => {
        return initialListings
            .filter((listing) => {
                // Listing type
                if (filters.listingType === "vehicles" && listing.category !== "VEHICLE") return false;
                if (filters.listingType === "properties" && listing.category !== "PROPERTY") return false;

                // Price range
                if (
                    listing.priceValue < filters.priceRange[0] ||
                    listing.priceValue > filters.priceRange[1]
                )
                    return false;

                // Location
                if (
                    filters.location.trim() !== "" &&
                    !listing.location.toLowerCase().includes(filters.location.trim().toLowerCase())
                )
                    return false;

                // Vehicle-specific filters
                if (listing.category === "VEHICLE") {
                    if (
                        filters.vehicleTypes.length > 0 &&
                        !filters.vehicleTypes.includes(listing.bodyType)
                    )
                        return false;
                    if (
                        filters.fuelTypes.length > 0 &&
                        !filters.fuelTypes.includes(listing.fuelType)
                    )
                        return false;
                }

                // Property-specific filters
                if (listing.category === "PROPERTY") {
                    if (
                        filters.propertyTypes.length > 0 &&
                        !filters.propertyTypes.includes(listing.bodyType)
                    )
                        return false;
                }

                return true;
            })
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }, [initialListings, filters]);

    // ── Derived: pagination ────────────────────────────────────────────────────
    const totalPages = Math.max(1, Math.ceil(filteredListings.length / ITEMS_PER_PAGE));

    const paginatedListings = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredListings.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredListings, currentPage]);

    // ── Derived: popular items (context-aware) ─────────────────────────────────
    const popularItems = useMemo((): PopularItem[] => {
        if (filters.listingType === "properties") {
            const counts = initialListings
                .filter((l) => l.category === "PROPERTY")
                .reduce<Record<string, number>>((acc, l) => {
                    acc[l.bodyType] = (acc[l.bodyType] ?? 0) + 1;
                    return acc;
                }, {});
            return Object.entries(counts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([name, count]) => ({ name, count }));
        }

        const source = initialListings.filter((l) => l.category === "VEHICLE");
        const counts = source.reduce<Record<string, number>>((acc, l) => {
            acc[l.brand] = (acc[l.brand] ?? 0) + 1;
            return acc;
        }, {});
        return Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([name, count]) => ({ name, count }));
    }, [initialListings, filters.listingType]);

    const popularTitle =
        filters.listingType === "properties" ? "Popular Property Types" : "Popular Brands";
    const popularSubtitle =
        filters.listingType === "properties"
            ? "Most searched property types this month"
            : "Based on units sold over the last month";

    // ── Filter handlers ────────────────────────────────────────────────────────
    const setListingType = useCallback((type: ListingTypeFilter) => {
        setFilters((prev) => ({
            ...prev,
            listingType: type,
            priceRange: [PRICE_MIN, priceMaxForType(type)],
            vehicleTypes: [],
            fuelTypes: [],
            propertyTypes: [],
        }));
        setCurrentPage(1);
    }, []);

    const setPriceRange = useCallback((range: [number, number]) => {
        setFilters((prev) => ({ ...prev, priceRange: range }));
        setCurrentPage(1);
    }, []);

    const setLocation = useCallback((location: string) => {
        setFilters((prev) => ({ ...prev, location }));
        setCurrentPage(1);
    }, []);

    const toggleVehicleType = useCallback((type: string) => {
        setFilters((prev) => ({
            ...prev,
            vehicleTypes: prev.vehicleTypes.includes(type)
                ? prev.vehicleTypes.filter((t) => t !== type)
                : [...prev.vehicleTypes, type],
        }));
        setCurrentPage(1);
    }, []);

    const toggleFuelType = useCallback((type: string) => {
        setFilters((prev) => ({
            ...prev,
            fuelTypes: prev.fuelTypes.includes(type)
                ? prev.fuelTypes.filter((t) => t !== type)
                : [...prev.fuelTypes, type],
        }));
        setCurrentPage(1);
    }, []);

    const togglePropertyType = useCallback((type: string) => {
        setFilters((prev) => ({
            ...prev,
            propertyTypes: prev.propertyTypes.includes(type)
                ? prev.propertyTypes.filter((t) => t !== type)
                : [...prev.propertyTypes, type],
        }));
        setCurrentPage(1);
    }, []);

    const clearAllFilters = useCallback(() => {
        setFilters((prev) => makeEmptyProductFilters(prev.listingType));
        setCurrentPage(1);
    }, []);

    // ── Pagination ─────────────────────────────────────────────────────────────
    const goToPage = useCallback(
        (page: number) => {
            if (page >= 1 && page <= totalPages) setCurrentPage(page);
        },
        [totalPages]
    );

    // ── Mobile filter drawer ───────────────────────────────────────────────────
    const toggleMobileFilter = useCallback(() => setIsMobileFilterOpen((p) => !p), []);
    const closeMobileFilter = useCallback(() => setIsMobileFilterOpen(false), []);

    const hasActiveFilters =
        filters.priceRange[0] !== PRICE_MIN ||
        filters.priceRange[1] !== activePriceMax ||
        filters.location.trim() !== "" ||
        filters.vehicleTypes.length > 0 ||
        filters.fuelTypes.length > 0 ||
        filters.propertyTypes.length > 0;

    return {
        filters,
        paginatedListings,
        totalCount: filteredListings.length,
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
    };
};
