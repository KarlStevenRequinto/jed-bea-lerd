/**
 * Home Page (Server Component)
 *
 * Fetches listings server-side from Supabase for optimal performance and SEO.
 * Data is passed down to client components via props.
 */

import { getListings } from "@/lib/services/listings";
import { formatListings } from "@/lib/utils/formatters";
import HeroSection from "./_components/HeroSection";
import ListingsSidebar from "./_components/ListingsSidebar";
import ListingsArea from "./_components/ListingsArea";

const HomePage = async () => {
    // Fetch listings server-side from Supabase
    // This runs on the server, so it's fast and SEO-friendly
    const { listings } = await getListings();

    // Format listings for UI display
    const formattedListings = formatListings(listings);

    return (
        <div className="w-full">
            {/* Hero Section */}
            <HeroSection />

            {/* Main Content Area */}
            <div className="container mx-auto px-6 py-8">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Sidebar - Filters & Ads */}
                    <ListingsSidebar />

                    {/* Right Side - Listings */}
                    <ListingsArea initialListings={formattedListings} />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
