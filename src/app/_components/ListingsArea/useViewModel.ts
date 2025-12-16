import { useState } from "react";
import { MOCK_LISTINGS } from "@/constants/listings";

type ViewMode = "grid" | "list";

export const useListingsAreaViewModel = () => {
    const [viewMode, setViewMode] = useState<ViewMode>("grid");

    const handleViewModeChange = (mode: ViewMode) => {
        setViewMode(mode);
    };

    return {
        listings: MOCK_LISTINGS,
        viewMode,
        handleViewModeChange,
    };
};
