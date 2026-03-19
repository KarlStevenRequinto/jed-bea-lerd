import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store";
import { logoutUser } from "@/lib/auth/actions";

export const useNavbarViewModel = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const loggedIn = useAppSelector((s) => s.auth.loggedIn);
    const user = useAppSelector((s) => s.auth.user);

    const [searchQuery, setSearchQuery] = useState("");

    // Placeholder until a real notification system exists
    const notificationCount = 3;

    const userInitials =
        user?.firstName && user?.lastName
            ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
            : (user?.email?.[0]?.toUpperCase() ?? "U");

    const handleLogout = async () => {
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
        handleLogout,
        handleSearchSubmit,
    };
};
