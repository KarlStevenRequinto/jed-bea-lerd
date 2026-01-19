import { useState } from "react";

export interface Review {
    id: string;
    reviewerName: string;
    reviewerAvatar: string;
    rating: number;
    timeAgo: string;
    comment: string;
    helpfulCount: number;
}

const mockReviews: Review[] = [
    {
        id: "1",
        reviewerName: "Adrian Ramos",
        reviewerAvatar: "",
        rating: 5,
        timeAgo: "2 weeks ago",
        comment:
            "Jamie was extremely helpful and professional throughout the entire buying process. Highly recommend!",
        helpfulCount: 12,
    },
    {
        id: "2",
        reviewerName: "Nicole Aquino",
        reviewerAvatar: "",
        rating: 5,
        timeAgo: "1 month ago",
        comment:
            "Great communication and very responsive. Made the whole experience smooth and stress-free.",
        helpfulCount: 8,
    },
    {
        id: "3",
        reviewerName: "Vincent Morales",
        reviewerAvatar: "",
        rating: 4,
        timeAgo: "2 months ago",
        comment:
            "Very knowledgeable about the market. Helped me find exactly what I was looking for.",
        helpfulCount: 5,
    },
];

export const useReviewsAndRatingsViewModel = () => {
    const [reviews] = useState(mockReviews);

    const averageRating = 4.7;
    const totalReviews = 5;

    const handleHelpful = (reviewId: string) => {
        // TODO: Implement helpful functionality
        console.log("Helpful clicked for review:", reviewId);
    };

    const handleSeeMore = () => {
        // TODO: Navigate to full reviews page
        console.log("See more reviews clicked");
    };

    return {
        reviews,
        averageRating,
        totalReviews,
        handleHelpful,
        handleSeeMore,
    };
};
