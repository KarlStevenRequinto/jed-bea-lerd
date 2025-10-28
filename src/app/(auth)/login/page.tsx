"use client";

import Image from "next/image";
import { TeslaIconSvg, ProtectIconSvg, CountryHouseIconSvg } from "@/components/svg-icons";
import homeNDriveLogo from "@/assets/images/home-n-drive-logo.png";
import IconBadge from "@/components/common/IconBadge";
import { useLoginViewModel } from "./useViewModel";
import BaseButton from "@/components/common/BaseButton";
import LoginForm from "../_components/LoginForm";
import RegisterForm from "../_components/RegisterForm";

const LoginPage = () => {
    const { tab, setTab, animationKey, highlightTransform, loginPanelClass, registerPanelClass } = useLoginViewModel();

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
                            <IconBadge icon={<TeslaIconSvg />} label="Quality Vehicles" />
                        </div>
                        <div style={{ animationDelay: "0.2s" }}>
                            <IconBadge icon={<ProtectIconSvg />} label="Secure and Trusted" />
                        </div>
                        <div style={{ animationDelay: "0.3s" }}>
                            <IconBadge icon={<CountryHouseIconSvg />} label="Quality Properties" />
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
                            style={{ transform: highlightTransform }}
                            aria-hidden
                        />
                        {/* Single layer labels with dynamic color */}
                        <div className="relative z-10 grid h-full grid-cols-2 font-semibold tracking-wide select-none">
                            <BaseButton
                                type="button"
                                onClick={() => setTab("login")}
                                className={`relative flex items-center justify-center px-3 h-full cursor-pointer bg-transparent shadow-none `}
                                role="tab"
                                id="tab-login"
                                aria-controls="panel-login"
                                aria-selected={tab === "login"}
                            >
                                <span className={`text-normal text-center-flex text-[15px]`}>LOG IN</span>
                            </BaseButton>
                            <BaseButton
                                type="button"
                                onClick={() => setTab("register")}
                                className="relative flex items-center justify-center px-3 h-full cursor-pointer bg-transparent shadow-none hover:opacity-100"
                                role="tab"
                                id="tab-register"
                                aria-controls="panel-register"
                                aria-selected={tab === "register"}
                            >
                                <span className={`text-normal text-center-flex text-[15px]`}>REGISTER</span>
                            </BaseButton>
                        </div>
                    </div>
                </div>

                <div className="h-[42px]" aria-hidden />

                {/* Content with smooth cross-fade/slide transition */}
                <div className="relative w-full max-w-md mt-6 min-h-[540px] overflow-hidden">
                    <div
                        className={`absolute inset-0 ${loginPanelClass}`}
                        role="tabpanel"
                        id="panel-login"
                        aria-labelledby="tab-login"
                        aria-hidden={tab !== "login"}
                    >
                        <LoginForm />
                    </div>
                    <div
                        className={`absolute inset-0 transition-all duration-300 ease-out ${registerPanelClass}`}
                        role="tabpanel"
                        id="panel-register"
                        aria-labelledby="tab-register"
                        aria-hidden={tab !== "register"}
                    >
                        <RegisterForm />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LoginPage;
