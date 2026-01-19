"use client";

import Image from "next/image";
import { useReviewsAndRatingsViewModel, Review } from "./useViewModel";

const ReviewsAndRatings = () => {
    const {
        reviews,
        averageRating,
        totalReviews,
        handleHelpful,
        handleSeeMore,
    } = useReviewsAndRatingsViewModel();

    return (
        <div className="bg-white rounded-lg border border-[var(--color-gray-200)] p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-[var(--color-gray-900)] mb-1">
                        Reviews & Ratings
                    </h3>
                    <p className="text-sm text-[var(--color-gray-500)]">
                        What others say about me
                    </p>
                </div>
                <div className="text-right">
                    <div className="flex items-center gap-1">
                        <StarIcon filled />
                        <span className="text-lg font-semibold text-[var(--color-gray-900)]">
                            {averageRating}
                        </span>
                    </div>
                    <p className="text-sm text-[var(--color-gray-500)]">
                        {totalReviews} Reviews
                    </p>
                </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-5">
                {reviews.map((review, index) => (
                    <div key={review.id}>
                        <ReviewCard review={review} onHelpful={handleHelpful} />
                        {index < reviews.length - 1 && (
                            <div className="border-b border-[var(--color-gray-200)] mt-5" />
                        )}
                    </div>
                ))}
            </div>

            {/* See More */}
            <button
                onClick={handleSeeMore}
                className="w-full text-center text-sm text-[var(--color-gray-900)] hover:text-[var(--color-brand)] mt-6 py-2 font-medium hover:underline"
            >
                See more
            </button>
        </div>
    );
};

interface ReviewCardProps {
    review: Review;
    onHelpful: (id: string) => void;
}

const ReviewCard = ({ review, onHelpful }: ReviewCardProps) => {
    // Get initials from name for avatar placeholder
    const initials = review.reviewerName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    return (
        <div>
            {/* Reviewer Info */}
            <div className="flex items-start gap-3 mb-3">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full overflow-hidden bg-[var(--color-gray-200)] flex-shrink-0 flex items-center justify-center">
                    {review.reviewerAvatar ? (
                        <Image
                            src={review.reviewerAvatar}
                            alt={review.reviewerName}
                            width={48}
                            height={48}
                            className="object-cover w-full h-full"
                        />
                    ) : (
                        <span className="text-base font-medium text-[var(--color-gray-600)]">
                            {initials}
                        </span>
                    )}
                </div>

                {/* Name, Rating, Time */}
                <div className="flex-1">
                    <p className="text-sm font-semibold text-[var(--color-gray-900)]">
                        {review.reviewerName}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                        {/* Star Rating */}
                        <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <StarIcon key={star} filled={star <= review.rating} small />
                            ))}
                        </div>
                        <span className="text-xs text-[var(--color-gray-500)]">
                            {review.timeAgo}
                        </span>
                    </div>
                </div>
            </div>

            {/* Comment */}
            <p className="text-sm text-[var(--color-gray-700)] leading-relaxed mb-3">
                {review.comment}
            </p>

            {/* Helpful Button */}
            <button
                onClick={() => onHelpful(review.id)}
                className="flex items-center gap-2 text-xs text-[var(--color-gray-500)] hover:text-[var(--color-gray-700)] transition-colors"
            >
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 10V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V12C2 11.4696 2.21071 10.9609 2.58579 10.5858C2.96086 10.2107 3.46957 10 4 10H7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <span>Helpful ({review.helpfulCount})</span>
            </button>
        </div>
    );
};

interface StarIconProps {
    filled?: boolean;
    small?: boolean;
}

const StarIcon = ({ filled = false, small = false }: StarIconProps) => {
    const size = small ? 14 : 18;
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={filled ? "#FFC107" : "none"}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                stroke={filled ? "#FFC107" : "var(--color-gray-300)"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default ReviewsAndRatings;
