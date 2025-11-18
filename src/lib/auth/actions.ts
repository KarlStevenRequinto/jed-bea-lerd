/**
 * Authentication Actions
 *
 * Client-side functions to handle authentication flows.
 * These functions call your API routes and update Redux state.
 */

import { LoginRequest, RegistrationRequest, UserProfile } from "@/lib/types/auth";
import { AppDispatch } from "@/store";
import { login as loginAction, logout as logoutAction, setLoading, setError } from "@/store/authSlice";

/**
 * Login user
 */
export async function loginUser(
  dispatch: AppDispatch,
  credentials: LoginRequest
) {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Login failed");
    }

    // Update Redux state with user data
    const user: UserProfile = {
      id: data.user.id,
      email: data.user.email,
      emailVerified: data.user.emailVerified,
      createdAt: data.user.createdAt,
    };

    dispatch(loginAction(user));
    return { success: true, user };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Login failed";
    dispatch(setError(errorMessage));
    return { success: false, error: errorMessage };
  } finally {
    dispatch(setLoading(false));
  }
}

/**
 * Register new user
 */
export async function registerUser(
  dispatch: AppDispatch,
  data: RegistrationRequest
) {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Registration failed");
    }

    return { success: true, message: result.message };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Registration failed";
    dispatch(setError(errorMessage));
    return { success: false, error: errorMessage };
  } finally {
    dispatch(setLoading(false));
  }
}

/**
 * Logout user
 */
export async function logoutUser(dispatch: AppDispatch) {
  try {
    dispatch(setLoading(true));

    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }

    dispatch(logoutAction());
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Logout failed";
    dispatch(setError(errorMessage));
    return { success: false, error: errorMessage };
  } finally {
    dispatch(setLoading(false));
  }
}

/**
 * Get current user
 */
export async function getCurrentUser(dispatch: AppDispatch) {
  try {
    dispatch(setLoading(true));

    const response = await fetch("/api/auth/me");

    if (!response.ok) {
      // Not authenticated
      dispatch(logoutAction());
      return { success: false };
    }

    const data = await response.json();

    const user: UserProfile = {
      id: data.user.id,
      email: data.user.email,
      emailVerified: data.user.emailVerified,
      createdAt: data.user.createdAt,
    };

    dispatch(loginAction(user));
    return { success: true, user };
  } catch (error) {
    dispatch(logoutAction());
    return { success: false };
  } finally {
    dispatch(setLoading(false));
  }
}
