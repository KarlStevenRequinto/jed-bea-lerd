"use client";

import Skeleton from "@/components/common/Skeleton";

const ListingsSidebarSkeleton = () => {
    return (
        <div className="w-full lg:w-80 flex flex-col gap-6" aria-busy="true" aria-live="polite">
            <div className="flex flex-col gap-3">
                <Skeleton className="h-[56px] w-full rounded-lg" />
                <Skeleton className="h-[56px] w-full rounded-lg" />
                <Skeleton className="h-[56px] w-full rounded-lg" />
            </div>

            <div className="w-full h-96 rounded-lg border border-[var(--color-gray-200)] bg-white p-4">
                <Skeleton className="h-full w-full rounded-md" />
            </div>
        </div>
    );
};

export default ListingsSidebarSkeleton;
