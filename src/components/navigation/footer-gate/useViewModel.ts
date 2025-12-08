import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const useFooterGateViewModel = () => {
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
    }, []);

    // Hide footer on auth pages
    const isAuthPage = pathname === "/login" || pathname === "/register";

    return {
        mounted,
        isAuthPage,
    };
};
