import { useState } from "react";
import { useSlidingTabs } from "@/hooks/useSlidingTabs";

export interface Listing {
    id: string;
    title: string;
    location: string;
    price: string;
    image: string;
    category: "property" | "vehicle";
    specs: string[];
    description: string;
}

const mockListings: Listing[] = [
    {
        id: "1",
        title: "MODERN 3BR HOUSE WITH GARDEN AT AYALA NORTH POINT",
        location: "BACOLOD CITY, PHILIPPINES",
        price: "₱3,150,000",
        image: "",
        category: "property",
        specs: ["3 BED", "2 BATH", "2,100 SQFT"],
        description:
            "Beautiful modern house with spacious garden, updated kitchen, and great natural light.",
    },
    {
        id: "2",
        title: "STYLISH URBAN RESIDENCE AT VILLA ALEXANDRA PHASE 2",
        location: "BACOLOD CITY, PHILIPPINES",
        price: "₱7,550,000",
        image: "",
        category: "property",
        specs: ["4 BED", "4 BATH", "2,550 SQFT"],
        description:
            "A beautiful modern home with well-designed living spaces, updated kitchen, and plenty of natural light — ideal for comfortable city living.",
    },
];

export type ListingTab = "all" | "properties" | "vehicles";

export const useMyListingsViewModel = () => {
    const [activeTab, setActiveTab] = useState<ListingTab>("all");
    const [listings] = useState(mockListings);

    // Get active tab index for animation
    const getActiveIndex = () => {
        switch (activeTab) {
            case "all":
                return 0;
            case "properties":
                return 1;
            case "vehicles":
                return 2;
            default:
                return 0;
        }
    };

    // Sliding tab animation
    const { highlightTransform, transitionClasses, highlightWidth } = useSlidingTabs({
        tabCount: 3,
        activeIndex: getActiveIndex(),
        paddingOffset: 6,
        gap: 0,
    });

    const counts = {
        all: 12,
        properties: 12,
        vehicles: 0,
    };

    const filteredListings = listings.filter((listing) => {
        if (activeTab === "all") return true;
        if (activeTab === "properties") return listing.category === "property";
        if (activeTab === "vehicles") return listing.category === "vehicle";
        return true;
    });

    const handleTabChange = (tab: ListingTab) => {
        setActiveTab(tab);
    };

    const handleAddListing = () => {
        // TODO: Navigate to add listing page
        console.log("Add listing clicked");
    };

    const handleViewDetails = (listingId: string) => {
        // TODO: Navigate to listing details
        console.log("View details clicked:", listingId);
    };

    const handleSeeMoreListings = () => {
        // TODO: Navigate to all listings
        console.log("See more listings clicked");
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
