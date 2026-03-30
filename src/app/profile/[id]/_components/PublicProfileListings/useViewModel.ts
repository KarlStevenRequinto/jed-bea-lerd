'use client'

import { useState } from 'react'
import { useSlidingTabs } from '@/hooks/useSlidingTabs'
import { ProfileListing } from '@/lib/types/profile'

export type PublicProfileListingTab = 'all' | 'properties' | 'vehicles'

export const usePublicProfileListingsViewModel = (listings: ProfileListing[]) => {
    const [activeTab, setActiveTab] = useState<PublicProfileListingTab>('all')

    const activeIndex =
        activeTab === 'all' ? 0 : activeTab === 'properties' ? 1 : 2

    const { highlightTransform, transitionClasses, highlightWidth } = useSlidingTabs({
        tabCount: 3,
        activeIndex,
        paddingOffset: 6,
        gap: 0,
    })

    const counts = {
        all: listings.length,
        properties: listings.filter((listing) => listing.category === 'property').length,
        vehicles: listings.filter((listing) => listing.category === 'vehicle').length,
    }

    const filteredListings = listings.filter((listing) => {
        if (activeTab === 'all') return true
        if (activeTab === 'properties') return listing.category === 'property'
        return listing.category === 'vehicle'
    })

    return {
        activeTab,
        filteredListings,
        counts,
        highlightTransform,
        transitionClasses,
        highlightWidth,
        handleTabChange: setActiveTab,
    }
}
