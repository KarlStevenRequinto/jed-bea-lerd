"use client";

import { useRef } from "react";
import { useConnectionsViewModel, Connection } from "./useViewModel";
import { useSmoothContainerScroll } from "@/hooks/useSmoothContainerScroll";
import { ProfileConnection } from "@/lib/types/profile";
import Avatar from "@/components/common/Avatar";
import EmptyState from "@/components/common/EmptyState";

interface ConnectionsProps {
    following: ProfileConnection[];
    followers: ProfileConnection[];
}

const Connections = ({ following, followers }: ConnectionsProps) => {
    const connectionsScrollRef = useRef<HTMLDivElement>(null);
    useSmoothContainerScroll(connectionsScrollRef, { lerp: 0.14, wheelMultiplier: 1 });

    const {
        activeTab,
        connections,
        followingCount,
        followersCount,
        highlightTransform,
        transitionClasses,
        highlightWidth,
        handleTabChange,
        handleFollow,
    } = useConnectionsViewModel(following, followers);

    return (
        <div className="bg-white rounded-lg border border-[var(--color-gray-200)] p-5">
            <h3 className="text-base font-semibold text-[var(--color-gray-900)] mb-4">
                Connections
            </h3>

            {/* Tabs */}
            <div className="relative flex mb-4 bg-[var(--color-gray-100)] rounded-full p-1">
                <div
                    className={`absolute top-1/2 -translate-y-1/2 h-[calc(100%-8px)] rounded-full bg-[var(--color-brand)] ${transitionClasses}`}
                    style={{ transform: highlightTransform, width: highlightWidth }}
                    aria-hidden="true"
                />
                <TabButton
                    label={`Following (${followingCount})`}
                    isActive={activeTab === "following"}
                    onClick={() => handleTabChange("following")}
                />
                <TabButton
                    label={`Followers (${followersCount})`}
                    isActive={activeTab === "followers"}
                    onClick={() => handleTabChange("followers")}
                />
            </div>

            {/* Connection List */}
            <div
                ref={connectionsScrollRef}
                data-lenis-prevent
                className="connections-scroll max-h-[312px] overflow-y-auto overscroll-contain pr-1 space-y-3"
            >
                {connections.length === 0 ? (
                    <EmptyState
                        message={activeTab === "following" ? "You're not following anyone yet." : "No followers yet."}
                    />
                ) : (
                    connections.map((connection) => (
                        <ConnectionItem
                            key={connection.id}
                            connection={connection}
                            isFollowing={activeTab === "following"}
                            onFollow={handleFollow}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

interface TabButtonProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const TabButton = ({ label, isActive, onClick }: TabButtonProps) => (
    <button
        onClick={onClick}
        className={`relative z-10 flex-1 text-xs font-medium py-2 px-3 rounded-full transition-colors duration-300 cursor-pointer ${
            isActive ? "text-white" : "text-[var(--color-gray-600)] hover:text-[var(--color-gray-900)]"
        }`}
    >
        {label}
    </button>
);

interface ConnectionItemProps {
    connection: Connection;
    isFollowing: boolean;
    onFollow: (id: string) => void;
}

const ConnectionItem = ({ connection, isFollowing, onFollow }: ConnectionItemProps) => (
    <div className="group flex items-center justify-between rounded-lg px-2 py-1.5 cursor-pointer transition-colors duration-200 hover:bg-[var(--color-gray-100)]">
        <div className="flex items-center gap-3">
            <Avatar name={connection.name} avatarUrl={connection.avatarUrl} size={40} />
            <div>
                <p className="text-sm font-medium text-[var(--color-gray-900)]">{connection.name}</p>
                <p className="text-xs text-[var(--color-gray-500)]">{connection.location || "HomeNDrive User"}</p>
            </div>
        </div>
        <button
            onClick={() => onFollow(connection.id)}
            className="p-2 hover:bg-[var(--color-gray-200)] rounded-full transition-colors cursor-pointer"
        >
            {isFollowing ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="var(--color-gray-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z" stroke="var(--color-gray-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20 8V14" stroke="var(--color-gray-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M23 11H17" stroke="var(--color-gray-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="var(--color-brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z" stroke="var(--color-brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20 8V14" stroke="var(--color-brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M23 11H17" stroke="var(--color-brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )}
        </button>
    </div>
);

export default Connections;
