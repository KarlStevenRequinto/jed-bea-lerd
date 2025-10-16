"use client";

import Image from "next/image";
import { useState } from "react";

// Local SVGs
// Replaced SVG feature icons with images
// Keep social as images too
// Facebook icon switched to image

export default function LoginPage() {
    const [tab, setTab] = useState<"login" | "register">("login");

    return (
        <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2">
            {/* Left panel */}
            <aside className="hidden lg:flex flex-col items-center justify-start gap-6 bg-[var(--color-muted)] p-10">
                {/* Placeholder logo */}
                <div className="flex flex-col items-center mt-6">
                    <div className="flex items-center gap-3 text-neutral-800">
                        <div className="h-10 w-10 rounded-md bg-neutral-200" aria-hidden />
                        <div className="h-6 w-16 rounded bg-neutral-200" aria-hidden />
                    </div>
                    <p className="mt-2 text-sm text-neutral-500">Your trusted platform for vehicles and properties.</p>
                </div>

                {/* Hero placeholder image */}
                <div className="w-full max-w-[640px] overflow-hidden rounded-2xl shadow-sm border border-neutral-200">
                    <Image
                        src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1600&q=80"
                        alt="Property with vehicle"
                        width={1600}
                        height={1066}
                        className="h-[420px] w-full object-cover"
                        priority
                    />
                    <div className="px-4 py-3 text-center text-sm text-[var(--color-muted-foreground)] bg-[var(--color-bg)]">[ photo of property with vehicle ]</div>
                </div>

                {/* Feature images (tesla, protect, city-buildings) */}
                <div className="mt-2 grid grid-cols-3 gap-8">
                    <Feature
                        icon={<Image src="/images/tesla.png" alt="Tesla" width={24} height={24} className="h-6 w-6 object-contain" priority />}
                        label="Quality Vehicles"
                    />
                    <Feature
                        icon={<Image src="/images/protect.png" alt="Protect" width={24} height={24} className="h-6 w-6 object-contain" priority />}
                        label="Secure and Trusted"
                    />
                    <Feature
                        icon={
                            <Image
                                src="/images/city-buildings.png"
                                alt="City Buildings"
                                width={24}
                                height={24}
                                className="h-6 w-6 object-contain"
                                priority
                            />
                        }
                        label="Quality Properties"
                    />
                </div>
            </aside>

            {/* Right panel */}
            <section className="flex flex-col items-center px-6 py-10 lg:px-14">
                {/* Tabs */}
                <div className="w-full max-w-md mt-2">
                    <div className="relative h-9 w-full rounded-full border border-[var(--color-border)] overflow-hidden">
                        <div
                            className="absolute top-0 h-full w-1/2 rounded-full bg-[var(--color-primary)] transition-transform duration-300 ease-out"
                            style={{ transform: tab === "login" ? "translateX(0%)" : "translateX(100%)" }}
                        />
                        <div className="relative z-10 grid h-full grid-cols-2 text-xs font-medium tracking-wide">
                            <button
                                type="button"
                                onClick={() => setTab("login")}
                                className={`px-3 ${tab === "login" ? "text-[var(--color-primary-foreground)]" : "text-[var(--color-fg)]"}`}
                            >
                                LOG IN
                            </button>
                            <button
                                type="button"
                                onClick={() => setTab("register")}
                                className={`px-3 ${tab === "register" ? "text-[var(--color-primary-foreground)]" : "text-[var(--color-fg)]"}`}
                            >
                                REGISTER
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="w-full max-w-md mt-8">{tab === "login" ? <LoginFormUI /> : <RegisterPlaceholder />}</div>
            </section>
        </div>
    );
}

function Feature({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <div className="flex flex-col items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-white shadow-sm">
                <span className="text-neutral-800" aria-hidden>
                    {icon}
                </span>
            </div>
            <span className="text-sm text-neutral-700">{label}</span>
        </div>
    );
}

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store";
import { login } from "@/store/authSlice";

function LoginFormUI() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-[var(--color-fg)]">Welcome Back!</h1>
                <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">Sign in to your account to continue</p>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                {/* Email / Username */}
                <div className="space-y-1.5">
                    <label htmlFor="identifier" className="text-sm font-medium text-[var(--color-fg)]">
                        Email / Username
                    </label>
                    <input
                        id="identifier"
                        type="text"
                        placeholder="Enter your email or username"
                        className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-muted-foreground)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[color-mix(in_oklab, var(--color-primary) 20%, transparent)]"
                        aria-describedby="identifier-help"
                    />
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="text-sm font-medium text-[var(--color-fg)]">
                            Password
                        </label>
                        <button type="button" className="text-xs text-[var(--color-muted-foreground)] hover:text-[var(--color-fg)]">
                            Forgot password?
                        </button>
                    </div>
                    <div className="relative">
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 pr-10 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-muted-foreground)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[color-mix(in_oklab, var(--color-primary) 20%, transparent)]"
                        />
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-[var(--color-muted-foreground)]" aria-hidden>
                            {/* eye icon placeholder */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                                <path d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />
                            </svg>
                        </span>
                    </div>
                </div>

                {/* Remember me */}
                <div className="flex items-center justify-between">
                    <label className="inline-flex items-center gap-2 text-sm text-[var(--color-foreground)]">
                        <input type="checkbox" className="h-4 w-4 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[color-mix(in_oklab, var(--color-primary) 20%, transparent)]" />
                        Remember Me
                    </label>
                </div>

                {/* Submit */}
                <button
                    type="button"
                    onClick={() => {
                        dispatch(login());
                        router.push("/");
                    }}
                    className="w-full rounded-md bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-[var(--color-primary-foreground)] hover:bg-[color-mix(in_oklab,_var(--color-primary)_92%,_black)] focus:outline-none focus:ring-2 focus:ring-[color-mix(in_oklab, var(--color-primary) 20%, transparent)]"
                >
                    Log In
                </button>
            </form>

            {/* Divider */}
            <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                    <div className="h-px w-full bg-[var(--color-border)]" />
                </div>
                <div className="relative mx-auto w-fit bg-[var(--color-bg)] px-3 text-xs text-[var(--color-muted-foreground)]">Or continue with</div>
            </div>

            {/* Social buttons */}
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    className="flex w-full items-center justify-center gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2 text-sm text-[var(--color-fg)] shadow-sm hover:bg-[var(--color-muted)]"
                >
                    <Image
                        src="/images/google.png"
                        alt="Google"
                        width={20}
                        height={20}
                        className="h-5 w-5 object-contain"
                        priority
                    />
                    Google
                </button>
                <button
                    type="button"
                    className="flex w-full items-center justify-center gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2 text-sm text-[var(--color-fg)] shadow-sm hover:bg-[var(--color-muted)]"
                >
                    <Image
                        src="/images/facebook.png"
                        alt="Facebook"
                        width={20}
                        height={20}
                        className="h-5 w-5 object-contain"
                        priority
                    />
                    Facebook
                </button>
            </div>

            <p className="text-center text-sm text-[var(--color-muted-foreground)]">
                Don&apos;t have an account?{" "}
                <a className="font-medium text-[var(--color-fg)] hover:underline" href="#">
                    Register now
                </a>
            </p>
        </div>
    );
}

function RegisterPlaceholder() {
    return <div className="flex h-[480px] items-center justify-center rounded-md border border-dashed text-neutral-500">this is register</div>;
}
