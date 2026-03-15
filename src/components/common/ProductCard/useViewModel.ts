import { useEffect, useState } from "react";
import { useAppSelector } from "@/store";

type ProductCardViewModel = {
    mounted: boolean;
    isLoggedIn: boolean;
};

export const useProductCardViewModel = (): ProductCardViewModel => {
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
