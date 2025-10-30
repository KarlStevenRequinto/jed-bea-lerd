"use client";

import React from "react";
import { UploadIconSvg } from "@/components/svg-icons";
import Image from "next/image";
import userDefault from "@/assets/images/user-default.png";

interface ProfilePhotoUploadProps {
    photoUrl?: string | null;
    onPhotoChange?: (file: File) => void;
}

const ProfilePhotoUpload: React.FC<ProfilePhotoUploadProps> = ({ photoUrl, onPhotoChange }) => {
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
                <div className="w-[108px] h-[108px] rounded-full bg-muted flex items-center justify-center overflow-hidden">
                    {photoUrl ? (
                        <Image src={photoUrl} alt="Profile photo" width={108} height={108} className="w-full h-full object-cover" />
                    ) : (
                        <Image src={userDefault} alt="Default profile photo" width={108} height={108} className="w-full h-full object-cover" />
                    )}
                </div>

                {/* Upload Button */}
                <label
                    htmlFor="profile-photo-upload"
                    className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[var(--color-link)] flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                >
                    <UploadIconSvg />
                    <input id="profile-photo-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </label>
            </div>

            {/* Label */}
            <p className="mt-2 text-light text-[13px]">Upload your profile photo</p>
        </div>
    );
};

export default ProfilePhotoUpload;
