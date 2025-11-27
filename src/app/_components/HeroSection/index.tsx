"use client";

import { useHeroSectionViewModel } from "./useViewModel";
import BaseButton from "@/components/common/BaseButton";
import CategoryCard from "@/components/common/CategoryCard";
import { RealEstateSvgIcon, CarSvgIcon, PriceTagSvgIcon, SearchSvgIcon, SpeedBubbleSvgIcon, HeartSvgIcon } from "@/components/svg-icons";

const HeroSection = () => {
    useHeroSectionViewModel();

    return (
        <div className="relative w-full bg-gradient-to-br from-[var(--color-blue-primary)] via-[var(--color-blue-light)] to-[var(--color-green-primary)] overflow-hidden">
            {/* Decorative circles */}
            <div
                className="absolute w-[400px] h-[400px] rounded-full opacity-30 blur-3xl top-20 right-40"
                style={{ background: "var(--color-blue-medium)" }}
            />
            <div
                className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-3xl bottom-10 left-20"
                style={{ background: "var(--color-blue-dark)" }}
            />

            <div className="relative container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-60 items-center">
                    {/* Left Side - Content */}
                    <div className="text-white">
                        <h1 className="text-4xl font-bold mb-6 leading-tight">Find your dream home or vehicle</h1>
                        <p className="text-lg mb-8 leading-relaxed opacity-95">
                            Join thousands of users discovering amazing properties and vehicles. Sign up now to unlock exclusive features and
                            personalized recommendations.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex gap-4 mb-12">
                            <BaseButton
                                className="bg-white px-8 py-3 text-base font-semibold rounded-lg"
                                style={{
                                    color: "var(--color-blue-primary)",
                                }}
                            >
                                Get Started Free
                            </BaseButton>
                            <BaseButton className="bg-transparent text-white border-2 border-white px-8 py-3 text-base font-semibold rounded-lg">
                                Sign In
                            </BaseButton>
                        </div>

                        {/* Feature Icons */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <SearchSvgIcon />
                                </div>
                                <span className="text-sm">Advanced Search</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <HeartSvgIcon />
                                </div>
                                <span className="text-sm">Save Favorites</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <SpeedBubbleSvgIcon />
                                </div>
                                <span className="text-sm">Contact Sellers</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <PriceTagSvgIcon />
                                </div>
                                <span className="text-sm">Price Alerts</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Category Cards */}
                    <div className="flex flex-col gap-6">
                        <CategoryCard
                            icon={
                                <div style={{ filter: "brightness(0) saturate(100%) invert(100%)" }}>
                                    <RealEstateSvgIcon width="70" height="70" fill="url(#pattern0_407_1725)" />
                                </div>
                            }
                            title="Properties"
                            description="Browse houses, apartments, and more"
                            onClick={() => console.log("Properties clicked")}
                        />
                        <CategoryCard
                            icon={<CarSvgIcon />}
                            title="Vehicles"
                            description="Explore SUVs, Sedans, trucks, and more"
                            onClick={() => console.log("Vehicles clicked")}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
