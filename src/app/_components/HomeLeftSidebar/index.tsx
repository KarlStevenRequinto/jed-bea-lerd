"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useHomeLeftSidebarViewModel } from "./useViewModel";

const navItems = [
    {
        label: "Home",
        href: "/",
        icon: (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
        ),
    },
    {
        label: "Browse",
        href: "/products",
        icon: (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
        ),
    },
    {
        label: "Marketplace",
        href: "/products",
        icon: (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
        ),
    },
    {
        label: "Saved",
        href: "/profile",
        icon: (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
        ),
    },
];

const HomeLeftSidebar = () => {
    const { user, userInitials, fullName, isActive } = useHomeLeftSidebarViewModel();
    const router = useRouter();

    return (
        <div className="flex flex-col gap-4">
            {/* Profile card */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col items-center text-center">
                {user?.profilePhotoUrl ? (
                    <Image
                        src={user.profilePhotoUrl}
                        alt="Profile"
                        width={64}
                        height={64}
                        className="h-16 w-16 rounded-full object-cover ring-2 ring-[var(--color-brand)] ring-offset-2"
                    />
                ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-brand)] text-lg font-bold text-white ring-2 ring-[var(--color-brand)] ring-offset-2">
                        {userInitials}
                    </div>
                )}

                <p className="mt-3 text-sm font-bold text-gray-800">{fullName}</p>
                <p className="text-xs text-gray-400">Verified Member</p>

                {/* Stats */}
                <div className="mt-4 flex w-full justify-around border-t border-gray-100 pt-4">
                    <div>
                        <p className="text-sm font-bold text-gray-800">0</p>
                        <p className="text-[10px] text-gray-400">Network</p>
                    </div>
                    <div className="border-l border-gray-100" />
                    <div>
                        <p className="text-sm font-bold text-gray-800">0</p>
                        <p className="text-[10px] text-gray-400">Listings</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm py-2">
                {navItems.map(({ label, href, icon }) => (
                    <Link
                        key={label}
                        href={href}
                        className={`flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                            isActive(href)
                                ? "bg-[var(--color-brand)] text-white"
                                : "text-gray-600 hover:bg-gray-50 hover:text-[var(--color-brand)]"
                        }`}
                    >
                        {icon}
                        {label}
                    </Link>
                ))}

                {/* Divider */}
                <div className="my-2 mx-4 border-t border-gray-100" />

                {/* Create Listing CTA */}
                <div className="px-3 pb-1">
                    <button
                        type="button"
                        onClick={() => router.push("/products")}
                        className="w-full cursor-pointer rounded-lg bg-[var(--color-brand)] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-brand-dark)]"
                    >
                        + Create Listing
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomeLeftSidebar;
