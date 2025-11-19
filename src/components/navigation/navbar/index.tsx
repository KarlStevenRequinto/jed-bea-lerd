"use client";

import Link from "next/link";
import { useNavbarViewModel } from "./useViewModel";

export const Navbar = () => {
    const { navItems, handleLogout } = useNavbarViewModel();

    return (
        <header className="border-b border-border bg-primary-foreground">
            <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
                <span className="text-lg font-semibold uppercase tracking-wide text-foreground">navbar</span>
                <ul className="flex items-center gap-4 text-sm font-medium text-foreground">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            {item.label === "Logout" ? (
                                <button type="button" onClick={handleLogout} className="transition-colors hover:text-primary">
                                    {item.label}
                                </button>
                            ) : (
                                <Link className="transition-colors hover:text-primary" href={item.href}>
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};
