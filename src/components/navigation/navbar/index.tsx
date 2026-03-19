"use client";

import Image from "next/image";
import Link from "next/link";
import { homeNDrive, userDefault } from "@/assets/images";
import { useNavbarViewModel } from "./useViewModel";

export const Navbar = () => {
    const {
        loggedIn,
        user,
        userInitials,
        searchQuery,
        setSearchQuery,
        notificationCount,
        handleLogout,
        handleSearchSubmit,
    } = useNavbarViewModel();

    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
            <nav className="container mx-auto flex items-center gap-6 px-6 py-3">
                {/* Logo + Brand */}
                <Link href="/" className="flex shrink-0 items-center gap-2">
                    <Image src={homeNDrive} alt="HomeNDrive logo" width={40} height={40} />
                    <span className="text-base font-bold text-[var(--color-brand)]">HomeNDrive</span>
                </Link>

                {loggedIn ? (
                    <>
                        {/* Search bar — expands to fill available space */}
                        <form
                            onSubmit={handleSearchSubmit}
                            className="flex flex-1 items-center rounded-md border border-gray-300 bg-white px-3 py-2 focus-within:border-[var(--color-brand)] focus-within:ring-1 focus-within:ring-[var(--color-brand)] max-w-xl"
                        >
                            <svg
                                className="mr-2 shrink-0 text-gray-400"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search listings..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                            />
                        </form>

                        {/* Push bell + avatar to far right */}
                        <div className="flex-1" />

                        {/* Right: Bell + Avatar */}
                        <div className="flex shrink-0 items-center gap-4">
                            {/* Notification bell */}
                            <button type="button" className="relative p-1" aria-label="Notifications">
                                <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-gray-600"
                                >
                                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                                </svg>
                                {notificationCount > 0 && (
                                    <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--color-brand)] px-0.5 text-[10px] font-semibold leading-none text-white">
                                        {notificationCount}
                                    </span>
                                )}
                            </button>

                            {/* Avatar */}
                            <Link href="/profile" className="shrink-0">
                                {user?.profilePhotoUrl ? (
                                    <Image
                                        src={user.profilePhotoUrl}
                                        alt="Profile"
                                        width={36}
                                        height={36}
                                        className="h-9 w-9 rounded-full object-cover ring-2 ring-[var(--color-brand)]"
                                    />
                                ) : (
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-brand)] text-sm font-semibold text-white ring-2 ring-[var(--color-brand-dark)]">
                                        {userInitials}
                                    </div>
                                )}
                            </Link>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Spacer */}
                        <div className="flex-1" />

                        {/* Sign In + Sign Up */}
                        <div className="flex shrink-0 items-center gap-3">
                            <Link
                                href="/login"
                                className="text-sm font-medium text-gray-700 transition-colors hover:text-[var(--color-brand)]"
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/login?tab=register"
                                className="rounded-md bg-[var(--color-brand)] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-brand-dark)]"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </>
                )}
            </nav>
        </header>
    );
};
