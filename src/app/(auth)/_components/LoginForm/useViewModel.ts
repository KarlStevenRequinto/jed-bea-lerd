import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store";
import { loginUser } from "@/lib/auth/actions";

export const useLoginFormViewModel = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!email || !password) {
            alert("Please enter both email and password");
            return;
        }

        // Call login API
        const result = await loginUser(dispatch, { email, password, rememberMe });

        if (result.success) {
            // Redirect to homepage on success
            router.push("/");
        } else {
            // Show error message
            alert(result.error || "Login failed");
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        rememberMe,
        setRememberMe,
        handleLogin,
        loading,
        error,
    };
};
