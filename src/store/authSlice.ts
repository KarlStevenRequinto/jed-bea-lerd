import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthState = {
    loggedIn: boolean;
};

const initialState: AuthState = {
    loggedIn: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoggedIn(state, action: PayloadAction<boolean>) {
            state.loggedIn = action.payload;
        },
        login(state) {
            state.loggedIn = true;
        },
        logout(state) {
            state.loggedIn = false;
        },
    },
});

export const { setLoggedIn, login, logout } = authSlice.actions;
export default authSlice.reducer;

