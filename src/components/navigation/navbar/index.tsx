"use client";

import Image from "next/image";
import Link from "next/link";
import { homeNDrive } from "@/assets/images";
import { useNavbarViewModel } from "./useViewModel";

export const Navbar = () => {
    const {
        loggedIn,
        user,
        userInitials,
        searchQuery,
        setSearchQuery,
        notificationCount,
        isUserMenuOpen,
        userMenuRef,
        toggleUserMenu,
        handleNavigate,
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

                            {/* Avatar + dropdown */}
                            <div ref={userMenuRef} className="relative shrink-0">
                                <button
                                    type="button"
                                    onClick={toggleUserMenu}
                                    aria-label="User menu"
                                    className="cursor-pointer focus:outline-none"
                                >
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
                                </button>

                                {isUserMenuOpen && (
                                    <div className="absolute right-0 top-12 z-50 w-52 rounded-xl border border-gray-100 bg-white py-2 shadow-lg">
                                        {/* User info header */}
                                        <div className="border-b border-gray-100 px-4 py-3">
                                            <p className="truncate text-sm font-semibold text-gray-800">
                                                {user?.firstName && user?.lastName
                                                    ? `${user.firstName} ${user.lastName}`
                                                    : user?.email}
                                            </p>
                                            {user?.email && (
                                                <p className="truncate text-xs text-gray-500">{user.email}</p>
                                            )}
                                        </div>

                                        {/* Menu items */}
                                        <button
                                            type="button"
                                            onClick={() => handleNavigate("/profile")}
                                            className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-gray-500">
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                <circle cx="12" cy="7" r="4" />
                                            </svg>
                                            My Profile
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleNavigate("/settings")}
                                            className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-gray-500">
                                                <circle cx="12" cy="12" r="3" />
                                                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                                            </svg>
                                            Settings
                                        </button>

                                        <div className="my-1 border-t border-gray-100" />

                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-sm text-red-600 transition-colors hover:bg-red-50"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                                <polyline points="16 17 21 12 16 7" />
                                                <line x1="21" y1="12" x2="9" y2="12" />
                                            </svg>
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
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
