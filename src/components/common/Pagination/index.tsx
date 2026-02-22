"use client";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const getPageRange = (current: number, total: number): (number | "...")[] => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

    if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
    if (current >= total - 3) return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
    return [1, "...", current - 1, current, current + 1, "...", total];
};

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    if (totalPages <= 1) return null;

    const pages = getPageRange(currentPage, totalPages);

    const btnBase =
        "w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors cursor-pointer select-none";

    return (
        <div className="flex items-center justify-center gap-1.5 mt-8">
            {/* Previous */}
            <button
                type="button"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`${btnBase} border border-[var(--color-gray-300)] ${
                    currentPage === 1
                        ? "text-[var(--color-gray-300)] cursor-not-allowed"
                        : "text-[var(--color-gray-600)] hover:bg-[var(--color-brand-muted)] hover:border-[var(--color-brand)]"
                }`}
                aria-label="Previous page"
            >
                ‹
            </button>

            {/* Page numbers */}
            {pages.map((page, i) =>
                page === "..." ? (
                    <span
                        key={`ellipsis-${i}`}
                        className="w-9 h-9 flex items-center justify-center text-sm text-[var(--color-gray-400)] select-none"
                    >
                        …
                    </span>
                ) : (
                    <button
                        key={page}
                        type="button"
                        onClick={() => onPageChange(page as number)}
                        className={`${btnBase} border ${
                            currentPage === page
                                ? "bg-[var(--color-brand)] border-[var(--color-brand)] text-white"
                                : "border-[var(--color-gray-300)] text-[var(--color-gray-700)] hover:bg-[var(--color-brand-muted)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
                        }`}
                        aria-label={`Page ${page}`}
                        aria-current={currentPage === page ? "page" : undefined}
                    >
                        {page}
                    </button>
                )
            )}

            {/* Next */}
            <button
                type="button"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`${btnBase} border border-[var(--color-gray-300)] ${
                    currentPage === totalPages
                        ? "text-[var(--color-gray-300)] cursor-not-allowed"
                        : "text-[var(--color-gray-600)] hover:bg-[var(--color-brand-muted)] hover:border-[var(--color-brand)]"
                }`}
                aria-label="Next page"
            >
                ›
            </button>
        </div>
    );
};

export default Pagination;
