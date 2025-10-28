"use client";

import { useState, useMemo } from "react";

export type AuthTab = "login" | "register";

export const useLoginViewModel = () => {
    const [tab, setTab] = useState<AuthTab>("login");
    const [animationKey] = useState(() => Date.now());

    const highlightTransform = useMemo(
        () => (tab === "login" ? "translateX(3px)" : "translateX(calc(100% + 7px))"),
        [tab]
    );

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
        loginPanelClass,
        registerPanelClass,
    } as const;
};

export type UseLoginViewModel = ReturnType<typeof useLoginViewModel>;

