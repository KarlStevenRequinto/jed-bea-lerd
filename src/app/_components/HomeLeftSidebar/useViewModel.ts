import { usePathname } from "next/navigation";
import { useAppSelector } from "@/store";

export const useHomeLeftSidebarViewModel = () => {
    const user = useAppSelector((s) => s.auth.user);
    const pathname = usePathname();

    const userInitials =
        user?.firstName && user?.lastName
            ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
            : (user?.email?.[0]?.toUpperCase() ?? "U");

    const fullName =
        user?.firstName && user?.lastName
            ? `${user.firstName} ${user.lastName}`
            : (user?.email ?? "User");

    const isActive = (href: string) => pathname === href;

    return { user, userInitials, fullName, isActive };
};
