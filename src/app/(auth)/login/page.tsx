"use client";

import Image from "next/image";
import { shield, help, refresh } from "@/assets/icons/images";
import { countryHomes, eye, teslaBlue, protect } from "@/assets/icons/images";
import homeNDriveLogo from "@/assets/images/home-n-drive-logo.png";
import IconBadge from "@/components/common/IconBadge";
import { useState } from "react";

const LoginPage = () => {
    const [tab, setTab] = useState<"login" | "register">("login");
    const [animationKey] = useState(() => Date.now());

    return (
        <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2" role="main">
            {/* Left panel with branded gradient background */}
            <aside
                className="hidden lg:flex min-h-screen w-full"
                style={{
                    background: "linear-gradient(90deg, var(--color-brand-light) 0%, var(--color-white) 90%)",
                }}
                aria-label="Promotional content"
            >
                <div key={animationKey} className="mx-auto w-full max-w-[720px] p-10 flex flex-col items-center justify-center gap-6">
                    {/* Logo */}
                    <div className="flex flex-col items-center mt-6 gap-1">
                        <div className="animate-fade-in-up" style={{ animationDelay: "0s" }}>
                            <Image src={homeNDriveLogo} alt="HomeNDrive" width={200} height={80} className="object-contain" priority />
                        </div>
                        <p className="text-normal text-center-flex text-[15px] animate-fade-in-up -mt-6" style={{ animationDelay: "0.1s" }}>
                            Your trusted platform for vehicles and properties.
                        </p>
                    </div>

                    {/* Hero image */}
                    <div className="w-full max-w-[640px] overflow-hidden animate-fade-in-up" style={{ animationDelay: "0.2s" }} aria-hidden>
                        <Image
                            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80"
                            alt="Property with vehicle"
                            width={1600}
                            height={1066}
                            className="h-[420px] w-full object-cover rounded-[10px]"
                            priority
                        />
                    </div>

                    {/* Features */}
                    <div className="mt-2 grid grid-cols-3 gap-8">
                        <div style={{ animationDelay: "0.1s" }}>
                            <IconBadge
                                icon={<Image src={teslaBlue} alt="Tesla" width={24} height={24} className="h-6 w-6 object-contain" priority />}
                                label="Quality Vehicles"
                            />
                        </div>
                        <div style={{ animationDelay: "0.2s" }}>
                            <IconBadge
                                icon={<Image src={protect} alt="Protect" width={24} height={24} className="h-6 w-6 object-contain" priority />}
                                label="Secure and Trusted"
                            />
                        </div>
                        <div style={{ animationDelay: "0.3s" }}>
                            <IconBadge
                                icon={<Image src={countryHomes} alt="Homes" width={24} height={24} className="h-6 w-6 object-contain" priority />}
                                label="Quality Properties"
                            />
                        </div>
                    </div>
                </div>
            </aside>

            {/* Right panel */}
            <section
                className="flex min-h-screen w-full flex-col items-center justify-center bg-primary-foreground px-6 py-8 lg:px-12"
                aria-labelledby="auth-tabs"
            >
                {/* Tabs */}
                <div className="w-full max-w-md mt-0">
                    <div
                        className="relative h-[35px] w-full rounded-[10px] bg-surface-muted"
                        role="tablist"
                        aria-label="Authentication tabs"
                        id="auth-tabs"
                    >
                        {/* Sliding highlight */}
                        <div
                            className="absolute top-1/2 h-[29px] w-[calc(50%-5px)] -translate-y-1/2 rounded-[7px] bg-white transition-transform duration-300 ease-out"
                            style={{ transform: tab === "login" ? "translateX(3px)" : "translateX(calc(100% + 7px))" }}
                            aria-hidden
                        />
                        {/* Single layer labels with dynamic color */}
                        <div className="relative z-10 grid h-full grid-cols-2 font-semibold tracking-wide select-none">
                            <button
                                type="button"
                                onClick={() => setTab("login")}
                                className="relative flex items-center justify-center px-3 h-full cursor-pointer"
                                role="tab"
                                id="tab-login"
                                aria-controls="panel-login"
                                aria-selected={tab === "login"}
                            >
                                <span className={`text-normal text-center-flex text-[15px] `}>LOG IN</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setTab("register")}
                                className="relative flex items-center justify-center px-3 h-full cursor-pointer"
                                role="tab"
                                id="tab-register"
                                aria-controls="panel-register"
                                aria-selected={tab === "register"}
                            >
                                <span className={`text-normal text-center-flex text-[15px]`}>REGISTER</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="h-[42px]" aria-hidden />

                {/* Content */}
                <div className="relative w-full max-w-md mt-6 min-h-[540px]">
                    <div
                        className={tab === "login" ? "absolute inset-0 opacity-100" : "absolute inset-0 opacity-0 pointer-events-none"}
                        role="tabpanel"
                        id="panel-login"
                        aria-labelledby="tab-login"
                        aria-hidden={tab !== "login"}
                    >
                        <LoginFormUI />
                    </div>
                    <div
                        className={tab === "register" ? "absolute inset-0 opacity-100" : "absolute inset-0 opacity-0 pointer-events-none"}
                        role="tabpanel"
                        id="panel-register"
                        aria-labelledby="tab-register"
                        aria-hidden={tab !== "register"}
                    >
                        <RegisterFormUI />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LoginPage;

import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store";
import AuthSectionHeader from "@/components/forms/AuthSectionHeader";
import AuthInput from "@/components/forms/AuthInput";
import { login } from "@/store/authSlice";
import { RefreshIcon } from "@/assets/icons/images/refresh";

const LoginFormUI = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
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

                {/* Submit */}
                <button
                    type="button"
                    onClick={() => {
                        dispatch(login());
                        router.push("/");
                    }}
                    className="w-full rounded-md bg-brand px-4 py-2 text-sm font-medium text-primary-foreground focus:ring-primary/20 cursor-pointer"
                >
                    Log In
                </button>
            </form>

            {/* Divider */}
            <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                    <div className="h-px w-full bg-border" />
                </div>
                <div className="relative mx-auto w-fit bg-primary-foreground px-3 text-xs text-muted-foreground">Or continue with</div>
            </div>

            {/* Social buttons */}
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    className="flex w-full items-center justify-center gap-2 rounded-[10px] border-1 border-success bg-success-muted px-4 py-2.5 text-normal text-sm text-success-dark hover:opacity-90 cursor-pointer"
                >
                    <Image src="/images/google.png" alt="Google" width={20} height={20} className="h-5 w-5 object-contain" priority />
                    Google
                </button>
                <button
                    type="button"
                    className="flex w-full items-center justify-center gap-2 rounded-[10px] border-1 border-brand bg-brand-muted px-4 py-2.5 text-normal text-sm text-brand hover:opacity-90 cursor-pointer"
                >
                    <Image src="/images/facebook.png" alt="Facebook" width={20} height={20} className="h-5 w-5 object-contain" priority />
                    Facebook
                </button>
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

const RegisterFormUI = () => {
    return (
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <AuthSectionHeader title="Create an account" subtitle="Join HomeNDrive today" className="mb-2" />
            <div className="[&>*+*]:mt-3">
                <AuthInput id="email" name="email" type="email" label="Email *" placeholder="Enter your email address" autoComplete="email" />
                <div className="space-y-1.5">
                    <label htmlFor="passwordReg" className="inline-flex items-center gap-2 text-sm text-foreground">
                        <span>Password *</span>
                        <Image src={help} alt="help" width={15} height={15} className="h-4 w-4" />
                    </label>
                    <input
                        id="passwordReg"
                        name="passwordReg"
                        type="password"
                        className="w-full rounded-md border border-border bg-primary-foreground px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="Enter your password"
                        autoComplete="new-password"
                    />
                </div>
                <AuthInput
                    id="passwordConfirm"
                    name="passwordConfirm"
                    type="password"
                    label="Confirm Password *"
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                />
                <div className="space-y-1.5">
                    <label className="inline-flex items-center gap-2 text-sm text-foreground">
                        <Image src={shield} alt="shield" width={16} height={16} className="h-4 w-4" />
                        <span>Verification Code *</span>
                    </label>
                    <div className="rounded-md border border-border bg-muted h-24 flex items-center justify-center select-none text-4xl tracking-widest text-muted-foreground">
                        7 0 6 D E
                    </div>
                    <div className="relative">
                        <input
                            className="w-full rounded-md border border-border bg-primary-foreground px-3 py-2 pr-10 text-sm text-foreground placeholder:text-muted-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                            placeholder="Enter the code above"
                        />
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 opacity-70" aria-hidden>
                            <RefreshIcon />
                        </span>
                    </div>
                    <p className="text-[12px] text-muted-foreground">Enter the code shown above to verify you&apos;re human</p>
                </div>
            </div>
            <button type="submit" className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/92">
                Create Account
            </button>
            <p className="text-center text-[12px] text-muted-foreground">
                By creating an account, you agree to our
                <a href="#" className="underline">
                    Terms of Service
                </a>
                and
                <a href="#" className="underline">
                    Privacy Policy
                </a>
                .
            </p>
        </form>
    );
};
