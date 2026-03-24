export type FeedPostType = "social" | "vehicle" | "property";

export type FeedMediaType = "image" | "video";

export interface FeedPostUser {
    id?: string;
    name: string;
    initials: string;
    role: string;
    avatarUrl?: string;
}

export interface FeedPostMedia {
    id: string;
    type: FeedMediaType;
    url: string;
    storagePath?: string;
}

export interface FeedPost {
    id: string;
    postType: FeedPostType;
    user: FeedPostUser;
    content?: string;
    timeAgo: string;
    createdAt: string;
    media?: FeedPostMedia[];
    images?: string[];
    likes: number;
    comments: number;
    liked: boolean;
    vehicleData?: {
        title: string;
        price: string;
        location: string;
        imageUrl: string;
        badge: string;
        mileage?: string;
        fuel?: string;
        transmission?: string;
    };
    propertyData?: {
        title: string;
        price: string;
        location: string;
        imageUrl: string;
        badge: string;
        beds?: string;
        baths?: string;
        sqft?: string;
    };
}

export interface FeedPostMediaRow {
    id: string;
    media_type: FeedMediaType;
    public_url: string;
    storage_path: string;
    sort_order: number;
}

export interface FeedPostRow {
    id: string;
    user_id: string;
    listing_id: string | null;
    content: string | null;
    post_type: FeedPostType;
    likes_count: number;
    comments_count: number;
    created_at: string;
    profiles: {
        id: string;
        first_name: string | null;
        last_name: string | null;
        city: string | null;
        province: string | null;
        profile_photo_url: string | null;
    } | null;
    feed_post_media: FeedPostMediaRow[] | null;
    listing?: {
        id: string;
        category: "VEHICLE" | "PROPERTY";
        title: string;
        price: number;
        location: string;
        image_url: string | null;
        specs: {
            year?: string;
            color?: string;
            mileage?: string;
            fuelType?: string;
            bodyType?: string;
            bedrooms?: string;
            bathrooms?: string;
            sqft?: string;
        };
    } | null;
}

export interface CreateFeedPostResult {
    post: FeedPost;
}
