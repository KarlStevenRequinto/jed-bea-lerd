"use client";

import { ReactNode } from "react";

interface BadgeProps {
    children: ReactNode;
    className?: string;
}

const Badge = ({ children, className = "" }: BadgeProps) => {
    const defaultClasses =
        "bg-white rounded-[10px] text-normal w-[233px] h-[45px] px-2 py-4 flex items-center justify-center border border-gray-500/75";

    return <div className={`${defaultClasses} ${className}`}>{children}</div>;
};

export default Badge;
