import { useState } from "react";

export const useRegisterFormViewModel = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [captchaId, setCaptchaId] = useState("");
    const [isValidating, setIsValidating] = useState(false);
    const [errors, setErrors] = useState<{
        email?: string;
        password?: string;
        confirmPassword?: string;
        verificationCode?: string;
    }>({});

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate
        const newErrors: typeof errors = {};

        if (!email) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Please enter a valid email";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (!verificationCode) {
            newErrors.verificationCode = "Verification code is required";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return false;
        }

        // Validate CAPTCHA with server
        if (!captchaId) {
            newErrors.verificationCode = "CAPTCHA session expired. Please refresh.";
            setErrors(newErrors);
            return false;
        }

        setIsValidating(true);
        try {
            const response = await fetch("/api/captcha/validate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    captchaId,
                    code: verificationCode,
                }),
            });

            const data = await response.json();

            if (!data.valid) {
                newErrors.verificationCode = data.error || "Incorrect verification code";
                setErrors(newErrors);
                setVerificationCode(""); // Clear input on error
                return false;
            }

            setErrors({});
            return true;
        } catch (error) {
            console.error("CAPTCHA validation error:", error);
            newErrors.verificationCode = "Failed to validate CAPTCHA. Please try again.";
            setErrors(newErrors);
            return false;
        } finally {
            setIsValidating(false);
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        verificationCode,
        setVerificationCode,
        captchaId,
        setCaptchaId,
        isValidating,
        errors,
        handleRegister,
    };
};
