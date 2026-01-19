"use client";

import Image from "next/image";

interface SponsoredAdProps {
    title?: string;
    description?: string;
    imageUrl?: string;
    linkUrl?: string;
}

const SponsoredAd = ({
    title = "PIONEER INSURANCE",
    description = "Secure your life's biggest investments — Pioneer Insurance keeps both your home and your vehicle safe.",
    imageUrl = "",
    linkUrl = "#",
}: SponsoredAdProps) => {
    return (
        <div className="bg-white rounded-lg border border-[var(--color-gray-200)] overflow-hidden">
            {/* Sponsored Label */}
            <div className="relative">
                <div className="absolute top-2 right-2 bg-[var(--color-brand)] text-white text-[10px] font-medium px-2 py-1 rounded z-10">
                    SPONSORED
                </div>

                {/* Ad Image */}
                <div className="w-full h-[140px] bg-gradient-to-br from-[var(--color-brand-light)] to-[var(--color-brand)] relative flex items-center justify-center">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={title}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <svg
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                opacity="0.7"
                            />
                            <path
                                d="M9 12L11 14L15 10"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                opacity="0.7"
                            />
                        </svg>
                    )}
                </div>
            </div>

            {/* Ad Content */}
            <div className="p-4">
                <h4 className="text-sm font-bold text-[var(--color-brand)] mb-2">
                    {title}
                </h4>
                <p className="text-xs text-[var(--color-gray-600)] leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default SponsoredAd;
