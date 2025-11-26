"use client";

import { ReactNode } from "react";
import { useCategoryCardViewModel } from "./useViewModel";

interface CategoryCardProps {
    icon: ReactNode;
    title: string;
    description: string;
    onClick?: () => void;
    className?: string;
}

const CategoryCard = ({ icon, title, description, onClick, className = "" }: CategoryCardProps) => {
    useCategoryCardViewModel();

    return (
        <div
            onClick={onClick}
            className={`
                group relative overflow-hidden rounded-[10px] cursor-pointer
                w-full max-w-[786px] h-[141px]
                flex items-center gap-6 px-6
                transition-all duration-300 hover:shadow-lg
                ${className}
            `}
            style={{
                background: "color-mix(in srgb, var(--color-category-card-bg) 30%, transparent)",
                border: "1px solid color-mix(in srgb, var(--color-category-card-bg) 70%, transparent)",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
            }}
        >
            {/* Icon Container - with same background as card */}
            <div
                className="flex-shrink-0 w-[90px] h-[90px] rounded-[10px] flex items-center justify-center"
                style={{
                    background: "color-mix(in srgb, var(--color-category-card-bg) 30%, transparent)",
                }}
            >
                {icon}
            </div>

            {/* Content */}
            <div className="flex-1 text-white relative z-10">
                <h3 className="text-[28px] font-semibold mb-1">{title}</h3>
                <p className="text-[16px] font-normal">{description}</p>
            </div>

            {/* Noise Effect Overlay - 25% opacity */}
            <div
                className="absolute inset-0 pointer-events-none mix-blend-overlay"
                style={{
                    opacity: 0.25,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat",
                }}
            />
        </div>
    );
};

export default CategoryCard;
