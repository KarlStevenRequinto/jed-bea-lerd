import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store";
import { login } from "@/store/authSlice";
import { PersonalInfoData } from "../_components/PersonalInformationStep";
import { AddressInfoData } from "../_components/AddressInformationStep";
import { IdentityVerificationData } from "../_components/IdentityVerificationStep";
import { PreferencesData } from "../_components/PreferencesStep";

export const useRegisterViewModel = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [verified, setVerified] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const cardRef = useRef<HTMLDivElement>(null);

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
        setCurrentStep(3);
    };

    const handleAddressInfoSubmit = (data: AddressInfoData) => {
        console.log("Address info submitted:", data);
        setCurrentStep(4);
    };

    const handleIdentityVerificationSubmit = (data: IdentityVerificationData) => {
        console.log("Identity verification submitted:", data);
        setCurrentStep(5);
    };

    const handlePreferencesSubmit = (data: PreferencesData) => {
        console.log("Preferences submitted:", data);
        console.log("Registration complete! Redirecting to homepage...");
        dispatch(login());
        router.push("/");
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
