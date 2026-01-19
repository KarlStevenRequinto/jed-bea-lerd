import { useState } from "react";

export interface Connection {
    id: string;
    name: string;
    role: string;
    avatar: string;
    isFollowing: boolean;
}

const mockConnections: Connection[] = [
    {
        id: "1",
        name: "Miguel Santos",
        role: "Real Estate Agent",
        avatar: "",
        isFollowing: true,
    },
    {
        id: "2",
        name: "Andrea Reyes",
        role: "Home Buyer",
        avatar: "",
        isFollowing: true,
    },
    {
        id: "3",
        name: "Carlo Mendoza",
        role: "Property Investor",
        avatar: "",
        isFollowing: false,
    },
    {
        id: "4",
        name: "Jasmine Cruz",
        role: "Car Buyer",
        avatar: "",
        isFollowing: true,
    },
    {
        id: "5",
        name: "Joshua Navarro",
        role: "Car Sales Agent",
        avatar: "",
        isFollowing: true,
    },
];

export type TabType = "following" | "followers";

export const useConnectionsViewModel = () => {
    const [activeTab, setActiveTab] = useState<TabType>("following");
    const [connections] = useState(mockConnections);

    const followingCount = 156;
    const followersCount = 342;

    const handleTabChange = (tab: TabType) => {
        setActiveTab(tab);
    };

    const handleFollow = (connectionId: string) => {
        // TODO: Implement follow/unfollow functionality
        console.log("Follow clicked for:", connectionId);
    };

    const handleSeeMore = () => {
        // TODO: Navigate to full connections page
        console.log("See more clicked");
    };

    return {
        activeTab,
        connections,
        followingCount,
        followersCount,
        handleTabChange,
        handleFollow,
        handleSeeMore,
    };
};
