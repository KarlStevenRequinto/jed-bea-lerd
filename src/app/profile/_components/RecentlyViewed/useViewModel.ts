import { ProfileRecentlyViewed } from '@/lib/types/profile'

export type { ProfileRecentlyViewed as RecentlyViewedItem }

export const useRecentlyViewedViewModel = (initialItems: ProfileRecentlyViewed[]) => {
    const handleViewHistory = () => {
        // TODO: Navigate to full history page
    }

    const handleItemClick = (_itemId: string) => {
        // TODO: Navigate to listing details
    }

    return {
        items: initialItems,
        handleViewHistory,
        handleItemClick,
    }
}
