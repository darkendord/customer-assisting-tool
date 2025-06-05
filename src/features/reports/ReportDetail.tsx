import { useAppDispatch, useAppSelector } from "../../hooks/useTypedHooks";
import { clearSelectedReportData } from "./reportSlice";

const ReportDetail = () => {
    const dispatch = useAppDispatch();
    const report = useAppSelector((state) => state.reports.selectedReport);

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
            </div>
        </div>
    );
};

export default ReportDetail;