import { useState } from "react";

export const useAuthInputViewModel = (type?: string) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordField = type === "password";

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const inputType = isPasswordField ? (showPassword ? "text" : "password") : type;

    return {
        showPassword,
        isPasswordField,
        togglePasswordVisibility,
        inputType,
    };
};
