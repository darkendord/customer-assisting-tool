import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedHooks";
import { addReport } from "./reportThunk";

const ReportForm = () => {
    const dispatch = useAppDispatch();
    const { selectedCustomer } = useAppSelector((state) => state.customers);
    const employee = useAppSelector((state) => state.employee.current?.items?.[0]);
    const [reportType, setReportType] = useState("");
    const [priority, setPriority] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [type, setType] = useState("");
    const [subject, setSubject] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!selectedCustomer?.customer_id || !employee?.username) {
            setError("No customer or employee selected.");
            return;
        }

        console.log(reportType, priority, description, type, subject);
        if (!priority || !description.trim() || !type.trim()) {
            setError("All fields are required.");
            return;
        }
        await dispatch(addReport({
            customer_id: selectedCustomer.customer_id,
            employee_username: employee.username,
            type: type as "product" | "customer" | "balance" | "other",
            priority: priority as "low" | "medium" | "high",
            description: description.trim(),
            subject: subject.trim(),
            status: "Open",
        }));
        setReportType("");
        setPriority("");
        setDescription("");
        setType("");
        setSubject("");
    };

    return (
        <div className="mb-6 bg-[#fbf4e9] rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold text-[#3a1b10] mb-4">Report Issue</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <span className="block text-l text-[#3a1b10] font-semibold mb-1">Selected Customer:</span>
                    <span className="block text-gray-700 font-bold">Customer Name: {selectedCustomer?.first_name && selectedCustomer?.last_name ? `${selectedCustomer.first_name} ${selectedCustomer.last_name}` : "None"}</span>
                </div>
                <div>
                    <label htmlFor="subject" className="block text-[#3a1b10] font-semibold mb-1">Subject</label>
                    <input
                        id="subject"
                        name="subject"
                        className="w-full border rounded-lg p-2 bg-white text-[#3a1b10]"
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="reportType" className="block text-[#3a1b10] font-semibold mb-1">Report Type</label>
                    <select
                        id="reportType"
                        name="reportType"
                        value={type}
                        onChange={e => setType(e.target.value)}
                        className="border rounded-lg p-2 bg-white text-[#3a1b10]"
                        required
                    >
                        <option value="">Select Report Type</option>
                        <option value="product">Product</option>
                        <option value="customer">Customer Information</option>
                        <option value="balance">Balance</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="priority" className="block text-[#3a1b10] font-semibold mb-1">Priority</label>
                    <select
                        id="priority"
                        name="priority"
                        className="w-full border rounded-lg p-2 bg-white text-[#3a1b10]"
                        value={priority}
                        onChange={e => setPriority(e.target.value)}
                        required
                    >
                        <option value="">Select Priority</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="description" className="block text-[#3a1b10] font-semibold mb-1">Issue</label>
                    <textarea
                        id="description"
                        name="description"
                        className="w-full border rounded-lg p-2 bg-white text-[#3a1b10] resize-none min-h-[80px]"
                        placeholder="Describe the issue..."
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="text-red-600">{error}</div>}
                <button
                    type="submit"
                    className="bg-[#3a1b10] text-white font-semibold rounded-lg px-6 py-2 hover:bg-[#5c3a23] transition"
                >
                    Submit Report
                </button>
            </form>
        </div>
    );
};

export default ReportForm;
