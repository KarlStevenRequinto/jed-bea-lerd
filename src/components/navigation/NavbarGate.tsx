"use client";

import { useAppSelector } from "@/store";
import { Navbar } from "./Navbar";

export default function NavbarGate() {
    const loggedIn = useAppSelector((s) => s.auth.loggedIn);
    if (!loggedIn) return null;
    return <Navbar />;
}

