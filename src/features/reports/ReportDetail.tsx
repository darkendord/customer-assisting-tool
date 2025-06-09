import { useAppDispatch, useAppSelector } from "../../hooks/useTypedHooks";
import { clearSelectedReportData } from "./reportSlice";
import { assignReport } from "./reportThunk";

// function convertReportsToCSV(reports: Report[]): string {
//     if (!reports || !reports.length) return "";
//     const headers = Object.keys(reports[0]);
//     const csvRows = [
//         headers.join(","),
//         //@ts-ignore
//         ...reports.map(r => headers.map(h => `"${(r[h] ?? "").toString().replace(/"/g, '""')}"`).join(","))
//     ];
//     return csvRows.join("\n");
// }

const ReportDetail = () => {
    const dispatch = useAppDispatch();
    const report = useAppSelector((state) => state.reports.selectedReport);
    // const reports = useAppSelector((state) => state.reports.data);
    //@ts-ignore
    const employee = useAppSelector((state) => state.employee.current?.items?.[0]);
    // const activeAgents = useAppSelector(selectActiveAgents);

    const handleAssignReport = (reportId: number, assignee: string) => {
        if (!reportId || !assignee || !report?.customer_id) return;
        dispatch(assignReport({ reportId, assignee, customerId: report.customer_id }));
    };

    // const handleDownloadCSV = () => {
    //     if (!reports || !reports.length) return;
    //     const csv = convertReportsToCSV(reports);
    //     const blob = new Blob([csv], { type: "text/csv" });
    //     const url = URL.createObjectURL(blob);
    //     const link = document.createElement("a");
    //     link.href = url;
    //     link.download = "reports.csv";
    //     link.click();
    //     URL.revokeObjectURL(url);
    // };

    if (!report) return null;

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg relative">
                <button
                    className="absolute top-2 right-4 text-2xl"
                    onClick={() => dispatch(clearSelectedReportData())}
                >
                    &times;
                </button>
                <h3 className="text-xl font-bold mb-2">Report Details</h3>
                <div className="mb-2"><b>Type:</b> {report.type}</div>
                <div className="mb-2"><b>Priority:</b> {report.priority}</div>
                <div className="mb-2"><b>Status:</b> {report.status}</div>
                <div className="mb-2"><b>Created:</b> {new Date(report.created_at).toLocaleString()}</div>
                <div className="mb-2"><b>Employee:</b> {report.employee_username}</div>
                <div className="mb-2"><b>Description:</b> {report.description}</div>
                {employee?.role === "sup" && (
                    <div className="mb-2">
                        <label className="font-semibold">Assign To:</label>
                        <select
                            value={report.assigned_to}
                            onChange={e => handleAssignReport(report.report_id, e.target.value)}
                            className="ml-2 border rounded px-2 py-1"
                        >
                            {/* {activeAgents.map((agent: Employee) => (
                                <option key={agent.username} value={agent.username}>
                                    {agent.employee_name} ({agent.username})
                                </option>
                            ))} */}
                        </select>
                    </div>
                )}
                {/* {employee?.role === "admin" && (
                    <button
                        onClick={handleDownloadCSV}
                        className="mt-4 bg-blue-500 text-white rounded px-4 py-2"
                    >
                        Download CSV
                    </button>
                )} */}
            </div>
        </div>
    );
};

export default ReportDetail;