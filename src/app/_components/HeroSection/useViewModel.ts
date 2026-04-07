import { useCallback, useEffect, useRef, useState } from "react";

export interface HeroSlide {
    image: string;
    eyebrow: string;
    headline: string;
    accentText: string;
    subtext: string;
    overlayFrom: string;
    overlayVia: string;
}

const SLIDES: HeroSlide[] = [
    {
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1600&h=900&fit=crop&auto=format",
        eyebrow: "Philippines #1 Marketplace",
        headline: "Find Your Dream",
        accentText: "Home or Vehicle",
        subtext:
            "Discover curated properties and vehicles across the Philippines — from city condos to mountain retreats.",
        overlayFrom: "rgba(11,33,22,0.92)",
        overlayVia: "rgba(11,33,22,0.72)",
    },
    {
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&h=900&fit=crop&auto=format",
        eyebrow: "Premium Real Estate",
        headline: "Own the Finest",
        accentText: "Properties in PH",
        subtext:
            "Browse houses, condominiums, townhouses, and commercial spaces — hand-picked from trusted sellers nationwide.",
        overlayFrom: "rgba(10,25,18,0.90)",
        overlayVia: "rgba(10,25,18,0.65)",
    },
    {
        image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1600&h=900&fit=crop&auto=format",
        eyebrow: "Top Vehicle Deals",
        headline: "Drive Your Perfect",
        accentText: "Car Today",
        subtext:
            "From brand-new SUVs to certified pre-owned sedans — find the vehicle that fits your life and your budget.",
        overlayFrom: "rgba(12,28,18,0.93)",
        overlayVia: "rgba(12,28,18,0.70)",
    },
    {
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&h=900&fit=crop&auto=format",
        eyebrow: "Exclusive Listings",
        headline: "Luxury Living",
        accentText: "Awaits You",
        subtext:
            "Explore premium properties with world-class amenities — pools, gardens, and breathtaking views across the country.",
        overlayFrom: "rgba(8,24,14,0.91)",
        overlayVia: "rgba(8,24,14,0.66)",
    },
    {
        image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1600&h=900&fit=crop&auto=format",
        eyebrow: "Quality Vehicles",
        headline: "Power Meets",
        accentText: "Elegance",
        subtext:
            "Find performance vehicles and everyday rides from trusted dealers and private sellers all over the Philippines.",
        overlayFrom: "rgba(10,30,16,0.92)",
        overlayVia: "rgba(10,30,16,0.68)",
    },
];

const INTERVAL_MS = 5000;

export const useHeroSectionViewModel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const startTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
        }, INTERVAL_MS);
    }, []);

    useEffect(() => {
        startTimer();
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [startTimer]);

    const goTo = useCallback(
        (index: number) => {
            if (animating) return;
            setAnimating(true);
            setCurrentIndex(index);
            startTimer();
            setTimeout(() => setAnimating(false), 600);
        },
        [animating, startTimer]
    );

    const goNext = useCallback(() => {
        goTo((currentIndex + 1) % SLIDES.length);
    }, [currentIndex, goTo]);

    const goPrev = useCallback(() => {
        goTo((currentIndex - 1 + SLIDES.length) % SLIDES.length);
    }, [currentIndex, goTo]);

    return {
        slides: SLIDES,
        currentIndex,
        goNext,
        goPrev,
        goTo,
    };
};
