"use client";

import Skeleton from "@/components/common/Skeleton";

const ProductsFilterSidebarSkeleton = () => {
    return (
        <div className="bg-white rounded-xl border border-[var(--color-gray-200)] p-5 w-full" aria-busy="true" aria-live="polite">
            <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-4 w-14" />
            </div>

            <Skeleton className="h-4 w-24 mb-3" />
            <div className="space-y-2.5 mb-4">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-32" />
            </div>

            <hr className="border-[var(--color-gray-200)] my-4" />

            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-4 w-40 mb-3" />
            <Skeleton className="h-5 w-full mb-4" />

            <hr className="border-[var(--color-gray-200)] my-4" />

            <Skeleton className="h-4 w-20 mb-3" />
            <Skeleton className="h-9 w-full" />

            <hr className="border-[var(--color-gray-200)] my-4" />

            <Skeleton className="h-4 w-28 mb-3" />
            <div className="space-y-2.5 mb-4">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-5 w-28" />
            </div>

            <hr className="border-[var(--color-gray-200)] my-4" />

            <Skeleton className="h-4 w-20 mb-3" />
            <div className="space-y-2.5 mb-4">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-32" />
            </div>

            <div className="mt-5">
                <Skeleton className="h-10 w-full rounded-lg" />
            </div>
        </div>
    );
};

export default ProductsFilterSidebarSkeleton;
