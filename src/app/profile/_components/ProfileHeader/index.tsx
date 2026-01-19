"use client";

import Image from "next/image";
import { useProfileHeaderViewModel } from "./useViewModel";
import CameraIconSvg from "@/components/svg-icons/camera";

interface ProfileHeaderProps {
    profileImage?: string;
}

const ProfileHeader = ({ profileImage }: ProfileHeaderProps) => {
    const { userData, handleEditPhoto } = useProfileHeaderViewModel();

    const imageToUse = profileImage || userData.profileImage;

    return (
        <div className="bg-white rounded-lg border border-[var(--color-gray-200)] p-6">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Profile Image */}
                <div className="flex-shrink-0">
                    <div className="relative">
                        <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-2 border-[var(--color-brand-light)]">
                            <Image src={imageToUse} alt={userData.name} width={120} height={120} className="object-cover w-full h-full" />
                        </div>
                        {/* Camera Icon */}
                        <button
                            onClick={handleEditPhoto}
                            className="absolute bottom-1 right-1 w-8 h-8 bg-white rounded-full border border-[var(--color-gray-300)] flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                            <CameraIconSvg size={16} />
                        </button>
                    </div>
                </div>

                {/* User Info */}
                <div className="flex flex-col justify-center">
                    {/* Name with Verified Badge */}
                    <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-2xl font-semibold text-[var(--color-gray-900)]">{userData.name}</h2>
                        {userData.isVerified && (
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10 0L12.2451 2.90983L16.1803 2.36068L15.4 6.24L18.0902 9.04L14.55 10.8L14.4721 14.8944L10.5 13.8L6.52786 14.8944L6.45 10.8L2.90983 9.04L5.6 6.24L4.81966 2.36068L8.75486 2.90983L10 0Z"
                                    fill="var(--color-brand)"
                                />
                                <path d="M7 10L9 12L13 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        )}
                    </div>

                    {/* Role and Email */}
                    <p className="text-sm text-[var(--color-gray-500)] mb-1">{userData.role}</p>
                    <p className="text-sm text-[var(--color-gray-500)] mb-4">{userData.email}</p>

                    {/* Stats */}
                    <div className="flex gap-6">
                        <StatItem label="Followers" value={userData.stats.followers} />
                        <StatItem label="Following" value={userData.stats.following} />
                        <StatItem label="Listings" value={userData.stats.listings} />
                        <StatItem label="Reviews" value={userData.stats.reviews} />
                    </div>
                </div>
            </div>
        </div>
    );
};

interface StatItemProps {
    label: string;
    value: number;
}

const StatItem = ({ label, value }: StatItemProps) => (
    <div className="text-center">
        <p className="text-lg font-semibold text-[var(--color-gray-900)]">{value}</p>
        <p className="text-xs text-[var(--color-gray-500)]">{label}</p>
    </div>
);

export default ProfileHeader;
