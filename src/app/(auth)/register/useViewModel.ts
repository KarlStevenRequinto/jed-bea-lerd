import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/store";
import { registerUser } from "@/lib/auth/actions";
import { PersonalInfoData } from "../_components/PersonalInformationStep";
import { AddressInfoData } from "../_components/AddressInformationStep";
import { IdentityVerificationData } from "../_components/IdentityVerificationStep";
import { PreferencesData } from "../_components/PreferencesStep";
import { RegistrationRequest } from "@/lib/types/auth";

export const useRegisterViewModel = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();
    const [verified, setVerified] = useState(false);
    const [currentStep, setCurrentStep] = useState(1); // Start at 1 (email verification)
    const [loading, setLoading] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");
    const [verificationError, setVerificationError] = useState("");
    const [countdown, setCountdown] = useState(0);
    const cardRef = useRef<HTMLDivElement>(null);

    // Get email and password from URL params
    const emailFromUrl = searchParams.get("email") || "";
    const passwordFromUrl = searchParams.get("password") || "";

    // Store all registration data
    const [registrationData, setRegistrationData] = useState<Partial<RegistrationRequest>>({
        email: emailFromUrl,
        password: passwordFromUrl,
    });

    // Set minimum height for card to prevent layout shifts
    useLayoutEffect(() => {
        if (!cardRef.current) return;
        const h = cardRef.current.offsetHeight;
        if (h > 0) {
            cardRef.current.style.minHeight = `${h}px`;
        }
    }, []);

    // Send initial verification email when component mounts
    useEffect(() => {
        if (emailFromUrl) {
            handleSendVerification();
        }
    }, [emailFromUrl]);

    // Countdown timer for resend
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    // Handle transition from step 1 (verification) to step 2 (personal info)
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
            profilePhotoUrl: data.profilePhoto ? URL.createObjectURL(data.profilePhoto) : undefined,
        }));
        setCurrentStep(3);
    };

    const handleAddressInfoSubmit = (data: AddressInfoData) => {
        console.log("Address info submitted:", data);
        setRegistrationData((prev) => ({
            ...prev,
            streetAddress: `${data.streetAddress1}${data.streetAddress2 ? ', ' + data.streetAddress2 : ''}`,
            city: data.city,
            province: data.province,
            zipCode: data.zipCode,
            country: data.country,
        }));
        setCurrentStep(4);
    };

    const handleIdentityVerificationSubmit = (data: IdentityVerificationData) => {
        console.log("Identity verification submitted:", data);

        // Map the idDocumentType to match the database enum
        let idType: "passport" | "drivers_license" | "national_id" = "passport";
        if (data.idDocumentType === "Driver's License") {
            idType = "drivers_license";
        } else if (data.idDocumentType === "National ID") {
            idType = "national_id";
        } else if (data.idDocumentType === "Passport") {
            idType = "passport";
        }

        setRegistrationData((prev) => ({
            ...prev,
            idType,
            idNumber: data.idNumber,
            documentUrl: data.idDocument ? URL.createObjectURL(data.idDocument) : undefined,
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
        router.push("/login");
    };

    const handleSendVerification = async () => {
        if (!emailFromUrl) return;

        setLoading(true);
        setVerificationError("");

        try {
            const response = await fetch("/api/auth/send-verification", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: emailFromUrl,
                    password: passwordFromUrl // Send password to store temporarily
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setVerificationError(data.error || "Failed to send verification code");
                return;
            }

            setCountdown(59); // Start 59 second countdown
        } catch (error) {
            console.error("Send verification error:", error);
            setVerificationError("Failed to send verification code");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyCode = async () => {
        if (!verificationCode || verificationCode.length !== 6) {
            setVerificationError("Please enter the 6-digit code");
            return;
        }

        setLoading(true);
        setVerificationError("");

        try {
            const response = await fetch("/api/auth/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: emailFromUrl,
                    token: verificationCode,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setVerificationError(data.error || "Invalid verification code");
                return;
            }

            // Verification successful
            setVerified(true);
        } catch (error) {
            console.error("Verification error:", error);
            setVerificationError("Failed to verify code");
        } finally {
            setLoading(false);
        }
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
        registrationData,
        loading,
        verificationCode,
        setVerificationCode,
        verificationError,
        countdown,
        handlePersonalInfoSubmit,
        handleAddressInfoSubmit,
        handleIdentityVerificationSubmit,
        handlePreferencesSubmit,
        handleBackToStep2,
        handleBackToStep3,
        handleBackToStep4,
        handleReset,
        handleSendVerification,
        handleVerifyCode,
        getProgress,
    };
};
