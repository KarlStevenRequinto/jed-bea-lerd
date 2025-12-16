"use client";

import Image, { StaticImageData } from "next/image";
import { useGridProductCardViewModel } from "./useViewModel";
import BaseButton from "@/components/common/BaseButton";
import Badge from "@/components/common/Badge";
import { LockIconSvg } from "@/components/svg-icons";

interface GridProductCardProps {
    category: string;
    price: string;
    title: string;
    location: string;
    year: string;
    color: string;
    mileage: string;
    fuelType: string;
    bodyType: string;
    description: string;
    image: string | StaticImageData;
    onContactClick?: () => void;
    onViewDetailsClick?: () => void;
}

const GridProductCard = ({
    category,
    price,
    title,
    location,
    year,
    color,
    mileage,
    fuelType,
    bodyType,
    description,
    image,
    onContactClick,
    onViewDetailsClick,
}: GridProductCardProps) => {
    useGridProductCardViewModel();

    return (
        <div className="w-full bg-white rounded-[10px] overflow-hidden border border-[var(--color-gray-500)] flex flex-col">
            {/* Image Section */}
            <div className="relative w-full h-[250px]">
                <Image src={image} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                    <Badge className="text-xs px-2 py-1">{category}</Badge>
                </div>
                {/* Price Badge */}
                <div className="absolute bottom-3 left-3">
                    <Badge className="font-bold text-base">{price}</Badge>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-4 flex flex-col flex-1">
                {/* Title */}
                <h3 className="text-base font-bold text-foreground mb-1 line-clamp-1">{title}</h3>

                {/* Location */}
                <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{location}</p>

                {/* Specs - First Row */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                    <span className="px-2.5 py-0.5 bg-white rounded-full text-[10px] border border-gray-300">{year}</span>
                    <span className="px-2.5 py-0.5 bg-white rounded-full text-[10px] border border-gray-300">{color}</span>
                    <span className="px-2.5 py-0.5 bg-white rounded-full text-[10px] border border-gray-300">{mileage}</span>
                </div>

                {/* Specs - Second Row */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className="px-2.5 py-0.5 bg-white rounded-full text-[10px] border border-gray-300">{fuelType}</span>
                    <span className="px-2.5 py-0.5 bg-white rounded-full text-[10px] border border-gray-300">{bodyType}</span>
                </div>

                {/* Description */}
                <p className="text-[11px] text-foreground leading-relaxed mb-3 line-clamp-2 flex-1">{description}</p>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    <BaseButton
                        onClick={onContactClick}
                        rightIcon={<LockIconSvg />}
                        className="flex-1 bg-white text-foreground border border-gray-300 px-3 py-2 text-xs font-medium rounded-lg hover:bg-gray-50"
                    >
                        CONTACT
                    </BaseButton>
                    <BaseButton
                        onClick={onViewDetailsClick}
                        rightIcon={<LockIconSvg />}
                        className="flex-1 text-white border border-transparent px-3 py-2 text-xs font-semibold rounded-lg"
                        style={{
                            background: "linear-gradient(to right, var(--color-blue-primary), var(--color-green-primary))",
                        }}
                    >
                        VIEW DETAILS
                    </BaseButton>
                </div>

                {/* Sign In Prompt */}
                <div className="mt-2 text-center">
                    <span className="text-[10px]">
                        <a href="/login" className="font-bold" style={{ color: "var(--color-brand-darker)" }}>
                            Sign In
                        </a>{" "}
                        to see more details
                    </span>
                </div>
            </div>
        </div>
    );
};

export default GridProductCard;
