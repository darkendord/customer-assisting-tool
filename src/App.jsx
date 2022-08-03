import {BrowserRouter,Routes,Route, Link} from "react-router-dom";


import * as React from 'react';
import "./index.css";
import Navbar from "./components/Navbar"
import LeftMenu from "./components/LeftMenu"
import RightSide from "./components/RightSide"
import RightSideLeft from "./components/RightSideLeft"
import Home from "./pages/Home"
import CustomerAccounts from "./pages/CustomerAccounts"
import AccountSettings from "./pages/AccountSettings"
import ChatSupport from "./pages/ChatSupport"
import Escalation from "./pages/Escalation"

function App() {
  return (
    <div className="text">
      <Navbar />
      <div className="flex justify-between">
        <BrowserRouter>
      <LeftMenu/>
        <Routes>
          <Route path="/" element={<Home />}/>
          
          <Route path="/customeraccounts" element={<CustomerAccounts />}/>
          <Route path="/accountsettings" element={<AccountSettings />}/>
          <Route path="/chatsupoort" element={<ChatSupport />}/>
          <Route path="/escalation" element={<Escalation />}/>
        </Routes>
      <RightSide />
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;