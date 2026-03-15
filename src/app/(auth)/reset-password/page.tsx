"use client";

import { Suspense } from "react";
import AuthBrandPanel from "../_components/AuthBrandPanel";
import ResetPasswordForm from "../_components/ResetPasswordForm";

const ResetPasswordPageContent = () => {
    return (
        <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2" role="main">
            <AuthBrandPanel />

            <section className="flex min-h-screen w-full flex-col items-center justify-center bg-primary-foreground px-6 py-8 lg:px-12">
                <div className="w-full max-w-md">
                    <ResetPasswordForm />
                </div>
            </section>
        </div>
    );
};

const ResetPasswordPage = () => {
    return (
        <Suspense fallback={<div className="min-h-screen w-full bg-primary-foreground" />}>
            <ResetPasswordPageContent />
        </Suspense>
    );
};

export default ResetPasswordPage;
