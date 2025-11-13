import { useState } from "react";
import { IdentityVerificationData } from "./index";

interface UseIdentityVerificationViewModelProps {
    onContinue?: (data: IdentityVerificationData) => void;
}

export const useIdentityVerificationViewModel = ({ onContinue }: UseIdentityVerificationViewModelProps) => {
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

    const idDocumentOptions = [
        { value: "driver's license", label: "Driver's License" },
        { value: "passport", label: "Passport" },
        { value: "national-id", label: "National ID" },
    ];

    return {
        formData,
        handleInputChange,
        handleFileChange,
        handleSubmit,
        idDocumentOptions,
    };
};
