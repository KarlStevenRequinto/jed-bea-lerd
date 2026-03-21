"use client";

import { useHomePageContentViewModel } from "./useViewModel";
import HeroSection from "../HeroSection";
import ListingsSidebar from "../ListingsSidebar";
import ListingsArea from "../ListingsArea";
import FeedComposer from "../FeedComposer";
import FeedPost from "../FeedPost";
import HomeLeftSidebar from "../HomeLeftSidebar";
import HomeRightSidebar from "../HomeRightSidebar";
import { FormattedListing } from "@/lib/types/listing";

interface HomePageContentProps {
    initialListings: FormattedListing[];
}

const HomePageContent = ({ initialListings }: HomePageContentProps) => {
    const { mounted, loggedIn, posts, handleLike, addPost, initialListings: listings } =
        useHomePageContentViewModel(initialListings);

    // Pre-hydration or logged-out: show classic hero + listings layout
    if (!mounted || !loggedIn) {
        return (
            <div className="w-full">
                <HeroSection />
                <div className="container mx-auto px-6 py-8">
                    <div className="flex flex-col lg:flex-row gap-6">
                        <ListingsSidebar />
                        <ListingsArea initialListings={listings} />
                    </div>
                </div>
            </div>
        );
    }

    // Logged-in: social feed layout
    return (
        <div className="w-full bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-6">
                <div className="flex gap-5 justify-center">
                    {/* Left sidebar — lg+ only */}
                    <div className="hidden lg:block w-60 shrink-0">
                        <HomeLeftSidebar />
                    </div>

                    {/* Center feed */}
                    <div className="flex-1 max-w-2xl min-w-0 flex flex-col gap-4">
                        <FeedComposer onPost={addPost} />
                        {posts.map((post) => (
                            <FeedPost key={post.id} post={post} onLike={() => handleLike(post.id)} />
                        ))}
                    </div>

                    {/* Right sidebar — xl+ only */}
                    <div className="hidden xl:block w-72 shrink-0">
                        <HomeRightSidebar initialListings={listings} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePageContent;
