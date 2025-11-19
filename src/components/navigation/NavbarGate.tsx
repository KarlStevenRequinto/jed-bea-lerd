"use client";

import { Navbar } from "./Navbar";
import { useEffect, useState } from "react";

const NavbarGate = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    return <Navbar />;
};

export default NavbarGate;
