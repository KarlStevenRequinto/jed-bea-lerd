import Image from "next/image";

const PromotedListingsSidebar = () => {
    return (
        <aside className="flex w-52 shrink-0 flex-col border-l border-[var(--color-green-100)] bg-gray-50 p-4 overflow-y-auto">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                Promoted Listings
            </p>

            {/* Card 1 — sponsored real estate */}
            <div className="mb-3 overflow-hidden rounded-xl border border-[var(--color-green-100)] bg-white shadow-sm">
                <div className="relative">
                    <Image
                        src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=200&fit=crop"
                        alt="BGC Corner Unit"
                        width={200}
                        height={96}
                        className="h-24 w-full object-cover"
                    />
                    <span className="absolute left-2 top-2 rounded bg-gray-800/80 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
                        Sponsored
                    </span>
                </div>
                <div className="p-3">
                    <p className="text-xs font-bold text-gray-800">BGC Corner Unit</p>
                    <p className="mt-0.5 text-[10px] leading-relaxed text-gray-500">
                        Exclusive pre-selling. Prime BGC address with panoramic city views.
                    </p>
                    <button
                        type="button"
                        className="mt-2 w-full cursor-pointer rounded-lg border border-[var(--color-brand)] py-1 text-[10px] font-semibold text-[var(--color-brand)] transition-colors hover:bg-[var(--color-green-50)]"
                    >
                        Book Tour
                    </button>
                </div>
            </div>

            {/* Card 2 — featured vehicle */}
            <div className="overflow-hidden rounded-xl border border-[var(--color-green-100)] bg-white p-3 shadow-sm">
                <div className="mb-2 flex items-center gap-1.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded bg-[var(--color-green-50)]">
                        <svg
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-[var(--color-brand)]"
                        >
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                        </svg>
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--color-brand)]">
                        Featured
                    </span>
                </div>
                <p className="text-xs font-bold text-gray-800">2024 Land Rover Defender</p>
                <p className="mt-0.5 text-[10px] leading-relaxed text-gray-500">
                    5,000 km, first owner, pristine condition. Negotiable.
                </p>
                <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs font-bold text-[var(--color-brand)]">₱4.2M</span>
                    <button
                        type="button"
                        className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-[var(--color-brand)] text-white transition-colors hover:bg-[var(--color-brand-dark)]"
                        aria-label="View listing"
                    >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default PromotedListingsSidebar;
