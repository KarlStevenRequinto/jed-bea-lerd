"use client";

import AuthSectionHeader from "@/components/forms/AuthSectionHeader";
import AuthInput from "@/components/forms/AuthInput";
import BaseButton from "@/components/common/BaseButton";

interface ForgotPasswordFormProps {
    onBackToLogin: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onBackToLogin }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Handle password reset logic
        console.log("Send reset link");
    };

    return (
        <div className="space-y-6" aria-labelledby="reset-password-heading">
            <AuthSectionHeader title="Reset your password" subtitle="Enter your email to receive reset instructions" />

            <form className="space-y-4" onSubmit={handleSubmit}>
                <AuthInput id="email" name="email" type="email" label="Email Address" placeholder="Enter your email" autoComplete="email" required />

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
        </div>
    );
};

export default ForgotPasswordForm;
