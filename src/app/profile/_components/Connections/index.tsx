"use client";

import Image from "next/image";
import { useConnectionsViewModel, Connection, TabType } from "./useViewModel";

const Connections = () => {
    const {
        activeTab,
        connections,
        followingCount,
        followersCount,
        handleTabChange,
        handleFollow,
        handleSeeMore,
    } = useConnectionsViewModel();

    return (
        <div className="bg-white rounded-lg border border-[var(--color-gray-200)] p-5">
            {/* Header */}
            <h3 className="text-base font-semibold text-[var(--color-gray-900)] mb-4">
                Connections
            </h3>

            {/* Tabs */}
            <div className="flex mb-4 bg-[var(--color-gray-100)] rounded-full p-1">
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
            <div className="space-y-3">
                {connections.slice(0, 5).map((connection) => (
                    <ConnectionItem
                        key={connection.id}
                        connection={connection}
                        onFollow={handleFollow}
                    />
                ))}
            </div>

            {/* See More */}
            <button
                onClick={handleSeeMore}
                className="w-full text-center text-sm text-[var(--color-gray-600)] hover:text-[var(--color-brand)] mt-4 py-2 hover:underline"
            >
                See more
            </button>
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
        className={`flex-1 text-xs font-medium py-2 px-3 rounded-full transition-colors ${
            isActive
                ? "bg-[var(--color-brand)] text-white"
                : "text-[var(--color-gray-600)] hover:text-[var(--color-gray-900)]"
        }`}
    >
        {label}
    </button>
);

interface ConnectionItemProps {
    connection: Connection;
    onFollow: (id: string) => void;
}

const ConnectionItem = ({ connection, onFollow }: ConnectionItemProps) => {
    // Get initials from name for avatar placeholder
    const initials = connection.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full overflow-hidden bg-[var(--color-gray-200)] flex items-center justify-center">
                    {connection.avatar ? (
                        <Image
                            src={connection.avatar}
                            alt={connection.name}
                            width={40}
                            height={40}
                            className="object-cover w-full h-full"
                        />
                    ) : (
                        <span className="text-sm font-medium text-[var(--color-gray-600)]">
                            {initials}
                        </span>
                    )}
                </div>
                {/* Info */}
                <div>
                    <p className="text-sm font-medium text-[var(--color-gray-900)]">
                        {connection.name}
                    </p>
                    <p className="text-xs text-[var(--color-gray-500)]">
                        {connection.role}
                    </p>
                </div>
            </div>

            {/* Follow Button */}
            <button
                onClick={() => onFollow(connection.id)}
                className="p-2 hover:bg-[var(--color-gray-100)] rounded-full transition-colors"
            >
                {connection.isFollowing ? (
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                            stroke="var(--color-gray-500)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z"
                            stroke="var(--color-gray-500)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M20 8V14"
                            stroke="var(--color-gray-500)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M23 11H17"
                            stroke="var(--color-gray-500)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                ) : (
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                            stroke="var(--color-brand)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z"
                            stroke="var(--color-brand)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M20 8V14"
                            stroke="var(--color-brand)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M23 11H17"
                            stroke="var(--color-brand)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )}
            </button>
        </div>
    );
};

export default Connections;
