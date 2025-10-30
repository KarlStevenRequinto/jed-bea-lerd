"use client";

import React, { useState } from "react";
import BaseButton from "@/components/common/BaseButton";
import FormInput from "@/components/common/FormInput";
import Image from "next/image";
import { location } from "@/assets/images";

interface AddressInformationStepProps {
    email: string;
    onContinue?: (data: AddressInfoData) => void;
    onBack?: () => void;
}

export interface AddressInfoData {
    streetAddress1: string;
    streetAddress2: string;
    city: string;
    province: string;
    zipCode: string;
    country: string;
}

const AddressInformationStep: React.FC<AddressInformationStepProps> = ({ email, onContinue, onBack }) => {
    const [formData, setFormData] = useState<AddressInfoData>({
        streetAddress1: "",
        streetAddress2: "",
        city: "",
        province: "",
        zipCode: "",
        country: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
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
            <h1 className="text-normal text-2xl text-foreground">Address Information</h1>
            <p className="mt-2 text-[13px] text-light">Where are you located?</p>

            {/* Location Icon */}
            <div className="mt-6 mb-6">
                <Image src={location} alt="Location" width={76} height={76} className="object-contain" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 px-4 sm:px-0">
                {/* Street Address 1 */}
                <FormInput
                    id="streetAddress1"
                    name="streetAddress1"
                    type="text"
                    label="Street Address 1 *"
                    placeholder="12-34 ABC Street"
                    value={formData.streetAddress1}
                    onChange={handleInputChange}
                />

                {/* Street Address 2 */}
                <FormInput
                    id="streetAddress2"
                    name="streetAddress2"
                    type="text"
                    label="Street Address 2"
                    placeholder="XYZ Subdivision"
                    value={formData.streetAddress2}
                    onChange={handleInputChange}
                />

                {/* City and Province Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <FormInput
                        id="city"
                        name="city"
                        type="text"
                        label="City *"
                        placeholder="Bacolod"
                        value={formData.city}
                        onChange={handleInputChange}
                    />
                    <FormInput
                        id="province"
                        name="province"
                        type="text"
                        label="Province *"
                        placeholder="Negros Occidental"
                        value={formData.province}
                        onChange={handleInputChange}
                    />
                </div>

                {/* ZIP Code and Country Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <FormInput
                        id="zipCode"
                        name="zipCode"
                        type="text"
                        label="ZIP Code *"
                        placeholder="6100"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                    />
                    <FormInput
                        id="country"
                        name="country"
                        type="text"
                        label="Country *"
                        placeholder="Philippines"
                        value={formData.country}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Buttons */}
                <div className="pt-2 flex gap-3">
                    <BaseButton type="button" onClick={onBack} className="w-full bg-primary-foreground text-foreground border border-border">
                        ← Back
                    </BaseButton>
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

export default AddressInformationStep;
