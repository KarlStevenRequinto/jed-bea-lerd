"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useHeroSectionViewModel } from "./useViewModel";
import HeroSectionSkeleton from "./HeroSectionSkeleton";

interface HeroSectionProps {
    isLoading?: boolean;
}

const HeroSection = ({ isLoading = false }: HeroSectionProps) => {
    const router = useRouter();
    const { slides, currentIndex, goNext, goPrev, goTo } = useHeroSectionViewModel();

    if (isLoading) {
        return <HeroSectionSkeleton />;
    }

    return (
        <div className="relative w-full h-[500px] lg:h-[580px] overflow-hidden">
            {/* Slide images — all mounted, opacity-toggled for crossfade */}
            {slides.map((s, i) => (
                <div
                    key={i}
                    className="absolute inset-0 transition-opacity duration-700"
                    style={{ opacity: i === currentIndex ? 1 : 0 }}
                >
                    <Image
                        src={s.image}
                        alt={s.accentText}
                        fill
                        className="object-cover object-center"
                        priority={i === 0}
                        sizes="100vw"
                    />
                    {/* Per-slide dark overlay */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `linear-gradient(to right, ${s.overlayFrom} 0%, ${s.overlayVia} 55%, rgba(0,0,0,0.15) 100%)`,
                        }}
                    />
                </div>
            ))}

            {/* Subtle top-to-bottom green tint */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "linear-gradient(to bottom, rgba(34,103,53,0.15) 0%, transparent 60%)",
                }}
            />

            {/* Content — all slides rendered, fade + rise on active */}
            <div className="relative h-full container mx-auto px-6 flex flex-col justify-center">
                {slides.map((s, i) => (
                    <div
                        key={i}
                        className="absolute max-w-2xl transition-all duration-700"
                        style={{
                            opacity: i === currentIndex ? 1 : 0,
                            transform: i === currentIndex ? "translateY(0)" : "translateY(18px)",
                            pointerEvents: i === currentIndex ? "auto" : "none",
                        }}
                    >
                        {/* Eyebrow tag */}
                        <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-[var(--color-green-300)]/50 bg-[var(--color-brand-dark)]/40 backdrop-blur-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-green-300)]" />
                            <span className="text-[var(--color-green-300)] text-xs font-semibold tracking-widest uppercase">
                                {s.eyebrow}
                            </span>
                        </div>

                        <h1 className="text-5xl lg:text-[3.75rem] font-bold text-white leading-[1.08] tracking-tight mb-5">
                            {s.headline}
                            <br />
                            <span style={{ color: "var(--color-green-300)" }}>
                                {s.accentText}
                            </span>
                        </h1>

                        <p className="text-white/75 text-lg mb-9 leading-relaxed max-w-lg">
                            {s.subtext}
                        </p>

                        {/* Action buttons */}
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => router.push("/login?tab=register")}
                                className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-[var(--color-brand-darker)] bg-[var(--color-green-300)] hover:bg-[var(--color-green-300)]/90 transition-colors text-sm"
                            >
                                Get Started Free
                                <span className="text-base">→</span>
                            </button>
                            <button
                                onClick={() => router.push("/login")}
                                className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white border border-white/40 bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors text-sm"
                            >
                                Sign In
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom controls: dots + arrows */}
            <div className="absolute bottom-7 left-0 right-0 px-6 container mx-auto flex items-center justify-between pointer-events-none">
                {/* Dot indicators */}
                <div className="flex items-center gap-2 pointer-events-auto">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            className="cursor-pointer transition-all duration-300"
                            style={{
                                width: i === currentIndex ? "24px" : "8px",
                                height: "8px",
                                borderRadius: "4px",
                                background:
                                    i === currentIndex
                                        ? "var(--color-green-300)"
                                        : "rgba(255,255,255,0.4)",
                            }}
                        />
                    ))}
                </div>

                {/* Prev / Next arrows */}
                <div className="flex gap-2 pointer-events-auto">
                    <button
                        onClick={goPrev}
                        aria-label="Previous slide"
                        className="cursor-pointer w-10 h-10 rounded-full flex items-center justify-center text-white border border-white/30 bg-white/10 hover:bg-white/25 backdrop-blur-sm transition-colors text-lg font-light"
                    >
                        ‹
                    </button>
                    <button
                        onClick={goNext}
                        aria-label="Next slide"
                        className="cursor-pointer w-10 h-10 rounded-full flex items-center justify-center text-white border border-white/30 bg-white/10 hover:bg-white/25 backdrop-blur-sm transition-colors text-lg font-light"
                    >
                        ›
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
