import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useAuthStatus.ts";
import MenuItem from "./MenuItem";
import { motion } from "framer-motion";
import { useAppSelector } from "../hooks/useTypedHooks";

export default function SideMenu() {
  const { handleLogout, isLoading } = useLogout();
  // @ts-ignore
  const employee = useAppSelector((state) => state.employee.current?.items?.[0]);

  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 18 }}
      className="w-64 h-[80vh] flex flex-col bg-[#3a1b10] text-white shadow-lg rounded-[32px] mt-15 ml-5"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-center h-20 bg-[#4b2e19] rounded-t-[32px]"
      >
        <Link to="/Dashboard" className="text-3xl font-bold tracking-wide">
          CMT
        </Link>
      </motion.div>
      <nav className="flex flex-col flex-1 items-start p-6 space-y-3">
        {/* Only show Dashboard if role is sup or admin */}
        {employee && ["sup", "admin"].includes(employee.role) && (
          <MenuItem to="/Dashboard" icon="grid" label="Dashboard" />
        )}
        <MenuItem to="/CustomerLookUp" icon="person-circle" label="Customer View" />
        <MenuItem to="/Products" icon="card" label="Products" />
        <MenuItem to="/Reports" icon="document" label="Reports" />
        <MenuItem to="/GetAssistance" icon="chatbubbles" label="Get Assistance" />
        <MenuItem to="/SourceOfKnowledge" icon="book" label="Source Of Knowledge" />
      </nav>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="p-6"
      >
        <motion.button
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.03 }}
          onClick={handleLogout}
          disabled={isLoading}
          className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold disabled:opacity-60 shadow"
        >
          {isLoading ? "Logging out..." : "Logout"}
        </motion.button>
      </motion.div>
    </motion.aside>
  );
}