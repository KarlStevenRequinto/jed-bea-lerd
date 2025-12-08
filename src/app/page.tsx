"use client";

import { useHomePageViewModel } from "./useViewModel";
import HeroSection from "./_components/HeroSection";
import ListingsSidebar from "./_components/ListingsSidebar";
import ListingsArea from "./_components/ListingsArea";

const HomePage = () => {
    useHomePageViewModel();

    return (
        <div className="w-full">
            {/* Hero Section */}
            <HeroSection />

            {/* Main Content Area */}
            <div className="container mx-auto px-6 py-8">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Sidebar - Filters & Ads */}
                    <ListingsSidebar />

                    {/* Right Side - Listings */}
                    <ListingsArea />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
