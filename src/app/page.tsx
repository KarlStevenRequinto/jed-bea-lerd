"use client";

import { useHomePageViewModel } from "./useViewModel";
import BaseButton from "@/components/common/BaseButton";
import { RealEstateSvgIcon, CarSvgIcon } from "@/components/svg-icons";

const HomePage = () => {
    useHomePageViewModel();

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center gap-6 bg-background p-8">
            <h1 className="text-3xl font-bold text-foreground mb-8">Homepage</h1>

            {/* Top buttons - Get Started Free & Sign In */}
            <div className="flex gap-4 mb-8">
                <BaseButton className="bg-white text-[#4169E1] border-2 border-[#4169E1] px-8 py-3 text-base font-semibold rounded-lg">
                    Get Started Free
                </BaseButton>
                <BaseButton className="bg-white text-[#4CAF50] border-2 border-[#4CAF50] px-8 py-3 text-base font-semibold rounded-lg">
                    Sign In
                </BaseButton>
            </div>

            {/* Category buttons */}
            <div className="flex flex-col gap-4 w-full max-w-md">
                <BaseButton
                    leftIcon={<RealEstateSvgIcon />}
                    className="bg-[#6B9EFF] text-foreground border border-gray-300 px-6 py-4 text-lg font-semibold rounded-lg w-full"
                >
                    ALL LISTING
                </BaseButton>
                <BaseButton
                    leftIcon={<RealEstateSvgIcon />}
                    className="bg-white text-foreground border border-gray-300 px-6 py-4 text-lg font-semibold rounded-lg w-full"
                >
                    PROPERTIES
                </BaseButton>
                <BaseButton
                    leftIcon={<CarSvgIcon />}
                    className="bg-white text-foreground border border-gray-300 px-6 py-4 text-lg font-semibold rounded-lg w-full"
                >
                    VEHICLES
                </BaseButton>
            </div>
        </div>
    );
};

export default HomePage;
