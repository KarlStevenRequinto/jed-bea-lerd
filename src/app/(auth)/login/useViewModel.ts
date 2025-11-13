"use client";

import { useState, useMemo } from "react";

export type AuthTab = "login" | "register";
export type AuthMode = "login" | "forgot-password";

export const useLoginViewModel = () => {
    const [tab, setTab] = useState<AuthTab>("login");
    const [mode, setMode] = useState<AuthMode>("login");
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

    const handleShowForgotPassword = () => {
        setMode("forgot-password");
    };

    const handleBackToLogin = () => {
        setMode("login");
    };

    return {
        tab,
        setTab,
        mode,
        animationKey,
        highlightTransform,
        loginPanelClass,
        registerPanelClass,
        handleShowForgotPassword,
        handleBackToLogin,
    } as const;
};

export type UseLoginViewModel = ReturnType<typeof useLoginViewModel>;

