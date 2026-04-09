import { useState } from "react";
import { useSlidingTabs } from "@/hooks/useSlidingTabs";
import { ProfileListing } from "@/lib/types/profile";

export type { ProfileListing as Listing };
export type ListingTab = "all" | "properties" | "vehicles";

const toListingTab = (tab?: string): ListingTab => {
    if (tab === "properties" || tab === "vehicles") return tab;
    return "all";
};

export const useMyListingsViewModel = (initialListings: ProfileListing[], initialTab?: string) => {
    const [activeTab, setActiveTab] = useState<ListingTab>(() => toListingTab(initialTab));

    const getActiveIndex = () => {
        switch (activeTab) {
            case "all": return 0;
            case "properties": return 1;
            case "vehicles": return 2;
            default: return 0;
        }
    };

    const { highlightTransform, transitionClasses, highlightWidth } = useSlidingTabs({
        tabCount: 3,
        activeIndex: getActiveIndex(),
        paddingOffset: 6,
        gap: 0,
    });

    const counts = {
        all: initialListings.length,
        properties: initialListings.filter((l) => l.category === "property").length,
        vehicles: initialListings.filter((l) => l.category === "vehicle").length,
    };

    const filteredListings = initialListings.filter((listing) => {
        if (activeTab === "all") return true;
        if (activeTab === "properties") return listing.category === "property";
        if (activeTab === "vehicles") return listing.category === "vehicle";
        return true;
    });

    const handleTabChange = (tab: ListingTab) => setActiveTab(tab);

    const handleAddListing = () => {
        // TODO: Navigate to add listing page
    };

    const handleViewDetails = (_listingId: string) => {
        // TODO: Navigate to listing details
    };

    const handleSeeMoreListings = () => {
        // TODO: Navigate to all listings
    };

    return {
        activeTab,
        listings: filteredListings,
        counts,
        highlightTransform,
        transitionClasses,
        highlightWidth,
        handleTabChange,
        handleAddListing,
        handleViewDetails,
        handleSeeMoreListings,
    };
};
