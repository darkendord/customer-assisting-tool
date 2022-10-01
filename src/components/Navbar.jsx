import { useContext } from "react";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

export default function Navbar() {
const { signOutRep } = useContext(UserContext);



  const handleLogout = async ()=>{
    try{
      await signOutRep()
    }catch(err){
      console.log(err.message)
    }
  }
  return (
    <>
      <div className="navbar flex justify-between bg-primary text-primary-content">
        <a className="btn btn-ghost normal-case text-xl">Customer Assiting Tool</a>
        <input type="text" placeholder="Type here" className="input mr-[20px] input-bordered w-full max-w-xs" />
        <button className='btn bg-primary mt-3'
        onClick={()=>handleLogout()}
        >Logout</button>
      </div>
    </>
  )
}