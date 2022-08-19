import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";

export default function Home() {

  const {input, handleChange, handleClick, filtered} = useContext(UserContext);
  

  return (
    <>
      <div className="bg-base-200 w-[100%] max-h-full flex flex-col justfy-center items-center ml-[30px] rounded-box mb-[20px] mt-[20px] mr-[20px]">

        <div className="bg-base-200 w-[75%] md:w-[100%] flex flex-col justfy-center ml-[20px] rounded-box mb-[20px] mt-[20px] mr-[20px]">

          <div className="mb-7 flex justify-center gap-[80px] md:gap-[15px] border-8 p-3">
            <div className="text-center">
              <h1 className="font-bold text-xl">Welcome To CAT:</h1>
              
            </div>
          </div>

          <div className="w-full flex gap-2 lg:w-full md:w-48 ml-2">
          <input type="text" placeholder="Search customer..." className="input input-bordered input-secondary w-full"
          value={input}
          onChange={(e)=> handleChange(e)}
          />
          <button className="btn btn-primary p-1 mr-4"
          onClick={()=> handleClick()}
          >
            search
          </button>
          </div>

          <ul className="search-resut ml-2 mt-4">
            {<div> Customer: {filtered ? <button className="btn btn-sm">{filtered.name}</button>: null}</div>}
          </ul>
        </div>
      </div>

    </>
  )
}