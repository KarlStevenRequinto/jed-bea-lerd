import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "@/lib/types/auth";

export type AuthState = {
    loggedIn: boolean;
    user: UserProfile | null;
    loading: boolean;
    error: string | null;
};

const initialState: AuthState = {
    loggedIn: false,
    user: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoggedIn(state, action: PayloadAction<boolean>) {
            state.loggedIn = action.payload;
        },
        setUser(state, action: PayloadAction<UserProfile | null>) {
            state.user = action.payload;
            state.loggedIn = action.payload !== null;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
        login(state, action: PayloadAction<UserProfile>) {
            state.loggedIn = true;
            state.user = action.payload;
            state.error = null;
        },
        logout(state) {
            state.loggedIn = false;
            state.user = null;
            state.error = null;
        },
    },
});

export const { setLoggedIn, setUser, setLoading, setError, login, logout } = authSlice.actions;
export default authSlice.reducer;
