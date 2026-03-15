"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import BaseButton from "@/components/common/BaseButton";
import heartIcon from "@/assets/icons/heart.png";
import shareIcon from "@/assets/icons/share.png";
import { useSmoothContainerScroll } from "@/hooks/useSmoothContainerScroll";

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
        return ["Luxury", "Modern", "High Ceilings", "Clubhouse Access"];
    }

    return [listing.bodyType || "Vehicle", listing.fuelType || "Fuel Efficient", listing.color || "Premium Finish", "Well Maintained"];
};

const parseDescription = (description: string): string[] => {
    const clean = description.trim();
    if (!clean) return ["No description available."];

    const byParagraph = clean.split(/\n\s*\n/).filter(Boolean);
    if (byParagraph.length > 1) return byParagraph;

    const chunks = clean.split(/(?<=[.!?])\s+/).filter(Boolean);
    if (chunks.length <= 2) return [clean];

    const mid = Math.ceil(chunks.length / 2);
    return [chunks.slice(0, mid).join(" "), chunks.slice(mid).join(" ")];
};

const ListingDetailsModal = ({ isOpen, listing, onClose }: ListingDetailsModalProps) => {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const modalScrollRef = useRef<HTMLDivElement | null>(null);

    const images = useMemo(() => {
        if (!listing) return [];
        return [listing.image, listing.image, listing.image];
    }, [listing]);
    useSmoothContainerScroll(modalScrollRef, { lerp: 0.14, wheelMultiplier: 1 });

    useEffect(() => {
        if (!isOpen) return;
        const previousOverflow = document.body.style.overflow;
        const hadLenisStopped = document.documentElement.classList.contains("lenis-stopped");
        document.body.style.overflow = "hidden";
        document.documentElement.classList.add("lenis-stopped");

        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };

        window.addEventListener("keydown", handleEsc);
        return () => {
            window.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = previousOverflow;
            if (!hadLenisStopped) {
                document.documentElement.classList.remove("lenis-stopped");
            }
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        setActiveImageIndex(0);
    }, [listing?.id]);

    if (!isOpen || !listing) return null;

    const features = parseFeatures(listing);
    const descriptionParagraphs = parseDescription(listing.description);
    const isProperty = listing.category === "PROPERTY";
    const specBadges = [listing.year, listing.color, listing.mileage, listing.fuelType, listing.bodyType].filter(Boolean);

    return (
        <div className="fixed inset-0 z-[120] bg-black/50 p-3 md:p-6 overflow-y-auto" onClick={onClose} role="dialog" aria-modal="true">
            <div
                ref={modalScrollRef}
                data-lenis-prevent
                className="mx-auto w-full max-w-[1020px] max-h-[95vh] overflow-y-auto rounded-[10px] bg-[var(--color-gray-100)] border border-[var(--color-gray-300)] p-5 md:p-6"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex items-center justify-between gap-3 mb-4">
                    <h2 className="text-[20px] md:text-[26px] leading-tight font-bold text-[var(--color-gray-900)]">{listing.title}</h2>

                    <div className="flex items-center gap-2 shrink-0">
                        <button
                            className="h-8 w-8 rounded-md border border-[var(--color-gray-300)] bg-white flex items-center justify-center"
                            aria-label="Add listing to favorites"
                        >
                            <Image src={heartIcon} alt="" width={14} height={14} />
                        </button>
                        <button
                            className="h-8 w-8 rounded-md border border-[var(--color-gray-300)] bg-white flex items-center justify-center"
                            aria-label="Share listing"
                        >
                            <Image src={shareIcon} alt="" width={14} height={14} />
                        </button>
                        <button
                            onClick={onClose}
                            className="h-8 w-8 rounded-md border border-[var(--color-gray-300)] bg-white text-[var(--color-gray-700)] text-lg leading-none"
                            aria-label="Close listing details modal"
                        >
                            x
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                    <div className="lg:col-span-8 min-w-0">
                        <div className="relative h-[230px] sm:h-[320px] md:h-[380px] rounded-[7px] overflow-hidden border border-[var(--color-gray-300)]">
                            <Image src={images[activeImageIndex]} alt={listing.title} fill className="object-cover" />

                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={() => setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-md bg-white/95 border border-[var(--color-gray-300)] text-[20px] leading-none"
                                        aria-label="Previous image"
                                    >
                                        &#8249;
                                    </button>
                                    <button
                                        onClick={() => setActiveImageIndex((prev) => (prev + 1) % images.length)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-md bg-white/95 border border-[var(--color-gray-300)] text-[20px] leading-none"
                                        aria-label="Next image"
                                    >
                                        &#8250;
                                    </button>
                                </>
                            )}
                        </div>

                        <div className="flex justify-center gap-1.5 py-3">
                            {images.map((_, index) => (
                                <button
                                    key={`${listing.id}-dot-${index}`}
                                    onClick={() => setActiveImageIndex(index)}
                                    className={`h-2.5 w-2.5 rounded-full ${index === activeImageIndex ? "bg-[var(--color-gray-700)]" : "bg-[var(--color-gray-300)]"}`}
                                    aria-label={`View image ${index + 1}`}
                                />
                            ))}
                        </div>

                        <p className="text-[17px] leading-tight text-[var(--color-gray-900)] mb-3">{listing.location}</p>

                        <div className="flex flex-wrap gap-2 mb-5">
                            {specBadges.map((spec) => (
                                <span key={`${listing.id}-${spec}`} className="rounded-md border border-[var(--color-gray-400)] bg-white px-3 py-1 text-sm leading-tight">
                                    {spec}
                                </span>
                            ))}
                        </div>

                        <hr className="border-[var(--color-gray-300)] mb-5" />

                        <h3 className="text-base font-semibold mb-2">Description</h3>
                        <div className="space-y-4">
                            {descriptionParagraphs.map((paragraph, index) => (
                                <p key={`${listing.id}-desc-${index}`} className="text-sm leading-relaxed text-[var(--color-gray-800)]">
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        <hr className="border-[var(--color-gray-300)] my-5" />

                        <h3 className="text-base font-semibold mb-2">Features</h3>
                        <div className="flex flex-wrap gap-3">
                            {features.map((feature) => (
                                <span key={`${listing.id}-${feature}`} className="rounded-lg border border-[var(--color-gray-400)] bg-white px-4 py-2 text-sm leading-tight">
                                    {feature}
                                </span>
                            ))}
                        </div>
                    </div>

                    <aside className="lg:col-span-4 rounded-[7px] border border-[var(--color-gray-300)] bg-white p-5 h-fit">
                        <div className="text-center mb-5">
                            <p className="text-[38px] font-bold leading-tight">{listing.price}</p>
                            <p className="text-sm text-[var(--color-gray-500)]">{isProperty ? "Property Price" : "Vehicle Price"}</p>
                        </div>

                        <hr className="border-[var(--color-gray-300)] mb-5" />

                        <div className="flex flex-col items-center text-center">
                            <div className="h-[124px] w-[124px] rounded-full bg-[var(--color-gray-200)] mb-3 overflow-hidden">
                                <Image
                                    src="/images/profile-user.png"
                                    alt="Agent profile"
                                    width={124}
                                    height={124}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <p className="font-semibold text-lg leading-tight text-[var(--color-gray-900)]">Miguel Santos</p>
                            <p className="text-xs text-[var(--color-gray-500)] mb-5">{isProperty ? "Real Estate Agent" : "Car Sales Agent"}</p>
                            <BaseButton className="w-full bg-[var(--color-success)] text-white text-sm rounded-md h-[48px]">
                                Send A Message
                            </BaseButton>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default ListingDetailsModal;
