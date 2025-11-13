"use client";

import Image from "next/image";
import homeNDriveLogo from "@/assets/images/home-n-drive-logo.png";
import { VerifyIconSvg, CheckIconSvg } from "@/components/svg-icons";
import BaseButton from "@/components/common/BaseButton";
import Link from "next/link";
import { useState, useLayoutEffect, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store";
import { login } from "@/store/authSlice";
import PersonalInformationStep, { PersonalInfoData } from "../_components/PersonalInformationStep";
import AddressInformationStep, { AddressInfoData } from "../_components/AddressInformationStep";
import IdentityVerificationStep, { IdentityVerificationData } from "../_components/IdentityVerificationStep";
import PreferencesStep, { PreferencesData } from "../_components/PreferencesStep";

const RegisterPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [verified, setVerified] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const cardRef = useRef<HTMLDivElement>(null);

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

    // Calculate progress
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

    const { percent: progress, width: progressWidth } = getProgress();

    const handleReset = () => {
        setCurrentStep(1);
        setVerified(false);
    };

    return (
        <div className="min-h-screen w-full bg-primary-foreground" role="main">
            {/* Progress bar */}
            <div className="w-full max-w-3xl mx-auto pt-4 px-4 sm:px-6">
                <div className="flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground mb-2 gap-2">
                    <span className="truncate">Step {currentStep} of 5</span>
                    <span className="whitespace-nowrap">{progress}% Complete</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div className={`h-full bg-[var(--color-success-light)] ${progressWidth} transition-all duration-500 ease-in-out`} />
                </div>
            </div>

            {/* Card with X button */}
            <div className="max-w-3xl mx-auto mt-6 mb-10 relative">
                {/* Close button - only show on step 2+ */}
                {currentStep > 1 && (
                    <button
                        onClick={handleReset}
                        className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-muted hover:bg-gray-300 flex items-center justify-center transition-colors z-20 shadow-md"
                        aria-label="Go back to step 1"
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                )}

                <div
                    ref={cardRef}
                    className="bg-white rounded-[10px] shadow-lg px-6 sm:px-10 py-10 mx-4 sm:mx-6 border-[0.2px] border-[var(--color-gray-250)]"
                >
                    {/* Logo */}
                    <div className="flex justify-center -mt-4">
                        <Image src={homeNDriveLogo} alt="HomeNDrive" width={140} height={56} className="object-contain" />
                    </div>

                    {/* Step 1: Email Verification */}
                    {currentStep === 1 && (
                        <div className="flex flex-col items-center text-center">
                            <h1 className="text-normal text-2xl text-foreground">Verify Your Email</h1>
                            <p className="mt-2 text-[13px] text-light px-4 sm:px-0">
                                We&apos;ve sent a 6-digit code to <span className="font-medium text-foreground">username@email.com</span>
                            </p>

                            {/* Center icon */}
                            <div className="mt-5 sm:mt-6 mb-2 sm:mb-3">
                                <VerifyIconSvg />
                            </div>

                            <p className="text-normal text-sm text-muted-foreground px-4 sm:px-0">Enter verification code</p>

                            {/* 6-digit code blocks (static placeholder) */}
                            <div className="mt-3 flex gap-2 sm:gap-3">
                                {[0, 2, 1, 1, 2, 5].map((d, idx) => (
                                    <div
                                        key={idx}
                                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-muted flex items-center justify-center text-foreground/80 font-semibold"
                                    >
                                        {d}
                                    </div>
                                ))}
                            </div>

                            {/* Verify button */}
                            {!verified && (
                                <div className="w-full max-w-md mt-6 px-4 sm:px-0">
                                    <BaseButton className="w-full bg-brand text-primary-foreground" onClick={() => setVerified(true)}>
                                        Verify Email
                                    </BaseButton>
                                </div>
                            )}

                            {/* Verified banner */}
                            {verified && (
                                <div className="w-full max-w-md mt-6 px-4 sm:px-0 animate-fade-in-up">
                                    <div className="rounded-[12px] border bg-[var(--color-success-muted)] border-[var(--color-success-light)] text-[var(--color-success-dark)] px-4 py-4 shadow-sm">
                                        <div className="flex items-start gap-3">
                                            <span className="mt-0.5">
                                                <CheckIconSvg />
                                            </span>

                                            <div className="text-left">
                                                <div className="text-base font-semibold">Email verified</div>
                                                <div className="text-sm opacity-80">
                                                    Your email has been successfully verified.
                                                    <br />
                                                    Proceeding to profile setup...
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Resend */}
                            {!verified && (
                                <div className="mt-4 text-normal text-sm text-muted-foreground px-4 sm:px-0">
                                    Didn&apos;t receive the code? <span className="text-brand-medium cursor-pointer">Resend code in 59s</span>
                                </div>
                            )}

                            {/* Tip */}
                            <div className="mt-4 w-full max-w-md px-4 sm:px-0">
                                <div className="text-xs rounded-md px-3 py-2 border bg-[var(--color-tip-bg)] text-[var(--color-brand-dark)] border-[var(--color-tip-border)]">
                                    <span className="font-medium">Tip:</span> Check your spam folder if you don&apos;t see the email in your inbox.
                                </div>
                            </div>

                            {/* Back to login */}
                            {!verified && (
                                <div className="w-full max-w-md mt-6 px-4 sm:px-0">
                                    <Link href="/login" className="block">
                                        <BaseButton className="w-full bg-primary-foreground text-foreground border border-border">
                                            Back to Login
                                        </BaseButton>
                                    </Link>
                                </div>
                            )}

                            {/* Registering as */}
                            <div className="mt-8 text-sm sm:text-base text-muted-foreground px-4 sm:px-0">
                                Registering as: <span className="font-semibold text-foreground">johndoe@email.com</span>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Personal Information */}
                    {currentStep === 2 && (
                        <div className="animate-fade-in-up">
                            <PersonalInformationStep email="johndoe@email.com" onContinue={handlePersonalInfoSubmit} />
                        </div>
                    )}

                    {/* Step 3: Address Information */}
                    {currentStep === 3 && (
                        <div className="animate-fade-in-up">
                            <AddressInformationStep
                                email="johndoe@email.com"
                                onContinue={handleAddressInfoSubmit}
                                onBack={handleBackToStep2}
                            />
                        </div>
                    )}

                    {/* Step 4: Identity Verification */}
                    {currentStep === 4 && (
                        <div className="animate-fade-in-up">
                            <IdentityVerificationStep
                                email="johndoe@email.com"
                                onContinue={handleIdentityVerificationSubmit}
                                onBack={handleBackToStep3}
                            />
                        </div>
                    )}

                    {/* Step 5: Preferences */}
                    {currentStep === 5 && (
                        <div className="animate-fade-in-up">
                            <PreferencesStep email="johndoe@email.com" onComplete={handlePreferencesSubmit} onBack={handleBackToStep4} />
                        </div>
                    )}
                </div>
            </div>

            {/* Footer help */}
            <div className="text-center text-sm text-muted-foreground pb-8">
                Need help? <span className="text-brand-medium cursor-pointer">Contact Support</span>
            </div>
        </div>
    );
};

export default RegisterPage;
