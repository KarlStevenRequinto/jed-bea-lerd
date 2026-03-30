import { ProfileReview } from '@/lib/types/profile'
import { formatTimeAgo } from '@/lib/utils/formatters'

export const usePublicProfileReviewsViewModel = (reviews: ProfileReview[]) => {
    const reviewCards = reviews.map((review) => ({
        id: review.id,
        reviewerName: review.reviewerName,
        reviewerAvatar: review.reviewerAvatarUrl ?? '',
        rating: review.rating,
        helpfulCount: review.helpfulCount,
        timeAgo: formatTimeAgo(review.createdAt),
        comment: review.comment?.trim() || 'No written feedback provided.',
    }))

    const averageRating =
        reviewCards.length > 0
            ? Math.round(
                  (reviewCards.reduce((sum, review) => sum + review.rating, 0) /
                      reviewCards.length) *
                      10
              ) / 10
            : 0

    return {
        averageRating,
        reviewCards,
    }
}
