import { useState } from "react";

export interface RecentlyViewedItem {
    id: string;
    title: string;
    price: string;
    image: string;
    category: "vehicle" | "property";
}

const mockRecentlyViewed: RecentlyViewedItem[] = [
    {
        id: "1",
        title: "2020 Honda Civic",
        price: "₱880,000",
        image: "",
        category: "vehicle",
    },
    {
        id: "2",
        title: "2025 Toyota Fortuner",
        price: "₱2,200,000",
        image: "",
        category: "vehicle",
    },
    {
        id: "3",
        title: "Studio Apartment",
        price: "₱3,200,000",
        image: "",
        category: "property",
    },
];

export const useRecentlyViewedViewModel = () => {
    const [items] = useState(mockRecentlyViewed);

    const handleViewHistory = () => {
        // TODO: Navigate to full history page
        console.log("View history clicked");
    };

    const handleItemClick = (itemId: string) => {
        // TODO: Navigate to item details
        console.log("Item clicked:", itemId);
    };

    return {
        items,
        handleViewHistory,
        handleItemClick,
    };
};
