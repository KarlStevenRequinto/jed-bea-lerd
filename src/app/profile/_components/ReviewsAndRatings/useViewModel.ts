import { ProfileReview } from '@/lib/types/profile'
import { formatTimeAgo } from '@/lib/utils/formatters'

export interface Review {
    id: string
    reviewerName: string
    reviewerAvatar: string
    rating: number
    timeAgo: string
    comment: string
    helpfulCount: number
}

export const useReviewsAndRatingsViewModel = (initialReviews: ProfileReview[]) => {
    const reviews: Review[] = initialReviews.map((r) => ({
        id: r.id,
        reviewerName: r.reviewerName,
        reviewerAvatar: r.reviewerAvatarUrl ?? '',
        rating: r.rating,
        timeAgo: formatTimeAgo(r.createdAt),
        comment: r.comment ?? '',
        helpfulCount: r.helpfulCount,
    }))

    const averageRating =
        reviews.length > 0
            ? Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10) / 10
            : 0

    const totalReviews = reviews.length

    const handleHelpful = (_reviewId: string) => {
        // TODO: Implement helpful vote via API
    }

    const handleSeeMore = () => {
        // TODO: Navigate to full reviews page
    }

    return {
        reviews,
        averageRating,
        totalReviews,
        handleHelpful,
        handleSeeMore,
    }
}
