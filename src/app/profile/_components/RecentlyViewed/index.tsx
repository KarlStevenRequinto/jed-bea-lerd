"use client";

import Image from "next/image";
import { useRecentlyViewedViewModel, RecentlyViewedItem } from "./useViewModel";
import { ProfileRecentlyViewed } from "@/lib/types/profile";
import CategoryBadge from "@/components/common/CategoryBadge";
import EmptyState from "@/components/common/EmptyState";

interface RecentlyViewedProps {
    items: ProfileRecentlyViewed[];
}

const RecentlyViewed = ({ items: initialItems }: RecentlyViewedProps) => {
    const { items, handleViewHistory, handleItemClick } =
        useRecentlyViewedViewModel(initialItems);

    return (
        <div className="bg-white rounded-lg border border-[var(--color-gray-200)] p-5">
            <h3 className="text-base font-semibold text-[var(--color-gray-900)] mb-4">
                Recently Viewed
            </h3>

            {items.length === 0 ? (
                <EmptyState message="No recently viewed listings." className="py-4" />
            ) : (
                <div className="space-y-3">
                    {items.map((item) => (
                        <RecentlyViewedCard
                            key={item.id}
                            item={item}
                            onClick={() => handleItemClick(item.id)}
                        />
                    ))}
                </div>
            )}

            <button
                onClick={handleViewHistory}
                className="flex items-center justify-center gap-1 w-full text-sm text-[var(--color-gray-600)] hover:text-[var(--color-brand)] mt-4 py-2"
            >
                <span>View History</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </div>
    );
};

interface RecentlyViewedCardProps {
    item: RecentlyViewedItem;
    onClick: () => void;
}

const RecentlyViewedCard = ({ item, onClick }: RecentlyViewedCardProps) => (
    <button
        onClick={onClick}
        className="flex items-center gap-3 w-full text-left hover:bg-[var(--color-gray-50)] rounded-lg p-2 -mx-2 transition-colors"
    >
        <div className="w-16 h-12 rounded-md overflow-hidden bg-[var(--color-gray-200)] flex-shrink-0 flex items-center justify-center">
            {item.image ? (
                <Image src={item.image} alt={item.title} width={64} height={48} className="object-cover w-full h-full" />
            ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="var(--color-gray-400)" strokeWidth="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" fill="var(--color-gray-400)" />
                    <path d="M21 15L16 10L5 21" stroke="var(--color-gray-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )}
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[var(--color-gray-900)] truncate">{item.title}</p>
            <p className="text-sm font-semibold text-[var(--color-gray-900)]">{item.price}</p>
            <CategoryBadge category={item.category} className="mt-1" />
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 text-[var(--color-gray-400)]">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </button>
);

export default RecentlyViewed;
