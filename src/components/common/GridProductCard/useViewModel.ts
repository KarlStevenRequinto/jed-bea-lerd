import { useAppSelector } from "@/store";

type GridProductCardViewModel = {
    isLoggedIn: boolean;
};

export const useGridProductCardViewModel = (): GridProductCardViewModel => {
    const isLoggedIn = useAppSelector((state) => state.auth.loggedIn);

    return {
        isLoggedIn,
    };
};
