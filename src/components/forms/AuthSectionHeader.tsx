"use client";

import React from "react";

type Props = {
    title: string;
    subtitle?: string;
    className?: string;
};

const AuthSectionHeader: React.FC<Props> = ({ title, subtitle, className = "" }) => {
    return (
        <div className={`[&>*+*]:mt-[6px] ${className}`}>
            <h2 className="text-normal text-2xl">{title}</h2>
            {subtitle ? <p className="text-light text-[16px]">{subtitle}</p> : null}
        </div>
    );
};

export default AuthSectionHeader;
