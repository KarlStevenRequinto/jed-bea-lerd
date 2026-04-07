"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useHomePageContentViewModel } from "./useViewModel";
import HeroSection from "../HeroSection";
import ListingsArea from "../ListingsArea";
import FeedComposer from "../FeedComposer";
import FeedPost from "../FeedPost";
import HomeLeftSidebar from "../HomeLeftSidebar";
import HomeRightSidebar from "../HomeRightSidebar";
import CreateListingModal from "../CreateListingModal";
import { FormattedListing } from "@/lib/types/listing";
import { FeedPost as FeedPostType } from "@/lib/types/feed";
import sampleCar from "@/assets/images/sample-car.jpg";

interface CTAButtonProps {
    href: string;
    variant: "light" | "outline";
    children: React.ReactNode;
}

const RouterCTAButton = ({ href, variant, children }: CTAButtonProps) => {
    const base = "cursor-pointer inline-flex items-center justify-center px-8 py-3.5 rounded-lg font-semibold text-sm transition-colors";
    const styles =
        variant === "light"
            ? `${base} bg-white text-[var(--color-brand-dark)] hover:bg-white/90`
            : `${base} bg-transparent text-white border border-white/50 hover:bg-white/15`;
    return (
        <Link href={href} className={styles}>
            {children}
        </Link>
    );
};

interface HomePageContentProps {
    initialListings: FormattedListing[];
    initialFeedPosts: FeedPostType[];
}

const HomePageContent = ({ initialListings, initialFeedPosts }: HomePageContentProps) => {
    const [isListingModalOpen, setIsListingModalOpen] = useState(false);
    const { mounted, loggedIn, posts, handleLike, addPost, initialListings: listings } =
        useHomePageContentViewModel(initialListings, initialFeedPosts);

    // Pre-hydration or logged-out: premium landing layout
    if (!mounted || !loggedIn) {
        return (
            <div className="w-full">
                <HeroSection />

                {/* Feature section */}
                <div className="container mx-auto px-6 py-14">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                        {/* Left — image card with overlay text */}
                        <div className="relative rounded-2xl overflow-hidden min-h-[320px] lg:min-h-[360px]">
                            <Image
                                src={sampleCar}
                                alt="Access the best listings"
                                fill
                                className="object-cover object-center"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0b2116]/85 via-[#0b2116]/30 to-transparent" />
                            <div className="absolute bottom-8 left-8 right-8 text-white">
                                <h2 className="text-2xl lg:text-3xl font-bold leading-snug mb-2">
                                    Access the Best<br />Listings in the Philippines
                                </h2>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    From budget-friendly vehicles to premium real estate across every region.
                                </p>
                            </div>
                        </div>

                        {/* Right — info card */}
                        <div className="bg-white rounded-2xl p-8 lg:p-10 flex flex-col justify-center border border-[var(--color-gray-200)]">
                            <span
                                className="text-xs font-bold uppercase tracking-widest mb-4"
                                style={{ color: "var(--color-brand)" }}
                            >
                                Our Platform
                            </span>
                            <h2 className="text-2xl lg:text-3xl font-bold text-[var(--color-gray-900)] leading-snug mb-4">
                                The Smarter Way to Buy,<br />Sell &amp; Discover.
                            </h2>
                            <p className="text-[var(--color-gray-500)] text-sm leading-relaxed mb-8">
                                We don&apos;t just list properties and vehicles — we curate opportunities. Our platform ensures every asset meets the HomeNDrive standard of quality and trust.
                            </p>
                            <div className="flex items-center gap-3">
                                {/* Avatar stack */}
                                <div className="flex -space-x-2.5">
                                    {["#226735", "#2f8f46", "#39a357"].map((bg, i) => (
                                        <div
                                            key={i}
                                            className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-bold"
                                            style={{ background: bg }}
                                        >
                                            {["K", "M", "J"][i]}
                                        </div>
                                    ))}
                                </div>
                                <span className="text-sm font-semibold text-[var(--color-gray-900)]">
                                    500+ Members Joined
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Listings section */}
                <div className="container mx-auto px-6 pb-16">
                    <ListingsArea initialListings={listings} />
                </div>

                {/* CTA join banner */}
                <div
                    className="w-full py-20 px-6"
                    style={{
                        background: "linear-gradient(135deg, var(--color-brand-darker) 0%, var(--color-brand-dark) 60%, var(--color-brand) 100%)",
                    }}
                >
                    <div className="container mx-auto text-center">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                            Join HomeNDrive
                        </h2>
                        <p className="text-white/75 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
                            Get immediate access to all listings, save favorites, contact sellers directly, and receive personalized alerts.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <RouterCTAButton
                                href="/login?tab=register"
                                variant="light"
                            >
                                Create Account
                            </RouterCTAButton>
                            <RouterCTAButton
                                href="/login"
                                variant="outline"
                            >
                                Sign In
                            </RouterCTAButton>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Logged-in: social feed layout
    return (
        <div className="min-h-screen w-full bg-[linear-gradient(180deg,var(--color-green-200)_0%,var(--color-green-100)_20%,var(--color-green-50)_50%,#e8f5eb_100%)]">
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
