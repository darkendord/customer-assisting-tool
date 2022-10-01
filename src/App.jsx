import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


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
import Login from "./pages/Login";
import { UserContext } from "./Context/UserContext";
import { useEffect,useState } from "react";
import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { current } from "daisyui/src/colors";



function App() {

  // CONTEXT LOGIC//
  const API_URL = "https://cat-node-api.herokuapp.com/api/customers"

  const [customersData, setCustomersData] = useState([])
  const [input, setInput] = useState("")
  const [filtered, setFiltered] = useState([])
  const [updateData, setUpdateData] = useState([])
  const [isLogin, setIsLogin] = useState(true)
  const [employeeLogin, setEmployeeLogin] = useState([])

  function handleClick() {
    input ? customersData.map((item) => {
      if (item.name.toLowerCase().includes(input.toLocaleLowerCase()) || item._id.toLowerCase().includes(input.toLocaleLowerCase())) {
        setFiltered(item)
        setInput("")
      }
    }) : setInput("")
  }



  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then((data) => {
        setCustomersData(data)
      })
  }, [])

  function handleChange(e) {
    e.preventDefault();
    setInput(e.target.value);
  }


  function renderData() {
    setUpdateData(filtered)
  }


//LOGIN REP FUNCTION

function login(email, password){
  signInWithEmailAndPassword(auth, email, password)
}

useEffect(()=>{
  const repIn = onAuthStateChanged(auth,(currentRep)=>{
    setIsLogin(currentRep)
  });
  return ()=>{
    repIn();
  }
},[])

// LOUUT REP FUNCTION

function signOutRep(){
  return signOut(auth)
}



//////////////////////




function component (){
  if(!isLogin){
  return <Login/>
}else{
  return(
<div className="text">
        <Navbar />
        <div className="flex justify-between">
          <BrowserRouter>
            <LeftMenu />
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/customeraccounts" element={<CustomerAccounts />} />
              <Route path="/accountsettings" element={<AccountSettings />} />
              <Route path="/chatsupoort" element={<ChatSupport />} />
              <Route path="/escalation" element={<Escalation />} />
            </Routes>
            <RightSide />
          </BrowserRouter>
        </div>
      </div>
  )
}
  
}
  return (

    //CONTEXT STRUCTURE//
    <UserContext.Provider
      value={
        {
          customersData, setCustomersData,
          input, setInput,
          filtered, setFiltered,
          handleChange, handleClick,
          updateData,
          renderData,
          isLogin, setIsLogin,
          employeeLogin, setEmployeeLogin,
          login,
          signOutRep
        }
      }>
      {/*CONTEXT*/}
      
      {component()}
    </UserContext.Provider>
  );
}

export default App;