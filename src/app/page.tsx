import { getListings } from "@/lib/services/listings";
import { formatListings } from "@/lib/utils/formatters";
import HomePageContent from "./_components/HomePageContent";

const HomePage = async () => {
    const { listings } = await getListings();
    const formattedListings = formatListings(listings);

    return <HomePageContent initialListings={formattedListings} />;
};

export default HomePage;
