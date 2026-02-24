"use client";

import { useLoginViewModel } from "./useViewModel";
import BaseButton from "@/components/common/BaseButton";
import LoginForm from "../_components/LoginForm";
import RegisterForm from "../_components/RegisterForm";
import AuthBrandPanel from "../_components/AuthBrandPanel";

const LoginPage = () => {
    const { tab, setTab, animationKey, highlightTransform, highlightWidth, loginPanelClass, registerPanelClass } = useLoginViewModel();

    return (
        <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2" role="main">
            <AuthBrandPanel animationKey={animationKey} />

            {/* Right panel */}
            <section
                className="flex min-h-screen w-full flex-col items-center justify-center bg-primary-foreground px-6 py-8 lg:px-12"
                aria-labelledby="auth-tabs"
            >
                <div className="w-full max-w-md flex flex-col">
                    <div className="w-full">
                        <div
                            className="relative h-[35px] w-full rounded-[10px] bg-surface-muted"
                            role="tablist"
                            aria-label="Authentication tabs"
                            id="auth-tabs"
                        >
                            {/* Sliding highlight */}
                            <div
                                className="absolute top-1/2 h-[29px] -translate-y-1/2 rounded-[7px] bg-white transition-transform duration-300 ease-out"
                                style={{ transform: highlightTransform, width: highlightWidth }}
                                aria-hidden
                            />
                            {/* Single layer labels with dynamic color */}
                            <div className="relative z-10 grid h-full grid-cols-2 font-semibold tracking-wide select-none">
                                <BaseButton
                                    type="button"
                                    onClick={() => setTab("login")}
                                    className="relative flex items-center justify-center px-3 h-full cursor-pointer bg-transparent shadow-none"
                                    role="tab"
                                    id="tab-login"
                                    aria-controls="panel-login"
                                    aria-selected={tab === "login"}
                                >
                                    <span className="text-normal text-center-flex text-[15px]">LOG IN</span>
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
                                    <span className="text-normal text-center-flex text-[15px]">REGISTER</span>
                                </BaseButton>
                            </div>
                        </div>
                    </div>

                    <div className="h-[42px]" aria-hidden />

                    {/* Content with smooth cross-fade/slide transition */}
                    <div className="relative w-full mt-6 min-h-[650px]">
                        {tab === "login" && (
                            <div
                                className={`absolute inset-0 overflow-y-auto px-1 ${loginPanelClass}`}
                                role="tabpanel"
                                id="panel-login"
                                aria-labelledby="tab-login"
                                aria-hidden={false}
                            >
                                <LoginForm />
                            </div>
                        )}
                        <div
                            className={`absolute inset-0 overflow-y-auto px-1 transition-all duration-300 ease-out ${registerPanelClass}`}
                            role="tabpanel"
                            id="panel-register"
                            aria-labelledby="tab-register"
                            aria-hidden={tab !== "register"}
                        >
                            <RegisterForm />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LoginPage;
