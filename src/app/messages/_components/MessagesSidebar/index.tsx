"use client";

import Image from "next/image";
import Link from "next/link";
import { useMessagesSidebarViewModel } from "./useViewModel";

const MessagesSidebar = () => {
    const { user, userInitials, handleLogout } = useMessagesSidebarViewModel();

    return (
        <aside className="flex w-44 shrink-0 flex-col border-r border-[var(--color-green-100)] bg-white">
            {/* User avatar */}
            <div className="flex flex-col items-center border-b border-[var(--color-green-100)] px-4 py-5">
                <Link href="/profile" className="cursor-pointer">
                    {user?.profilePhotoUrl ? (
                        <Image
                            src={user.profilePhotoUrl}
                            alt="Profile"
                            width={44}
                            height={44}
                            className="h-11 w-11 rounded-full object-cover ring-2 ring-[var(--color-brand)]"
                        />
                    ) : (
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-brand)] text-sm font-bold text-white ring-2 ring-[var(--color-brand-dark)]">
                            {userInitials}
                        </div>
                    )}
                </Link>
                <p className="mt-2 text-center text-[10px] font-semibold uppercase tracking-widest text-gray-600">
                    {user?.firstName ?? "My Account"}
                </p>
            </div>

            {/* Navigation */}
            <nav className="flex flex-1 flex-col gap-1 p-3">
                <Link
                    href="/messages"
                    className="flex items-center gap-3 rounded-lg bg-[var(--color-green-50)] px-3 py-2.5 text-sm font-semibold text-[var(--color-brand)]"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    Direct Messages
                </Link>
                <button
                    type="button"
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-500 transition-colors hover:bg-[var(--color-green-50)] hover:text-[var(--color-brand)]"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    Group Chats
                </button>
            </nav>

            {/* Bottom: Help + Logout */}
            <div className="flex flex-col gap-1 border-t border-[var(--color-green-100)] p-3">
                <button
                    type="button"
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                    Help
                </button>
                <button
                    type="button"
                    onClick={handleLogout}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50"
                >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default MessagesSidebar;
