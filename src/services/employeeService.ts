import { Employee } from "../features/employees/employeeModel";
import axios from "axios";
const API_URI = import.meta.env.VITE_CTM_BASE_API;


export const getEmployees = async (): Promise<Employee[]> => {
    try {
        const response = await axios.get<Employee[]>(
            `${API_URI}/get_employees`
        );
        return response.data;
    } catch (error) {
        console.error("Failed to fetch employees:", error);
        throw error; // or return [] if you want to handle it gracefully
    }
};

export const getEmployeeByEmail = async (email: string): Promise<Employee> => {
    const response = await axios.get(`${API_URI}/get_employees/${email}`);
    return response.data;
};
