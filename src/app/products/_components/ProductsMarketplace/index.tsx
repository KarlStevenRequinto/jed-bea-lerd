"use client";

import { FormattedListing } from "@/lib/types/listing";
import { useProductsMarketplaceViewModel } from "./useViewModel";
import ProductsHero from "../ProductsHero";
import ProductsCategoryTabs from "../ProductsCategoryTabs";
import ProductsFiltersSidebar from "../ProductsFiltersSidebar";
import ProductsResults from "../ProductsResults";

interface ProductsMarketplaceProps {
    initialListings: FormattedListing[];
}

const ProductsMarketplace = ({ initialListings }: ProductsMarketplaceProps) => {
    const { activeCategory, setActiveCategory, categoryTabs, sidebarVehicleTypes, listings, activePage, setActivePage } =
        useProductsMarketplaceViewModel({ initialListings });

    return (
        <section className="w-full bg-[#f4f7ff]">
            <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-5 px-4 py-6 lg:px-6">
                <div className="text-xs text-[#6f88b6]">{">"} / All Listings</div>

                <ProductsHero />
                <ProductsCategoryTabs tabs={categoryTabs} activeCategory={activeCategory} onChange={setActiveCategory} />

                <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
                    <ProductsFiltersSidebar vehicleTypes={sidebarVehicleTypes} />
                    <ProductsResults listings={listings} activePage={activePage} onPageChange={setActivePage} />
                </div>
            </div>
        </section>
    );
};

export default ProductsMarketplace;
