import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";

const ProtectedRoute = () => {
    const { isLoggedIn, loading } = useAuthStatus();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <span className="text-[#3a1b10]">Loading...</span>
            </div>
        );
    }

    return isLoggedIn ? <Outlet /> : <Navigate to="/Login" />;
};

export default ProtectedRoute;