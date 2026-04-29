"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Conversation, ChatMessage } from "../MessagesContent/useViewModel";

interface ChatPanelProps {
    conversation: Conversation | null;
    messages: ChatMessage[];
    inputValue: string;
    onInputChange: (v: string) => void;
    onSend: () => void;
}

const ChatPanel = ({
    conversation,
    messages,
    inputValue,
    onInputChange,
    onSend,
}: ChatPanelProps) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSend();
        }
    };

    if (!conversation) {
        return (
            <div className="flex flex-1 items-center justify-center bg-[var(--color-green-50)]">
                <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-brand)]/10">
                        <svg
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-[var(--color-brand)]"
                        >
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                    </div>
                    <p className="text-sm font-semibold text-gray-600">Select a conversation</p>
                    <p className="mt-1 text-xs text-gray-400">Choose from your inbox to start chatting</p>
                </div>
            </div>
        );
    }

    const todayLabel = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="flex flex-1 flex-col bg-white">
            {/* Chat header */}
            <div className="flex shrink-0 items-center border-b border-[var(--color-green-100)] px-5 py-3.5">
                <div className="relative mr-3 shrink-0">
                    {conversation.user.avatarUrl ? (
                        <Image
                            src={conversation.user.avatarUrl}
                            alt={conversation.user.name}
                            width={38}
                            height={38}
                            className="h-[38px] w-[38px] rounded-full object-cover"
                        />
                    ) : (
                        <div
                            className="flex h-[38px] w-[38px] items-center justify-center rounded-full text-sm font-bold text-white"
                            style={{ backgroundColor: conversation.user.avatarColor }}
                        >
                            {conversation.user.initials}
                        </div>
                    )}
                    {conversation.user.isOnline && (
                        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-400" />
                    )}
                </div>
                <div>
                    <p className="text-sm font-bold text-gray-800">{conversation.user.name}</p>
                    <p className="text-xs text-green-500">
                        {conversation.user.isOnline ? "Online now" : "Offline"}
                    </p>
                </div>
                <div className="ml-auto flex items-center gap-1">
                    <button
                        type="button"
                        className="cursor-pointer rounded-lg p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        aria-label="Voice call"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        className="cursor-pointer rounded-lg p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        aria-label="Video call"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="23 7 16 12 23 17 23 7" />
                            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        className="cursor-pointer rounded-lg p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        aria-label="Info"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="16" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Messages thread */}
            <div className="flex-1 space-y-4 overflow-y-auto p-5">
                {/* Date separator */}
                <div className="flex items-center gap-3">
                    <div className="flex-1 border-t border-gray-200" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                        {todayLabel}
                    </span>
                    <div className="flex-1 border-t border-gray-200" />
                </div>

                {messages.map((msg) => {
                    const isMe = msg.senderId === "me";
                    return (
                        <div
                            key={msg.id}
                            className={`flex items-end gap-2.5 ${isMe ? "flex-row-reverse" : ""}`}
                        >
                            {/* Sender avatar (only for received messages) */}
                            {!isMe && (
                                <div
                                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                                    style={{ backgroundColor: conversation.user.avatarColor }}
                                >
                                    {conversation.user.initials}
                                </div>
                            )}

                            <div
                                className={`flex max-w-[65%] flex-col gap-1 ${isMe ? "items-end" : "items-start"}`}
                            >
                                <div
                                    className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                                        isMe
                                            ? "rounded-br-md bg-[var(--color-brand)] text-white"
                                            : "rounded-bl-md bg-gray-100 text-gray-800"
                                    }`}
                                >
                                    <p>{msg.content}</p>
                                    {msg.imageUrl && (
                                        <Image
                                            src={msg.imageUrl}
                                            alt="Shared image"
                                            width={280}
                                            height={180}
                                            className="mt-2 w-full rounded-lg object-cover"
                                        />
                                    )}
                                </div>
                                <span className="px-1 text-[10px] text-gray-500">{msg.time}</span>
                            </div>
                        </div>
                    );
                })}

                <div ref={messagesEndRef} />
            </div>

            {/* Input bar */}
            <div className="shrink-0 border-t border-[var(--color-green-100)] p-3">
                <div className="flex items-center gap-2 rounded-xl border border-[var(--color-green-100)] bg-[var(--color-green-50)] px-3 py-2">
                    {/* Attachment icons */}
                    <div className="flex items-center gap-0.5">
                        <button type="button" className="cursor-pointer rounded p-1.5 text-gray-400 hover:text-gray-600" aria-label="Attach image">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <polyline points="21 15 16 10 5 21" />
                            </svg>
                        </button>
                        <button type="button" className="cursor-pointer rounded p-1.5 text-gray-400 hover:text-gray-600" aria-label="Attach video">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="23 7 16 12 23 17 23 7" />
                                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                            </svg>
                        </button>
                        <button type="button" className="cursor-pointer rounded p-1.5 text-gray-400 hover:text-gray-600" aria-label="Attach file">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                            </svg>
                        </button>
                    </div>

                    <div className="mx-1 h-4 w-px bg-gray-200" />

                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={inputValue}
                        onChange={(e) => onInputChange(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                    />

                    {/* Emoji */}
                    <button type="button" className="cursor-pointer rounded p-1.5 text-gray-400 hover:text-gray-600" aria-label="Emoji">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                            <line x1="9" y1="9" x2="9.01" y2="9" />
                            <line x1="15" y1="9" x2="15.01" y2="9" />
                        </svg>
                    </button>

                    {/* Send */}
                    <button
                        type="button"
                        onClick={onSend}
                        disabled={!inputValue.trim()}
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[var(--color-brand)] text-white transition-colors hover:bg-[var(--color-brand-dark)] disabled:cursor-not-allowed disabled:opacity-40"
                        aria-label="Send message"
                    >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatPanel;
