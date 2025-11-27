"use client";

import Image, { StaticImageData } from "next/image";
import { useProductCardViewModel } from "./useViewModel";
import BaseButton from "@/components/common/BaseButton";
import Badge from "@/components/common/Badge";
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
            className="w-full bg-white rounded-[10px] overflow-hidden"
            style={{
                border: "1px solid #737373",
            }}
        >
            {/* Image Section */}
            <div className="relative w-full" style={{ height: "482.56px" }}>
                <Image src={image} alt={title} fill className="object-cover" sizes="(max-width: 1120px) 100vw, 1120px" priority />
                {/* Category Badge */}
                <div className="absolute top-6 left-6">
                    <Badge className="text-[15px] ">{category}</Badge>
                </div>
                {/* Price Badge */}
                <div className="absolute bottom-6 left-6">
                    <Badge className="font-bold text-xl">{price}</Badge>
                </div>
            </div>

            {/* Content Section */}
            <div className="px-6 py-5">
                {/* Title */}
                <h2 className="text-xl font-bold text-foreground mb-1.5">{title}</h2>

                {/* Location */}
                <p className="text-normal text-sm text-muted-foreground mb-3">{location}</p>

                {/* Specs */}
                <div className="flex flex-wrap gap-2 mb-3.5">
                    <span className="px-3.5 py-1 bg-white rounded-full text-xs border border-gray-300">{year}</span>
                    <span className="px-3.5 py-1 bg-white rounded-full text-xs border border-gray-300">{color}</span>
                    <span className="px-3.5 py-1 bg-white rounded-full text-xs border border-gray-300">{mileage}</span>
                    <span className="px-3.5 py-1 bg-white rounded-full text-xs border border-gray-300">{fuelType}</span>
                    <span className="px-3.5 py-1 bg-white rounded-full text-xs border border-gray-300">{bodyType}</span>
                </div>

                {/* Description */}
                <p className="text-xs text-foreground leading-relaxed mb-5">{description}</p>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <BaseButton
                        onClick={onContactClick}
                        rightIcon={<LockIconSvg />}
                        className="flex-1 bg-white text-foreground border border-gray-300 px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-gray-50"
                    >
                        CONTACT
                    </BaseButton>
                    <BaseButton
                        onClick={onViewDetailsClick}
                        rightIcon={<LockIconSvg />}
                        className="flex-1 text-white border border-transparent px-4 py-2.5 text-sm font-semibold rounded-lg"
                        style={{
                            background: "linear-gradient(to right, var(--color-blue-primary), var(--color-green-primary))",
                        }}
                    >
                        VIEW DETAILS
                    </BaseButton>
                </div>

                {/* Sign In Prompt */}
                <div className="mt-4 text-center">
                    <span className="text-xs text-muted-foreground">
                        <a href="/login" className="font-bold" style={{ color: "var(--color-blue-primary)" }}>
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
