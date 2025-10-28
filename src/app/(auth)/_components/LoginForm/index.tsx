"use client";

import Image from "next/image";
import { eye } from "@/assets/icons/images";
import { GoogleIconSvg, FacebookIconSvg } from "@/components/svg-icons";
import AuthSectionHeader from "@/components/forms/AuthSectionHeader";
import AuthInput from "@/components/forms/AuthInput";
import BaseButton from "@/components/common/BaseButton";
import { useLoginFormViewModel } from "./useViewModel";

const LoginForm = () => {
    const { handleLogin } = useLoginFormViewModel();

    return (
        <div className="space-y-6" aria-labelledby="welcome-heading">
            <AuthSectionHeader title="Welcome Back!" subtitle="Sign in to your account to continue" />

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()} aria-describedby="identifier-help password-help">
                <AuthInput id="identifier" name="identifier" type="text" label="Email" placeholder="Enter your email" autoComplete="email" />
                <p id="identifier-help" className="sr-only">
                    Enter the email you used to register.
                </p>
                <AuthInput
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    rightIcon={
                        <Image src={eye} alt="Toggle password visibility" width={20} height={20} className="h-5 w-5 object-contain opacity-70" />
                    }
                />

                {/* Remember me */}
                <div className="flex items-center justify-between text-light text-sm">
                    <label className="inline-flex items-center gap-2 text-foreground">
                        <input type="checkbox" className="h-4 w-4 focus:ring-primary/20" aria-label="Remember me" />
                        Remember Me
                    </label>
                    <a href="#" className="hover:underline cursor-pointer" style={{ color: "var(--color-link)" }} aria-label="Forgot password">
                        Forgot password?
                    </a>
                </div>

                {/* Submit: instantly hide when parent tab != login via aria-hidden upstream */}
                <BaseButton
                    type="button"
                    onClick={handleLogin}
                    className="w-full bg-brand text-primary-foreground transition-none"
                >
                    Log In
                </BaseButton>
            </form>

            {/* Divider */}
            <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                    <div className="h-px w-full bg-border" />
                </div>
                <div className="relative mx-auto w-fit bg-primary-foreground px-3 text-xs text-muted-foreground">Or continue with</div>
            </div>

            {/* Social buttons */}
            <div className="flex items-center justify-center gap-6">
                <BaseButton
                    leftIcon={<GoogleIconSvg />}
                    className="rounded-[10px] border-1 border-success text-normal text-success-dark w-[212px] h-10"
                >
                    Google
                </BaseButton>
                <BaseButton leftIcon={<FacebookIconSvg />} className="rounded-[10px] border-1 border-brand text-normal text-brand w-[212px] h-10">
                    Facebook
                </BaseButton>
            </div>

            <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <a className="font-medium text-brand-medium hover:underline cursor-pointer" href="#">
                    Register now
                </a>
            </p>
        </div>
    );
};

export default LoginForm;
