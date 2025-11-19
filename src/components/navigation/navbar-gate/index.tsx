"use client";

import { Navbar } from "../navbar";
import { useNavbarGateViewModel } from "./useViewModel";

const NavbarGate = () => {
    const { mounted, isAuthPage } = useNavbarGateViewModel();

    if (!mounted) return null;
    if (isAuthPage) return null;
    return <Navbar />;
};

export default NavbarGate;
