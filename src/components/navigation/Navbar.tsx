"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store";
import { logoutUser } from "@/lib/auth/actions";

const navItemsBase = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/product-details", label: "Product Details" },
    { href: "/profile", label: "Profile" },
];

export const Navbar = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const loggedIn = useAppSelector((s) => s.auth.loggedIn);

    const navItems = loggedIn ? [...navItemsBase, { href: "/logout", label: "Logout" }] : [...navItemsBase, { href: "/login", label: "Login" }];

    const handleLogout = async () => {
        const result = await logoutUser(dispatch);
        if (result.success) {
            router.push("/login");
        } else {
            alert("Logout failed. Please try again.");
        }
    };

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
