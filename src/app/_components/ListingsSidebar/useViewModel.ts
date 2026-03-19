import { useState } from "react";
import { useRouter } from "next/navigation";

export const useListingsSidebarViewModel = () => {
    const router = useRouter();
    const [activeFilter, setActiveFilter] = useState<"all" | "properties" | "vehicles">("all");

    const handleAllListingClick = () => {
        router.push("/products");
    };

    return {
        activeFilter,
        setActiveFilter,
        handleAllListingClick,
    };
};
