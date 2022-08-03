import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AccountSettings from "../pages/AccountSettings"

export default function LeftMEnu() {
  return (
    <ul className="menu 
      mt-[20px] 
      flex gap-[20px] 
      bg-base-200 w-80 
      max-h-[600px] rounded-box
      mb-[20px]
      ml-[20px]
      ">

      <li className="hover-bordered font-bold text-xl"><Link to="/accountsettings">Account settings.</Link></li>
      <li className="hover-bordered font-bold text-xl"><Link to="customeraccounts">Customer accounts.</Link></li>
      <li className="hover-bordered font-bold text-xl"><Link to="/chatsupoort">Chat support.</Link></li>
      <li className="hover-bordered font-bold text-xl"><Link to="/escalation">Escalation.</Link></li>
    </ul>

  )
}