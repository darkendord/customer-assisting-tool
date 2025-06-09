import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { useAppSelector } from "../hooks/useTypedHooks";

const ProtectedRoute = () => {
    const { isLoggedIn, loading } = useAuthStatus();
    const location = useLocation();
    // @ts-ignore
    const employee = useAppSelector((state) => state.employee.current?.items?.[0]);
    const isDashboard = location.pathname.toLowerCase().startsWith("/dashboard");

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <span className="text-[#3a1b10]">Loading...</span>
            </div>
        );
    }

    // Only allow "sup" or "admin" to access dashboard
    if (isDashboard && employee && !["sup", "admin"].includes(employee.role)) {
        return <Navigate to="/CustomerLookUp" />;
    }

    return isLoggedIn ? <Outlet /> : <Navigate to="/Login" />;
};

export default ProtectedRoute;