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
import { UserContext } from "./Context/UserContext";
import { useEffect } from "react";
import { useState } from "react";

function App() {

 const API_URL = "https://cat-node-api.herokuapp.com/api/customers"

const [customersData, setCustomersData] = useState([])
const [input, setInput] = useState("")
const [filtered, setFiltered] = useState([])

function handleClick(){
input ? customersData.map((item)=> {
    if(item.name.toLowerCase().includes(input.toLocaleLowerCase()) || item._id.toLowerCase().includes(input.toLocaleLowerCase())) {
      setFiltered(item)
      setInput("")
    }
  }):setInput("")
}



useEffect(()=>{
  fetch(API_URL)
  .then(res=>res.json())
  .then((data)=>{
    setCustomersData(data)
  })
},[])

function handleChange(e){
  e.preventDefault();
  setInput(e.target.value);
}





  return (
    <div className="text">
      <UserContext.Provider value={{customersData, setCustomersData, input, setInput, filtered, setFiltered, handleChange, handleClick}}>
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
      </UserContext.Provider>
    </div>
  );
}

export default App;