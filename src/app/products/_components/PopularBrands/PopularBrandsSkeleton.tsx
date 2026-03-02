"use client";

import Skeleton from "@/components/common/Skeleton";

const PopularBrandsSkeleton = () => {
    return (
        <div className="bg-white rounded-xl border border-[var(--color-gray-200)] p-5 w-full" aria-busy="true" aria-live="polite">
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-3 w-44 mb-4" />
            <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={`popular-skeleton-${index}`} className="flex items-center justify-between">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-6" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularBrandsSkeleton;
