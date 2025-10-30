"use client";

import React, { useState } from "react";
import { BirthDateIconSvg } from "@/components/svg-icons";
import BaseButton from "@/components/common/BaseButton";
import FormInput from "@/components/common/FormInput";
import ProfilePhotoUpload from "@/components/common/ProfilePhotoUpload";

interface PersonalInformationStepProps {
    email: string;
    onContinue?: (data: PersonalInfoData) => void;
}

export interface PersonalInfoData {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    phoneNumber: string;
    profilePhoto?: File | null;
}

const PersonalInformationStep: React.FC<PersonalInformationStepProps> = ({ email, onContinue }) => {
    const [formData, setFormData] = useState<PersonalInfoData>({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        phoneNumber: "",
        profilePhoto: null,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePhotoChange = (file: File) => {
        setFormData((prev) => ({ ...prev, profilePhoto: file }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onContinue) {
            onContinue(formData);
        }
    };

    return (
        <div className="flex flex-col items-center text-center">
            {/* Title */}
            <h1 className="text-normal text-2xl text-foreground">Personal Information</h1>
            <p className="mt-2 text-[13px] text-light">Let&apos;s get to know you better</p>

            {/* Profile Photo Upload */}
            <div className="mt-6 mb-6">
                <ProfilePhotoUpload onPhotoChange={handlePhotoChange} />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 px-4 sm:px-0">
                {/* First Name and Last Name Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <FormInput
                        id="firstName"
                        name="firstName"
                        type="text"
                        label="First Name *"
                        placeholder="Enter First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                    />
                    <FormInput
                        id="lastName"
                        name="lastName"
                        type="text"
                        label="Last Name *"
                        placeholder="Enter Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Date of Birth */}
                <FormInput
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="text"
                    label="Date of Birth *"
                    placeholder="MM / DD / YYYY"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    leftIcon={<BirthDateIconSvg />}
                />

                {/* Phone Number with Country Code */}
                <div>
                    <label htmlFor="phoneNumber" className="flex items-center text-normal text-sm ml-1">
                        <span>Phone Number *</span>
                    </label>
                    <div className="flex gap-2">
                        <div className="flex items-center justify-center px-3 py-2 rounded-md border border-border bg-primary-foreground text-sm text-normal min-w-[60px]">
                            +63
                        </div>
                        <input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="tel"
                            placeholder="XXX XXX XXXX"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            className="flex-1 rounded-md border border-border bg-primary-foreground px-3 py-2 text-sm text-normal placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                </div>

                {/* Continue Button */}
                <div className="pt-2">
                    <BaseButton type="submit" className="w-full bg-[var(--color-gray-450)] text-[var(--color-white)]">
                        Continue →
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

export default PersonalInformationStep;
