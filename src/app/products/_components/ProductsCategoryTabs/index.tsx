interface ProductsCategoryTabsProps {
    tabs: string[];
    activeCategory: string;
    onChange: (category: string) => void;
}

const ProductsCategoryTabs = ({ tabs, activeCategory, onChange }: ProductsCategoryTabsProps) => {
    return (
        <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
                const isActive = activeCategory === tab;
                return (
                    <button
                        key={tab}
                        type="button"
                        onClick={() => onChange(tab)}
                        className={`rounded-md border px-3 py-2 text-xs font-medium transition-colors lg:text-sm ${
                            isActive
                                ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-white"
                                : "border-[#d4def3] bg-white text-[#4c628f] hover:border-[var(--color-brand)]"
                        }`}
                    >
                        {tab}
                    </button>
                );
            })}
        </div>
    );
};

export default ProductsCategoryTabs;
