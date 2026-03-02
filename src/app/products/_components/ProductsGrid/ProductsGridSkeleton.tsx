"use client";

import Skeleton from "@/components/common/Skeleton";

const ProductsGridSkeleton = () => {
    return (
        <section id="products-results" aria-busy="true" aria-live="polite">
            <div className="flex items-center gap-3 mb-1">
                <Skeleton className="h-9 w-9 rounded-lg" />
                <Skeleton className="h-8 w-44" />
            </div>
            <Skeleton className="h-4 w-36 mb-6 ml-[48px]" />

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array.from({ length: 9 }).map((_, index) => (
                    <div key={`products-grid-skeleton-${index}`} className="rounded-[10px] border border-[var(--color-gray-200)] bg-white p-4">
                        <Skeleton className="h-[250px] w-full rounded-[8px]" />
                        <Skeleton className="h-6 w-[70%] mt-4 mb-2" />
                        <Skeleton className="h-4 w-[54%] mb-3" />
                        <div className="flex gap-1.5 mb-3">
                            <Skeleton className="h-6 w-14 rounded-full" />
                            <Skeleton className="h-6 w-14 rounded-full" />
                            <Skeleton className="h-6 w-14 rounded-full" />
                        </div>
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-[88%] mb-3" />
                        <Skeleton className="h-10 w-full rounded-lg" />
                    </div>
                ))}
            </div>

            <div className="mt-6 flex justify-center gap-2">
                <Skeleton className="h-9 w-9 rounded-md" />
                <Skeleton className="h-9 w-9 rounded-md" />
                <Skeleton className="h-9 w-9 rounded-md" />
                <Skeleton className="h-9 w-9 rounded-md" />
                <Skeleton className="h-9 w-9 rounded-md" />
            </div>
        </section>
    );
};

export default ProductsGridSkeleton;
