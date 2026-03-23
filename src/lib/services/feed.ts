import { createAdminClient } from "@/lib/supabase/admin";
import { formatTimeAgo } from "@/lib/utils/formatters";
import type { FeedPost, FeedPostRow } from "@/lib/types/feed";

const SOCIAL_ROLE_FALLBACK = "Member";

const buildUserName = (profile: FeedPostRow["profiles"]): string => {
    if (!profile) return "Unknown User";

    const fullName = [profile.first_name, profile.last_name].filter(Boolean).join(" ").trim();
    return fullName || "Unknown User";
};

const buildUserInitials = (profile: FeedPostRow["profiles"]): string => {
    if (!profile) return "U";

    const initials = `${profile.first_name?.[0] ?? ""}${profile.last_name?.[0] ?? ""}`.toUpperCase();
    return initials || "U";
};

const buildUserRole = (profile: FeedPostRow["profiles"]): string => {
    if (!profile) return SOCIAL_ROLE_FALLBACK;

    const location = [profile.city, profile.province].filter(Boolean).join(", ").trim();
    return location ? `${SOCIAL_ROLE_FALLBACK} · ${location}` : SOCIAL_ROLE_FALLBACK;
};

export const mapFeedPostRowToFeedPost = (row: FeedPostRow): FeedPost => {
    const media = (row.feed_post_media ?? [])
        .slice()
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((item) => ({
            id: item.id,
            type: item.media_type,
            url: item.public_url,
            storagePath: item.storage_path,
        }));

    return {
        id: row.id,
        postType: "social",
        user: {
            id: row.profiles?.id,
            name: buildUserName(row.profiles),
            initials: buildUserInitials(row.profiles),
            role: buildUserRole(row.profiles),
            avatarUrl: row.profiles?.profile_photo_url ?? undefined,
        },
        content: row.content ?? undefined,
        createdAt: row.created_at,
        timeAgo: formatTimeAgo(row.created_at),
        media,
        images: media.filter((item) => item.type === "image").map((item) => item.url),
        likes: row.likes_count ?? 0,
        comments: row.comments_count ?? 0,
        liked: false,
    };
};

const getProfilesByUserIds = async (userIds: string[]) => {
    if (userIds.length === 0) {
        return new Map<string, FeedPostRow["profiles"]>();
    }

    const admin = createAdminClient();
    const { data, error } = await admin
        .from("profiles")
        .select("id, first_name, last_name, city, province, profile_photo_url")
        .in("id", userIds);

    if (error || !data) {
        console.error("[feed] Failed to fetch profiles:", error);
        return new Map<string, FeedPostRow["profiles"]>();
    }

    return new Map(
        data.map((profile) => [
            profile.id,
            {
                id: profile.id,
                first_name: profile.first_name,
                last_name: profile.last_name,
                city: profile.city,
                province: profile.province,
                profile_photo_url: profile.profile_photo_url,
            },
        ])
    );
};

const getMediaByPostIds = async (postIds: string[]) => {
    if (postIds.length === 0) {
        return new Map<string, FeedPostRow["feed_post_media"]>();
    }

    const admin = createAdminClient();
    const { data, error } = await admin
        .from("feed_post_media")
        .select("id, post_id, media_type, public_url, storage_path, sort_order")
        .in("post_id", postIds)
        .order("sort_order", { ascending: true });

    if (error || !data) {
        console.error("[feed] Failed to fetch post media:", error);
        return new Map<string, FeedPostRow["feed_post_media"]>();
    }

    const mediaMap = new Map<string, FeedPostRow["feed_post_media"]>();
    data.forEach((item) => {
        const existing = mediaMap.get(item.post_id) ?? [];
        existing.push({
            id: item.id,
            media_type: item.media_type,
            public_url: item.public_url,
            storage_path: item.storage_path,
            sort_order: item.sort_order,
        });
        mediaMap.set(item.post_id, existing);
    });

    return mediaMap;
};

const hydrateFeedPosts = async (
    rows: Array<{
        id: string;
        user_id: string;
        content: string | null;
        post_type: "social";
        likes_count: number;
        comments_count: number;
        created_at: string;
    }>
): Promise<FeedPost[]> => {
    const userIds = Array.from(new Set(rows.map((row) => row.user_id)));
    const postIds = rows.map((row) => row.id);
    const [profilesMap, mediaMap] = await Promise.all([
        getProfilesByUserIds(userIds),
        getMediaByPostIds(postIds),
    ]);

    return rows.map((row) =>
        mapFeedPostRowToFeedPost({
            ...row,
            profiles: profilesMap.get(row.user_id) ?? null,
            feed_post_media: mediaMap.get(row.id) ?? [],
        })
    );
};

export async function getFeedPostById(postId: string): Promise<FeedPost | null> {
    const admin = createAdminClient();

    const { data, error } = await admin
        .from("feed_posts")
        .select("id, user_id, content, post_type, likes_count, comments_count, created_at")
        .eq("id", postId)
        .eq("status", "published")
        .single();

    if (error || !data) {
        console.error("[getFeedPostById] Failed to fetch feed post:", error);
        return null;
    }

    const hydratedPosts = await hydrateFeedPosts([data]);
    return hydratedPosts[0] ?? null;
}

export async function getFeedPosts(): Promise<FeedPost[]> {
    const admin = createAdminClient();

    const { data, error } = await admin
        .from("feed_posts")
        .select("id, user_id, content, post_type, likes_count, comments_count, created_at")
        .eq("status", "published")
        .order("created_at", { ascending: false });

    if (error || !data) {
        console.error("[getFeedPosts] Failed to fetch feed posts:", error);
        return [];
    }

    return hydrateFeedPosts(data);
}
