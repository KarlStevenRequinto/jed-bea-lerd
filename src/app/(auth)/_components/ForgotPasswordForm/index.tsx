"use client";

import Link from "next/link";
import AuthSectionHeader from "@/components/forms/auth-section-header";
import AuthInput from "@/components/forms/auth-input";
import BaseButton from "@/components/common/BaseButton";
import SuccessAlert from "@/components/common/SuccessAlert";
import { useForgotPasswordFormViewModel } from "./useViewModel";

interface ForgotPasswordFormProps {
    onBackToLogin?: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onBackToLogin }) => {
    const { emailSent, setEmailSent, email, loading, cooldownSeconds, error, handleBackToLogin, handleSubmit, handleEmailChange } =
        useForgotPasswordFormViewModel({
        onBackToLogin,
    });

    return (
        <div className="space-y-6" aria-labelledby="reset-password-heading">
            <AuthSectionHeader title="Reset your password" subtitle="Enter your email to receive reset instructions" />

            {error && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-800 border border-red-200">
                    {error}
                </div>
            )}

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
                            <button
                                type="button"
                                onClick={() => setEmailSent(false)}
                                className="underline underline-offset-2 cursor-pointer font-semibold disabled:no-underline disabled:opacity-70 disabled:cursor-not-allowed"
                                disabled={cooldownSeconds > 0}
                            >
                                {cooldownSeconds > 0 ? `resend in ${cooldownSeconds}s` : "resend the link"}
                            </button>
                        </p>
                    </div>

                    {/* Back to Login Button */}
                    <BaseButton
                        type="button"
                        onClick={handleBackToLogin}
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
                            type="email"
                            label="Email Address"
                            placeholder="Enter your email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => handleEmailChange(e.target.value)}
                            required
                        />

                        {/* Submit Button */}
                        <BaseButton
                            type="submit"
                            className="w-full bg-brand text-primary-foreground transition-none"
                            disabled={loading || cooldownSeconds > 0}
                        >
                            {loading ? "Sending..." : cooldownSeconds > 0 ? `Try again in ${cooldownSeconds}s` : "Send Reset Link"}
                        </BaseButton>
                    </form>

                    {/* Back to Login */}
                    <p className="text-center text-sm text-muted-foreground">
                        Remember your password?{" "}
                        <Link href="/login" className="font-medium text-brand-medium hover:underline cursor-pointer">
                            Back to login
                        </Link>
                    </p>
                </>
            )}
        </div>
    );
};

export default ForgotPasswordForm;
