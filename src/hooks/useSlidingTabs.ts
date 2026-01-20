import { useMemo } from "react";

interface UseSlidingTabsOptions {
    /** Number of tabs */
    tabCount: number;
    /** Active tab index (0-based) */
    activeIndex: number;
    /** Left padding offset in pixels (default: 3) */
    paddingOffset?: number;
    /** Gap between tabs in pixels (default: 4) */
    gap?: number;
}

interface UseSlidingTabsReturn {
    /** CSS transform value for the sliding highlight */
    highlightTransform: string;
    /** CSS transition classes for smooth animation */
    transitionClasses: string;
    /** Width calculation for the highlight element */
    highlightWidth: string;
}

/**
 * A reusable hook for creating sliding tab highlight animations.
 * Used for tab interfaces where a highlight indicator slides between tabs.
 *
 * @example
 * ```tsx
 * const { highlightTransform, transitionClasses, highlightWidth } = useSlidingTabs({
 *     tabCount: 2,
 *     activeIndex: activeTab === "following" ? 0 : 1,
 * });
 *
 * // In JSX:
 * <div className={`absolute ${transitionClasses}`} style={{ transform: highlightTransform, width: highlightWidth }} />
 * ```
 */
export const useSlidingTabs = ({
    tabCount,
    activeIndex,
    paddingOffset = 3,
    gap = 4,
}: UseSlidingTabsOptions): UseSlidingTabsReturn => {
    const highlightTransform = useMemo(() => {
        if (activeIndex === 0) {
            return `translateX(${paddingOffset}px)`;
        }
        // For subsequent tabs, calculate position based on index
        const percentage = activeIndex * 100;
        return `translateX(calc(${percentage}% + ${paddingOffset + gap * activeIndex}px))`;
    }, [activeIndex, paddingOffset, gap]);

    const highlightWidth = useMemo(() => {
        // Calculate width based on number of tabs, accounting for padding
        const paddingTotal = paddingOffset * 2 + gap * (tabCount - 1);
        return `calc((100% - ${paddingTotal}px) / ${tabCount})`;
    }, [tabCount, paddingOffset, gap]);

    const transitionClasses = "transition-transform duration-300 ease-out";

    return {
        highlightTransform,
        transitionClasses,
        highlightWidth,
    };
};

export default useSlidingTabs;
