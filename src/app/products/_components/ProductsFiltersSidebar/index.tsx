import BaseButton from "@/components/common/BaseButton";
import FormInput from "@/components/common/FormInput";

interface ProductsFiltersSidebarProps {
    vehicleTypes: string[];
}

const ProductsFiltersSidebar = ({ vehicleTypes }: ProductsFiltersSidebarProps) => {
    return (
        <aside className="rounded-xl border border-[#d6def0] bg-[#eff4ff] p-3">
            <div className="mb-3">
                <FormInput id="search" name="search" type="text" placeholder="Search" value="" onChange={() => undefined} />
            </div>
            <div className="space-y-3">
                <div className="rounded-lg border border-[#d6def0] bg-white p-3">
                    <p className="text-sm font-semibold text-[#314f84]">Filters</p>
                </div>
                <div className="rounded-lg border border-[#d6def0] bg-white p-3">
                    <p className="text-sm font-semibold text-[#314f84]">Cars</p>
                    <div className="mt-2 rounded-md bg-[#ebf2ff] px-2 py-1.5 text-xs text-[#31599f]">Selected</div>
                </div>
                <div className="rounded-lg border border-[#d6def0] bg-white p-3">
                    <p className="text-sm font-semibold text-[#314f84]">Price Range</p>
                    <div className="mt-2 flex items-center justify-between text-xs text-[#4b6392]">
                        <span>$10k+</span>
                        <span>$100k+</span>
                    </div>
                </div>
                <div className="rounded-lg border border-[#d6def0] bg-white p-3">
                    <p className="text-sm font-semibold text-[#314f84]">Car Type</p>
                    <div className="mt-2 space-y-1.5">
                        {vehicleTypes.map((type) => (
                            <label key={type} className="flex items-center gap-2 text-xs text-[#4b6392]">
                                <input type="checkbox" className="h-3.5 w-3.5 accent-[var(--color-brand)]" />
                                <span>{type}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="rounded-lg border border-[#d6def0] bg-white p-3">
                    <p className="text-sm font-semibold text-[#314f84]">Make / Model</p>
                    <div className="mt-2 grid gap-2">
                        <select className="h-9 rounded-md border border-[#d6def0] px-2 text-xs text-[#4b6392]">
                            <option>Make</option>
                        </select>
                        <select className="h-9 rounded-md border border-[#d6def0] px-2 text-xs text-[#4b6392]">
                            <option>Model</option>
                        </select>
                    </div>
                </div>
                <BaseButton className="h-10 w-full rounded-md bg-[var(--color-brand)] text-sm text-white">Show Results</BaseButton>
                <button type="button" className="w-full text-xs text-[#6d7f9f]">
                    Reset Filters
                </button>
            </div>
        </aside>
    );
};

export default ProductsFiltersSidebar;
