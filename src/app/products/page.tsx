import { getListings } from "@/lib/services/listings";
import { formatListings } from "@/lib/utils/formatters";
import ProductsMarketplace from "./_components/ProductsMarketplace";
import { ListingTypeFilter } from "./_components/ProductsMarketplace/useViewModel";

interface ProductsPageProps {
    searchParams?: Promise<{
        listingType?: string;
    }>;
}

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
    const resolvedSearchParams = await searchParams;
    const { listings } = await getListings();
    const formattedListings = formatListings(listings);
    const listingTypeParam = resolvedSearchParams?.listingType;
    const initialListingType: ListingTypeFilter =
        listingTypeParam === "properties" || listingTypeParam === "vehicles"
            ? listingTypeParam
            : "all";

    return <ProductsMarketplace initialListings={formattedListings} initialListingType={initialListingType} />;
};

export default ProductsPage;
