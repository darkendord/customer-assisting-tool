import { createSlice } from "@reduxjs/toolkit";
import { Report } from "./reportModel";
import { fetchReports } from "./reportThunk";

interface ReportsState {
  data: Report[];
  isLoading: boolean;
  error: string | null;
  selectedReport: Report | null;
}

const initialState: ReportsState = {
  data: [],
  isLoading: false,
  error: null,
  selectedReport: null,
};

const reportSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    selectReport(state, action) {
      state.selectedReport = action.payload;
    },
    clearSelectedReportData(state) {
      state.selectedReport = null;
    },
    resetError(state) {
      state.error = null;
    },
    clearReportsData(state) {
      state.data = [];
      state.error = null;
      state.selectedReport = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || "Failed to fetch reports";
      });
  },
});

export const { selectReport, clearSelectedReportData, clearReportsData } = reportSlice.actions;
export default reportSlice.reducer;