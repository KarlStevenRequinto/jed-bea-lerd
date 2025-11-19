"use client";

import { Navbar } from "./Navbar";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const NavbarGate = () => {
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
    }, []);

    // Hide navbar on auth pages
    const isAuthPage = pathname === "/login" || pathname === "/register";

    if (!mounted) return null;
    if (isAuthPage) return null;
    return <Navbar />;
};

export default NavbarGate;
