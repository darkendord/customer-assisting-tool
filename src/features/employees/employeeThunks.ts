import { createAsyncThunk } from "@reduxjs/toolkit";
import {getEmployees} from "../../services/employeeService.ts";
import {Employee} from "./employeeModel.ts";

export const fetchEmployees = createAsyncThunk<Employee[]>(
    "employee/fetchEmployees",
    async () => await getEmployees()
);