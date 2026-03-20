"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { getCurrentUser } from "@/lib/auth/actions";

/**
 * Rehydrates the Redux auth state on every page load.
 *
 * The Redux store only persists `loggedIn` to localStorage — not the full
 * user object (profilePhotoUrl, firstName, etc.). On mount, if the user is
 * marked as logged in but the user object is missing, this calls /api/auth/me
 * to restore the full profile into Redux.
 */
const AuthInitializer = () => {
    const dispatch = useAppDispatch();
    const loggedIn = useAppSelector((s) => s.auth.loggedIn);
    const user = useAppSelector((s) => s.auth.user);

    useEffect(() => {
        if (loggedIn && !user) {
            getCurrentUser(dispatch);
        }
    }, []);

    return null;
};

export default AuthInitializer;
