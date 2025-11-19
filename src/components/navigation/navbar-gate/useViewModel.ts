import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const useNavbarGateViewModel = () => {
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
    }, []);

    // Hide navbar on auth pages
    const isAuthPage = pathname === "/login" || pathname === "/register";

    return {
        mounted,
        isAuthPage,
    };
};
