"use client";

import React from "react";

type FormInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    id: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    error?: string;
};

const FormInput: React.FC<FormInputProps> = ({ label, id, leftIcon, rightIcon, error, className = "", ...rest }) => {
    return (
        <div>
            <label htmlFor={id} className="flex items-center gap-2 text-normal text-sm ml-1">
                <span>{label}</span>
            </label>
            <div className="relative">
                {leftIcon && (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3" aria-hidden>
                        {leftIcon}
                    </span>
                )}
                <input
                    id={id}
                    className={`w-full rounded-md border border-border bg-primary-foreground px-3 py-2 text-sm text-normal placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                        leftIcon ? "pl-10" : ""
                    } ${rightIcon ? "pr-10" : ""} ${error ? "border-destructive" : ""} ${className}`}
                    {...rest}
                />
                {rightIcon && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3" aria-hidden>
                        {rightIcon}
                    </span>
                )}
            </div>
            {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
    );
};

export default FormInput;
