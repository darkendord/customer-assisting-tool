import { useAppDispatch, useAppSelector } from "../../hooks/useTypedHooks";
import { selectReport } from "./reportSlice";

const statusColors: Record<string, string> = {
    Open: "bg-yellow-100 text-yellow-800",
    "In Progress": "bg-blue-100 text-blue-800",
    Resolved: "bg-green-100 text-green-800",
    Closed: "bg-gray-200 text-gray-700",
};

const priorityColors: Record<string, string> = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
};

const ReportsTable = () => {
    const dispatch = useAppDispatch();
    const { data: reports, isLoading, error } = useAppSelector((state) => state.reports);

    if (isLoading) return <div>Loading reports...</div>;
    if (error) return <div className="text-red-600">{error}</div>;
    if (!reports.length) return <div className="text-gray-500">No reports found.</div>;

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-2xl shadow">
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-left">Type</th>
                        <th className="px-4 py-2 text-left">Priority</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2 text-left">Created</th>
                        <th className="px-4 py-2 text-left">Employee</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {[...reports]
                        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                        .map((report) => (
                            <tr key={report.report_id} className="border-t">
                                <td className="px-4 py-2">{report.type}</td>
                                <td className="px-4 py-2">
                                    <span className={`px-2 py-1 rounded ${priorityColors[report.priority]}`}>{report.priority}</span>
                                </td>
                                <td className="px-4 py-2">
                                    <span className={`px-2 py-1 rounded ${statusColors[report.status]}`}>{report.status}</span>
                                </td>
                                <td className="px-4 py-2">{new Date(report.created_at).toLocaleString()}</td>
                                <td className="px-4 py-2">{report.employee_username}</td>
                                <td className="px-4 py-2">
                                    <button
                                        className="text-[#3a1b10] underline"
                                        onClick={() => dispatch(selectReport(report))}
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReportsTable;