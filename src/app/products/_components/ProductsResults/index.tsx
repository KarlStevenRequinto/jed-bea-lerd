import Image from "next/image";
import BaseButton from "@/components/common/BaseButton";
import { FormattedListing } from "@/lib/types/listing";

interface ProductsResultsProps {
    listings: FormattedListing[];
    activePage: number;
    onPageChange: (page: number) => void;
}

const ProductsResults = ({ listings, activePage, onPageChange }: ProductsResultsProps) => {
    return (
        <div className="space-y-3">
            <div className="rounded-lg border border-[#d6def0] bg-white px-4 py-3 text-xs text-[#6880ad]">
                Showing 1 - {Math.min(listings.length, 12)} of 100 results
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
                {listings.map((listing) => (
                    <article key={listing.id} className="overflow-hidden rounded-xl border border-[#d6def0] bg-white shadow-[0_8px_24px_rgba(15,46,97,0.06)]">
                        <div className="relative h-[160px] w-full bg-[#e9f0ff]">
                            <Image src={listing.image} alt={listing.title} fill className="object-cover" />
                        </div>
                        <div className="space-y-2 p-3">
                            <h2 className="line-clamp-1 text-base font-semibold text-[#233d6a]">{listing.title}</h2>
                            <p className="text-[22px] font-bold leading-none text-[var(--color-brand)]">{listing.price}</p>
                            <p className="line-clamp-1 text-xs text-[#6d7f9f]">{listing.location}</p>
                            <div className="grid grid-cols-3 gap-1 text-[10px] text-[#7085aa]">
                                <span>{listing.mileage}</span>
                                <span>{listing.fuelType}</span>
                                <span>{listing.bodyType}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 pt-1">
                                <BaseButton className="h-8 rounded-md bg-[var(--color-brand)] text-xs text-white">View Details</BaseButton>
                                <BaseButton className="h-8 rounded-md border border-[#ccd7ee] bg-white text-xs text-[#35558e]">View Details</BaseButton>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            <div className="flex items-center justify-center gap-2 rounded-lg border border-[#d6def0] bg-white px-4 py-3 text-xs text-[#5c729c]">
                <button type="button" className="rounded px-2 py-1 hover:bg-[#eef3ff]">
                    {"<"}
                </button>
                {[1, 2, 3].map((page) => (
                    <button
                        key={page}
                        type="button"
                        onClick={() => onPageChange(page)}
                        className={`h-7 w-7 rounded ${activePage === page ? "bg-[var(--color-brand)] text-white" : "hover:bg-[#eef3ff]"}`}
                    >
                        {page}
                    </button>
                ))}
                <button type="button" className="rounded px-2 py-1 hover:bg-[#eef3ff]">
                    {">"}
                </button>
            </div>
        </div>
    );
};

export default ProductsResults;
