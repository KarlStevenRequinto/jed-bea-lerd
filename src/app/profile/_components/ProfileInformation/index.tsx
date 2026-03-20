"use client";

import { useProfileInformationViewModel } from "./useViewModel";
import { ProfileData } from "@/lib/types/profile";

interface ProfileInformationProps {
    profile: ProfileData | null;
}

const ProfileInformation = ({ profile }: ProfileInformationProps) => {
    const {
        profileInfo,
        isEditing,
        isSaving,
        error,
        form,
        handleEdit,
        handleCancel,
        handleChange,
        handleSave,
    } = useProfileInformationViewModel(profile);

    return (
        <div className="bg-white rounded-lg border border-[var(--color-gray-200)] p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-[var(--color-gray-900)] mb-1">
                        Profile Information
                    </h3>
                    <p className="text-sm text-[var(--color-gray-500)]">
                        Your personal details and bio
                    </p>
                </div>
                {!isEditing && (
                    <button
                        type="button"
                        onClick={handleEdit}
                        className="text-sm font-medium text-[var(--color-brand)] hover:text-[var(--color-brand-dark)] transition-colors cursor-pointer"
                    >
                        Edit
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="space-y-4">
                    {/* Name row */}
                    <div className="grid grid-cols-2 gap-3">
                        <FormField label="First Name">
                            <input
                                type="text"
                                value={form.firstName}
                                onChange={(e) => handleChange("firstName", e.target.value)}
                                placeholder="First name"
                                className="w-full text-sm border border-[var(--color-gray-300)] rounded-lg px-3 py-2 text-[var(--color-gray-900)] placeholder:text-[var(--color-gray-400)] focus:outline-none focus:border-[var(--color-brand)] transition-colors"
                            />
                        </FormField>
                        <FormField label="Last Name">
                            <input
                                type="text"
                                value={form.lastName}
                                onChange={(e) => handleChange("lastName", e.target.value)}
                                placeholder="Last name"
                                className="w-full text-sm border border-[var(--color-gray-300)] rounded-lg px-3 py-2 text-[var(--color-gray-900)] placeholder:text-[var(--color-gray-400)] focus:outline-none focus:border-[var(--color-brand)] transition-colors"
                            />
                        </FormField>
                    </div>

                    <FormField label="Phone">
                        <input
                            type="text"
                            value={form.phoneNumber}
                            onChange={(e) => handleChange("phoneNumber", e.target.value)}
                            placeholder="e.g. 09171234567"
                            className="w-full text-sm border border-[var(--color-gray-300)] rounded-lg px-3 py-2 text-[var(--color-gray-900)] placeholder:text-[var(--color-gray-400)] focus:outline-none focus:border-[var(--color-brand)] transition-colors"
                        />
                    </FormField>

                    <div className="grid grid-cols-2 gap-3">
                        <FormField label="City">
                            <input
                                type="text"
                                value={form.city}
                                onChange={(e) => handleChange("city", e.target.value)}
                                placeholder="City"
                                className="w-full text-sm border border-[var(--color-gray-300)] rounded-lg px-3 py-2 text-[var(--color-gray-900)] placeholder:text-[var(--color-gray-400)] focus:outline-none focus:border-[var(--color-brand)] transition-colors"
                            />
                        </FormField>
                        <FormField label="Province">
                            <input
                                type="text"
                                value={form.province}
                                onChange={(e) => handleChange("province", e.target.value)}
                                placeholder="Province"
                                className="w-full text-sm border border-[var(--color-gray-300)] rounded-lg px-3 py-2 text-[var(--color-gray-900)] placeholder:text-[var(--color-gray-400)] focus:outline-none focus:border-[var(--color-brand)] transition-colors"
                            />
                        </FormField>
                    </div>

                    <FormField label="Country">
                        <input
                            type="text"
                            value={form.country}
                            onChange={(e) => handleChange("country", e.target.value)}
                            placeholder="Country"
                            className="w-full text-sm border border-[var(--color-gray-300)] rounded-lg px-3 py-2 text-[var(--color-gray-900)] placeholder:text-[var(--color-gray-400)] focus:outline-none focus:border-[var(--color-brand)] transition-colors"
                        />
                    </FormField>

                    <FormField label="About Me">
                        <textarea
                            value={form.bio}
                            onChange={(e) => handleChange("bio", e.target.value)}
                            placeholder="Tell others a bit about yourself..."
                            rows={3}
                            className="w-full text-sm border border-[var(--color-gray-300)] rounded-lg px-3 py-2 text-[var(--color-gray-900)] placeholder:text-[var(--color-gray-400)] focus:outline-none focus:border-[var(--color-brand)] transition-colors resize-none"
                        />
                    </FormField>

                    {error && (
                        <p className="text-sm text-red-500">{error}</p>
                    )}

                    <div className="flex gap-3 pt-1">
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={isSaving}
                            className="flex-1 py-2 text-sm font-semibold text-white bg-[var(--color-brand)] rounded-lg hover:bg-[var(--color-brand-dark)] disabled:opacity-50 transition-colors cursor-pointer"
                        >
                            {isSaving ? "Saving..." : "Save Changes"}
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={isSaving}
                            className="flex-1 py-2 text-sm font-semibold text-[var(--color-gray-700)] bg-[var(--color-gray-100)] rounded-lg hover:bg-[var(--color-gray-200)] disabled:opacity-50 transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-5">
                    <InfoField label="Phone" value={profileInfo.phone} />
                    <InfoField label="Location" value={profileInfo.location} />
                    <InfoField label="Member Since" value={profileInfo.memberSince} />
                    <InfoField label="About Me" value={profileInfo.aboutMe} isMultiline />
                </div>
            )}
        </div>
    );
};

interface FormFieldProps {
    label: string;
    children: React.ReactNode;
}

const FormField = ({ label, children }: FormFieldProps) => (
    <div>
        <label className="block text-xs text-[var(--color-gray-500)] mb-1">{label}</label>
        {children}
    </div>
);

interface InfoFieldProps {
    label: string;
    value: string;
    isMultiline?: boolean;
}

const InfoField = ({ label, value, isMultiline = false }: InfoFieldProps) => (
    <div className="border-b border-[var(--color-gray-200)] pb-4 last:border-b-0 last:pb-0">
        <p className="text-xs text-[var(--color-gray-500)] mb-1">{label}</p>
        <p className={`text-sm text-[var(--color-gray-900)] ${isMultiline ? "leading-relaxed" : ""}`}>
            {value}
        </p>
    </div>
);

export default ProfileInformation;
