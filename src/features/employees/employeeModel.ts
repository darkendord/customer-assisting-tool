export interface Employee {
    id: number;
    idEmployee: string;
    employeeName: string;
    username: string;
    employeeNumber: string;
    employeeEmail: string;
    isActive: boolean;
    role: "agent" | "sup" | "admin";
}