"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "@/providers/SmoothScrollProvider";

interface ScrollToHashProps {
    hash: string;
    /** Negative value pulls the stop point above the element (accounts for sticky navbar). */
    offset?: number;
}

const ScrollToHash = ({ hash, offset = -96 }: ScrollToHashProps) => {
    const lenis = useLenis();
    const pendingScroll = useRef(false);

    // Mount: detect hash, mark pending, strip it so the browser won't jump.
    useEffect(() => {
        if (typeof window === "undefined") return;
        if (window.location.hash !== `#${hash}`) return;

        pendingScroll.current = true;
        history.replaceState(null, "", window.location.pathname);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // When Lenis is ready and a scroll is pending: snap to top via Lenis,
    // then animate down to the target element.
    useEffect(() => {
        if (!pendingScroll.current || !lenis) return;
        pendingScroll.current = false;

        // Snap to page top through Lenis (not window.scrollTo — Lenis owns scroll).
        lenis.scrollTo(0, { immediate: true });

        // Wait for the snap to settle, then animate to the section.
        const timer = setTimeout(() => {
            const el = document.getElementById(hash);
            if (!el) return;
            lenis.scrollTo(el, { offset, duration: 1.6 });
        }, 150);

        return () => clearTimeout(timer);
    }, [lenis, hash, offset]);

    return null;
};

export default ScrollToHash;
