import { Employee } from "../features/employees/employeeModel";
import axios from "axios";

export const getEmployees = async (): Promise<Employee[]> => {
    try {
        const response = await axios.get<Employee[]>(
            `${import.meta.env.VITE_CTM_BASE_API}/get_employees`
        );
        return response.data;
    } catch (error) {
        console.error("Failed to fetch employees:", error);
        throw error; // or return [] if you want to handle it gracefully
    }
};
