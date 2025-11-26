"use client";

import React, { ReactNode } from "react";
import { useBaseButtonViewModel } from "./useViewModel";

interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

const BaseButton: React.FC<BaseButtonProps> = ({
    children,
    onClick,
    type = "button",
    leftIcon,
    rightIcon,
    className = "",
    ...props
}) => {
    useBaseButtonViewModel();

    const defaultClasses = "flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium hover:opacity-90 cursor-pointer";

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${defaultClasses} ${className}`}
            {...props}
        >
            {leftIcon && leftIcon}
            {children}
            {rightIcon && rightIcon}
        </button>
    );
};

export default BaseButton;
