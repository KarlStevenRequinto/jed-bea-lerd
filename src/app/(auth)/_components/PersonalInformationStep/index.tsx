"use client";

import React, { useState } from "react";
import BaseButton from "@/components/common/BaseButton";
import FormInput from "@/components/common/FormInput";
import ProfilePhotoUpload from "@/components/common/ProfilePhotoUpload";
import DateOfBirthInput from "@/components/common/DateOfBirthInput";

interface PersonalInformationStepProps {
    email: string;
    onContinue?: (data: PersonalInfoData) => Promise<void> | void;
}

export interface PersonalInfoData {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    phoneNumber: string;
    profilePhoto?: File | null;
}

const PersonalInformationStep: React.FC<PersonalInformationStepProps> = ({ email, onContinue }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
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

    const formatPhoneNumber = (input: string): string => {
        const digits = input.replace(/\D/g, "").slice(0, 10);

        if (digits.length <= 3) return digits;
        if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
        return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
    };

    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            phoneNumber: formatPhoneNumber(e.target.value),
        }));
    };

    const isValidDateOfBirth = (dateText: string): boolean => {
        const digits = dateText.replace(/\D/g, "");
        if (digits.length !== 8) return false;

        const month = Number(digits.slice(0, 2));
        const day = Number(digits.slice(2, 4));
        const year = Number(digits.slice(4, 8));

        if (!month || !day || !year || month > 12 || day > 31 || year < 1900) return false;

        const date = new Date(year, month - 1, day);
        if (Number.isNaN(date.getTime())) return false;

        const isExactDate =
            date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
        const isNotFuture = date <= new Date();

        return isExactDate && isNotFuture;
    };

    const isValidPhilippinesNumber = (phoneText: string): boolean => {
        const digits = phoneText.replace(/\D/g, "");
        return digits.length === 10 && digits.startsWith("9");
    };

    const isFormValid =
        formData.firstName.trim().length > 0 &&
        formData.lastName.trim().length > 0 &&
        isValidDateOfBirth(formData.dateOfBirth) &&
        isValidPhilippinesNumber(formData.phoneNumber);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid || !onContinue || isSubmitting) return;

        try {
            setIsSubmitting(true);
            await onContinue(formData);
        } finally {
            setIsSubmitting(false);
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
                <DateOfBirthInput
                    id="dateOfBirth"
                    name="dateOfBirth"
                    label="Date of Birth *"
                    placeholder="MM / DD / YYYY"
                    value={formData.dateOfBirth}
                    onChange={(nextValue) => setFormData((prev) => ({ ...prev, dateOfBirth: nextValue }))}
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
                            onChange={handlePhoneNumberChange}
                            inputMode="numeric"
                            maxLength={12}
                            className="flex-1 rounded-md border border-border bg-primary-foreground px-3 py-2 text-sm text-normal placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                </div>

                {/* Continue Button */}
                <div className="pt-2">
                    <BaseButton
                        type="submit"
                        disabled={!isFormValid || isSubmitting}
                        className={`w-full text-[var(--color-white)] transition-colors ${
                            isFormValid && !isSubmitting
                                ? "bg-[var(--color-brand)] hover:bg-[var(--color-brand-medium)]"
                                : "bg-[var(--color-gray-450)] cursor-not-allowed hover:opacity-100"
                        }`}
                    >
                        {isSubmitting ? "Saving..." : "Continue"}
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
