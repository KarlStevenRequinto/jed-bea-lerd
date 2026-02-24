import { useState } from "react";
import { useRouter } from "next/navigation";

interface UseForgotPasswordFormViewModelParams {
    onBackToLogin?: () => void;
}

export const useForgotPasswordFormViewModel = ({ onBackToLogin }: UseForgotPasswordFormViewModelParams) => {
    const router = useRouter();
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleBackToLogin = () => {
        if (onBackToLogin) {
            onBackToLogin();
            return;
        }

        router.push("/login");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.trim()) {
            setError("Email is required");
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const response = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email.trim() }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Failed to send reset link");
            }

            setEmailSent(true);
        } catch (submitError) {
            const message = submitError instanceof Error ? submitError.message : "Failed to send reset link";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const handleEmailChange = (value: string) => {
        setEmail(value);
        if (error) {
            setError(null);
        }
    };

    return {
        emailSent,
        setEmailSent,
        email,
        loading,
        error,
        handleBackToLogin,
        handleSubmit,
        handleEmailChange,
    };
};
