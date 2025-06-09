import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import IonIcon from "@reacticons/ionicons";

interface MenuItemProps {
    to: string;
    icon: string;
    label: string;
}

const MenuItem = ({ to, icon, label }: MenuItemProps) => (
    <motion.div
        whileHover={{ scale: 1.04, x: 6 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="w-full"
    >
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-lg w-full transition-all duration-200 ${isActive
                    ? "bg-[#fbf4e9] text-[#3a1b10] font-semibold shadow"
                    : "hover:bg-[#5c3a23] hover:text-[#fbf4e9]"
                }`
            }>
            {/* @ts-ignore */}
            <IonIcon name={icon} />
            <span className="ml-3">{label}</span>
        </NavLink>
    </motion.div>
);

export default MenuItem;