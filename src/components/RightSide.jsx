import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";


function Users() {
  const { input, handleChange, handleClick, updateData } = useContext(UserContext);

  return (
    <div className="avatar ml-[30px] flex flex-col">
      <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mb-5">
        <img src="https://placeimg.com/192/192/people" />
      </div>
      <ul>
        <li className="font-bold">Fullname:</li> {updateData.name}
        <li className="font-bold">age:</li> {updateData.age}
        <li className="font-bold">SSN:</li> {updateData.ssn}

        <li className="font-bold">Phone number:</li> {updateData.phone}

        <li className="font-bold">Type of customer: {
        updateData.type === "Platinium" ? 
        <p className="text-stone-500">
          {updateData.type}
          </p>:
          updateData.type === "Gold" ? 
        <p className="text-yellow-500">
          {updateData.type}
          </p>:
          updateData.type === "Silver" ? 
        <p className="text-blue-500">
          {updateData.type}
          </p>
          :
          updateData.type === "Regular" ? 
        <p className="text-black-500">
          {updateData.type}
          </p>
          :null}</li>

        <li className="font-bold">Address:</li> {updateData.address}
        <li className="font-bold">Profile status:</li> {updateData.profileStatus === true ? <p className="text-emerald-500">Active</p> : updateData.profileStatus === false? <p className="text-red-500">Inactive</p>: null}
      </ul>
    </div>
  )
}
/////////////////////////
//////////////////////////



export default function RightSide() {
  const { input, handleChange, handleClick, updateData } = useContext(UserContext);
  console.log(updateData)
  return (
    <>


      <div className="bg-base-200 w-[100%] flex flex-col justify-between items-center ml-[30px] md:ml-[0] rounded-box mb-[20px] mt-[20px] mr-[20px]">
        <div className="bg-base-200 w-[100%] flex justfy-center items-center ml-[30px] rounded-box mb-[20px] mt-[20px] mr-[20px]">
          {<Users />}
        </div>
        {updateData.comments && <div className="m-4 max-h-[200px] border-8 p-3 overflow-auto">
          <p className="border-b-2 mb-2">
            {updateData.comments}
          </p>
        </div>}
        <div className="ml-3  flex items-center">
          <textarea className="textarea textarea-primary max-h-[150px] mb-3 w-auto resize-none" placeholder="Customer notes" rows="50" cols="100">
          </textarea>
          <button className="btn btn-primary ml-2 mt-10">Add note</button>
        </div>

      </div>
    </>
  )
}