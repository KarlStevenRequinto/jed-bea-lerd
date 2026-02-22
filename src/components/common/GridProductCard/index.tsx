"use client";

import Image, { StaticImageData } from "next/image";
import { useGridProductCardViewModel } from "./useViewModel";
import BaseButton from "@/components/common/BaseButton";
import Badge from "@/components/common/Badge";
import { LockIconSvg } from "@/components/svg-icons";

/**
 * Grid Product Card Component (Grid View)
 *
 * Displays a single listing in grid view format.
 * Compatible with both Vehicle and Property listing types.
 * - Empty spec values are automatically hidden.
 * - VIEW DETAILS button uses green theme for PROPERTY, blue gradient for VEHICLE.
 */
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

const SpecBadge = ({ value }: { value: string }) => {
    if (!value) return null;
    return (
        <span className="px-2.5 py-0.5 bg-white rounded-full text-[10px] border border-gray-300">
            {value}
        </span>
    );
};

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

    const isProperty = category === "PROPERTY";

    const viewDetailsStyle = isProperty
        ? { background: "var(--color-green-primary)" }
        : { background: "linear-gradient(to right, var(--color-blue-primary), var(--color-green-primary))" };

    const hasFirstRow = year || color || mileage;
    const hasSecondRow = fuelType || bodyType;

    return (
        <div className="w-full bg-white rounded-[10px] overflow-hidden border border-[var(--color-gray-500)] flex flex-col">
            {/* Image Section */}
            <div className="relative w-full h-[250px]">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
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

                {/* Specs - Row 1 (year / color / mileage) — hidden when all empty */}
                {hasFirstRow && (
                    <div className="flex flex-wrap gap-1.5 mb-2">
                        <SpecBadge value={year} />
                        <SpecBadge value={color} />
                        <SpecBadge value={mileage} />
                    </div>
                )}

                {/* Specs - Row 2 (fuelType / bodyType) — hidden when all empty */}
                {hasSecondRow && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                        <SpecBadge value={fuelType} />
                        <SpecBadge value={bodyType} />
                    </div>
                )}

                {/* Description */}
                <p className="text-[11px] text-foreground leading-relaxed mb-3 line-clamp-2 flex-1">
                    {description}
                </p>

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
                        style={viewDetailsStyle}
                    >
                        VIEW DETAILS
                    </BaseButton>
                </div>

                {/* Sign In Prompt */}
                <div className="mt-2 text-center">
                    <span className="text-[10px]">
                        <a
                            href="/login"
                            className="font-bold"
                            style={{ color: "var(--color-brand-darker)" }}
                        >
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
