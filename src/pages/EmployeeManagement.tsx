import { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/useTypedHooks";
import { fetchEmployees } from "../features/employees/employeeThunks";
import PageWrapper from "../Components/PageWrapper";
import { Employee } from "../features/employees/employeeModel";

export default function EmployeeManagement() {
    const dispatch = useAppDispatch();
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        dispatch(fetchEmployees())
            .then((result) => {
                const payload = result.payload as { items?: Employee[] } | undefined;
                if (payload && Array.isArray(payload.items)) {
                    setEmployees(payload.items);
                } else {
                    setEmployees([]);
                }
            })
            .finally(() => setLoading(false));
    }, [dispatch]);

    return (
        <PageWrapper>
            <div className="w-full max-w-5xl mx-auto">
                <h2 className="text-2xl font-bold tracking-tight text-[#3a1b10] mb-6">Employee Management</h2>
                <div className="bg-white rounded-3xl shadow-lg p-8">
                    {loading ? (
                        <div className="flex justify-center items-center h-40">
                            <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                            </svg>
                        </div>
                    ) : (
                        <table className="min-w-full text-left border">
                            <thead>
                                <tr>
                                    <th className="border px-2 py-1">Name</th>
                                    <th className="border px-2 py-1">Username</th>
                                    <th className="border px-2 py-1">Email</th>
                                    <th className="border px-2 py-1">Role</th>
                                    <th className="border px-2 py-1">Status</th>
                                    <th className="border px-2 py-1">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map(emp => (
                                    <tr key={emp.id}>
                                        <td className="border px-2 py-1">{emp.employee_name}</td>
                                        <td className="border px-2 py-1">{emp.username}</td>
                                        <td className="border px-2 py-1">{emp.employee_email}</td>
                                        <td className="border px-2 py-1">{emp.role}</td>
                                        <td className="border px-2 py-1">{emp.is_active ? "Active" : "Inactive"}</td>
                                        <td className="border px-2 py-1">
                                            <div className="flex gap-2">
                                                <button
                                                    className="px-3 py-1 rounded bg-blue-500 text-white text-xs font-semibold hover:bg-blue-600 transition"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className={`px-3 py-1 rounded text-xs font-semibold transition ${emp.is_active
                                                        ? "bg-red-500 text-white hover:bg-red-600"
                                                        : "bg-green-500 text-white hover:bg-green-600"
                                                        }`}
                                                >
                                                    {emp.is_active ? "Deactivate" : "Activate"}
                                                </button>
                                                <button
                                                    className="px-3 py-1 rounded bg-emerald-500 text-white text-xs font-semibold hover:bg-emerald-600 transition"
                                                >
                                                    Assign Report
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </PageWrapper>
    );
}