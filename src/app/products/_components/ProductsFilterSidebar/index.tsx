"use client";

import {
    ProductFilters,
    ListingTypeFilter,
    PRICE_MIN,
    VEHICLE_TYPES,
    FUEL_TYPES,
    PROPERTY_TYPES,
} from "../ProductsMarketplace/useViewModel";

// ─── Props ────────────────────────────────────────────────────────────────────

interface ProductsFilterSidebarProps {
    filters: ProductFilters;
    totalCount: number;
    activePriceMax: number;
    hasActiveFilters: boolean;
    onListingTypeChange: (type: ListingTypeFilter) => void;
    onPriceRangeChange: (range: [number, number]) => void;
    onLocationChange: (location: string) => void;
    onVehicleTypeToggle: (type: string) => void;
    onFuelTypeToggle: (type: string) => void;
    onPropertyTypeToggle: (type: string) => void;
    onClearFilters: () => void;
    onShowResults?: () => void;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const FilterCheckbox = ({
    label,
    checked,
    onChange,
}: {
    label: string;
    checked: boolean;
    onChange: () => void;
}) => (
    <label className="flex items-center gap-2.5 cursor-pointer group select-none">
        <button
            type="button"
            role="checkbox"
            aria-checked={checked}
            onClick={onChange}
            className={`w-[17px] h-[17px] rounded-[3px] border-2 flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer ${
                checked
                    ? "bg-[var(--color-brand)] border-[var(--color-brand)]"
                    : "bg-white border-[var(--color-gray-300)] group-hover:border-[var(--color-brand)]"
            }`}
        >
            {checked && (
                <svg width="9" height="7" viewBox="0 0 9 7" fill="none" aria-hidden="true">
                    <path
                        d="M1 3.5L3.2 5.5L8 1"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
        </button>
        <span className="text-sm text-[var(--color-gray-800)]">{label}</span>
    </label>
);

const Divider = () => <hr className="border-[var(--color-gray-200)] my-4" />;

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <p className="text-sm font-semibold text-[var(--color-gray-800)] mb-3">{children}</p>
);

const formatPHP = (value: number): string => {
    if (value >= 1_000_000) {
        const millions = value / 1_000_000;
        return `₱${millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1)}M`;
    }
    return `₱${value.toLocaleString("en-PH")}`;
};

// ─── Dual Range Slider ────────────────────────────────────────────────────────

const THUMB_CLASSES =
    "absolute w-full h-full appearance-none bg-transparent cursor-pointer " +
    "[&::-webkit-slider-runnable-track]:bg-transparent " +
    "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:w-[18px] " +
    "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--color-brand)] " +
    "[&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 " +
    "[&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow " +
    "[&::-moz-range-thumb]:h-[18px] [&::-moz-range-thumb]:w-[18px] " +
    "[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[var(--color-brand)] " +
    "[&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white " +
    "[&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow " +
    "[&::-moz-range-track]:bg-transparent";

interface DualRangeSliderProps {
    minValue: number;
    maxValue: number;
    priceMax: number;
    onChange: (range: [number, number]) => void;
}

const DualRangeSlider = ({ minValue, maxValue, priceMax, onChange }: DualRangeSliderProps) => {
    const minPercent = ((minValue - PRICE_MIN) / (priceMax - PRICE_MIN)) * 100;
    const maxPercent = ((maxValue - PRICE_MIN) / (priceMax - PRICE_MIN)) * 100;
    const step = priceMax > 10_000_000 ? 500_000 : 50_000;
    const gap = priceMax > 10_000_000 ? 1_000_000 : 100_000;

    const handleMin = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = Math.min(Number(e.target.value), maxValue - gap);
        onChange([val, maxValue]);
    };

    const handleMax = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = Math.max(Number(e.target.value), minValue + gap);
        onChange([minValue, val]);
    };

    return (
        <div className="relative h-5 select-none">
            <div className="absolute top-1/2 -translate-y-1/2 h-[5px] w-full bg-[var(--color-gray-200)] rounded-full pointer-events-none" />
            <div
                className="absolute top-1/2 -translate-y-1/2 h-[5px] rounded-full bg-[var(--color-brand)] pointer-events-none"
                style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
            />
            <input
                type="range"
                min={PRICE_MIN}
                max={priceMax}
                step={step}
                value={minValue}
                onChange={handleMin}
                className={THUMB_CLASSES}
                style={{ zIndex: minValue > priceMax - priceMax * 0.1 ? 5 : 3 }}
                aria-label="Minimum price"
            />
            <input
                type="range"
                min={PRICE_MIN}
                max={priceMax}
                step={step}
                value={maxValue}
                onChange={handleMax}
                className={THUMB_CLASSES}
                style={{ zIndex: 4 }}
                aria-label="Maximum price"
            />
        </div>
    );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const listingTypeOptions: { label: string; value: ListingTypeFilter }[] = [
    { label: "All Listings", value: "all" },
    { label: "Properties", value: "properties" },
    { label: "Vehicles", value: "vehicles" },
];

const ProductsFilterSidebar = ({
    filters,
    totalCount,
    activePriceMax,
    hasActiveFilters,
    onListingTypeChange,
    onPriceRangeChange,
    onLocationChange,
    onVehicleTypeToggle,
    onFuelTypeToggle,
    onPropertyTypeToggle,
    onClearFilters,
    onShowResults,
}: ProductsFilterSidebarProps) => {
    const [minVal, maxVal] = filters.priceRange;

    const showVehicleFilters = filters.listingType !== "properties";
    const showPropertyFilters = filters.listingType !== "vehicles";

    return (
        <div className="bg-white rounded-xl border border-[var(--color-gray-200)] p-5 w-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-[var(--color-gray-900)]">Filter</h2>
                {hasActiveFilters && (
                    <button
                        type="button"
                        onClick={onClearFilters}
                        className="text-xs text-[var(--color-brand)] hover:text-[var(--color-brand-dark)] font-medium transition-colors cursor-pointer"
                    >
                        Clear all
                    </button>
                )}
            </div>

            {/* ── Listing Type ── */}
            <SectionLabel>Listing Type</SectionLabel>
            <div className="flex flex-col gap-2.5">
                {listingTypeOptions.map(({ label, value }) => (
                    <FilterCheckbox
                        key={value}
                        label={label}
                        checked={filters.listingType === value}
                        onChange={() => onListingTypeChange(value)}
                    />
                ))}
            </div>

            <Divider />

            {/* ── Price Range ── */}
            <SectionLabel>Price Range:</SectionLabel>
            <p className="text-xs text-[var(--color-gray-500)] mb-3">
                {formatPHP(minVal)}&nbsp;&mdash;&nbsp;{formatPHP(maxVal)}
            </p>
            <DualRangeSlider
                minValue={minVal}
                maxValue={maxVal}
                priceMax={activePriceMax}
                onChange={onPriceRangeChange}
            />

            <Divider />

            {/* ── Location ── */}
            <SectionLabel>Location:</SectionLabel>
            <input
                type="text"
                value={filters.location}
                onChange={(e) => onLocationChange(e.target.value)}
                placeholder="Enter city, region, ZIP, etc."
                className="w-full h-9 px-3 text-sm border border-[var(--color-gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent text-[var(--color-gray-800)] placeholder:text-[var(--color-gray-450)] transition-shadow"
            />

            {/* ── Vehicle Type (hidden when Properties only) ── */}
            {showVehicleFilters && (
                <>
                    <Divider />
                    <SectionLabel>Vehicle Type</SectionLabel>
                    <div className="flex flex-col gap-2.5">
                        {VEHICLE_TYPES.map((type) => (
                            <FilterCheckbox
                                key={type}
                                label={type}
                                checked={filters.vehicleTypes.includes(type)}
                                onChange={() => onVehicleTypeToggle(type)}
                            />
                        ))}
                    </div>
                </>
            )}

            {/* ── Fuel Type (hidden when Properties only) ── */}
            {showVehicleFilters && (
                <>
                    <Divider />
                    <SectionLabel>Fuel Type</SectionLabel>
                    <div className="flex flex-col gap-2.5">
                        {FUEL_TYPES.map((type) => (
                            <FilterCheckbox
                                key={type}
                                label={type}
                                checked={filters.fuelTypes.includes(type)}
                                onChange={() => onFuelTypeToggle(type)}
                            />
                        ))}
                    </div>
                </>
            )}

            {/* ── Property Type (hidden when Vehicles only) ── */}
            {showPropertyFilters && (
                <>
                    <Divider />
                    <SectionLabel>Property Type</SectionLabel>
                    <div className="flex flex-col gap-2.5">
                        {PROPERTY_TYPES.map((type) => (
                            <FilterCheckbox
                                key={type}
                                label={type}
                                checked={filters.propertyTypes.includes(type)}
                                onChange={() => onPropertyTypeToggle(type)}
                            />
                        ))}
                    </div>
                </>
            )}

            {/* ── Show Results CTA ── */}
            <div className="mt-5">
                <button
                    type="button"
                    onClick={onShowResults}
                    className="w-full h-10 rounded-lg text-sm font-semibold text-white bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] active:bg-[var(--color-brand-darker)] transition-colors cursor-pointer"
                >
                    {totalCount > 0
                        ? `SHOW ${totalCount} RESULT${totalCount !== 1 ? "S" : ""}`
                        : "NO RESULTS FOUND"}
                </button>
            </div>
        </div>
    );
};

export default ProductsFilterSidebar;
