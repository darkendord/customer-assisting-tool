export interface Report {
  report_id: number;
  customer_id: number;
  employee_username: string;
  subject: string;
  description: string;
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  priority: "low" | "medium" | "high" | "Low" | "Medium" | "High";
  type: string;
  created_at: string;
  updated_at?: string;
  assigned_to?: string;
}