import { createSlice } from "@reduxjs/toolkit";
import { Employee } from "./employeeModel";
import { fetchEmployeeByEmail, fetchEmployees } from "./employeeThunks";

interface EmployeeState {
    current: Employee | null;
    isLoading: boolean;
    error: string | null;
    data: Employee[]; // Assuming you want to keep a list of employees
}

const initialState: EmployeeState = {
    current: null,
    isLoading: false,
    error: null,
    data: [], // Initialize with an empty array
};

const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployeeByEmail.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchEmployeeByEmail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.current = action.payload;
            })
            .addCase(fetchEmployeeByEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || "Employee not found";
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            });
    },
});

export default employeeSlice.reducer;
