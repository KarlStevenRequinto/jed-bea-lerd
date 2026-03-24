"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useHomeLeftSidebarViewModel } from "./useViewModel";

interface HomeLeftSidebarProps {
    onCreateListing: () => void;
}

const navItems = [
    {
        label: "Real Estate",
        href: "/products?listingType=properties",
        match: "properties",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21h18" />
                <path d="M5 21V7l7-4 7 4v14" />
                <path d="M9 21v-6h6v6" />
            </svg>
        ),
    },
    {
        label: "Vehicles",
        href: "/products?listingType=vehicles",
        match: "vehicles",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 16H9m10 0h2m-3.5-6h.5a2 2 0 0 1 2 2v4h-2" />
                <path d="M2 16h2" />
                <path d="M6 16H4V9a1 1 0 0 1 1-1h10l3 8" />
                <circle cx="7.5" cy="16.5" r="2.5" />
                <circle cx="17.5" cy="16.5" r="2.5" />
            </svg>
        ),
    },
    {
        label: "Messages",
        href: "/messages",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <path d="M8 9h8" />
                <path d="M8 13h5" />
            </svg>
        ),
    },
    {
        label: "Settings",
        href: "/settings",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
        ),
    },
];

const HomeLeftSidebar = ({ onCreateListing }: HomeLeftSidebarProps) => {
    const { user, userInitials, fullName, isActive } = useHomeLeftSidebarViewModel();
    const searchParams = useSearchParams();
    const activeListingType = searchParams.get("listingType");

    return (
        <div className="flex flex-col gap-4">
            {/* Profile card */}
            <div className="flex flex-col items-center rounded-xl border border-[var(--color-green-100)] bg-white p-5 text-center shadow-[0_18px_45px_rgba(39,102,58,0.08)]">
                {user?.profilePhotoUrl ? (
                    <Image
                        src={user.profilePhotoUrl}
                        alt="Profile"
                        width={64}
                        height={64}
                        className="h-16 w-16 rounded-full object-cover ring-2 ring-[var(--color-brand)] ring-offset-2 ring-offset-[var(--color-green-50)]"
                    />
                ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-brand)] text-lg font-bold text-white ring-2 ring-[var(--color-brand)] ring-offset-2 ring-offset-[var(--color-green-50)]">
                        {userInitials}
                    </div>
                )}

                <p className="mt-3 text-sm font-bold text-gray-800">{fullName}</p>
                <p className="text-xs text-[var(--color-green-500)]">Verified Member</p>

                {/* Stats */}
                <div className="mt-4 flex w-full justify-around border-t border-[var(--color-green-100)] pt-4">
                    <div>
                        <p className="text-sm font-bold text-gray-800">0</p>
                        <p className="text-[10px] text-gray-400">Network</p>
                    </div>
                    <div className="border-l border-[var(--color-green-100)]" />
                    <div>
                        <p className="text-sm font-bold text-gray-800">0</p>
                        <p className="text-[10px] text-gray-400">Listings</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="rounded-xl border border-[var(--color-green-100)] bg-white py-2 shadow-[0_18px_45px_rgba(39,102,58,0.08)]">
                {navItems.map(({ label, href, icon, match }) => (
                    <Link
                        key={label}
                        href={href}
                        className={`flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                            (match && isActive("/products") && activeListingType === match) || (!match && isActive(href))
                                ? "bg-[color-mix(in_srgb,var(--color-brand)_92%,black)] text-white shadow-[0_8px_20px_rgba(39,102,58,0.2)]"
                                : "text-gray-600 hover:bg-[var(--color-green-50)] hover:text-[var(--color-brand)]"
                        }`}
                    >
                        {icon}
                        {label}
                    </Link>
                ))}

                {/* Divider */}
                <div className="my-2 mx-4 border-t border-[var(--color-green-100)]" />

                {/* Create Listing CTA */}
                <div className="px-3 pb-1">
                    <button
                        type="button"
                        onClick={onCreateListing}
                        className="w-full cursor-pointer rounded-lg bg-[var(--color-brand)] py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(39,102,58,0.18)] transition-colors hover:bg-[var(--color-brand-dark)]"
                    >
                        + Create Listing
                    </button>
                </div>
            </div>

            <div className="rounded-xl bg-[linear-gradient(160deg,#2d7c45_0%,#4ca968_48%,#a6d9b0_120%)] p-5 text-white shadow-[0_22px_55px_rgba(39,102,58,0.2)]">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-white/70">Sponsored</p>
                <div className="mb-2 text-3xl">📢</div>
                <p className="mb-1 text-base font-bold leading-tight">Pioneer Insurance</p>
                <p className="text-xs leading-relaxed text-white/85">
                    Secure your home and vehicle. Pioneer Insurance keeps your biggest investments protected.
                </p>
                <button
                    type="button"
                    className="mt-4 w-full cursor-pointer rounded-lg bg-white/95 py-1.5 text-xs font-semibold text-[var(--color-brand-dark)] transition-colors hover:bg-white"
                >
                    Learn More
                </button>
            </div>
        </div>
    );
};

export default HomeLeftSidebar;
