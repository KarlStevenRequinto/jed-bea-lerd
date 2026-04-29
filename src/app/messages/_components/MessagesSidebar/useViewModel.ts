"use client";

import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store";
import { logoutUser } from "@/lib/auth/actions";

export const useMessagesSidebarViewModel = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const user = useAppSelector((s) => s.auth.user);

    const userInitials =
        user?.firstName && user?.lastName
            ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
            : (user?.email?.[0]?.toUpperCase() ?? "U");

    const handleLogout = async () => {
        const result = await logoutUser(dispatch);
        if (result.success) router.push("/login");
    };

    return { user, userInitials, handleLogout };
};
