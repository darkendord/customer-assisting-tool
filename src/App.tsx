import "./App.css";
import { Navigate, BrowserRouter, Routes, Route, useLocation } from "react-router";
import Login from "./pages/Login";
import CustomerLookUp from "./pages/CustomerLookUp";
import SideMenu from "./Components/SideMenu";
import Products from "./pages/Products";
import Reports from "./pages/Reports";
import Dashboard from "./pages/Dashboard.tsx";
import { useAuthStatus } from "./hooks/useAuthStatus";
import ProtectedRoute from "./Components/ProtectedRoute.tsx";


function AppContent() {
  const location = useLocation();
  const { isLoggedIn, loading } = useAuthStatus();
  const isLoginPage = location.pathname === "/" || location.pathname.toLowerCase().startsWith("/login");

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f6fa]">
        <span className="text-[#3a1b10] text-lg font-semibold">Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f6fa] flex flex-col md:flex-row">
      {/* SideMenu only for logged-in users and not on login page */}
      {!isLoginPage && isLoggedIn && (
        <aside className="sticky top-0 md:h-screen w-full md:w-64 flex-shrink-0 z-10">
          <SideMenu />
        </aside>
      )}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-6 md:p-10 min-h-[70vh]">
          <Routes>
            {/* Public Routes */}
            <Route
              path="/Login"
              element={
                isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login />
              }
            />
            <Route
              path="/"
              element={
                isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login />
              }
            />
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/CustomerLookUp" element={<CustomerLookUp />} />
              <Route path="/Products" element={<Products />} />
              <Route path="/Reports" element={<Reports />} />
              <Route path="/Dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </div>
      </main>
    </div>
  );
}
export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}