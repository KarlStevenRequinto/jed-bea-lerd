"use client";

import { useHomePageViewModel } from "./useViewModel";
import BaseButton from "@/components/common/BaseButton";
import CategoryCard from "@/components/common/CategoryCard";
import { CarSvgIcon, LockIconSvg } from "@/components/svg-icons";

const HomePage = () => {
    useHomePageViewModel();

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center gap-6 p-8 relative overflow-hidden">
            {/* Gradient background with circles */}
            <div
                className="absolute inset-0 -z-10"
                style={{
                    background: `linear-gradient(to bottom right, var(--color-blue-primary), var(--color-blue-light), var(--color-green-primary))`,
                }}
            >
                {/* Decorative circles */}
                <div
                    className="absolute w-[400px] h-[400px] rounded-full opacity-30 blur-3xl top-20 right-40"
                    style={{ background: "var(--color-blue-medium)" }}
                />
                <div
                    className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-3xl bottom-10 left-20"
                    style={{ background: "var(--color-blue-dark)" }}
                />
            </div>

            <h1 className="text-3xl font-bold text-white mb-8">Homepage</h1>

            {/* Top buttons - Get Started Free & Sign In */}
            <div className="flex gap-4 mb-8">
                <BaseButton
                    className="bg-white px-8 py-3 text-base font-semibold rounded-lg"
                    style={{
                        color: "var(--color-blue-primary)",
                        border: "2px solid var(--color-blue-primary)",
                    }}
                >
                    Get Started Free
                </BaseButton>
                <BaseButton
                    className="bg-white px-8 py-3 text-base font-semibold rounded-lg"
                    style={{
                        color: "var(--color-green-primary)",
                        border: "2px solid var(--color-green-primary)",
                    }}
                >
                    Sign In
                </BaseButton>
            </div>

            {/* Category Cards */}
            <div className="flex flex-col gap-6 w-full max-w-[820px]">
                <CategoryCard icon={<CarSvgIcon />} title="Vehicles" description="Explore SUVs, Sedans, trucks, and more" />
            </div>

            {/* Contact Button */}
            <div className="mt-8">
                <BaseButton
                    rightIcon={<LockIconSvg />}
                    className="bg-white text-foreground border-2 border-gray-300 px-12 py-4 text-xl font-normal rounded-[50px]"
                >
                    CONTACT
                </BaseButton>
            </div>
        </div>
    );
};

export default HomePage;
