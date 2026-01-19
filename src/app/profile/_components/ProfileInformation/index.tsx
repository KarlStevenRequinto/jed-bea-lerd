"use client";

import { useProfileInformationViewModel } from "./useViewModel";

const ProfileInformation = () => {
    const { profileInfo } = useProfileInformationViewModel();

    return (
        <div className="bg-white rounded-lg border border-[var(--color-gray-200)] p-6">
            {/* Header */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-[var(--color-gray-900)] mb-1">
                    Profile Information
                </h3>
                <p className="text-sm text-[var(--color-gray-500)]">
                    Your personal details and bio
                </p>
            </div>

            {/* Info Fields */}
            <div className="space-y-5">
                <InfoField label="Phone" value={profileInfo.phone} />
                <InfoField label="Location" value={profileInfo.location} />
                <InfoField label="Member Since" value={profileInfo.memberSince} />
                <InfoField
                    label="About Me"
                    value={profileInfo.aboutMe}
                    isMultiline
                />
            </div>
        </div>
    );
};

interface InfoFieldProps {
    label: string;
    value: string;
    isMultiline?: boolean;
}

const InfoField = ({ label, value, isMultiline = false }: InfoFieldProps) => (
    <div className="border-b border-[var(--color-gray-200)] pb-4 last:border-b-0 last:pb-0">
        <p className="text-xs text-[var(--color-gray-500)] mb-1">{label}</p>
        <p
            className={`text-sm text-[var(--color-gray-900)] ${
                isMultiline ? "leading-relaxed" : ""
            }`}
        >
            {value}
        </p>
    </div>
);

export default ProfileInformation;
