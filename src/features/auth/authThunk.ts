import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";

export const loginEmployee = createAsyncThunk(
    "auth/loginEmployee",
    async ({ email, password }: { email: string; password: string }) => {
        const employeeCredential = await signInWithEmailAndPassword(auth, email, password);
        const employee = employeeCredential.user;
        return {
            uid: employee.uid,
            email: employee.email,
        };
    }
);

export const logoutEmployee = createAsyncThunk(
    "auth/logoutEmployee", async () => {
    await signOut(auth);
});
