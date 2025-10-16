"use client";

import { useAppSelector } from "@/store";
import { Navbar } from "./Navbar";

const NavbarGate = () => {
    const loggedIn = useAppSelector((s) => s.auth.loggedIn);
    if (!loggedIn) return null;
    return <Navbar />;
};

export default NavbarGate;
