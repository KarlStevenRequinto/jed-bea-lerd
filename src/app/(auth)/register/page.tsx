"use client";

import Image from "next/image";
import homeNDriveLogo from "@/assets/images/home-n-drive-logo.png";
import { VerifyIconSvg, CheckIconSvg } from "@/components/svg-icons";
import BaseButton from "@/components/common/BaseButton";
import Link from "next/link";
import PersonalInformationStep from "../_components/PersonalInformationStep";
import AddressInformationStep from "../_components/AddressInformationStep";
import IdentityVerificationStep from "../_components/IdentityVerificationStep";
import PreferencesStep from "../_components/PreferencesStep";
import ProgressBar from "@/components/common/ProgressBar";
import SuccessAlert from "@/components/common/SuccessAlert";
import { useRegisterViewModel } from "./useViewModel";

const RegisterPage = () => {
    const {
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
    } = useRegisterViewModel();

    const { percent: progress, width: progressWidth } = getProgress();

    return (
        <div className="min-h-screen w-full bg-primary-foreground" role="main">
            {/* Progress bar */}
            <ProgressBar currentStep={currentStep} totalSteps={5} percent={progress} width={progressWidth} />

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
                                <SuccessAlert
                                    title="Email verified"
                                    message="Your email has been successfully verified. Proceeding to profile setup..."
                                    className="mt-6"
                                />
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
                            <AddressInformationStep email="johndoe@email.com" onContinue={handleAddressInfoSubmit} onBack={handleBackToStep2} />
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
