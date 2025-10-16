"use client";

import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import authReducer from "./authSlice";

// Load persisted auth.loggedIn from localStorage on the client
const loadPreloadedState = () => {
    if (typeof window === "undefined") return undefined;
    try {
        const v = window.localStorage.getItem("auth.loggedIn");
        if (v === null) return undefined;
        return { auth: { loggedIn: v === "true" } } as const;
    } catch {
        return undefined;
    }
};

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    preloadedState: loadPreloadedState(),
});

// Persist auth.loggedIn to localStorage on changes (client only)
if (typeof window !== "undefined") {
    store.subscribe(() => {
        try {
            const loggedIn = store.getState().auth.loggedIn;
            window.localStorage.setItem("auth.loggedIn", String(loggedIn));
        } catch {
            // ignore storage errors
        }
    });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
