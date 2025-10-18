"use client";

import React from "react";
import { useIconBadgeViewModel } from "./useIconBadgeViewModel";

export type IconBadgeProps = {
    icon: React.ReactNode;
    label: string;
    className?: string;
    iconWrapperClassName?: string;
    labelClassName?: string;
};

const IconBadge = ({ icon, label, className, iconWrapperClassName, labelClassName }: IconBadgeProps) => {
    const vm = useIconBadgeViewModel({ label });
    const container = className ?? "flex flex-col items-center gap-3";
    const iconWrapper = iconWrapperClassName ?? "flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-bg)] shadow-md";
    const labelStyle = labelClassName ?? "mt-2 text-sm text-[var(--color-foreground)]";
    return (
        <div className={container} data-testid={vm.testId}>
            <div className={iconWrapper}>
                <span className="text-[var(--color-fg)]" aria-hidden>
                    {icon}
                </span>
            </div>
            <span className={labelStyle}>{vm.label}</span>
        </div>
    );
};

export default IconBadge;




