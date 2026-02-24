import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export const useResetPasswordFormViewModel = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const supabase = createClient();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [initializing, setInitializing] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const initializeRecoverySession = async () => {
            const code = searchParams.get("code");
            console.log("[reset-password] Initializing recovery session", { hasCode: Boolean(code) });

            try {
                if (code) {
                    console.log("[reset-password] Exchanging code for session");
                    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

                    if (exchangeError) {
                        console.log("[reset-password] exchangeCodeForSession failed", exchangeError.message);
                        setError("This reset link is invalid or expired. Please request a new one.");
                        setInitializing(false);
                        return;
                    }
                }

                const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
                console.log("[reset-password] Session check after init", {
                    hasSession: Boolean(sessionData.session),
                    sessionError: sessionError?.message,
                });

                if (sessionError || !sessionData.session) {
                    setError("Reset session is missing or expired. Please request a new reset link.");
                    setInitializing(false);
                    return;
                }

                console.log("[reset-password] Recovery session established");
                setError(null);
            } catch (sessionError) {
                console.log("[reset-password] Session initialization error", sessionError);
                setError("Failed to initialize reset session. Please try again.");
            } finally {
                setInitializing(false);
            }
        };

        initializeRecoverySession();
    }, [searchParams, supabase.auth]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (initializing) {
            return;
        }

        if (!password || !confirmPassword) {
            setError("Please fill in both password fields.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
            console.log("[reset-password] Current session status", {
                hasSession: Boolean(sessionData.session),
                sessionError: sessionError?.message,
            });

            if (sessionError || !sessionData.session) {
                throw new Error("Your reset session has expired. Please request a new reset link.");
            }

            const { error: updateError } = await supabase.auth.updateUser({
                password,
            });

            if (updateError) {
                throw new Error(updateError.message);
            }

            setSuccess(true);
        } catch (submitError) {
            const message = submitError instanceof Error ? submitError.message : "Failed to reset password";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoToLogin = () => {
        router.push("/login");
    };

    return {
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        loading,
        initializing,
        success,
        error,
        handleSubmit,
        handleGoToLogin,
    };
};
