import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store";
import { logoutUser } from "@/lib/auth/actions";

export const useNavbarViewModel = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const loggedIn = useAppSelector((s) => s.auth.loggedIn);
    const user = useAppSelector((s) => s.auth.user);

    const [searchQuery, setSearchQuery] = useState("");
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);

    // Placeholder until a real notification system exists
    const notificationCount = 3;

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

    const toggleUserMenu = () => setIsUserMenuOpen((prev) => !prev);

    const handleNavigate = (path: string) => {
        setIsUserMenuOpen(false);
        router.push(path);
    };

    const handleLogout = async () => {
        setIsUserMenuOpen(false);
        const result = await logoutUser(dispatch);
        if (result.success) {
            router.push("/login");
        }
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return {
        loggedIn,
        user,
        userInitials,
        searchQuery,
        setSearchQuery,
        notificationCount,
        isUserMenuOpen,
        userMenuRef,
        toggleUserMenu,
        handleNavigate,
        handleLogout,
        handleSearchSubmit,
    };
};
