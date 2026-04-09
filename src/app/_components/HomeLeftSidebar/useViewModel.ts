import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/store";

export const useHomeLeftSidebarViewModel = () => {
    const user = useAppSelector((s) => s.auth.user);
    const loggedIn = useAppSelector((s) => s.auth.loggedIn);
    const pathname = usePathname();

    const [listingsCount, setListingsCount] = useState(0);
    const [networkCount, setNetworkCount] = useState(0);

    useEffect(() => {
        if (!loggedIn) return;

        fetch("/api/profile/me/stats")
            .then((res) => res.ok ? res.json() : null)
            .then((data) => {
                if (!data) return;
                setListingsCount(data.listingsCount ?? 0);
                setNetworkCount(data.networkCount ?? 0);
            })
            .catch(() => {/* silently ignore — counts stay at 0 */});
    }, [loggedIn]);

    const userInitials =
        user?.firstName && user?.lastName
            ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
            : (user?.email?.[0]?.toUpperCase() ?? "U");

    const fullName =
        user?.firstName && user?.lastName
            ? `${user.firstName} ${user.lastName}`
            : (user?.email ?? "User");

    const isActive = (href: string) => pathname === href;

    return { user, userInitials, fullName, isActive, listingsCount, networkCount };
};
