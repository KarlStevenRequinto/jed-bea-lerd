import React from "react";
import { CheckIconSvg } from "@/components/svg-icons";

interface SuccessAlertProps {
    title: string;
    message: string;
    className?: string;
}

const SuccessAlert: React.FC<SuccessAlertProps> = ({ title, message, className = "" }) => {
    return (
        <div className={`w-full max-w-md px-4 sm:px-0 animate-fade-in-up ${className}`}>
            <div className="rounded-[12px] border bg-[var(--color-success-muted)] border-[var(--color-success-light)] text-[var(--color-success-dark)] px-4 py-4 shadow-sm">
                <div className="flex items-start gap-3">
                    <span className="mt-0.5">
                        <CheckIconSvg />
                    </span>

                    <div className="text-left">
                        <div className="text-base font-semibold">{title}</div>
                        <div className="text-sm opacity-80">{message}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccessAlert;
