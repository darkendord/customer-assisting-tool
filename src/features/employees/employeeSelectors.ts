import { createSelector } from "@reduxjs/toolkit";
import { Employee } from "./employeeModel";

export const selectEmployees = (state: any): Employee[] => state.employee.data || [];

export const selectActiveAgents = createSelector(
    [selectEmployees],
    (employees) => employees.filter((emp: Employee) => emp.is_active && emp.role === "agent")
);