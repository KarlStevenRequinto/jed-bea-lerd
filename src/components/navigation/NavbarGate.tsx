"use client";

import { useAppSelector } from "@/store";
import { Navbar } from "./Navbar";
import { useEffect, useState } from "react";

const NavbarGate = () => {
    const loggedIn = useAppSelector((s) => s.auth.loggedIn);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    if (!loggedIn) return null;
    return <Navbar />;
};

export default NavbarGate;
