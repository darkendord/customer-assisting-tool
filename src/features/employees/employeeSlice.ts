import { createSlice } from "@reduxjs/toolkit";
import { Employee } from "./employeeModel";
import { fetchEmployees } from "./employeeThunks";

interface EmployeeState {
    employees: Employee[];
    loading: boolean;
    error: string | null;
}

const initialState: EmployeeState = {
    employees: [],
    loading: false,
    error: null,
};

const employeeSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.employees = action.payload;
                state.loading = false;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Failed to fetch employees";
            });
    },
});

export default employeeSlice.reducer;
