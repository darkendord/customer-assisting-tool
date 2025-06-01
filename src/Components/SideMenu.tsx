import { NavLink, Link } from "react-router-dom";
import IonIcon from "@reacticons/ionicons";
import { useLogout } from "../hooks/useAuthStatus.ts";

export default function SideMenu() {
  const { handleLogout, isLoading } = useLogout();

  return (
    <aside className="w-64 h-[80vh] flex flex-col bg-[#3a1b10] text-white shadow-lg rounded-[32px] mt-15 ml-5">
      <div className="flex items-center justify-center h-20 bg-[#4b2e19] rounded-t-[32px]">
        <Link to="/Dashboard" className="text-3xl font-bold tracking-wide">
          CAT
        </Link>
      </div>
      <nav className="flex flex-col flex-1 items-start p-6 space-y-3">
        <NavLink
          to="/Dashboard"
          className={({ isActive }) =>
            `flex items-center px-3 py-2 rounded-lg w-full transition ${isActive
              ? "bg-[#fbf4e9] text-[#3a1b10] font-semibold"
              : "hover:bg-[#5c3a23] hover:text-[#fbf4e9]"
            }`
          }
        >
          <IonIcon name="grid" />
          <span className="ml-3">Dashboard</span>
        </NavLink>
        <NavLink
          to="/CustomerLookUp"
          className={({ isActive }) =>
            `flex items-center px-3 py-2 rounded-lg w-full transition ${isActive
              ? "bg-[#fbf4e9] text-[#3a1b10] font-semibold"
              : "hover:bg-[#5c3a23] hover:text-[#fbf4e9]"
            }`
          }
        >
          <IonIcon name="person-circle" />
          <span className="ml-3">Customer View</span>
        </NavLink>
        <NavLink
          to="/Products"
          className={({ isActive }) =>
            `flex items-center px-3 py-2 rounded-lg w-full transition ${isActive
              ? "bg-[#fbf4e9] text-[#3a1b10] font-semibold"
              : "hover:bg-[#5c3a23] hover:text-[#fbf4e9]"
            }`
          }
        >
          <IonIcon name="card" />
          <span className="ml-3">Products</span>
        </NavLink>
        <NavLink
          to="/Reports"
          className={({ isActive }) =>
            `flex items-center px-3 py-2 rounded-lg w-full transition ${isActive
              ? "bg-[#fbf4e9] text-[#3a1b10] font-semibold"
              : "hover:bg-[#5c3a23] hover:text-[#fbf4e9]"
            }`
          }
        >
          <IonIcon name="document" />
          <span className="ml-3">Reports</span>
        </NavLink>
      </nav>
      <div className="p-6">
        <button
          onClick={handleLogout}
          disabled={isLoading}
          className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold disabled:opacity-60"
        >
          {isLoading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </aside>
  );
}