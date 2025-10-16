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
            <aside className="hidden lg:flex flex-col items-center justify-start gap-6 bg-[rgb(248,248,248)] p-10">
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
                    <div className="px-4 py-3 text-center text-sm text-neutral-600 bg-white">[ photo of property with vehicle ]</div>
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
                    <div className="relative h-9 w-full rounded-full border border-neutral-900/80 overflow-hidden">
                        <div
                            className="absolute top-0 h-full w-1/2 rounded-full bg-neutral-900 transition-transform duration-300 ease-out"
                            style={{ transform: tab === "login" ? "translateX(0%)" : "translateX(100%)" }}
                        />
                        <div className="relative z-10 grid h-full grid-cols-2 text-xs font-medium tracking-wide">
                            <button
                                type="button"
                                onClick={() => setTab("login")}
                                className={`px-3 ${tab === "login" ? "text-white" : "text-neutral-900"}`}
                            >
                                LOG IN
                            </button>
                            <button
                                type="button"
                                onClick={() => setTab("register")}
                                className={`px-3 ${tab === "register" ? "text-white" : "text-neutral-900"}`}
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
                <h1 className="text-2xl font-semibold">Welcome Back!</h1>
                <p className="mt-1 text-sm text-neutral-600">Sign in to your account to continue</p>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                {/* Email / Username */}
                <div className="space-y-1.5">
                    <label htmlFor="identifier" className="text-sm font-medium text-neutral-800">
                        Email / Username
                    </label>
                    <input
                        id="identifier"
                        type="text"
                        placeholder="Enter your email or username"
                        className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/20"
                        aria-describedby="identifier-help"
                    />
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="text-sm font-medium text-neutral-800">
                            Password
                        </label>
                        <button type="button" className="text-xs text-neutral-500 hover:text-neutral-700">
                            Forgot password?
                        </button>
                    </div>
                    <div className="relative">
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 pr-10 text-sm text-neutral-900 placeholder:text-neutral-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/20"
                        />
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400" aria-hidden>
                            {/* eye icon placeholder */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                                <path d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />
                            </svg>
                        </span>
                    </div>
                </div>

                {/* Remember me */}
                <div className="flex items-center justify-between">
                    <label className="inline-flex items-center gap-2 text-sm text-neutral-700">
                        <input type="checkbox" className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900/20" />
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
                    className="w-full rounded-md bg-neutral-800 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/20"
                >
                    Log In
                </button>
            </form>

            {/* Divider */}
            <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                    <div className="h-px w-full bg-neutral-200" />
                </div>
                <div className="relative mx-auto w-fit bg-[var(--color-bg)] px-3 text-xs text-neutral-500">Or continue with</div>
            </div>

            {/* Social buttons */}
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    className="flex w-full items-center justify-center gap-2 rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-800 shadow-sm hover:bg-neutral-50"
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
                    className="flex w-full items-center justify-center gap-2 rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-800 shadow-sm hover:bg-neutral-50"
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

            <p className="text-center text-sm text-neutral-600">
                Don&apos;t have an account?{" "}
                <a className="font-medium text-neutral-900 hover:underline" href="#">
                    Register now
                </a>
            </p>
        </div>
    );
}

function RegisterPlaceholder() {
    return <div className="flex h-[480px] items-center justify-center rounded-md border border-dashed text-neutral-500">this is register</div>;
}
