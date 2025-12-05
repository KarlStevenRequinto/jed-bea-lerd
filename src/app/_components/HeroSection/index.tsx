"use client";

import { useHeroSectionViewModel } from "./useViewModel";
import BaseButton from "@/components/common/BaseButton";
import CategoryCard from "@/components/common/CategoryCard";
import FeatureIconItem from "@/components/common/FeatureIconItem";
import { RealEstateSvgIcon, CarSvgIcon, PriceTagSvgIcon, SearchSvgIcon, SpeechBubbleSvgIcon, HeartSvgIcon } from "@/components/svg-icons";

const HeroSection = () => {
    useHeroSectionViewModel();

    return (
        <div className="relative w-full bg-gradient-to-br from-[var(--color-blue-primary)] via-[var(--color-blue-light)] to-[var(--color-green-primary)] overflow-hidden lg:h-[520px]">
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
                                className="bg-white w-[159px] h-[38px] text-[15px] font-bold leading-[1] rounded-[7px]"
                                style={{
                                    color: "var(--color-brand-dark)",
                                }}
                            >
                                Get Started Free
                            </BaseButton>
                            <BaseButton
                                className="bg-white w-[159px] h-[38px] text-[15px] font-bold leading-[1] rounded-[7px]"
                                style={{
                                    color: "var(--color-success-deep)",
                                }}
                            >
                                Sign In
                            </BaseButton>
                        </div>

                        {/* Feature Icons */}
                        <div className="grid grid-cols-2 gap-4">
                            <FeatureIconItem icon={<SearchSvgIcon />} label="Advanced Search" />
                            <FeatureIconItem icon={<HeartSvgIcon />} label="Save Favorites" />
                            <FeatureIconItem icon={<SpeechBubbleSvgIcon />} label="Contact Sellers" />
                            <FeatureIconItem icon={<PriceTagSvgIcon />} label="Price Alerts" />
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
