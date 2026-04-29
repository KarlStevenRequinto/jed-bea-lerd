"use client";

import { useState, useMemo } from "react";

export interface ConversationUser {
    id: string;
    name: string;
    initials: string;
    avatarColor: string;
    avatarUrl?: string;
    isOnline: boolean;
}

export interface Conversation {
    id: string;
    user: ConversationUser;
    lastMessage: string;
    time: string;
    unreadCount: number;
    tag?: string;
}

export interface ChatMessage {
    id: string;
    senderId: string;
    content: string;
    time: string;
    imageUrl?: string;
}

const MOCK_CONVERSATIONS: Conversation[] = [
    {
        id: "1",
        user: { id: "u1", name: "Elena Vance", initials: "EV", avatarColor: "#4f9f62", isOnline: true },
        lastMessage: "The architectural deck for the listing...",
        time: "10:26 AM",
        unreadCount: 2,
        tag: "Real Estate",
    },
    {
        id: "2",
        user: { id: "u2", name: "Marcus Holloway", initials: "MH", avatarColor: "#6b7280", isOnline: false },
        lastMessage: "I've reviewed the property details...",
        time: "Saturday",
        unreadCount: 0,
    },
    {
        id: "3",
        user: { id: "u3", name: "Team Gridiron", initials: "TG", avatarColor: "#2f6fed", isOnline: false },
        lastMessage: "Marcus: Sent a file.",
        time: "Tuesday",
        unreadCount: 0,
    },
    {
        id: "4",
        user: { id: "u4", name: "Sarah Chen", initials: "SC", avatarColor: "#d97706", isOnline: false },
        lastMessage: "Let's reschedule the site visit to Mon...",
        time: "May 12",
        unreadCount: 0,
    },
];

const INITIAL_MESSAGES: Record<string, ChatMessage[]> = {
    "1": [
        {
            id: "m1",
            senderId: "u1",
            content: "Hey! I've just finished the preliminary layout for the BGC unit listing. Would you like to review the photos before we publish?",
            time: "10:21 AM",
        },
        {
            id: "m2",
            senderId: "me",
            content: "Absolutely. I was just looking at the listing draft again. Can we make sure the featured image shows the city view angle?",
            time: "10:23 AM",
        },
        {
            id: "m3",
            senderId: "u1",
            content: "Sure, here's the current photo set. Feels quite vibrant — the natural light is great.",
            time: "10:25 AM",
            imageUrl: "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=400&h=220&fit=crop",
        },
    ],
    "2": [
        {
            id: "m4",
            senderId: "u2",
            content: "I've reviewed the property details you shared. The asking price looks reasonable for the area.",
            time: "Saturday 2:14 PM",
        },
    ],
};

export const useMessagesContentViewModel = () => {
    const [selectedConversationId, setSelectedConversationId] = useState<string | null>("1");
    const [inboxSearch, setInboxSearch] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [messagesMap, setMessagesMap] = useState<Record<string, ChatMessage[]>>(INITIAL_MESSAGES);

    const filteredConversations = useMemo(() => {
        if (!inboxSearch.trim()) return MOCK_CONVERSATIONS;
        const q = inboxSearch.toLowerCase();
        return MOCK_CONVERSATIONS.filter(
            (c) =>
                c.user.name.toLowerCase().includes(q) ||
                c.lastMessage.toLowerCase().includes(q)
        );
    }, [inboxSearch]);

    const selectedConversation =
        MOCK_CONVERSATIONS.find((c) => c.id === selectedConversationId) ?? null;

    const currentMessages = selectedConversationId
        ? (messagesMap[selectedConversationId] ?? [])
        : [];

    const newCount = MOCK_CONVERSATIONS.reduce((acc, c) => acc + c.unreadCount, 0);

    const handleSendMessage = () => {
        if (!inputValue.trim() || !selectedConversationId) return;
        const time = new Date().toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
        });
        const newMsg: ChatMessage = {
            id: `msg-${Date.now()}`,
            senderId: "me",
            content: inputValue.trim(),
            time,
        };
        setMessagesMap((prev) => ({
            ...prev,
            [selectedConversationId]: [...(prev[selectedConversationId] ?? []), newMsg],
        }));
        setInputValue("");
    };

    return {
        filteredConversations,
        selectedConversationId,
        selectedConversation,
        currentMessages,
        newCount,
        inboxSearch,
        setInboxSearch,
        inputValue,
        setInputValue,
        handleSendMessage,
        selectConversation: setSelectedConversationId,
    };
};
