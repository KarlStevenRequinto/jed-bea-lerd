"use client";

import Image from "next/image";
import { useProfileHeaderViewModel } from "./useViewModel";

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
                            <Image
                                src={imageToUse}
                                alt={userData.name}
                                width={120}
                                height={120}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        {/* Camera Icon */}
                        <button
                            onClick={handleEditPhoto}
                            className="absolute bottom-1 right-1 w-8 h-8 bg-white rounded-full border border-[var(--color-gray-300)] flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z"
                                    stroke="#666666"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z"
                                    stroke="#666666"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* User Info */}
                <div className="flex flex-col justify-center">
                    {/* Name with Verified Badge */}
                    <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-2xl font-semibold text-[var(--color-gray-900)]">
                            {userData.name}
                        </h2>
                        {userData.isVerified && (
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10 0L12.2451 2.90983L16.1803 2.36068L15.4 6.24L18.0902 9.04L14.55 10.8L14.4721 14.8944L10.5 13.8L6.52786 14.8944L6.45 10.8L2.90983 9.04L5.6 6.24L4.81966 2.36068L8.75486 2.90983L10 0Z"
                                    fill="var(--color-brand)"
                                />
                                <path
                                    d="M7 10L9 12L13 8"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        )}
                    </div>

                    {/* Role and Email */}
                    <p className="text-sm text-[var(--color-gray-500)] mb-1">
                        {userData.role}
                    </p>
                    <p className="text-sm text-[var(--color-gray-500)] mb-4">
                        {userData.email}
                    </p>

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
