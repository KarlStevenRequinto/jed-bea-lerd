"use client";

import Image, { StaticImageData } from "next/image";
import { useProductCardViewModel } from "./useViewModel";
import BaseButton from "@/components/common/BaseButton";
import { LockIconSvg } from "@/components/svg-icons";

interface ProductCardProps {
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

const ProductCard = ({
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
}: ProductCardProps) => {
    useProductCardViewModel();

    return (
        <div
            className="w-full max-w-[1120px] bg-white rounded-[10px] overflow-hidden border border-gray-300"
            style={{
                boxShadow: "0px 1px 1px 0px rgba(0, 0, 0, 0.25)",
            }}
        >
            {/* Image Section */}
            <div className="relative w-full h-[482px] bg-gray-100">
                <Image src={image} alt={title} fill className="object-cover" sizes="(max-width: 1120px) 100vw, 1120px" priority />
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                    <div className="bg-white px-6 py-2 rounded-md border border-gray-300 text-sm font-medium">{category}</div>
                </div>
                {/* Price Badge */}
                <div className="absolute bottom-4 left-4">
                    <div className="bg-white px-6 py-2 rounded-md text-2xl font-semibold">{price}</div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-8">
                {/* Title */}
                <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>

                {/* Location */}
                <p className="text-sm text-muted-foreground mb-4">{location}</p>

                {/* Specs */}
                <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-4 py-1.5 bg-gray-100 rounded-full text-sm border border-gray-300">{year}</span>
                    <span className="px-4 py-1.5 bg-gray-100 rounded-full text-sm border border-gray-300">{color}</span>
                    <span className="px-4 py-1.5 bg-gray-100 rounded-full text-sm border border-gray-300">{mileage}</span>
                    <span className="px-4 py-1.5 bg-gray-100 rounded-full text-sm border border-gray-300 uppercase">{fuelType}</span>
                    <span className="px-4 py-1.5 bg-gray-100 rounded-full text-sm border border-gray-300 uppercase">{bodyType}</span>
                </div>

                {/* Description */}
                <p className="text-sm text-foreground leading-relaxed mb-6">{description}</p>

                {/* Action Buttons */}
                <div className="flex gap-4">
                    <BaseButton
                        onClick={onContactClick}
                        rightIcon={<LockIconSvg />}
                        className="flex-1 bg-white text-foreground border border-gray-300 px-6 py-3 text-base font-normal rounded-lg hover:bg-gray-50"
                    >
                        CONTACT
                    </BaseButton>
                    <BaseButton
                        onClick={onViewDetailsClick}
                        rightIcon={<LockIconSvg />}
                        className="flex-1 text-white border border-transparent px-6 py-3 text-base font-medium rounded-lg"
                        style={{
                            background: "linear-gradient(to right, #4169E1, #4CAF50)",
                        }}
                    >
                        VIEW DETAILS
                    </BaseButton>
                </div>

                {/* Sign In Prompt */}
                <div className="mt-6 text-center">
                    <span className="text-sm text-muted-foreground">
                        <a href="/login" className="font-semibold" style={{ color: "var(--color-blue-primary)" }}>
                            Sign In
                        </a>{" "}
                        to see more details
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
