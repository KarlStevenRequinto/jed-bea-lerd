"use client";

import Image from "next/image";
import type { Conversation } from "../MessagesContent/useViewModel";

interface InboxPanelProps {
    conversations: Conversation[];
    selectedId: string | null;
    search: string;
    newCount: number;
    onSearch: (v: string) => void;
    onSelect: (id: string) => void;
}

const InboxPanel = ({
    conversations,
    selectedId,
    search,
    newCount,
    onSearch,
    onSelect,
}: InboxPanelProps) => {
    return (
        <div className="flex w-80 shrink-0 flex-col border-r border-[var(--color-green-100)] bg-white">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[var(--color-green-100)] px-4 py-3.5">
                <h2 className="text-base font-bold text-gray-800">Inbox</h2>
                {newCount > 0 && (
                    <span className="rounded-full bg-[var(--color-brand)] px-2.5 py-0.5 text-[10px] font-bold text-white">
                        {newCount} NEW
                    </span>
                )}
            </div>

            {/* Search */}
            <div className="border-b border-[var(--color-green-100)] p-3">
                <div className="flex items-center gap-2 rounded-lg bg-[var(--color-green-50)] px-3 py-2">
                    <svg className="shrink-0 text-gray-400" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        value={search}
                        onChange={(e) => onSearch(e.target.value)}
                        className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                    />
                </div>
            </div>

            {/* Conversation list */}
            <div className="flex-1 overflow-y-auto">
                {conversations.length === 0 ? (
                    <p className="p-6 text-center text-sm text-gray-400">No conversations found.</p>
                ) : (
                    conversations.map((conv) => (
                        <button
                            key={conv.id}
                            type="button"
                            onClick={() => onSelect(conv.id)}
                            className={`flex w-full cursor-pointer items-start gap-3 border-b border-[var(--color-green-50)] px-4 py-3.5 text-left transition-colors last:border-b-0 ${
                                selectedId === conv.id
                                    ? "bg-[var(--color-green-50)]"
                                    : "hover:bg-gray-50"
                            }`}
                        >
                            {/* Avatar with online indicator */}
                            <div className="relative shrink-0">
                                {conv.user.avatarUrl ? (
                                    <Image
                                        src={conv.user.avatarUrl}
                                        alt={conv.user.name}
                                        width={42}
                                        height={42}
                                        className="h-[42px] w-[42px] rounded-full object-cover"
                                    />
                                ) : (
                                    <div
                                        className="flex h-[42px] w-[42px] items-center justify-center rounded-full text-sm font-bold text-white"
                                        style={{ backgroundColor: conv.user.avatarColor }}
                                    >
                                        {conv.user.initials}
                                    </div>
                                )}
                                {conv.user.isOnline && (
                                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-400" />
                                )}
                            </div>

                            {/* Content */}
                            <div className="min-w-0 flex-1">
                                <div className="flex items-baseline justify-between gap-2">
                                    <p className="truncate text-sm font-semibold text-gray-800">
                                        {conv.user.name}
                                    </p>
                                    <span className="shrink-0 text-[10px] text-gray-500">{conv.time}</span>
                                </div>
                                <p className="mt-0.5 truncate text-xs text-gray-500">{conv.lastMessage}</p>
                                {conv.tag && (
                                    <span className="mt-1.5 inline-block rounded-full bg-[var(--color-green-50)] px-2 py-0.5 text-[10px] font-semibold text-[var(--color-brand)]">
                                        {conv.tag}
                                    </span>
                                )}
                            </div>

                            {/* Unread badge */}
                            {conv.unreadCount > 0 && (
                                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)] text-[10px] font-bold text-white">
                                    {conv.unreadCount}
                                </span>
                            )}
                        </button>
                    ))
                )}
            </div>
        </div>
    );
};

export default InboxPanel;
