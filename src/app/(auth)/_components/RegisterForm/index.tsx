"use client";

import Image from "next/image";
import { help, shield } from "@/assets/icons/images";
import { EyeIconSvg, RefreshIconSvg, HelpIconSvg } from "@/components/svg-icons";
import AuthSectionHeader from "@/components/forms/AuthSectionHeader";
import AuthInput from "@/components/forms/AuthInput";
import BaseButton from "@/components/common/BaseButton";
import { useRegisterFormViewModel } from "./useViewModel";

const RegisterForm = () => {
    const { handleRegister } = useRegisterFormViewModel();

    return (
        <form className="space-y-4" onSubmit={handleRegister}>
            <AuthSectionHeader title="Create an account" subtitle="Join HomeNDrive today" className="mb-2" />
            <div className="[&>*+*]:mt-3">
                <AuthInput id="email" name="email" type="email" label="Email *" placeholder="Enter your email address" autoComplete="email" />
                <AuthInput
                    id="passwordReg"
                    name="passwordReg"
                    type="password"
                    label="Password *"
                    placeholder="Enter your password"
                    autoComplete="new-password"
                    rightIcon={
                        <span className="opacity-70 cursor-pointer">
                            <EyeIconSvg />
                        </span>
                    }
                />
                <AuthInput
                    id="passwordConfirm"
                    name="passwordConfirm"
                    type="password"
                    label="Confirm Password *"
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                    rightIcon={
                        <span className="opacity-70 cursor-pointer">
                            <EyeIconSvg />
                        </span>
                    }
                />
                <div className="space-y-1.5">
                    <label className="inline-flex items-center gap-2 text-sm text-foreground">
                        <Image src={shield} alt="shield" width={16} height={16} className="h-4 w-4" />
                        <span>Verification Code *</span>
                    </label>
                    <div className="rounded-md border border-border bg-muted h-24 flex items-center justify-center select-none text-4xl tracking-widest text-muted-foreground">
                        7 0 6 D E
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            className="flex-1 rounded-md border border-border bg-primary-foreground px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                            placeholder="Enter the code above"
                        />
                        <button
                            type="button"
                            className="flex items-center justify-center w-10 h-10 rounded-md border border-border bg-primary-foreground opacity-70 hover:opacity-100 cursor-pointer"
                            aria-label="Refresh code"
                        >
                            <RefreshIconSvg />
                        </button>
                    </div>
                    <p className="text-[12px] text-muted-foreground">Enter the code shown above to verify you&apos;re human</p>
                </div>
            </div>
            <BaseButton type="submit" className="w-full bg-[var(--color-success-light)] text-primary-foreground">
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
                    <a href="#" className="font-semibold" style={{ color: "var(--color-brand-dark)" }}>
                        Log in
                    </a>
                </p>
            </div>
        </form>
    );
};

export default RegisterForm;
