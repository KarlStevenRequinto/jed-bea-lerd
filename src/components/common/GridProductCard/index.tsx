"use client";

import Image, { StaticImageData } from "next/image";
import { useGridProductCardViewModel } from "./useViewModel";
import BaseButton from "@/components/common/BaseButton";
import Badge from "@/components/common/Badge";
import { LockIconSvg } from "@/components/svg-icons";
import GridProductCardSkeleton from "./GridProductCardSkeleton";

/**
 * Grid Product Card Component (Grid View)
 *
 * Displays a single listing in grid view format.
 * Compatible with both Vehicle and Property listing types.
 * - Empty spec values are automatically hidden.
 * - VIEW DETAILS button uses green theme for PROPERTY, blue theme for VEHICLE.
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
    onViewDetailsClick?: () => void;
    isLoading?: boolean;
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
    onViewDetailsClick,
    isLoading = false,
}: GridProductCardProps) => {
    const { mounted, isLoggedIn } = useGridProductCardViewModel();

    if (isLoading) {
        return <GridProductCardSkeleton />;
    }

    const isProperty = category === "PROPERTY";

    const viewDetailsStyle = isProperty
        ? { background: "var(--color-green-primary)" }
        : { background: "linear-gradient(135deg, var(--color-vehicle-primary) 0%, var(--color-vehicle-dark) 100%)" };

    const cardAccentClasses = isProperty
        ? "border-[var(--color-green-200)]"
        : "border-[var(--color-vehicle-light)]";

    const hasFirstRow = year || color || mileage;
    const hasSecondRow = fuelType || bodyType;

    return (
        <div className={`w-full bg-white rounded-[10px] overflow-hidden border flex flex-col ${cardAccentClasses}`}>
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

                {/* Action Button */}
                <div>
                    <BaseButton
                        onClick={onViewDetailsClick}
                        rightIcon={mounted && !isLoggedIn ? <LockIconSvg /> : undefined}
                        className="w-full text-white border border-transparent px-3 py-2 text-xs font-semibold rounded-lg"
                        style={viewDetailsStyle}
                    >
                        VIEW DETAILS
                    </BaseButton>
                </div>

                {/* Sign In Prompt */}
                {mounted && !isLoggedIn && (
                    <div className="mt-2 text-center">
                        <span className="text-[10px]">
                            <a
                                href="/login"
                                className="font-bold"
                                style={{ color: isProperty ? "var(--color-brand-darker)" : "var(--color-vehicle-darker)" }}
                            >
                                Sign In
                            </a>{" "}
                            to see more details
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GridProductCard;
