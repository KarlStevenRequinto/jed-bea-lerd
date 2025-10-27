import React, { ReactNode } from "react";

interface BaseButtonProps {
    children: ReactNode;
    onClick?: () => void;
    type?: "button" | "submit";
    leftIcon?: ReactNode;
    className?: string;
}

const BaseButton: React.FC<BaseButtonProps> = ({
    children,
    onClick,
    type = "button",
    leftIcon,
    className = ""
}) => {
    const defaultClasses = "flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium hover:opacity-90 cursor-pointer";

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${defaultClasses} ${className}`}
        >
            {leftIcon && leftIcon}
            {children}
        </button>
    );
};

export default BaseButton;
