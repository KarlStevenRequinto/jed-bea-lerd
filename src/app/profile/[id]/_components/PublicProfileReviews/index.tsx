import Avatar from "@/components/common/Avatar";
import EmptyState from "@/components/common/EmptyState";
import { ProfileReview } from "@/lib/types/profile";
import { usePublicProfileReviewsViewModel } from "./useViewModel";

interface PublicProfileReviewsProps {
    reviews: ProfileReview[];
    sellerName: string;
}

const PublicProfileReviews = ({
    reviews,
    sellerName,
}: PublicProfileReviewsProps) => {
    const { averageRating, reviewCards } = usePublicProfileReviewsViewModel(reviews);

    return (
        <section className="rounded-[24px] border border-[var(--color-gray-200)] bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-[var(--color-gray-900)]">
                        Buyer reviews
                    </h2>
                    <p className="mt-1 text-sm text-[var(--color-gray-500)]">
                        Social proof for {sellerName}. Reviews help visitors convert from curiosity into intent.
                    </p>
                </div>
                <div className="rounded-2xl border border-[var(--color-green-100)] bg-[var(--color-green-50)] px-4 py-3 text-right">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-gray-400)]">
                        Average rating
                    </p>
                    <div className="mt-1 flex items-center justify-end gap-2">
                        <StarIcon filled />
                        <span className="text-2xl font-semibold text-[var(--color-gray-900)]">
                            {averageRating > 0 ? averageRating : "—"}
                        </span>
                    </div>
                </div>
            </div>

            {reviewCards.length === 0 ? (
                <EmptyState message="No public reviews yet." className="py-14" />
            ) : (
                <div className="space-y-4">
                    {reviewCards.map((review) => (
                        <article
                            key={review.id}
                            className="rounded-[20px] border border-[var(--color-gray-200)] p-4"
                        >
                            <div className="flex gap-3">
                                <Avatar
                                    name={review.reviewerName}
                                    avatarUrl={review.reviewerAvatar}
                                    size={52}
                                />
                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <div>
                                            <p className="text-sm font-semibold text-[var(--color-gray-900)]">
                                                {review.reviewerName}
                                            </p>
                                            <div className="mt-1 flex items-center gap-2">
                                                <div className="flex gap-0.5">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <StarIcon
                                                            key={star}
                                                            filled={star <= review.rating}
                                                            small
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-xs text-[var(--color-gray-500)]">
                                                    {review.timeAgo}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="rounded-full bg-[var(--color-gray-100)] px-3 py-1 text-xs font-medium text-[var(--color-gray-600)]">
                                            Helpful {review.helpfulCount}
                                        </div>
                                    </div>

                                    <p className="mt-3 text-sm leading-6 text-[var(--color-gray-700)]">
                                        {review.comment}
                                    </p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
};

const StarIcon = ({
    filled = false,
    small = false,
}: {
    filled?: boolean;
    small?: boolean;
}) => {
    const size = small ? 14 : 18;

    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "var(--color-brand)" : "none"} aria-hidden="true">
            <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                stroke={filled ? "var(--color-brand)" : "var(--color-gray-300)"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default PublicProfileReviews;
