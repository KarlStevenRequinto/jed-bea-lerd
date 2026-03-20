import { useState } from "react";
import { useSlidingTabs } from "@/hooks/useSlidingTabs";
import { ProfileConnection } from "@/lib/types/profile";

export type { ProfileConnection as Connection };
export type TabType = "following" | "followers";

export const useConnectionsViewModel = (
    following: ProfileConnection[],
    followers: ProfileConnection[]
) => {
    const [activeTab, setActiveTab] = useState<TabType>("following");

    const followingCount = following.length;
    const followersCount = followers.length;
    const connections = activeTab === "following" ? following : followers;

    const { highlightTransform, transitionClasses, highlightWidth } = useSlidingTabs({
        tabCount: 2,
        activeIndex: activeTab === "following" ? 0 : 1,
        paddingOffset: 4,
        gap: 0,
    });

    const handleTabChange = (tab: TabType) => setActiveTab(tab);

    const handleFollow = (_connectionId: string) => {
        // TODO: Implement follow/unfollow
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
