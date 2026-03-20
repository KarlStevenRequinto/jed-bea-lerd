"use client";

import Image from "next/image";
import { useProfileHeaderViewModel } from "./useViewModel";
import CameraIconSvg from "@/components/svg-icons/camera";
import VerifiedBadgeIconSvg from "@/components/svg-icons/verified-badge";
import { ProfileData, ProfileStats } from "@/lib/types/profile";

interface ProfileHeaderProps {
    profile: ProfileData | null;
    stats: ProfileStats;
}

const ProfileHeader = ({ profile, stats }: ProfileHeaderProps) => {
    const {
        name,
        email,
        isVerified,
        profileImage,
        isUploading,
        uploadError,
        fileInputRef,
        handleEditPhoto,
        handleFileChange,
        stats: displayStats,
    } = useProfileHeaderViewModel(profile, stats);

    return (
        <div className="bg-white rounded-lg border border-[var(--color-gray-200)] p-6">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Profile Image */}
                <div className="flex-shrink-0">
                    <div className="relative">
                        <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-2 border-[var(--color-brand-light)]">
                            <Image
                                src={profileImage}
                                alt={name}
                                width={120}
                                height={120}
                                className="object-cover w-full h-full"
                            />
                            {/* Uploading overlay */}
                            {isUploading && (
                                <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center">
                                    <svg
                                        className="animate-spin text-white"
                                        width="28"
                                        height="28"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-label="Uploading"
                                    >
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                                    </svg>
                                </div>
                            )}
                        </div>

                        {/* Camera button */}
                        <button
                            type="button"
                            onClick={handleEditPhoto}
                            disabled={isUploading}
                            aria-label="Change profile photo"
                            className="absolute bottom-1 right-1 w-8 h-8 bg-white rounded-full border border-[var(--color-gray-300)] flex items-center justify-center hover:bg-[var(--color-gray-50)] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <CameraIconSvg size={16} />
                        </button>

                        {/* Hidden file input */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,image/webp"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>

                    {/* Upload error */}
                    {uploadError && (
                        <p className="mt-2 text-xs text-red-500 max-w-[120px] text-center leading-tight">
                            {uploadError}
                        </p>
                    )}
                </div>

                {/* User Info */}
                <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-2xl font-semibold text-[var(--color-gray-900)]">{name}</h2>
                        {isVerified && <VerifiedBadgeIconSvg />}
                    </div>
                    <p className="text-sm text-[var(--color-gray-500)] mb-4">{email}</p>

                    {/* Stats */}
                    <div className="flex gap-6">
                        <StatItem label="Followers" value={displayStats.followers} />
                        <StatItem label="Following" value={displayStats.following} />
                        <StatItem label="Listings" value={displayStats.listings} />
                        <StatItem label="Reviews" value={displayStats.reviews} />
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
