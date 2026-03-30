import { useState, useRef, useCallback, useEffect } from "react";
import { useAppSelector } from "@/store";

export interface HoverCardData {
    id: string;
    name: string;
    initials: string;
    photoUrl: string | null;
    bio: string | null;
    verified: boolean;
    location: string | null;
    followersCount: number;
    isFollowing: boolean;
    isOwnProfile: boolean;
}

export const useUserHoverCardViewModel = (userId: string | undefined) => {
    const loggedIn = useAppSelector((s) => s.auth.loggedIn);

    const [isVisible, setIsVisible] = useState(false);
    const [cardData, setCardData] = useState<HoverCardData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFollowLoading, setIsFollowLoading] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [avatarError, setAvatarError] = useState(false);

    const triggerRef = useRef<HTMLDivElement>(null);
    const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const hasFetchedRef = useRef(false);

    const clearShowTimer = () => {
        if (showTimerRef.current) {
            clearTimeout(showTimerRef.current);
            showTimerRef.current = null;
        }
    };

    const clearHideTimer = () => {
        if (hideTimerRef.current) {
            clearTimeout(hideTimerRef.current);
            hideTimerRef.current = null;
        }
    };

    const fetchCardData = useCallback(async () => {
        if (!userId || hasFetchedRef.current) return;
        hasFetchedRef.current = true;
        setIsLoading(true);
        try {
            const response = await fetch(`/api/profile/${userId}/card`);
            if (response.ok) {
                const data = await response.json();
                setCardData(data as HoverCardData);
            }
        } catch {
            // silently fail — card just won't show data
        } finally {
            setIsLoading(false);
        }
    }, [userId]);

    const show = useCallback(() => {
        if (!userId) return;
        const rect = triggerRef.current?.getBoundingClientRect();
        if (rect) {
            const cardWidth = 288;
            const margin = 8;
            const left = Math.min(rect.left, window.innerWidth - cardWidth - margin);
            setPosition({ top: rect.bottom + margin, left: Math.max(margin, left) });
        }
        fetchCardData();
        setIsVisible(true);
    }, [userId, fetchCardData]);

    const handleTriggerMouseEnter = useCallback(() => {
        clearHideTimer();
        showTimerRef.current = setTimeout(show, 400);
    }, [show]);

    const handleTriggerMouseLeave = useCallback(() => {
        clearShowTimer();
        hideTimerRef.current = setTimeout(() => setIsVisible(false), 200);
    }, []);

    const handleCardMouseEnter = useCallback(() => {
        clearHideTimer();
    }, []);

    const handleCardMouseLeave = useCallback(() => {
        hideTimerRef.current = setTimeout(() => setIsVisible(false), 200);
    }, []);

    // Close card when user scrolls or resizes (position would be stale)
    useEffect(() => {
        if (!isVisible) return;
        const close = () => setIsVisible(false);
        window.addEventListener("scroll", close, true);
        window.addEventListener("resize", close);
        return () => {
            window.removeEventListener("scroll", close, true);
            window.removeEventListener("resize", close);
        };
    }, [isVisible]);

    // Cleanup timers on unmount
    useEffect(() => {
        return () => {
            clearShowTimer();
            clearHideTimer();
        };
    }, []);

    const handleFollowToggle = async () => {
        if (!cardData || isFollowLoading) return;
        setIsFollowLoading(true);
        try {
            const method = cardData.isFollowing ? "DELETE" : "POST";
            const response = await fetch(`/api/profile/${cardData.id}/follow`, { method });
            if (response.ok) {
                setCardData((prev) =>
                    prev
                        ? {
                              ...prev,
                              isFollowing: !prev.isFollowing,
                              followersCount: prev.isFollowing
                                  ? prev.followersCount - 1
                                  : prev.followersCount + 1,
                          }
                        : prev
                );
            }
        } catch {
            // silently fail
        } finally {
            setIsFollowLoading(false);
        }
    };

    return {
        triggerRef,
        isVisible,
        cardData,
        isLoading,
        isFollowLoading,
        position,
        avatarError,
        setAvatarError,
        loggedIn,
        handleTriggerMouseEnter,
        handleTriggerMouseLeave,
        handleCardMouseEnter,
        handleCardMouseLeave,
        handleFollowToggle,
    };
};
