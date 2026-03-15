import { useEffect, useState } from "react";
import { useAppSelector } from "@/store";

type GridProductCardViewModel = {
    mounted: boolean;
    isLoggedIn: boolean;
};

export const useGridProductCardViewModel = (): GridProductCardViewModel => {
    const [mounted, setMounted] = useState(false);
    const isLoggedIn = useAppSelector((state) => state.auth.loggedIn);

    useEffect(() => {
        setMounted(true);
    }, []);

    return {
        mounted,
        isLoggedIn,
    };
};
