"use client";

import React, { useState } from "react";
import BaseButton from "@/components/common/BaseButton";
import FormInput from "@/components/common/FormInput";
import Image from "next/image";
import { ShieldIconSvg } from "@/components/svg-icons";
import { unverified } from "@/assets/images";

interface IdentityVerificationStepProps {
    email: string;
    onContinue?: (data: IdentityVerificationData) => void;
    onBack?: () => void;
}

export interface IdentityVerificationData {
    idDocumentType: string;
    idNumber: string;
    idDocument?: File | null;
}

const IdentityVerificationStep: React.FC<IdentityVerificationStepProps> = ({ email, onContinue, onBack }) => {
    const [formData, setFormData] = useState<IdentityVerificationData>({
        idDocumentType: "",
        idNumber: "",
        idDocument: null,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData((prev) => ({ ...prev, idDocument: file }));
        }
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
            <h1 className="text-normal text-2xl text-foreground">Identity Verification</h1>
            <p className="mt-2 text-[13px] text-light">Help us verify your identity for security</p>

            {/* Shield Icon */}
            <div className="mt-6 mb-4">
                <div className="w-[60px] h-[60px] rounded-full bg-gradient-to-br from-[#4A9EF8] to-[#34D399] flex items-center justify-center">
                    <ShieldIconSvg />
                </div>
            </div>

            {/* Info Box */}
            <div className="w-full max-w-md px-4 sm:px-0 mb-6">
                <div className="rounded-md border border-[var(--color-link)] bg-[var(--color-tip-bg)] px-4 py-3 text-left">
                    <div className="flex items-start gap-2">
                        <Image src={unverified} alt="Info" width={20} height={20} className="mt-0.5" />
                        <div>
                            <p className="text-sm font-semibold text-[var(--color-link)]">Why do we need this?</p>
                            <p className="text-xs text-[var(--color-link)] mt-1">
                                Identity verification helps protect both buyers and sellers, prevents fraud, and builds trust in our marketplace
                                community.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 px-4 sm:px-0">
                {/* ID Document Type */}
                <div>
                    <label htmlFor="idDocumentType" className="flex items-center text-normal text-sm ml-1 mb-1">
                        <span>ID Document Type</span>
                    </label>
                    <select
                        id="idDocumentType"
                        name="idDocumentType"
                        value={formData.idDocumentType}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-border bg-primary-foreground px-3 py-2 text-sm text-normal focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                        <option value="">Select ID Type</option>
                        <option value="passport">Passport</option>
                        <option value="drivers-license">Driver&apos;s License</option>
                        <option value="national-id">National ID</option>
                        <option value="voters-id">Voter&apos;s ID</option>
                    </select>
                </div>

                {/* ID Number */}
                <FormInput
                    id="idNumber"
                    name="idNumber"
                    type="text"
                    label="ID Number"
                    placeholder="Enter your ID number"
                    value={formData.idNumber}
                    onChange={handleInputChange}
                />

                {/* Upload ID Document */}
                <div>
                    <label htmlFor="idDocument" className="flex items-center text-normal text-sm ml-1 mb-1">
                        <span>Upload ID Document</span>
                    </label>
                    <div className="relative border-2 border-dashed border-border rounded-md px-4 py-8 text-center hover:border-[var(--color-link)] transition-colors">
                        <input
                            id="idDocument"
                            name="idDocument"
                            type="file"
                            accept="image/*,.pdf"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-[var(--color-link)] flex items-center justify-center">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10 13V5M10 5L7 8M10 5L13 8M3 15H17"
                                        stroke="white"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-foreground">Choose file to upload</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {formData.idDocument ? formData.idDocument.name : "Clear photo of your ID (front side)"}
                                </p>
                            </div>
                            <button type="button" className="text-sm text-[var(--color-link)] font-medium hover:underline">
                                Browse
                            </button>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="pt-2 flex gap-3">
                    <BaseButton type="button" onClick={onBack} className="w-full bg-primary-foreground text-foreground border border-border">
                        ← Back
                    </BaseButton>
                    <BaseButton type="submit" className="w-full bg-black text-[var(--color-white)]">
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

export default IdentityVerificationStep;
