import { Report } from './../features/reports/reportModel';
// You can place this in a utils file or inside the component
function convertReportsToCSV(reports: Report[]) {
    if (!reports || !reports.length) return "";
    const headers = Object.keys(reports[0]);
    const csvRows = [
        headers.join(","),
        ...reports.map(r => headers.map(h => `"${((r as Record<string, any>)[h] ?? "").toString().replace(/"/g, '""')}"`).join(","))
    ];
    return csvRows.join("\n");
}

export { convertReportsToCSV };