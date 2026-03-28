import { useEffect, useState } from "react";
import { useAppSelector } from "@/store";
import { FormattedListing } from "@/lib/types/listing";
import type { FeedPost } from "@/lib/types/feed";

export type HomePageFeedPost = FeedPost;

const normalizeFeedPost = (post: FeedPost): HomePageFeedPost => ({
    ...post,
    images:
        post.images ??
        post.media?.filter((item) => item.type === "image").map((item) => item.url) ??
        [],
});

export const useHomePageContentViewModel = (
    initialListings: FormattedListing[],
    initialFeedPosts: FeedPost[]
) => {
    const loggedIn = useAppSelector((s) => s.auth.loggedIn);
    const [mounted, setMounted] = useState(false);
    const [posts, setPosts] = useState<HomePageFeedPost[]>(() =>
        initialFeedPosts.map(normalizeFeedPost)
    );

    useEffect(() => {
        setMounted(true);
    }, []);

    // Sync when SSR data refreshes (e.g. after router.refresh())
    useEffect(() => {
        setPosts(initialFeedPosts.map(normalizeFeedPost));
    }, [initialFeedPosts]);

    const handleLike = (postId: string) => {
        setPosts((prev) =>
            prev.map((p) =>
                p.id === postId
                    ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
                    : p
            )
        );
    };

    const addPost = (post: FeedPost) => {
        const newPost = normalizeFeedPost(post);
        // Deduplicate: if router.refresh() already synced this post, don't double it
        setPosts((prev) => {
            if (prev.some((p) => p.id === newPost.id)) return prev;
            return [newPost, ...prev];
        });
    };

    return {
        mounted,
        loggedIn,
        posts,
        handleLike,
        addPost,
        initialListings,
    };
};
