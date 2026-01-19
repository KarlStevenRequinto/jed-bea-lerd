import ProfileHeader from "./_components/ProfileHeader";
import ProfileInformation from "./_components/ProfileInformation";
import VerificationStatus from "./_components/VerificationStatus";
import Connections from "./_components/Connections";
import ReviewsAndRatings from "./_components/ReviewsAndRatings";
import RecentlyViewed from "./_components/RecentlyViewed";
import SponsoredAd from "./_components/SponsoredAd";
import MyListings from "./_components/MyListings";

// Profile image path - using the provided image
const PROFILE_IMAGE = "/images/profile-user.png";

export default function ProfilePage() {
    return (
        <div className="min-h-screen bg-[var(--color-gray-50)]">
            <div className="container mx-auto px-4 md:px-6 py-8">
                {/* Page Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-[var(--color-gray-900)] mb-1">
                        My Profile
                    </h1>
                    <p className="text-sm text-[var(--color-gray-500)]">
                        Manage your profile information and settings
                    </p>
                </div>

                {/* Main Content Layout */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Column - Main Content */}
                    <div className="flex-1 space-y-6">
                        {/* Profile Header */}
                        <ProfileHeader profileImage={PROFILE_IMAGE} />

                        {/* Profile Information */}
                        <ProfileInformation />

                        {/* Reviews & Ratings */}
                        <ReviewsAndRatings />

                        {/* My Listings */}
                        <MyListings />
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="w-full lg:w-[320px] space-y-6">
                        {/* Verification Status */}
                        <VerificationStatus />

                        {/* Connections */}
                        <Connections />

                        {/* Recently Viewed */}
                        <RecentlyViewed />

                        {/* Sponsored Ad */}
                        <SponsoredAd />
                    </div>
                </div>
            </div>
        </div>
    );
}
