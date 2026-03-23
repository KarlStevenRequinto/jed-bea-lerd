import { getListings } from "@/lib/services/listings";
import { getFeedPosts } from "@/lib/services/feed";
import { formatListings } from "@/lib/utils/formatters";
import HomePageContent from "./_components/HomePageContent";

const HomePage = async () => {
    const [{ listings }, feedPosts] = await Promise.all([getListings(), getFeedPosts()]);
    const formattedListings = formatListings(listings);

    return <HomePageContent initialListings={formattedListings} initialFeedPosts={feedPosts} />;
};

export default HomePage;
