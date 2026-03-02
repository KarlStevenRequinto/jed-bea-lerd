import { useState } from "react";
import { useSlidingTabs } from "@/hooks/useSlidingTabs";
import { MOCK_FOLLOWER_CONNECTIONS, MOCK_FOLLOWING_CONNECTIONS } from "@/constants/connections";
export type { Connection } from "@/constants/connections";

export type TabType = "following" | "followers";

export const useConnectionsViewModel = () => {
    const [activeTab, setActiveTab] = useState<TabType>("following");
    const followingCount = MOCK_FOLLOWING_CONNECTIONS.length;
    const followersCount = MOCK_FOLLOWER_CONNECTIONS.length;
    const connections = activeTab === "following" ? MOCK_FOLLOWING_CONNECTIONS : MOCK_FOLLOWER_CONNECTIONS;

    // Sliding tab animation
    const { highlightTransform, transitionClasses, highlightWidth } = useSlidingTabs({
        tabCount: 2,
        activeIndex: activeTab === "following" ? 0 : 1,
        paddingOffset: 4,
        gap: 0,
    });

    const handleTabChange = (tab: TabType) => {
        setActiveTab(tab);
    };

    const handleFollow = (connectionId: string) => {
        void connectionId;
    };

    return {
        activeTab,
        connections,
        followingCount,
        followersCount,
        highlightTransform,
        transitionClasses,
        highlightWidth,
        handleTabChange,
        handleFollow,
    };
};
