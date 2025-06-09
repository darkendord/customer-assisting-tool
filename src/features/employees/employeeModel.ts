export interface Employee {
    id: number;
    idEmployee: string;
    employee_name: string;
    username: string;
    employeeNumber: string;
    employee_email: string;
    is_active: boolean;
    role: "agent" | "sup" | "admin";
}