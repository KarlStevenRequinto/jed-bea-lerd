"use client";

import Image from "next/image";
import homeNDriveLogo from "@/assets/images/home-n-drive-logo.png";
import { VerifyIconSvg, CheckIconSvg } from "@/components/svg-icons";
import BaseButton from "@/components/common/BaseButton";
import Link from "next/link";
import { useState, useLayoutEffect, useRef } from "react";

const RegisterPage = () => {
    const [verified, setVerified] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!cardRef.current) return;
        const h = cardRef.current.offsetHeight;
        if (h > 0) {
            cardRef.current.style.minHeight = `${h}px`;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="min-h-screen w-full bg-primary-foreground" role="main">
            {/* Progress bar */}
            <div className="w-full max-w-3xl mx-auto pt-4 px-4 sm:px-6">
                <div className="flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground mb-2 gap-2">
                    <span className="truncate">Step 1 of 5</span>
                    <span className="whitespace-nowrap">20% Complete</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-[var(--color-success-light)] w-1/5" />
                </div>
            </div>

            {/* Card */}
            <div ref={cardRef} className="max-w-3xl mx-auto mt-6 mb-10 bg-white rounded-[12px] shadow-lg px-6 sm:px-10 py-10">
                {/* Logo */}
                <div className="flex justify-center mb-4 sm:mb-6">
                    <Image src={homeNDriveLogo} alt="HomeNDrive" width={140} height={56} className="object-contain" />
                </div>

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
                                <BaseButton className="w-full bg-primary-foreground text-foreground border border-border">Back to Login</BaseButton>
                            </Link>
                        </div>
                    )}

                    {/* Registering as */}
                    <div className="mt-4 text-sm sm:text-base text-muted-foreground px-4 sm:px-0">
                        Registering as: <span className="font-semibold text-foreground">johndoe@email.com</span>
                    </div>
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

