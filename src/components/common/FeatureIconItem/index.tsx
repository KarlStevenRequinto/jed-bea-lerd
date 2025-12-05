import React, { ReactNode } from "react";

interface FeatureIconItemProps {
    icon: ReactNode;
    label: string;
}

const FeatureIconItem = ({ icon, label }: FeatureIconItemProps) => {
    return (
        <div className="flex items-center gap-3">
            <div
                className="flex items-center justify-center rounded-full flex-shrink-0"
                style={{
                    width: "25px",
                    height: "25px",
                    background: "color-mix(in srgb, var(--color-category-card-bg) 80%, transparent)",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    color: "var(--color-white)",
                }}
            >
                {icon}
            </div>
            <span className="text-sm">{label}</span>
        </div>
    );
};

export default FeatureIconItem;
