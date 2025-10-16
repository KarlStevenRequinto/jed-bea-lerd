"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store";
import { logout } from "@/store/authSlice";

const navItemsBase = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/product-details", label: "Product Details" },
    { href: "/profile", label: "Profile" },
];

export function Navbar() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const loggedIn = useAppSelector((s) => s.auth.loggedIn);

    const navItems = loggedIn
        ? [...navItemsBase, { href: "#logout", label: "Logout" }]
        : [...navItemsBase, { href: "/login", label: "Login" }];

    const handleClick = (href: string) => (e: React.MouseEvent) => {
        if (href === "#logout") {
            e.preventDefault();
            dispatch(logout());
            router.push("/login");
        }
    };
    return (
        <header className="border-b border-neutral-200 bg-white">
            <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
                <span className="text-lg font-semibold uppercase tracking-wide text-gray-800">navbar</span>
                <ul className="flex items-center gap-4 text-sm font-medium text-neutral-700">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link className="transition-colors hover:text-neutral-950" href={item.href} onClick={handleClick(item.href)}>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
