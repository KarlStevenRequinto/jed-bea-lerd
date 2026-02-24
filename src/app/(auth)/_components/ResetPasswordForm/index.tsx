"use client";

import AuthSectionHeader from "@/components/forms/auth-section-header";
import AuthInput from "@/components/forms/auth-input";
import BaseButton from "@/components/common/BaseButton";
import SuccessAlert from "@/components/common/SuccessAlert";
import { useResetPasswordFormViewModel } from "./useViewModel";

const ResetPasswordForm: React.FC = () => {
    const { password, setPassword, confirmPassword, setConfirmPassword, loading, initializing, success, error, handleSubmit, handleGoToLogin } =
        useResetPasswordFormViewModel();

    return (
        <div className="space-y-6" aria-labelledby="set-new-password-heading">
            <AuthSectionHeader title="Set new password" subtitle="Enter your new password to complete recovery" />

            {error && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-800 border border-red-200">
                    {error}
                </div>
            )}

            {success ? (
                <>
                    <SuccessAlert title="Password reset successful" message="Your password has been updated. You can now log in with your new password." />
                    <BaseButton type="button" onClick={handleGoToLogin} className="w-full bg-brand text-primary-foreground transition-none">
                        Go to Login
                    </BaseButton>
                </>
            ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <AuthInput
                        id="password"
                        name="password"
                        type="password"
                        label="New Password"
                        placeholder="Enter new password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <AuthInput
                        id="confirm-password"
                        name="confirm-password"
                        type="password"
                        label="Confirm New Password"
                        placeholder="Re-enter new password"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <BaseButton type="submit" className="w-full bg-brand text-primary-foreground transition-none" disabled={loading || initializing}>
                        {initializing ? "Preparing..." : loading ? "Updating..." : "Update Password"}
                    </BaseButton>
                </form>
            )}
        </div>
    );
};

export default ResetPasswordForm;
