"use client";

import Image from "next/image";
import { useCreateListingModalViewModel, ListingCategory } from "./useViewModel";
import type { FeedPost } from "@/lib/types/feed";

interface CreateListingModalProps {
    onClose: () => void;
    onPublished?: (post: FeedPost) => void;
}

// ── Theme config per category ────────────────────────────────────────
const THEMES: Record<
    ListingCategory,
    {
        sidebar: string;
        selectedBorder: string;
        selectedBg: string;
        selectedText: string;
        selectedIconBg: string;
        iconStroke: string;
        inputFocus: string;
        addMoreHover: string;
        publishBtn: string;
        backdrop: string;
    }
> = {
    "real-estate": {
        sidebar: "bg-[var(--color-success)]",
        selectedBorder: "border-[var(--color-success)]",
        selectedBg: "bg-[var(--color-success-muted)]",
        selectedText: "text-[var(--color-success-dark)]",
        selectedIconBg: "bg-[var(--color-success-muted)]",
        iconStroke: "var(--color-success)",
        inputFocus: "focus-within:border-[var(--color-success)] focus-within:ring-1 focus-within:ring-[var(--color-success)]",
        addMoreHover: "hover:border-[var(--color-success)] hover:text-[var(--color-success)]",
        publishBtn: "bg-[var(--color-success)] hover:bg-[var(--color-success-dark)]",
        backdrop: "bg-[rgba(24,77,39,0.22)]",
    },
    vehicle: {
        sidebar: "bg-[var(--color-vehicle-primary)]",
        selectedBorder: "border-[var(--color-vehicle-primary)]",
        selectedBg: "bg-[var(--color-vehicle-muted)]",
        selectedText: "text-[var(--color-vehicle-primary)]",
        selectedIconBg: "bg-[var(--color-vehicle-muted)]",
        iconStroke: "var(--color-vehicle-primary)",
        inputFocus: "focus-within:border-[var(--color-vehicle-primary)] focus-within:ring-1 focus-within:ring-[var(--color-vehicle-primary)]",
        addMoreHover: "hover:border-[var(--color-vehicle-primary)] hover:text-[var(--color-vehicle-primary)]",
        publishBtn: "bg-[var(--color-vehicle-primary)] hover:bg-[var(--color-vehicle-dark)]",
        backdrop: "bg-[rgba(23,59,134,0.18)]",
    },
};

const CreateListingModal = ({ onClose, onPublished }: CreateListingModalProps) => {
    const {
        category,
        title,
        setTitle,
        caption,
        setCaption,
        price,
        setPrice,
        location,
        setLocation,
        bedrooms,
        setBedrooms,
        bathrooms,
        setBathrooms,
        sqft,
        setSqft,
        mileage,
        setMileage,
        fuel,
        setFuel,
        transmission,
        setTransmission,
        customFeatures,
        addCustomFeature,
        updateCustomFeature,
        removeCustomFeature,
        featuredImage,
        additionalImages,
        featuredImageRef,
        additionalImagesRef,
        handleCategoryChange,
        handleFeaturedImageSelect,
        handleAdditionalImagesSelect,
        removeAdditionalImage,
        canPublish,
        handleClose,
        handleDiscardDraft,
        handleSaveProgress,
        handlePublish,
        isPublishing,
        errorMessage,
    } = useCreateListingModalViewModel({ onClose, onPublished });

    const t = THEMES[category];

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-colors duration-300 ${t.backdrop}`}
            onClick={handleClose}
        >
            <div
                className="flex w-full max-w-4xl max-h-[90vh] rounded-2xl bg-white shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Hidden file inputs — inside stopPropagation so file picker close doesn't bubble to backdrop */}
                <input
                    ref={featuredImageRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFeaturedImageSelect(e.target.files)}
                />
                <input
                    ref={additionalImagesRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handleAdditionalImagesSelect(e.target.files)}
                />

                {/* ── Left sidebar ─────────────────────────────────────── */}
                <div className={`hidden md:flex w-56 shrink-0 flex-col justify-between ${t.sidebar} p-6 transition-colors duration-300`}>
                    <div>
                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                            {category === "real-estate" ? (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                    <polyline points="9 22 9 12 15 12 15 22" />
                                </svg>
                            ) : (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="1" y="3" width="15" height="13" rx="2" />
                                    <path d="M16 8h4l3 3v5h-7V8z" />
                                    <circle cx="5.5" cy="18.5" r="2.5" />
                                    <circle cx="18.5" cy="18.5" r="2.5" />
                                </svg>
                            )}
                        </div>

                        <h2 className="text-xl font-bold leading-tight text-white">
                            Create a<br />Listing
                        </h2>
                        <p className="mt-3 text-xs leading-relaxed text-white/70">
                            {category === "real-estate"
                                ? "List your property for sale or rent. Add high-quality photos and accurate details to attract serious buyers."
                                : "List your vehicle for sale. Add high-quality photos and precise specs to reach serious buyers."}
                        </p>
                    </div>

                    <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        <span className="text-xs font-semibold text-white">Verified Seller</span>
                    </div>
                </div>

                {/* ── Right panel ──────────────────────────────────────── */}
                <div className="flex flex-1 flex-col min-w-0">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-gray-100 px-6 pb-4 pt-5">
                        <h3 className="text-base font-bold text-gray-800">Listing Details</h3>
                        <button
                            type="button"
                            onClick={handleClose}
                            className="cursor-pointer rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>

                    {/* Scrollable form */}
                    <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">

                        {/* Category */}
                        <div>
                            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                                Select Category
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                {/* Real Estate */}
                                <button
                                    type="button"
                                    onClick={() => handleCategoryChange("real-estate")}
                                    className={`cursor-pointer rounded-xl border-2 p-4 text-left transition-all ${
                                        category === "real-estate"
                                            ? `${THEMES["real-estate"].selectedBorder} ${THEMES["real-estate"].selectedBg}`
                                            : "border-gray-200 bg-gray-50 hover:border-gray-300"
                                    }`}
                                >
                                    <div className={`mb-2 flex h-9 w-9 items-center justify-center rounded-lg ${category === "real-estate" ? THEMES["real-estate"].selectedIconBg : "bg-gray-200"}`}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={category === "real-estate" ? THEMES["real-estate"].iconStroke : "#9ca3af"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                            <polyline points="9 22 9 12 15 12 15 22" />
                                        </svg>
                                    </div>
                                    <p className={`text-sm font-semibold ${category === "real-estate" ? THEMES["real-estate"].selectedText : "text-gray-700"}`}>
                                        Real Estate
                                    </p>
                                    <p className="mt-0.5 text-xs text-gray-400">Residential or Commercial</p>
                                </button>

                                {/* Vehicles */}
                                <button
                                    type="button"
                                    onClick={() => handleCategoryChange("vehicle")}
                                    className={`cursor-pointer rounded-xl border-2 p-4 text-left transition-all ${
                                        category === "vehicle"
                                            ? `${THEMES["vehicle"].selectedBorder} ${THEMES["vehicle"].selectedBg}`
                                            : "border-gray-200 bg-gray-50 hover:border-gray-300"
                                    }`}
                                >
                                    <div className={`mb-2 flex h-9 w-9 items-center justify-center rounded-lg ${category === "vehicle" ? THEMES["vehicle"].selectedIconBg : "bg-gray-200"}`}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={category === "vehicle" ? THEMES["vehicle"].iconStroke : "#9ca3af"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="1" y="3" width="15" height="13" rx="2" />
                                            <path d="M16 8h4l3 3v5h-7V8z" />
                                            <circle cx="5.5" cy="18.5" r="2.5" />
                                            <circle cx="18.5" cy="18.5" r="2.5" />
                                        </svg>
                                    </div>
                                    <p className={`text-sm font-semibold ${category === "vehicle" ? THEMES["vehicle"].selectedText : "text-gray-700"}`}>
                                        Vehicles
                                    </p>
                                    <p className="mt-0.5 text-xs text-gray-400">Cars, SUVs, or Trucks</p>
                                </button>
                            </div>
                        </div>

                        {/* Title */}
                        <div>
                            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                                Listing Title <span className="text-red-400">*</span>
                            </label>
                            <div className={`flex items-center rounded-xl border border-gray-200 bg-gray-50 px-3 ${t.inputFocus}`}>
                                <input
                                    type="text"
                                    placeholder={category === "real-estate" ? "e.g. 3-BR House in BF Homes, Parañaque" : "e.g. 2022 Toyota Vios E Manual"}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="flex-1 bg-transparent py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Caption */}
                        <div>
                            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                                Caption <span className="text-gray-300">(optional)</span>
                            </label>
                            <div className={`flex rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 ${t.inputFocus}`}>
                                <textarea
                                    placeholder="Say something about this listing..."
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                    rows={2}
                                    className="w-full resize-none bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Price + Location */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                                    Price
                                </label>
                                <div className={`flex items-center rounded-xl border border-gray-200 bg-gray-50 px-3 ${t.inputFocus}`}>
                                    <span className="mr-2 text-sm font-medium text-gray-400">₱</span>
                                    <input
                                        type="text"
                                        placeholder="1,200,000"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        className="flex-1 bg-transparent py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                                    Location
                                </label>
                                <div className={`flex items-center rounded-xl border border-gray-200 bg-gray-50 px-3 ${t.inputFocus}`}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 shrink-0">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder="Cebu City, Cebu"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        className="flex-1 bg-transparent py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Key Features */}
                        <div>
                            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                                Key Features
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {category === "real-estate" ? (
                                    <>
                                        <FeatureCard icon={<BedIcon />} label="Bedrooms" value={bedrooms} onChange={setBedrooms} placeholder="4" />
                                        <FeatureCard icon={<BathIcon />} label="Bathrooms" value={bathrooms} onChange={setBathrooms} placeholder="3" />
                                        <FeatureCard icon={<AreaIcon />} label="Sq Ft" value={sqft} onChange={setSqft} placeholder="200 sqm" />
                                    </>
                                ) : (
                                    <>
                                        <FeatureCard icon={<MileageIcon />} label="Mileage" value={mileage} onChange={setMileage} placeholder="12,000 km" />
                                        <FeatureCard icon={<FuelIcon />} label="Fuel" value={fuel} onChange={setFuel} placeholder="Diesel" />
                                        <FeatureCard icon={<TransmissionIcon />} label="Transmission" value={transmission} onChange={setTransmission} placeholder="Automatic" />
                                    </>
                                )}

                                {customFeatures.map((feat) => (
                                    <div key={feat.id} className="relative flex w-28 flex-col rounded-xl border border-gray-200 bg-gray-50 p-3">
                                        <button
                                            type="button"
                                            onClick={() => removeCustomFeature(feat.id)}
                                            className="absolute right-1.5 top-1.5 cursor-pointer text-gray-300 hover:text-gray-500"
                                        >
                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="18" y1="6" x2="6" y2="18" />
                                                <line x1="6" y1="6" x2="18" y2="18" />
                                            </svg>
                                        </button>
                                        <input
                                            type="text"
                                            placeholder="Value"
                                            value={feat.value}
                                            onChange={(e) => updateCustomFeature(feat.id, "value", e.target.value)}
                                            className="mb-1 w-full bg-transparent text-sm font-semibold text-gray-700 placeholder:text-gray-300 focus:outline-none"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Label"
                                            value={feat.label}
                                            onChange={(e) => updateCustomFeature(feat.id, "label", e.target.value)}
                                            className="w-full bg-transparent text-[10px] uppercase tracking-wide text-gray-400 placeholder:text-gray-300 focus:outline-none"
                                        />
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={addCustomFeature}
                                    className={`flex w-28 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-gray-200 p-3 text-gray-400 transition-colors ${t.addMoreHover}`}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19" />
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                    </svg>
                                    <span className="text-[10px] font-semibold uppercase tracking-wide">Add More</span>
                                </button>
                            </div>
                        </div>

                        {/* Upload Media */}
                        <div>
                            <div className="mb-3 flex items-center justify-between">
                                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                                    Upload Media
                                </p>
                                <span className="text-[10px] text-gray-400">Min. 1 photo required</span>
                            </div>

                            <div className="flex gap-3">
                                {/* Featured image */}
                                <button
                                    type="button"
                                    onClick={() => featuredImageRef.current?.click()}
                                    className={`relative flex h-36 flex-1 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 transition-colors ${t.addMoreHover}`}
                                >
                                    {featuredImage ? (
                                        <Image
                                            src={featuredImage.url}
                                            alt="Featured"
                                            fill
                                            className="rounded-xl object-cover"
                                        />
                                    ) : (
                                        <>
                                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="16 16 12 12 8 16" />
                                                <line x1="12" y1="12" x2="12" y2="21" />
                                                <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                                            </svg>
                                            <span className="mt-2 text-xs font-medium text-gray-400">Featured Image</span>
                                        </>
                                    )}
                                </button>

                                {/* Additional images */}
                                <div className="flex flex-col gap-2">
                                    <div className="grid grid-cols-2 gap-2">
                                        {additionalImages.slice(0, 3).map((img) => (
                                            <div key={img.id} className="relative h-16 w-16 overflow-hidden rounded-xl border border-gray-200">
                                                <Image src={img.url} alt="Additional" fill className="object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => removeAdditionalImage(img.id)}
                                                    className="absolute right-1 top-1 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                                                >
                                                    <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                        <line x1="18" y1="6" x2="6" y2="18" />
                                                        <line x1="6" y1="6" x2="18" y2="18" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => additionalImagesRef.current?.click()}
                                            className={`flex h-16 w-16 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gray-200 text-gray-400 transition-colors ${t.addMoreHover}`}
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="12" y1="5" x2="12" y2="19" />
                                                <line x1="5" y1="12" x2="19" y2="12" />
                                            </svg>
                                        </button>
                                    </div>
                                    {additionalImages.length > 3 && (
                                        <p className="text-center text-[10px] text-gray-400">+{additionalImages.length - 3} more</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
                        <button
                            type="button"
                            onClick={handleDiscardDraft}
                            className="cursor-pointer text-sm font-medium text-gray-400 transition-colors hover:text-gray-600"
                        >
                            Discard Draft
                        </button>
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={handleSaveProgress}
                                className="cursor-pointer text-sm font-medium text-gray-600 transition-colors hover:text-gray-800"
                            >
                                Save Progress
                            </button>
                            <button
                                type="button"
                                onClick={handlePublish}
                                disabled={!canPublish || isPublishing}
                                className={`rounded-full px-5 py-2 text-sm font-semibold text-white transition-colors ${
                                    canPublish && !isPublishing
                                        ? `cursor-pointer ${t.publishBtn}`
                                        : "cursor-not-allowed bg-gray-200 text-gray-400"
                                }`}
                            >
                                {isPublishing ? "Publishing..." : "Publish Listing"}
                            </button>
                        </div>
                    </div>
                    {errorMessage && (
                        <p className="px-6 pb-4 text-sm text-red-500">{errorMessage}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

/* ── Sub-components ─────────────────────────────────────────────────── */

interface FeatureCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder: string;
}

const FeatureCard = ({ icon, label, value, onChange, placeholder }: FeatureCardProps) => (
    <div className="flex w-28 flex-col rounded-xl border border-gray-200 bg-gray-50 p-3">
        <div className="mb-1 text-gray-400">{icon}</div>
        <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-transparent text-sm font-semibold text-gray-700 placeholder:text-gray-300 focus:outline-none"
        />
        <p className="mt-0.5 text-[10px] uppercase tracking-wide text-gray-400">{label}</p>
    </div>
);

const BedIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 4v16" /><path d="M22 8H2" /><path d="M22 20V8" />
        <rect x="6" y="8" width="6" height="5" rx="1" />
    </svg>
);

const BathIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
        <line x1="10" y1="5" x2="8" y2="7" />
        <line x1="2" y1="12" x2="22" y2="12" />
    </svg>
);

const AreaIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 3 21 3 21 9" />
        <polyline points="9 21 3 21 3 15" />
        <line x1="21" y1="3" x2="14" y2="10" />
        <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
);

const MileageIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

const FuelIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 22V8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v14" />
        <line x1="2" y1="22" x2="14" y2="22" />
        <path d="M13 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4" />
        <line x1="17" y1="22" x2="17" y2="10" />
        <path d="M19 10h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" />
    </svg>
);

const TransmissionIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="5" cy="6" r="2" />
        <circle cx="19" cy="6" r="2" />
        <circle cx="12" cy="18" r="2" />
        <line x1="5" y1="8" x2="5" y2="18" />
        <line x1="19" y1="8" x2="19" y2="12" />
        <line x1="5" y1="18" x2="10" y2="18" />
        <line x1="14" y1="18" x2="19" y2="12" />
    </svg>
);

export default CreateListingModal;
