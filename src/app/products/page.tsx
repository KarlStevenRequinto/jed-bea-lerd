import { getListings } from "@/lib/services/listings";
import { formatListings } from "@/lib/utils/formatters";
import ProductsMarketplace from "./_components/ProductsMarketplace";

const ProductsPage = async () => {
    const { listings } = await getListings();
    const formattedListings = formatListings(listings);

    return <ProductsMarketplace initialListings={formattedListings} />;
};

export default ProductsPage;
