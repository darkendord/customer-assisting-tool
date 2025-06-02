import { createAsyncThunk } from "@reduxjs/toolkit";
import { getEmployeeByEmail, getEmployees } from "../../services/employeeService.ts";
import { Employee } from "./employeeModel.ts";

export const fetchEmployees = createAsyncThunk<Employee[]>(
    "employee/fetchEmployees",
    async () => await getEmployees()
);


export const fetchEmployeeByEmail = createAsyncThunk<Employee, string, { rejectValue: string }>(
    "employee/fetchEmployeeByEmail",
    async (email, { rejectWithValue }) => {
        try {
            return await getEmployeeByEmail(email);
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || error.message || "Employee not found");
        }
    }
);
