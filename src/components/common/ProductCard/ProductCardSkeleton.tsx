"use client";

import Skeleton from "@/components/common/Skeleton";

const ProductCardSkeleton = () => {
    return (
        <div
            className="w-full bg-white rounded-[10px] overflow-hidden"
            style={{ border: "1px solid var(--color-gray-500)" }}
            aria-busy="true"
            aria-live="polite"
        >
            <div className="w-full h-[482.56px] p-6" style={{ borderBottom: "1px solid var(--color-gray-500)" }}>
                <Skeleton className="h-full w-full rounded-[8px]" />
            </div>

            <div className="px-4 sm:px-6 lg:px-[72px] py-5">
                <Skeleton className="h-7 w-[56%] mb-2" />
                <Skeleton className="h-4 w-[42%] mb-3" />

                <div className="flex flex-wrap gap-2 mb-3.5">
                    <Skeleton className="h-7 w-20 rounded-full" />
                    <Skeleton className="h-7 w-20 rounded-full" />
                    <Skeleton className="h-7 w-20 rounded-full" />
                    <Skeleton className="h-7 w-20 rounded-full" />
                    <Skeleton className="h-7 w-20 rounded-full" />
                </div>

                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-[88%] mb-5" />

                <div className="flex gap-3">
                    <Skeleton className="h-11 flex-1 rounded-lg" />
                    <Skeleton className="h-11 flex-1 rounded-lg" />
                </div>

                <div className="mt-4 flex justify-center">
                    <Skeleton className="h-4 w-40" />
                </div>
            </div>
        </div>
    );
};

export default ProductCardSkeleton;
