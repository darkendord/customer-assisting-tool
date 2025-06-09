import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Report } from "./reportModel";

const API_URI = import.meta.env.VITE_CTM_BASE_API;

export const fetchReports = createAsyncThunk<Report[], number, { rejectValue: string }>(
  "reports/fetchReports",
  async (customer_id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URI}/get_reports/${customer_id}`);
      return res.data.items;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || error.message || "Failed to fetch reports");
    }
  }
);

export const addReport = createAsyncThunk<
  void,
  Omit<Report, "report_id" | "created_at" | "updated_at">,
  { rejectValue: string; dispatch: any }
>("reports/addReport", async (report, { rejectWithValue, dispatch }) => {
  try {
    const payload = { ...report, status: report.status || "Open" };

    await axios.post(`${API_URI}/get_reports/?customer_id=${payload.customer_id}&employee_username=${payload.employee_username}&type=${payload.type}&priority=${payload.priority}&description=${payload.description}&subject=${payload.subject}&status=${payload.status}`, {
      headers: { "Content-Type": "application/json" }
    });
    dispatch(fetchReports(report.customer_id));
  } catch (error: any) {
    console.log("Error adding report:", error);

    return rejectWithValue(error.response?.data?.error || error.message || "Failed to add report");
  }
});

export const assignReport = createAsyncThunk<
  void,
  { reportId: number; assignee: string; customerId: number },
  { rejectValue: string; dispatch: any }
>("reports/assignReport", async ({ reportId, assignee, customerId }, { rejectWithValue, dispatch }) => {
  try {
    await axios.patch(`${API_URI}/reports/${reportId}/assign`, { assigned_to: assignee });
    // Optionally refetch reports for the customer
    dispatch(fetchReports(customerId));
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.error || error.message || "Failed to assign report");
  }
});