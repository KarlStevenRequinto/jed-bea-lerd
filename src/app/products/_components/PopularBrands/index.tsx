"use client";

import { PopularItem } from "../ProductsMarketplace/useViewModel";
import PopularBrandsSkeleton from "./PopularBrandsSkeleton";

interface PopularBrandsProps {
    isLoading?: boolean;
    title: string;
    subtitle: string;
    items: PopularItem[];
}

const PopularBrands = ({ isLoading = false, title, subtitle, items }: PopularBrandsProps) => {
    if (isLoading) {
        return <PopularBrandsSkeleton />;
    }

    return (
        <div className="bg-white rounded-xl border border-[var(--color-gray-200)] p-5 w-full">
            <h3 className="text-sm font-bold text-[var(--color-gray-900)] mb-1">{title}</h3>
            <p className="text-xs text-[var(--color-gray-500)] mb-4">{subtitle}</p>
            <ul className="flex flex-col gap-0">
                {items.map((item, index) => (
                    <li
                        key={item.name}
                        className={`flex items-center justify-between py-2.5 ${
                            index < items.length - 1 ? "border-b border-[var(--color-gray-100)]" : ""
                        }`}
                    >
                        <span className="text-sm text-[var(--color-gray-800)]">{item.name}</span>
                        <span className="text-sm font-semibold text-[var(--color-gray-500)]">{item.count}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PopularBrands;
