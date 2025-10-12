import { useState } from "react";
import { useAppSelector } from "../hooks/useTypedHooks";
import { Employee } from "../features/employees/employeeModel";
import Time from "./Time";

// Default AUX options for agents
const BASE_AUX_OPTIONS = [
    { value: "Ready", label: "Ready", color: "bg-green-500" },
    { value: "After Call", label: "After Call", color: "bg-yellow-400" },
    { value: "System Issue", label: "System Issue", color: "bg-red-500" },
    { value: "Break", label: "Break", color: "bg-yellow-500" },
    { value: "Lunch", label: "Lunch", color: "bg-yellow-400" },
    { value: "Out Of Work", label: "Out Of Work (OOW)", color: "bg-orange-400" },
];

// Special AUX options for sup and admin
const SUP_ADMIN_AUX_OPTIONS = [
    ...BASE_AUX_OPTIONS,
    { value: "Supervising", label: "Supervising", color: "bg-blue-500" },
    { value: "Admin Tasks", label: "Admin Tasks", color: "bg-purple-600" },
];

const AgentBar = () => {
    // @ts-ignore
    const employee: Employee = useAppSelector((state) => state.employee.current[0]);
    const [aux, setAux] = useState(() => localStorage.getItem("cat_agent_aux") || "Out Of Work");

    // Choose AUX options based on role
    const auxOptions =
        employee && (employee.role === "sup" || employee.role === "admin")
            ? SUP_ADMIN_AUX_OPTIONS
            : BASE_AUX_OPTIONS;

    const auxOption = auxOptions.find(opt => opt.value === aux);

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-[#fbf4e9] shadow h-20 flex items-center justify-center">
            <div className="w-full max-w-[1500px] flex-1 flex items-center gap-10 justify-center px-8 py-3">
                <span className="text-[#3a1b10] font-bold text-lg">
                    {employee?.role && (
                        <span className="ml-2 text-xs font-normal text-[#5c3a23] bg-[#f4e6d4] px-2 py-1 rounded">
                            {employee.role.toUpperCase()}
                        </span>
                    )} {employee?.employee_name || employee?.username || "Unknown"}
                </span>
                <div className="flex items-center gap-2">
                    <span className={`w-4 h-4 rounded-full ${auxOption?.color} inline-block border border-gray-300`} />
                    <select
                        className="rounded px-3 py-1 border border-gray-300 focus:outline-none font-semibold bg-white"
                        value={aux}
                        onChange={e => setAux(e.target.value)}
                    >
                        {auxOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>
                <span className="ml-4 text-[#3a1b10] font-medium">
                    In <span className="font-bold">{aux}</span> for <Time aux={aux} />
                </span>
            </div>
        </header>
    );
};

export default AgentBar;