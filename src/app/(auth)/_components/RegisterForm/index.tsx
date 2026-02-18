"use client";

import { useState } from "react";
import AuthSectionHeader from "@/components/forms/auth-section-header";
import AuthInput from "@/components/forms/auth-input";
import BaseButton from "@/components/common/BaseButton";
import Captcha from "../Captcha";
import { useRegisterFormViewModel } from "./useViewModel";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        verificationCode,
        setVerificationCode,
        setCaptchaId,
        isValidating,
        errors,
        handleRegister
    } = useRegisterFormViewModel();
    const router = useRouter();
    const [submitError, setSubmitError] = useState("");
    const [emailServerError, setEmailServerError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError("");
        setEmailServerError("");
        const isValid = await handleRegister(e);

        if (!isValid) return;

        setIsSubmitting(true);
        try {
            const response = await fetch("/api/auth/send-verification", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (!response.ok) {
                const serverMessage = data.error || "Failed to start registration";
                if (response.status === 409) {
                    setEmailServerError(serverMessage);
                } else {
                    setSubmitError(serverMessage);
                }
                return;
            }

            router.push("/register");
        } catch {
            setSubmitError("Failed to start registration");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="space-y-3" onSubmit={handleSubmit}>
            <AuthSectionHeader title="Create an account" subtitle="Join HomeNDrive today" className="mb-1" />
            <div className="[&>*+*]:mt-2.5">
                <div>
                    <AuthInput
                        id="email"
                        name="email"
                        type="email"
                        label="Email *"
                        placeholder="Enter your email address"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (emailServerError) setEmailServerError("");
                        }}
                        required
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                    {emailServerError && <p className="mt-1 text-xs text-red-600">{emailServerError}</p>}
                </div>
                <div>
                    <AuthInput
                        id="passwordReg"
                        name="passwordReg"
                        type="password"
                        label="Password *"
                        placeholder="Enter your password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
                </div>
                <div>
                    <AuthInput
                        id="passwordConfirm"
                        name="passwordConfirm"
                        type="password"
                        label="Confirm Password *"
                        placeholder="Re-enter your password"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    {errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>}
                </div>
                <Captcha
                    value={verificationCode}
                    onChange={setVerificationCode}
                    error={errors.verificationCode}
                    onCaptchaIdChange={setCaptchaId}
                />
            </div>
            <BaseButton
                type="submit"
                className="w-full bg-[var(--color-success-light)] text-primary-foreground"
                aria-label="Create account"
                disabled={isValidating || isSubmitting}
            >
                {isValidating ? "Validating..." : isSubmitting ? "Sending code..." : "Create Account"}
            </BaseButton>
            {submitError && <p className="mt-1 text-xs text-red-600">{submitError}</p>}
            <div className="space-y-2 text-center text-[12px]">
                <p className="text-muted-foreground">
                    By signing up, you agree to our{" "}
                    <a href="#" className="font-semibold" style={{ color: "var(--color-brand-dark)" }}>
                        Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="font-semibold" style={{ color: "var(--color-brand-dark)" }}>
                        Privacy Policy
                    </a>
                </p>
                <p className="text-muted-foreground">
                    Already have an account?{" "}
                    <a href="/login" className="font-semibold" style={{ color: "var(--color-brand-dark)" }}>
                        Log in
                    </a>
                </p>
            </div>
        </form>
    );
};

export default RegisterForm;
