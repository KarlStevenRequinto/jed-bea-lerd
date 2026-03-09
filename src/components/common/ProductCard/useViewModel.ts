import { useAppSelector } from "@/store";

type ProductCardViewModel = {
    isLoggedIn: boolean;
};

export const useProductCardViewModel = (): ProductCardViewModel => {
    const isLoggedIn = useAppSelector((state) => state.auth.loggedIn);

    return {
        isLoggedIn,
    };
};
