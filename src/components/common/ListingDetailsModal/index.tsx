"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import BaseButton from "@/components/common/BaseButton";

export interface ListingDetailsModalData {
    id: string;
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
    image: string;
}

interface ListingDetailsModalProps {
    isOpen: boolean;
    listing: ListingDetailsModalData | null;
    onClose: () => void;
}

const parseFeatures = (listing: ListingDetailsModalData): string[] => {
    if (listing.category === "PROPERTY") {
        return [listing.bodyType || "Property", "Modern", "High Value", "Prime Location"];
    }

    return [listing.bodyType || "Vehicle", listing.fuelType || "Fuel Efficient", listing.color || "Premium Finish", "Well Maintained"];
};

const ListingDetailsModal = ({ isOpen, listing, onClose }: ListingDetailsModalProps) => {
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const images = useMemo(() => {
        if (!listing) return [];
        return [listing.image, listing.image, listing.image];
    }, [listing]);

    useEffect(() => {
        if (!isOpen) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };

        window.addEventListener("keydown", handleEsc);
        return () => {
            window.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = previousOverflow;
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        setActiveImageIndex(0);
    }, [listing?.id]);

    if (!isOpen || !listing) return null;

    const features = parseFeatures(listing);

    const specBadges = [listing.year, listing.color, listing.mileage, listing.fuelType, listing.bodyType].filter(Boolean);

    return (
        <div className="fixed inset-0 z-[120] bg-black/55 backdrop-blur-[1px] p-4 md:p-8" onClick={onClose} role="dialog" aria-modal="true">
            <div
                className="mx-auto max-w-6xl max-h-[94vh] overflow-y-auto rounded-xl bg-[var(--color-gray-100)] border border-[var(--color-gray-300)] p-5 md:p-7"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex items-center justify-between gap-4 mb-5">
                    <h2 className="text-[26px] leading-tight font-bold text-[var(--color-gray-900)]">{listing.title}</h2>
                    <div className="flex items-center gap-2">
                        <button className="h-8 w-8 rounded-md border border-[var(--color-gray-300)] bg-white text-[var(--color-gray-700)]">
                            ❤
                        </button>
                        <button className="h-8 w-8 rounded-md border border-[var(--color-gray-300)] bg-white text-[var(--color-gray-700)]">
                            ↗
                        </button>
                        <button
                            onClick={onClose}
                            className="h-8 w-8 rounded-md border border-[var(--color-gray-300)] bg-white text-[var(--color-gray-700)]"
                            aria-label="Close listing details modal"
                        >
                            ×
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-8">
                        <div className="relative h-[230px] sm:h-[300px] md:h-[380px] rounded-md overflow-hidden">
                            <Image src={images[activeImageIndex]} alt={listing.title} fill className="object-cover" />
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={() => setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded bg-white/90"
                                        aria-label="Previous image"
                                    >
                                        ‹
                                    </button>
                                    <button
                                        onClick={() => setActiveImageIndex((prev) => (prev + 1) % images.length)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded bg-white/90"
                                        aria-label="Next image"
                                    >
                                        ›
                                    </button>
                                </>
                            )}
                        </div>

                        <div className="flex justify-center gap-2 py-3">
                            {images.map((_, index) => (
                                <button
                                    key={`${listing.id}-dot-${index}`}
                                    onClick={() => setActiveImageIndex(index)}
                                    className={`h-2.5 w-2.5 rounded-full ${index === activeImageIndex ? "bg-[var(--color-gray-700)]" : "bg-[var(--color-gray-300)]"}`}
                                    aria-label={`View image ${index + 1}`}
                                />
                            ))}
                        </div>

                        <p className="text-[17px] text-[var(--color-gray-800)] mb-3">{listing.location}</p>

                        <div className="flex flex-wrap gap-2 mb-5">
                            {specBadges.map((spec) => (
                                <span key={`${listing.id}-${spec}`} className="rounded-md border border-[var(--color-gray-400)] bg-white px-3 py-1 text-sm">
                                    {spec}
                                </span>
                            ))}
                        </div>

                        <hr className="border-[var(--color-gray-300)] mb-5" />

                        <h3 className="text-base font-semibold mb-2">Description</h3>
                        <p className="text-sm leading-relaxed text-[var(--color-gray-800)] whitespace-pre-line">{listing.description}</p>

                        <hr className="border-[var(--color-gray-300)] my-5" />

                        <h3 className="text-base font-semibold mb-2">Features</h3>
                        <div className="flex flex-wrap gap-2">
                            {features.map((feature) => (
                                <span key={`${listing.id}-${feature}`} className="rounded-md border border-[var(--color-gray-400)] bg-white px-4 py-1.5 text-sm">
                                    {feature}
                                </span>
                            ))}
                        </div>
                    </div>

                    <aside className="lg:col-span-4 rounded-lg border border-[var(--color-gray-300)] bg-white p-5 h-fit">
                        <div className="text-center mb-4">
                            <p className="text-[38px] font-bold leading-tight">{listing.price}</p>
                            <p className="text-sm text-[var(--color-gray-500)]">{listing.category === "PROPERTY" ? "Property Price" : "Vehicle Price"}</p>
                        </div>

                        <hr className="border-[var(--color-gray-300)] mb-5" />

                        <div className="flex flex-col items-center text-center">
                            <div className="h-24 w-24 rounded-full bg-[var(--color-gray-200)] mb-3" />
                            <p className="font-semibold text-lg text-[var(--color-gray-900)]">Miguel Santos</p>
                            <p className="text-xs text-[var(--color-gray-500)] mb-4">{listing.category === "PROPERTY" ? "Real Estate Agent" : "Car Sales Agent"}</p>
                            <BaseButton className="w-full bg-[var(--color-success)] text-white text-sm rounded-md">Send A Message</BaseButton>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default ListingDetailsModal;
