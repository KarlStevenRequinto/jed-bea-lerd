"use client";

import React from "react";
import BaseButton from "@/components/common/BaseButton";
import FormInput from "@/components/common/FormInput";
import Image from "next/image";
import { ShieldIconSvg, UploadIconSvg } from "@/components/svg-icons";
import CustomSelect from "@/components/common/CustomSelect";
import { unverified } from "@/assets/images";
import { useIdentityVerificationViewModel } from "./useViewModel";

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
    const { formData, handleInputChange, handleFileChange, handleSubmit, idDocumentOptions } = useIdentityVerificationViewModel({ onContinue });

    return (
        <div className="flex flex-col items-center text-center">
            {/* Title */}
            <h1 className="text-normal text-2xl text-foreground">Identity Verification</h1>
            <p className="mt-2 text-[13px] text-light">Help us verify your identity for security</p>

            {/* Shield Icon */}
            <div className="mt-6 mb-4">
                <Image src={unverified} alt="Info" width={76} height={76} className="mt-0.5" />
            </div>

            {/* Info Box */}
            <div className="w-full max-w-md px-4 sm:px-0 mb-6">
                <div className="rounded-md border border-[var(--color-link)] bg-[var(--color-tip-bg)] px-4 py-3 text-left">
                    <div className="flex items-start gap-2">
                        <ShieldIconSvg />
                        <div>
                            <p className="text-[11px] text-medium text-[var(--color-link)]">Why do we need this?</p>
                            <p className="text-[11px] text-[var(--color-link)] mt-1">
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
                    <CustomSelect
                        id="idDocumentType"
                        name="idDocumentType"
                        value={formData.idDocumentType}
                        onChange={handleInputChange}
                        options={idDocumentOptions}
                        placeholder="Select ID Type"
                    />
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
                    <div className="relative border-2 border-dashed border-border rounded-md px-4 py-4 hover:border-[var(--color-link)] transition-colors">
                        <input
                            id="idDocument"
                            name="idDocument"
                            type="file"
                            accept="image/*,.pdf"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-[7px] bg-[var(--color-gray-150)] flex items-center justify-center flex-shrink-0">
                                    <UploadIconSvg />
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-medium text-foreground">Choose file to upload</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        {formData.idDocument ? formData.idDocument.name : "Clear photo of your ID (front side)"}
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                className="h-[15px] w-[50px] bg-[var(--color-gray-150)] text-medium text-[8px] rounded-[5px] hover:opacity-80 transition-opacity flex-shrink-0 flex items-center justify-center"
                            >
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
