"use client";

import Skeleton from "@/components/common/Skeleton";

const ListingsAreaSkeleton = () => {
    return (
        <div className="flex-1 flex flex-col gap-4" aria-busy="true" aria-live="polite">
            <div className="hidden lg:flex items-center gap-3">
                <Skeleton className="flex-1 h-[43px] rounded-lg" />
                <Skeleton className="w-[100px] h-[43px] rounded-[10px]" />
            </div>

            <div className="flex lg:hidden items-center justify-between gap-3">
                <Skeleton className="w-[100px] h-[43px] rounded-[10px]" />
                <Skeleton className="flex-1 h-[43px] rounded-lg" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={`listing-skeleton-${index}`} className="rounded-[10px] border border-[var(--color-gray-200)] bg-white p-4">
                        <Skeleton className="h-[250px] w-full rounded-[8px]" />
                        <Skeleton className="h-6 w-3/4 mt-4" />
                        <Skeleton className="h-4 w-1/2 mt-2" />
                        <div className="flex gap-2 mt-3">
                            <Skeleton className="h-6 w-14 rounded-full" />
                            <Skeleton className="h-6 w-14 rounded-full" />
                            <Skeleton className="h-6 w-14 rounded-full" />
                        </div>
                        <Skeleton className="h-4 w-full mt-4" />
                        <Skeleton className="h-4 w-5/6 mt-2" />
                        <Skeleton className="h-10 w-full mt-4 rounded-lg" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListingsAreaSkeleton;
