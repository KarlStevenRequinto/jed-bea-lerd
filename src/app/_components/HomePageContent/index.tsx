"use client";

import { useState } from "react";
import { useHomePageContentViewModel } from "./useViewModel";
import HeroSection from "../HeroSection";
import ListingsSidebar from "../ListingsSidebar";
import ListingsArea from "../ListingsArea";
import FeedComposer from "../FeedComposer";
import FeedPost from "../FeedPost";
import HomeLeftSidebar from "../HomeLeftSidebar";
import HomeRightSidebar from "../HomeRightSidebar";
import CreateListingModal from "../CreateListingModal";
import { FormattedListing } from "@/lib/types/listing";
import { FeedPost as FeedPostType } from "@/lib/types/feed";

interface HomePageContentProps {
    initialListings: FormattedListing[];
    initialFeedPosts: FeedPostType[];
}

const HomePageContent = ({ initialListings, initialFeedPosts }: HomePageContentProps) => {
    const [isListingModalOpen, setIsListingModalOpen] = useState(false);
    const { mounted, loggedIn, posts, handleLike, addPost, initialListings: listings } =
        useHomePageContentViewModel(initialListings, initialFeedPosts);

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
        <div className="min-h-screen w-full bg-[linear-gradient(180deg,var(--color-green-50)_0%,#fbfdfb_22%,#ffffff_100%)]">
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-start gap-5 justify-center">
                    {/* Left sidebar — lg+ only */}
                    <div className="sticky top-24 hidden w-60 shrink-0 self-start lg:block">
                        <HomeLeftSidebar onCreateListing={() => setIsListingModalOpen(true)} />
                    </div>

                    {/* Center feed */}
                    <div className="flex-1 max-w-2xl min-w-0 flex flex-col gap-4">
                        <FeedComposer onPost={addPost} />
                        {posts.map((post) => (
                            <FeedPost key={post.id} post={post} onLike={() => handleLike(post.id)} />
                        ))}
                    </div>

                    {/* Right sidebar — xl+ only */}
                    <div className="sticky top-24 hidden w-72 shrink-0 self-start xl:block">
                        <HomeRightSidebar initialListings={listings} />
                    </div>
                </div>
            </div>

            {isListingModalOpen && (
                <CreateListingModal
                    onClose={() => setIsListingModalOpen(false)}
                    onPublished={addPost}
                />
            )}
        </div>
    );
};

export default HomePageContent;
