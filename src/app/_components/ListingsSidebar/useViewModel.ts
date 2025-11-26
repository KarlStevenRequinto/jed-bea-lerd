import { useState } from "react";

export const useListingsSidebarViewModel = () => {
    const [activeFilter, setActiveFilter] = useState<"all" | "properties" | "vehicles">("all");

    return {
        activeFilter,
        setActiveFilter,
    };
};
