"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSlidingTabs } from "@/hooks/useSlidingTabs";

export type AuthTab = "login" | "register";

export const useLoginViewModel = () => {
    const searchParams = useSearchParams();
    const queryTab = searchParams.get("tab");
    const initialTab: AuthTab = queryTab === "register" ? "register" : "login";

    const [tab, setTab] = useState<AuthTab>(initialTab);
    const [animationKey] = useState(() => Date.now());

    useEffect(() => {
        setTab(initialTab);
    }, [initialTab]);

    const { highlightTransform, highlightWidth } = useSlidingTabs({
        tabCount: 2,
        activeIndex: tab === "login" ? 0 : 1,
        paddingOffset: 3,
        gap: 4,
    });

    const loginPanelClass = useMemo(
        () =>
            tab === "login"
                ? "transition-all duration-300 ease-out opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 pointer-events-none",
        [tab]
    );

    const registerPanelClass = useMemo(
        () =>
            tab === "register"
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2 pointer-events-none",
        [tab]
    );

    return {
        tab,
        setTab,
        animationKey,
        highlightTransform,
        highlightWidth,
        loginPanelClass,
        registerPanelClass,
    } as const;
};

export type UseLoginViewModel = ReturnType<typeof useLoginViewModel>;
