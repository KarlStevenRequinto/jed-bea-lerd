"use client";

import Skeleton from "@/components/common/Skeleton";

const GridProductCardSkeleton = () => {
    return (
        <div className="w-full bg-white rounded-[10px] overflow-hidden border border-[var(--color-gray-500)] flex flex-col" aria-busy="true" aria-live="polite">
            <div className="p-3">
                <Skeleton className="h-[250px] w-full rounded-[8px]" />
            </div>

            <div className="p-4 flex flex-col flex-1">
                <Skeleton className="h-6 w-[72%] mb-2" />
                <Skeleton className="h-4 w-[56%] mb-3" />

                <div className="flex flex-wrap gap-1.5 mb-2">
                    <Skeleton className="h-6 w-14 rounded-full" />
                    <Skeleton className="h-6 w-14 rounded-full" />
                    <Skeleton className="h-6 w-14 rounded-full" />
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                </div>

                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-[88%] mb-3" />
                <Skeleton className="h-10 w-full rounded-lg mb-2" />
                <div className="flex justify-center">
                    <Skeleton className="h-4 w-28" />
                </div>
            </div>
        </div>
    );
};

export default GridProductCardSkeleton;
