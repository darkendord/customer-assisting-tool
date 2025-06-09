import PageWrapper from "../Components/PageWrapper";

function Dashboard() {
    // Mock data for demonstration
    const activeEmployees = 24;
    const openReports = 7;
    const systemHealth = "All systems operational";
    const agentStatus = [
        { name: "Lisa Davis", aux: "Ready", duration: "00:12" },
        { name: "John Smith", aux: "Break", duration: "00:05" },
        { name: "Maria Lee", aux: "After Call", duration: "00:03" },
    ];
    const recentLogins = [
        { name: "Lisa Davis", time: "2025-06-09 09:12", ip: "192.168.1.10" },
        { name: "John Smith", time: "2025-06-09 08:55", ip: "192.168.1.11" },
    ];

    return (
        <PageWrapper>
            <div className="w-full max-w-5xl mx-auto">
                <div className="bg-white rounded-3xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold tracking-tight text-[#3a1b10] mb-6">Admin Dashboard</h2>
                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-[#fbf4e9] rounded-xl p-4 text-center">
                            <div className="text-3xl font-bold text-[#3a1b10]">{activeEmployees}</div>
                            <div className="text-[#5c3a23] mt-1">Active Employees</div>
                        </div>
                        <div className="bg-[#fbf4e9] rounded-xl p-4 text-center">
                            <div className="text-3xl font-bold text-[#3a1b10]">{openReports}</div>
                            <div className="text-[#5c3a23] mt-1">Open Reports</div>
                        </div>
                        <div className="bg-[#fbf4e9] rounded-xl p-4 text-center">
                            <div className="text-lg font-semibold text-[#3a1b10]">{systemHealth}</div>
                            <div className="text-[#5c3a23] mt-1">System Health</div>
                        </div>
                    </div>
                    {/* Live Agent Status */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-[#3a1b10] mb-2">Live Agent Status</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left border">
                                <thead>
                                    <tr>
                                        <th className="border px-2 py-1">Name</th>
                                        <th className="border px-2 py-1">AUX</th>
                                        <th className="border px-2 py-1">Duration</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {agentStatus.map((a, idx) => (
                                        <tr key={idx}>
                                            <td className="border px-2 py-1">{a.name}</td>
                                            <td className="border px-2 py-1">{a.aux}</td>
                                            <td className="border px-2 py-1">{a.duration}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* Recent Logins */}
                    <div>
                        <h3 className="text-lg font-semibold text-[#3a1b10] mb-2">Recent Logins</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left border">
                                <thead>
                                    <tr>
                                        <th className="border px-2 py-1">Name</th>
                                        <th className="border px-2 py-1">Time</th>
                                        <th className="border px-2 py-1">IP Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentLogins.map((login, idx) => (
                                        <tr key={idx}>
                                            <td className="border px-2 py-1">{login.name}</td>
                                            <td className="border px-2 py-1">{login.time}</td>
                                            <td className="border px-2 py-1">{login.ip}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
}

export default Dashboard;