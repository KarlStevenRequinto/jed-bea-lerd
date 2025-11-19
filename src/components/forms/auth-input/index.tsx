"use client";

import React from "react";
import { EyeVisibleIconSvg, EyeInvisibleIconSvg } from "@/components/svg-icons";
import { useAuthInputViewModel } from "./useViewModel";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    id: string;
    rightIcon?: React.ReactNode;
};

const AuthInput: React.FC<Props> = ({ label, id, rightIcon, className = "", type, ...rest }) => {
    const { showPassword, isPasswordField, togglePasswordVisibility, inputType } = useAuthInputViewModel(type);

    return (
        <div className="space-y-1.5">
            <label htmlFor={id} className="text-normal text-center-flex text-sm">
                {label}
            </label>
            <div className="relative">
                <input
                    id={id}
                    type={inputType}
                    className={`w-full rounded-md border border-border bg-primary-foreground px-3 py-2 pr-10 text-sm text-foreground placeholder:text-muted-foreground placeholder:text-normal placeholder:text-center-flex focus:outline-none focus:ring-2 focus:ring-primary/20 ${className}`}
                    {...rest}
                />
                {isPasswordField ? (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 opacity-70 cursor-pointer hover:opacity-100"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <EyeVisibleIconSvg /> : <EyeInvisibleIconSvg />}
                    </button>
                ) : rightIcon ? (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3" aria-hidden>
                        {rightIcon}
                    </span>
                ) : null}
            </div>
        </div>
    );
};

export default AuthInput;
