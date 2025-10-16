"use client";

import React from "react";
import { useFeatureViewModel } from "./useViewModel";

export type FeatureProps = {
    icon: React.ReactNode;
    label: string;
    className?: string;
    iconWrapperClassName?: string;
    labelClassName?: string;
};

const Feature = ({ icon, label, className, iconWrapperClassName, labelClassName }: FeatureProps) => {
    const vm = useFeatureViewModel({ label });
    const container = className ?? "flex flex-col items-center gap-2";
    const iconWrapper = iconWrapperClassName ?? "flex h-12 w-12 items-center justify-center rounded-full border bg-[var(--color-bg)] shadow-sm";
    const labelStyle = labelClassName ?? "text-sm text-[var(--color-foreground)]";
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

export default Feature;
