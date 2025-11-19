"use client";

import { useState } from "react";
import AuthSectionHeader from "@/components/forms/auth-section-header";
import AuthInput from "@/components/forms/auth-input";
import BaseButton from "@/components/common/BaseButton";
import SuccessAlert from "@/components/common/SuccessAlert";

interface ForgotPasswordFormProps {
    onBackToLogin: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onBackToLogin }) => {
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Handle password reset logic
        console.log("Send reset link to:", email);
        setEmailSent(true);
    };

    return (
        <div className="space-y-6" aria-labelledby="reset-password-heading">
            <AuthSectionHeader title="Reset your password" subtitle="Enter your email to receive reset instructions" />

            {emailSent ? (
                <>
                    <SuccessAlert
                        title="Email sent successfully!"
                        message={`We've sent password reset instructions to ${email}. Please check your inbox and follow the link to reset your password.`}
                    />

                    {/* Didn't receive the email? */}
                    <div className="text-left text-[var(--color-brand-darker)]">
                        <p className="text-sm font-semibold mb-1">Didn&apos;t receive the email?</p>
                        <p className="text-sm">
                            Check your spam folder or{" "}
                            <button type="button" onClick={() => setEmailSent(false)} className="underline underline-offset-2 cursor-pointer font-semibold">
                                resend the link
                            </button>
                        </p>
                    </div>

                    {/* Back to Login Button */}
                    <BaseButton
                        type="button"
                        onClick={onBackToLogin}
                        className="w-full bg-primary-foreground text-foreground border border-border hover:bg-muted transition-none"
                    >
                        Back to Login
                    </BaseButton>
                </>
            ) : (
                <>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <AuthInput
                            id="email"
                            name="email"
                            type="text"
                            label="Email Address"
                            placeholder="Enter your email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        {/* Submit Button */}
                        <BaseButton type="submit" className="w-full bg-brand text-primary-foreground transition-none">
                            Send Reset Link
                        </BaseButton>
                    </form>

                    {/* Back to Login */}
                    <p className="text-center text-sm text-muted-foreground">
                        Remember your password?{" "}
                        <button type="button" onClick={onBackToLogin} className="font-medium text-brand-medium hover:underline cursor-pointer">
                            Back to login
                        </button>
                    </p>
                </>
            )}
        </div>
    );
};

export default ForgotPasswordForm;
