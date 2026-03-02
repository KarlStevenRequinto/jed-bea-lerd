"use client";

import Skeleton from "@/components/common/Skeleton";

const HeroSectionSkeleton = () => {
    return (
        <div className="relative w-full bg-gradient-to-br from-[var(--color-blue-primary)] via-[var(--color-blue-light)] to-[var(--color-green-primary)] overflow-hidden lg:h-[520px]">
            <div
                className="absolute w-[400px] h-[400px] rounded-full opacity-30 blur-3xl top-20 right-40"
                style={{ background: "var(--color-blue-medium)" }}
            />
            <div
                className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-3xl bottom-10 left-20"
                style={{ background: "var(--color-blue-dark)" }}
            />

            <div className="relative container mx-auto px-6 py-16" aria-busy="true" aria-live="polite">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-60 items-center">
                    <div>
                        <Skeleton className="h-11 w-[75%] mb-4" />
                        <Skeleton className="h-6 w-full mb-2" />
                        <Skeleton className="h-6 w-[92%] mb-8" />

                        <div className="flex gap-x-8 mb-12">
                            <Skeleton className="w-[159px] h-[38px] rounded-[7px]" />
                            <Skeleton className="w-[159px] h-[38px] rounded-[7px]" />
                        </div>

                        <div className="grid grid-cols-2 gap-y-4 max-w-sm">
                            <Skeleton className="h-8 w-32" />
                            <Skeleton className="h-8 w-32" />
                            <Skeleton className="h-8 w-32" />
                            <Skeleton className="h-8 w-32" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <Skeleton className="h-[150px] w-full rounded-xl" />
                        <Skeleton className="h-[150px] w-full rounded-xl" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSectionSkeleton;
