"use client";

import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    id: string;
    rightIcon?: React.ReactNode;
};

const AuthInput: React.FC<Props> = ({ label, id, rightIcon, className = "", ...rest }) => {
    return (
        <div className="space-y-1.5">
            <label htmlFor={id} className="text-normal text-center-flex text-sm">
                {label}
            </label>
            <div className="relative">
                <input
                    id={id}
                    className={`w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 pr-10 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-muted-foreground)] placeholder:text-normal placeholder:text-center-flex shadow-sm focus:outline-none focus:ring-2 focus:ring-[color-mix(in_oklab, var(--color-primary) 20%, transparent)] ${className}`}
                    {...rest}
                />
                {rightIcon ? (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3" aria-hidden>
                        {rightIcon}
                    </span>
                ) : null}
            </div>
        </div>
    );
};

export default AuthInput;
