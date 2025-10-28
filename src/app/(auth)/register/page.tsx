"use client";

import Image from "next/image";
import homeNDriveLogo from "@/assets/images/home-n-drive-logo.png";
import { VerifyIconSvg } from "@/components/svg-icons";
import BaseButton from "@/components/common/BaseButton";
import Link from "next/link";

const RegisterPage = () => {
    return (
        <div className="min-h-screen w-full bg-primary-foreground" role="main">
            {/* Progress bar */}
            <div className="w-full max-w-3xl mx-auto pt-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span>Step 1 of 5</span>
                    <span>20% Complete</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-[var(--color-success-light)]" style={{ width: "20%" }} />
                </div>
            </div>

            {/* Card */}
            <div className="max-w-3xl mx-auto mt-6 mb-10 bg-white rounded-[12px] shadow-lg px-6 sm:px-10 py-10">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <Image src={homeNDriveLogo} alt="HomeNDrive" width={140} height={56} className="object-contain" />
                </div>

                <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-semibold text-foreground">Verify Your Email</h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        We&apos;ve sent a 6-digit code to <span className="font-medium text-foreground">username@email.com</span>
                    </p>

                    {/* Center icon */}
                    <div className="mt-6 mb-3">
                        <VerifyIconSvg />
                    </div>

                    <p className="text-sm text-muted-foreground">Enter verification code</p>

                    {/* 6-digit code blocks (static placeholder) */}
                    <div className="mt-3 flex gap-2">
                        {[0, 2, 1, 1, 2, 5].map((d, idx) => (
                            <div key={idx} className="w-10 h-10 rounded-md bg-muted flex items-center justify-center text-foreground/80 font-semibold">
                                {d}
                            </div>
                        ))}
                    </div>

                    {/* Verify button */}
                    <div className="w-full max-w-md mt-6">
                        <BaseButton className="w-full bg-brand text-primary-foreground">Verify Email</BaseButton>
                    </div>

                    {/* Resend */}
                    <div className="mt-4 text-sm text-muted-foreground">
                        Didn&apos;t receive the code? <span className="text-brand-medium cursor-pointer">Resend code in 59s</span>
                    </div>

                    {/* Tip */}
                    <div className="mt-4 w-full max-w-md">
                        <div className="text-xs text-muted-foreground bg-muted rounded-md px-3 py-2">
                            Tip: Check your spam folder if you don&apos;t see the email in your inbox.
                        </div>
                    </div>

                    {/* Back to login */}
                    <div className="w-full max-w-md mt-6">
                        <Link href="/login" className="block">
                            <BaseButton className="w-full bg-primary-foreground text-foreground border border-border">
                                ← Back to Login
                            </BaseButton>
                        </Link>
                    </div>

                    {/* Registering as */}
                    <div className="mt-4 text-sm text-muted-foreground">
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
