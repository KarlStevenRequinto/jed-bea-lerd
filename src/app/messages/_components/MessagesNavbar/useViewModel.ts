"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store";
import { logoutUser } from "@/lib/auth/actions";

type MessagesTab = "messages" | "contacts" | "archive";

export const useMessagesNavbarViewModel = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const user = useAppSelector((s) => s.auth.user);

    const [activeTab, setActiveTab] = useState<MessagesTab>("messages");
    const [searchQuery, setSearchQuery] = useState("");
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);

    const userInitials =
        user?.firstName && user?.lastName
            ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
            : (user?.email?.[0]?.toUpperCase() ?? "U");

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
                setIsUserMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleNavigate = (path: string) => {
        setIsUserMenuOpen(false);
        router.push(path);
    };

    const handleLogout = async () => {
        setIsUserMenuOpen(false);
        const result = await logoutUser(dispatch);
        if (result.success) router.push("/login");
    };

    return {
        user,
        userInitials,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        isUserMenuOpen,
        setIsUserMenuOpen,
        userMenuRef,
        handleNavigate,
        handleLogout,
    };
};
