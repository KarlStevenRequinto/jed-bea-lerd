import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store";
import { login } from "@/store/authSlice";

export const useLoginFormViewModel = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleLogin = () => {
        dispatch(login());
        router.push("/");
    };

    return {
        handleLogin,
    };
};
