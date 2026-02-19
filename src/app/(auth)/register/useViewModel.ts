import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store";
import { getCurrentUser, registerUser, saveAddressInfo, savePersonalInfo } from "@/lib/auth/actions";
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
    const [verificationCode, setVerificationCode] = useState("");
    const [verificationError, setVerificationError] = useState("");
    const [countdown, setCountdown] = useState(0);
    const [hasSignedUp, setHasSignedUp] = useState(false);
    const [registrationEmail, setRegistrationEmail] = useState("");
    const cardRef = useRef<HTMLDivElement>(null);

    const [registrationData, setRegistrationData] = useState<Partial<RegistrationRequest>>({});

    useLayoutEffect(() => {
        if (!cardRef.current) return;
        const h = cardRef.current.offsetHeight;
        if (h > 0) {
            cardRef.current.style.minHeight = `${h}px`;
        }
    }, []);

    useEffect(() => {
        const loadRegistrationContext = async () => {
            try {
                const response = await fetch("/api/auth/register/context");
                if (!response.ok) {
                    router.push("/login");
                    return;
                }

                const data = await response.json();
                const email = data.email || "";

                if (!email) {
                    router.push("/login");
                    return;
                }

                setRegistrationEmail(email);
                setRegistrationData((prev) => ({ ...prev, email }));
                setHasSignedUp(true);
                setCountdown(59);
            } catch {
                router.push("/login");
            }
        };

        loadRegistrationContext();
    }, [router]);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    useEffect(() => {
        if (verified) {
            const timer = setTimeout(() => {
                setCurrentStep(2);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [verified]);

    const handlePersonalInfoSubmit = async (data: PersonalInfoData) => {
        const result = await savePersonalInfo(dispatch, {
            firstName: data.firstName,
            lastName: data.lastName,
            dateOfBirth: data.dateOfBirth,
            phoneNumber: data.phoneNumber,
            profilePhotoUrl: data.profilePhoto ? URL.createObjectURL(data.profilePhoto) : undefined,
        });

        if (!result.success) {
            alert(result.error || "Failed to save personal information. Please try again.");
            return;
        }

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

    const handleAddressInfoSubmit = async (data: AddressInfoData) => {
        const payload = {
            streetAddress: `${data.streetAddress1}${data.streetAddress2 ? ", " + data.streetAddress2 : ""}`,
            city: data.city,
            province: data.province,
            zipCode: data.zipCode,
            country: data.country,
        };

        const result = await saveAddressInfo(dispatch, payload);

        if (!result.success) {
            alert(result.error || "Failed to save address information. Please try again.");
            return;
        }

        setRegistrationData((prev) => ({
            ...prev,
            streetAddress: payload.streetAddress,
            city: data.city,
            province: data.province,
            zipCode: data.zipCode,
            country: data.country,
        }));
        setCurrentStep(4);
    };

    const handleIdentityVerificationSubmit = (data: IdentityVerificationData) => {
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
        const finalData: RegistrationRequest = {
            ...(registrationData as RegistrationRequest),
            interests: data.interests,
            bio: data.bio,
        };

        setLoading(true);

        try {
            const result = await registerUser(dispatch, finalData);

            if (result.success) {
                await fetch("/api/auth/register/context", { method: "DELETE" });
                await getCurrentUser(dispatch);
                router.push("/");
            } else {
                alert(result.error || "Registration failed. Please try again.");
            }
        } catch {
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
        fetch("/api/auth/register/context", { method: "DELETE" }).catch(() => undefined);
        router.push("/login");
    };

    const handleSendVerification = async () => {
        if (!registrationEmail) return;

        setLoading(true);
        setVerificationError("");

        try {
            const response = await fetch("/api/auth/send-verification", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: registrationEmail, isResend: true }),
            });

            const data = await response.json();

            if (!response.ok) {
                setVerificationError(data.error || "Failed to send verification code");
                return;
            }

            if (!hasSignedUp) {
                setHasSignedUp(true);
            }

            setCountdown(59);
        } catch {
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

        if (!registrationEmail) {
            setVerificationError("Missing registration session. Please restart registration.");
            return;
        }

        setLoading(true);
        setVerificationError("");

        try {
            const response = await fetch("/api/auth/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: registrationEmail,
                    token: verificationCode,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setVerificationError(data.error || "Invalid verification code");
                return;
            }

            setVerified(true);
        } catch {
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
