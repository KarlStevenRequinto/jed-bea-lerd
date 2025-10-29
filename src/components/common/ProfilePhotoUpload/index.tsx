"use client";

import React from "react";
import { UploadIconSvg } from "@/components/svg-icons";
import Image from "next/image";

interface ProfilePhotoUploadProps {
    photoUrl?: string | null;
    onPhotoChange?: (file: File) => void;
}

const ProfilePhotoUpload: React.FC<ProfilePhotoUploadProps> = ({
    photoUrl,
    onPhotoChange,
}) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && onPhotoChange) {
            onPhotoChange(file);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="relative">
                {/* Avatar Circle */}
                <div className="w-[72px] h-[72px] rounded-full bg-muted flex items-center justify-center overflow-hidden">
                    {photoUrl ? (
                        <Image
                            src={photoUrl}
                            alt="Profile photo"
                            width={72}
                            height={72}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <svg
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="20" cy="14" r="6" fill="#9CA3AF" />
                            <path
                                d="M8 32C8 26.4772 12.4772 22 18 22H22C27.5228 22 32 26.4772 32 32V34H8V32Z"
                                fill="#9CA3AF"
                            />
                        </svg>
                    )}
                </div>

                {/* Upload Button */}
                <label
                    htmlFor="profile-photo-upload"
                    className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-brand flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity [&_svg]:invert"
                >
                    <UploadIconSvg />
                    <input
                        id="profile-photo-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </label>
            </div>

            {/* Label */}
            <p className="mt-2 text-sm text-muted-foreground">
                Upload your profile photo
            </p>
        </div>
    );
};

export default ProfilePhotoUpload;
