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
                        {posts.length === 0 ? (
                            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white py-16 text-center">
                                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-green-50)]">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                    </svg>
                                </div>
                                <p className="text-sm font-semibold text-gray-700">No posts yet</p>
                                <p className="mt-1 text-xs text-gray-400">Be the first to share something with the community.</p>
                            </div>
                        ) : (
                            posts.map((post) => (
                                <FeedPost key={post.id} post={post} onLike={() => handleLike(post.id)} />
                            ))
                        )}
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
