import { useEffect, useState } from "react";
import { useAppSelector } from "@/store";
import { FormattedListing } from "@/lib/types/listing";
import { MediaPreview } from "../FeedComposer/useViewModel";

export interface FeedPostUser {
    name: string;
    initials: string;
    role: string;
    avatarUrl?: string;
}

export interface FeedPostVehicleData {
    title: string;
    price: string;
    location: string;
    imageUrl: string;
    badge: string;
    mileage?: string;
    fuel?: string;
    transmission?: string;
}

export interface FeedPostPropertyData {
    title: string;
    price: string;
    location: string;
    imageUrl: string;
    badge: string;
    beds?: string;
    baths?: string;
    sqft?: string;
}

export type FeedPostType = "social" | "vehicle" | "property";

export interface FeedPost {
    id: string;
    postType: FeedPostType;
    user: FeedPostUser;
    content?: string;
    timeAgo: string;
    images?: string[];
    vehicleData?: FeedPostVehicleData;
    propertyData?: FeedPostPropertyData;
    likes: number;
    comments: number;
    liked: boolean;
}

const MOCK_POSTS: FeedPost[] = [
    {
        id: "post-1",
        postType: "social",
        user: { name: "Jasmine Reyes", initials: "JR", role: "Real Estate Agent · Cebu City" },
        content:
            "Took a quick break from showings to catch the sunset in Bantayan. Moments like these remind me why I love working in Cebu. Great place, great people. 🌅",
        timeAgo: "2h ago",
        images: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80"],
        likes: 245,
        comments: 12,
        liked: false,
    },
    {
        id: "post-2",
        postType: "vehicle",
        user: {
            name: "Ryan Dela Cruz",
            initials: "RD",
            role: "Vehicle Dealer · Quezon City",
            avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
        },
        content: "Just got this beauty in stock. Practically brand new — grab it before it's gone!",
        timeAgo: "3h ago",
        vehicleData: {
            title: "2023 Toyota Fortuner LTD 4x4",
            price: "₱2,190,000",
            location: "Quezon City, Metro Manila",
            imageUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80",
            badge: "For Sale",
            mileage: "12,000 km",
            fuel: "Diesel",
            transmission: "Automatic",
        },
        likes: 98,
        comments: 27,
        liked: true,
    },
    {
        id: "post-3",
        postType: "property",
        user: { name: "Maria Santos", initials: "MS", role: "Property Seller · BGC, Taguig" },
        timeAgo: "5h ago",
        propertyData: {
            title: "The Horizon Residences",
            price: "₱38,000/mo",
            location: "Bonifacio Global City, Taguig",
            imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
            badge: "New Listing",
            beds: "2",
            baths: "2",
            sqft: "78 sqm",
        },
        likes: 134,
        comments: 19,
        liked: false,
    },
    {
        id: "post-4",
        postType: "social",
        user: { name: "Carlo Mendoza", initials: "CM", role: "Verified Buyer · Bacolod City" },
        content:
            "Just listed my first collection on HomeNDrive Marketplace. The community vibe here is incredible! If you're looking for pre-owned vehicles in Bacolod, check it out and let me know what you think. 🚀",
        timeAgo: "5h ago",
        likes: 63,
        comments: 18,
        liked: false,
    },
    {
        id: "post-5",
        postType: "vehicle",
        user: { name: "Paolo Reyes", initials: "PR", role: "Vehicle Seller · Cebu City" },
        content: "Selling my personal car — well maintained, complete documents, no issues.",
        timeAgo: "8h ago",
        vehicleData: {
            title: "2021 Honda CR-V S Turbo AWD",
            price: "₱1,350,000",
            location: "Cebu City",
            imageUrl: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80",
            badge: "For Sale",
            mileage: "28,500 km",
            fuel: "Gasoline",
            transmission: "CVT",
        },
        likes: 77,
        comments: 14,
        liked: false,
    },
    {
        id: "post-6",
        postType: "property",
        user: {
            name: "Lourdes Villanueva",
            initials: "LV",
            role: "Property Investor · Bacolod City",
        },
        content: "Great investment opportunity — Bacolod prices are still very affordable!",
        timeAgo: "10h ago",
        propertyData: {
            title: "Spacious House & Lot in Bacolod",
            price: "₱4,200,000",
            location: "Bacolod City, Negros Occidental",
            imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
            badge: "For Sale",
            beds: "4",
            baths: "3",
            sqft: "210 sqm",
        },
        likes: 41,
        comments: 9,
        liked: false,
    },
];

export const useHomePageContentViewModel = (initialListings: FormattedListing[]) => {
    const loggedIn = useAppSelector((s) => s.auth.loggedIn);
    const user = useAppSelector((s) => s.auth.user);
    const [mounted, setMounted] = useState(false);
    const [posts, setPosts] = useState<FeedPost[]>(MOCK_POSTS);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLike = (postId: string) => {
        setPosts((prev) =>
            prev.map((p) =>
                p.id === postId
                    ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
                    : p
            )
        );
    };

    const addPost = (caption: string, media: MediaPreview[]) => {
        const initials =
            user?.firstName && user?.lastName
                ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
                : (user?.email?.[0]?.toUpperCase() ?? "U");

        const newPost: FeedPost = {
            id: `post-${Date.now()}`,
            postType: "social",
            user: {
                name: user?.firstName && user?.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : (user?.email ?? "You"),
                initials,
                role: "Member",
                avatarUrl: user?.profilePhotoUrl ?? undefined,
            },
            content: caption || undefined,
            timeAgo: "Just now",
            images: media.filter((m) => m.type === "image").map((m) => m.url),
            likes: 0,
            comments: 0,
            liked: false,
        };

        setPosts((prev) => [newPost, ...prev]);
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
