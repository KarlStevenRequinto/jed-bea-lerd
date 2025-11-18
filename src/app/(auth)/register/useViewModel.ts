import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store";
import { registerUser } from "@/lib/auth/actions";
import { PersonalInfoData } from "../_components/PersonalInformationStep";
import { AddressInfoData } from "../_components/AddressInformationStep";
import { IdentityVerificationData } from "../_components/IdentityVerificationStep";
import { PreferencesData } from "../_components/PreferencesStep";
import { RegistrationRequest } from "@/lib/types/auth";

export const useRegisterViewModel = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [verified, setVerified] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    // Store all registration data
    const [registrationData, setRegistrationData] = useState<Partial<RegistrationRequest>>({
        email: "johndoe@email.com", // TODO: Get from Step 1 form
        password: "password123", // TODO: Get from Step 1 form
    });

    // Set minimum height for card to prevent layout shifts
    useLayoutEffect(() => {
        if (!cardRef.current) return;
        const h = cardRef.current.offsetHeight;
        if (h > 0) {
            cardRef.current.style.minHeight = `${h}px`;
        }
    }, []);

    // Handle transition from step 1 to step 2
    useEffect(() => {
        if (verified) {
            const timer = setTimeout(() => {
                setCurrentStep(2);
            }, 2000); // 2 second delay before transitioning
            return () => clearTimeout(timer);
        }
    }, [verified]);

    const handlePersonalInfoSubmit = (data: PersonalInfoData) => {
        console.log("Personal info submitted:", data);
        setRegistrationData((prev) => ({
            ...prev,
            firstName: data.firstName,
            lastName: data.lastName,
            dateOfBirth: data.dateOfBirth,
            phoneNumber: data.phoneNumber,
            profilePhotoUrl: data.profilePhotoUrl,
        }));
        setCurrentStep(3);
    };

    const handleAddressInfoSubmit = (data: AddressInfoData) => {
        console.log("Address info submitted:", data);
        setRegistrationData((prev) => ({
            ...prev,
            streetAddress: data.streetAddress,
            city: data.city,
            province: data.province,
            zipCode: data.zipCode,
            country: data.country,
        }));
        setCurrentStep(4);
    };

    const handleIdentityVerificationSubmit = (data: IdentityVerificationData) => {
        console.log("Identity verification submitted:", data);
        setRegistrationData((prev) => ({
            ...prev,
            idType: data.idType as "passport" | "drivers_license" | "national_id",
            idNumber: data.idNumber,
            documentUrl: data.documentUrl,
        }));
        setCurrentStep(5);
    };

    const handlePreferencesSubmit = async (data: PreferencesData) => {
        console.log("Preferences submitted:", data);

        // Merge all data together
        const finalData: RegistrationRequest = {
            ...(registrationData as RegistrationRequest),
            interests: data.interests,
            bio: data.bio,
        };

        console.log("Final registration data:", finalData);
        setLoading(true);

        try {
            // Submit to API
            const result = await registerUser(dispatch, finalData);

            if (result.success) {
                console.log("Registration successful!");
                alert(result.message || "Registration successful! Welcome to HomeNDrive.");
                router.push("/login"); // Redirect to login to sign in with new account
            } else {
                console.error("Registration failed:", result.error);
                alert(result.error || "Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Registration error:", error);
            alert("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleBackToStep2 = () => {
        setCurrentStep(2);
    };

    const handleBackToStep3 = () => {
        setCurrentStep(3);
    };

    const handleBackToStep4 = () => {
        setCurrentStep(4);
    };

    const handleReset = () => {
        setCurrentStep(1);
        setVerified(false);
    };

    const getProgress = () => {
        switch (currentStep) {
            case 1:
                return { percent: 20, width: "w-1/5" };
            case 2:
                return { percent: 40, width: "w-2/5" };
            case 3:
                return { percent: 60, width: "w-3/5" };
            case 4:
                return { percent: 80, width: "w-4/5" };
            case 5:
                return { percent: 100, width: "w-full" };
            default:
                return { percent: 20, width: "w-1/5" };
        }
    };

    return {
        verified,
        setVerified,
        currentStep,
        cardRef,
        handlePersonalInfoSubmit,
        handleAddressInfoSubmit,
        handleIdentityVerificationSubmit,
        handlePreferencesSubmit,
        handleBackToStep2,
        handleBackToStep3,
        handleBackToStep4,
        handleReset,
        getProgress,
    };
};
