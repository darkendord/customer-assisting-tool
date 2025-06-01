import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {loginEmployee,logoutEmployee} from "./authThunk.ts";

interface AuthState {
    employee: {
        uid: string;
        email: string | null;
    } | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    employee: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginEmployee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginEmployee.fulfilled, (state, action: PayloadAction<{ uid: string; email: string | null }>) => {
                state.employee = action.payload;
                state.loading = false;
            })
            .addCase(loginEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Login failed";
            })
            .addCase(logoutEmployee.fulfilled, (state) => {
                state.employee = null;
                state.loading = false;
            });
    },
});

export const { resetError } = authSlice.actions;

export default authSlice.reducer;
