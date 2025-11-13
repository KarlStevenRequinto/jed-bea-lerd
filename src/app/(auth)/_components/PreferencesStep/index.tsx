"use client";

import React, { useState } from "react";
import BaseButton from "@/components/common/BaseButton";
import Image from "next/image";
import { verified } from "@/assets/images";
import { HomeIconSvg, ApartmentIconSvg, CityBuildingsIconSvg, SedanIconSvg, SuvIconSvg, ConvertibleIconSvg } from "@/components/svg-icons";

interface PreferencesStepProps {
    email: string;
    onComplete?: (data: PreferencesData) => void;
    onBack?: () => void;
}

export interface PreferencesData {
    interests: string[];
    bio?: string;
}

const PreferencesStep: React.FC<PreferencesStepProps> = ({ email, onComplete, onBack }) => {
    const [formData, setFormData] = useState<PreferencesData>({
        interests: [],
        bio: "",
    });

    const handleInterestToggle = (interest: string) => {
        setFormData((prev) => {
            const interests = prev.interests.includes(interest) ? prev.interests.filter((i) => i !== interest) : [...prev.interests, interest];
            return { ...prev, interests };
        });
    };

    const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, bio: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onComplete) {
            onComplete(formData);
        }
    };

    const interestOptions = [
        { id: "houses", label: "Houses", icon: HomeIconSvg },
        { id: "sedans", label: "Sedans", icon: SedanIconSvg },
        { id: "apartments", label: "Apartments", icon: ApartmentIconSvg },
        { id: "suvs", label: "SUVs", icon: SuvIconSvg },
        { id: "commercial", label: "Commercial", icon: CityBuildingsIconSvg },
        { id: "luxury", label: "Luxury", icon: ConvertibleIconSvg },
    ];

    return (
        <div className="flex flex-col items-center text-center">
            {/* Title */}
            <h1 className="text-normal text-2xl text-foreground">Identity Verification</h1>
            <p className="mt-2 text-[13px] text-light">Help us verify your identity for security</p>

            {/* Verified Icon */}
            <div className="mt-6 mb-4">
                <Image src={verified} alt="Verified" width={76} height={76} className="mt-0.5" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 px-4 sm:px-0">
                {/* Interests Selection */}
                <div>
                    <label className="flex items-center text-normal text-sm ml-1 mb-2">
                        <span>What are you interested in?</span>
                        <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        {interestOptions.map((option) => {
                            const Icon = option.icon;
                            const isSelected = formData.interests.includes(option.id);
                            return (
                                <button
                                    key={option.id}
                                    type="button"
                                    onClick={() => handleInterestToggle(option.id)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-md border transition-all ${
                                        isSelected
                                            ? "border-[var(--color-link)] bg-[var(--color-brand-muted)]"
                                            : "border-border bg-primary-foreground hover:border-[var(--color-link)]"
                                    }`}
                                >
                                    <Icon />
                                    <span className="text-sm text-foreground font-normal">{option.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Bio (Optional) */}
                <div>
                    <label htmlFor="bio" className="flex items-center text-normal text-sm ml-1 mb-2">
                        <span>Bio (Optional)</span>
                    </label>
                    <textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleBioChange}
                        placeholder="Tell us a bit about yourself..."
                        maxLength={500}
                        className="w-full rounded-md border border-border bg-primary-foreground px-3 py-2 text-sm text-normal focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none h-24"
                    />
                    <div className="text-xs text-muted-foreground text-left mt-1 ml-1">{formData?.bio?.length}/500 characters</div>
                </div>

                {/* Buttons */}
                <div className="pt-2 flex gap-3">
                    <BaseButton type="button" onClick={onBack} className="w-full bg-primary-foreground text-foreground border border-border">
                        ← Back
                    </BaseButton>
                    <BaseButton type="submit" className="w-full bg-[var(--color-success)] text-[var(--color-white)]">
                        Complete Setup →
                    </BaseButton>
                </div>
            </form>

            {/* Registering as */}
            <div className="mt-6 text-sm text-muted-foreground">
                Registering as: <span className="font-semibold text-foreground">{email}</span>
            </div>
        </div>
    );
};

export default PreferencesStep;
