"use client";

import Image from "next/image";
import Link from "next/link";
import { homeNDrive } from "@/assets/images";
import { useMessagesNavbarViewModel } from "./useViewModel";

const TABS = [
    { label: "Messages", value: "messages" as const },
    { label: "Contacts", value: "contacts" as const },
    { label: "Archive", value: "archive" as const },
];

const MessagesNavbar = () => {
    const {
        user,
        userInitials,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        isUserMenuOpen,
        setIsUserMenuOpen,
        userMenuRef,
        handleNavigate,
        handleLogout,
    } = useMessagesNavbarViewModel();

    return (
        <header className="flex shrink-0 items-center gap-4 border-b border-[var(--color-green-100)] bg-white px-6 shadow-[0_2px_12px_rgba(39,102,58,0.06)]">
            {/* Logo */}
            <Link href="/" className="flex shrink-0 items-center gap-2 py-3.5">
                <Image src={homeNDrive} alt="HomeNDrive logo" width={34} height={34} />
                <span className="text-sm font-bold text-[var(--color-brand)]">HomeNDrive</span>
            </Link>

            {/* Tabs */}
            <nav className="flex h-full items-stretch gap-0.5">
                {TABS.map((tab) => (
                    <button
                        key={tab.value}
                        type="button"
                        onClick={() => setActiveTab(tab.value)}
                        className={`relative flex cursor-pointer items-center px-4 py-4 text-sm font-medium transition-colors ${
                            activeTab === tab.value
                                ? "text-[var(--color-brand)] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:rounded-t-sm after:bg-[var(--color-brand)] after:content-['']"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </nav>

            {/* Search bar */}
            <div className="flex max-w-sm flex-1 items-center rounded-full border border-[var(--color-green-100)] bg-[var(--color-green-50)] px-4 py-2 focus-within:border-[var(--color-brand)] focus-within:ring-1 focus-within:ring-[var(--color-brand)]">
                <svg className="mr-2 shrink-0 text-gray-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                    type="text"
                    placeholder="Search general platform..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                />
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Right actions */}
            <div className="flex shrink-0 items-center gap-2">
                {/* New Chat */}
                <button
                    type="button"
                    className="flex cursor-pointer items-center gap-2 rounded-full bg-[var(--color-brand)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-brand-dark)]"
                >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    New Chat
                </button>

                {/* Bell */}
                <button type="button" className="relative cursor-pointer rounded-lg p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700" aria-label="Notifications">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[var(--color-brand)]" />
                </button>

                {/* Settings */}
                <button
                    type="button"
                    onClick={() => handleNavigate("/settings")}
                    className="cursor-pointer rounded-lg p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    aria-label="Settings"
                >
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                </button>

                {/* Avatar + dropdown */}
                <div ref={userMenuRef} className="relative">
                    <button
                        type="button"
                        onClick={() => setIsUserMenuOpen((prev) => !prev)}
                        className="cursor-pointer focus:outline-none"
                        aria-label="User menu"
                    >
                        {user?.profilePhotoUrl ? (
                            <Image
                                src={user.profilePhotoUrl}
                                alt="Profile"
                                width={34}
                                height={34}
                                className="h-[34px] w-[34px] rounded-full object-cover ring-2 ring-[var(--color-brand)]"
                            />
                        ) : (
                            <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[var(--color-brand)] text-xs font-semibold text-white ring-2 ring-[var(--color-brand-dark)]">
                                {userInitials}
                            </div>
                        )}
                    </button>

                    {isUserMenuOpen && (
                        <div className="absolute right-0 top-12 z-50 w-48 rounded-xl border border-gray-100 bg-white py-2 shadow-lg">
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
                            <button
                                type="button"
                                onClick={() => handleNavigate("/profile")}
                                className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                                My Profile
                            </button>
                            <div className="my-1 border-t border-gray-100" />
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        </header>
    );
};

export default MessagesNavbar;
