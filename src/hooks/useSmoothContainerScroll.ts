import { RefObject, useEffect } from "react";

type UseSmoothContainerScrollOptions = {
    lerp?: number;
    wheelMultiplier?: number;
};

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export const useSmoothContainerScroll = (
    containerRef: RefObject<HTMLElement | null>,
    options: UseSmoothContainerScrollOptions = {}
) => {
    const { lerp = 0.14, wheelMultiplier = 1 } = options;

    useEffect(() => {
        const element = containerRef.current;
        if (!element) return;

        let currentY = element.scrollTop;
        let targetY = element.scrollTop;
        let frameId: number | null = null;

        const animate = () => {
            currentY += (targetY - currentY) * lerp;

            if (Math.abs(targetY - currentY) < 0.2) {
                currentY = targetY;
            }

            element.scrollTop = currentY;

            if (Math.abs(targetY - currentY) >= 0.2) {
                frameId = requestAnimationFrame(animate);
            } else {
                frameId = null;
            }
        };

        const startAnimation = () => {
            if (frameId !== null) return;
            frameId = requestAnimationFrame(animate);
        };

        const handleWheel = (event: WheelEvent) => {
            const maxScrollTop = element.scrollHeight - element.clientHeight;
            if (maxScrollTop <= 0) return;

            event.preventDefault();

            targetY = clamp(targetY + event.deltaY * wheelMultiplier, 0, maxScrollTop);
            startAnimation();
        };

        element.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            element.removeEventListener("wheel", handleWheel);
            if (frameId !== null) {
                cancelAnimationFrame(frameId);
            }
        };
    }, [containerRef, lerp, wheelMultiplier]);
};
