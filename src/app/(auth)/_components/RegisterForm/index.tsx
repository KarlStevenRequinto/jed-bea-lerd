"use client";

import { EyeIconSvg, RefreshIconSvg, ShieldIconSvg } from "@/components/svg-icons";
import AuthSectionHeader from "@/components/forms/AuthSectionHeader";
import AuthInput from "@/components/forms/AuthInput";
import BaseButton from "@/components/common/BaseButton";
import { useRegisterFormViewModel } from "./useViewModel";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
    const { email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, verificationCode, setVerificationCode, errors, handleRegister } =
        useRegisterFormViewModel();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const isValid = handleRegister(e);

        if (isValid) {
            // Pass email and password to the /register route via URL params
            router.push(`/register?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <AuthSectionHeader title="Create an account" subtitle="Join HomeNDrive today" className="mb-2" />
            <div className="[&>*+*]:mt-3">
                <div>
                    <AuthInput
                        id="email"
                        name="email"
                        type="email"
                        label="Email *"
                        placeholder="Enter your email address"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
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
                        rightIcon={
                            <span className="opacity-70 cursor-pointer">
                                <EyeIconSvg />
                            </span>
                        }
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
                        rightIcon={
                            <span className="opacity-70 cursor-pointer">
                                <EyeIconSvg />
                            </span>
                        }
                        required
                    />
                    {errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>}
                </div>
                <div className="space-y-1.5">
                    <label className="inline-flex items-center gap-2 text-sm text-foreground">
                        <ShieldIconSvg />
                        <span>Verification Code *</span>
                    </label>
                    <div className="rounded-md border border-border bg-muted h-24 flex items-center justify-center select-none text-4xl tracking-widest text-muted-foreground">
                        7 0 6 D E
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            className="flex-1 rounded-md border border-border bg-primary-foreground px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                            placeholder="Enter the code above"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="flex items-center justify-center w-10 h-10 rounded-md border border-border bg-primary-foreground opacity-70 hover:opacity-100 cursor-pointer"
                            aria-label="Refresh code"
                        >
                            <RefreshIconSvg />
                        </button>
                    </div>
                    {errors.verificationCode && <p className="text-xs text-red-600">{errors.verificationCode}</p>}
                    <p className="text-[12px] text-muted-foreground">Enter the code shown above to verify you&apos;re human</p>
                </div>
            </div>
            <BaseButton type="submit" className="w-full bg-[var(--color-success-light)] text-primary-foreground" aria-label="Create account">
                Create Account
            </BaseButton>
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
