import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedHooks";
import { fetchReports } from "../features/reports/reportThunk";
import { fetchEmployees } from "../features/employees/employeeThunks";
import ReportForm from "../features/reports/ReportForm";
import ReportsTable from "../features/reports/ReportsTable";
import ReportDetail from "../features/reports/ReportDetail";
import PageWrapper from "../Components/PageWrapper";

function Reports() {
  const dispatch = useAppDispatch();
  const { selectedCustomer } = useAppSelector((state) => state.customers);

  useEffect(() => {
    if (selectedCustomer?.customer_id) {
      dispatch(fetchReports(selectedCustomer.customer_id));
    }
  }, [dispatch, selectedCustomer]);

  useEffect(() => {
    dispatch(fetchEmployees()).then((result) => {
      const payload = result.payload as { items?: any[] } | undefined;
      if (payload && Array.isArray(payload.items)) {
        //console.log("fetchEmployees result:", payload.items);
      } else {
        //console.warn("fetchEmployees: No items found in payload", payload);
      }
    });
  }, [dispatch]);

  return (
    <PageWrapper>
      <div className="w-full max-w-5xl mx-auto">
        <ReportForm />
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-2xl font-bold tracking-tight text-[#3a1b10] mb-4">
            Reports
          </h2>
          <ReportsTable />
        </div>
        <ReportDetail />
      </div>
    </PageWrapper>
  );
}

export default Reports;