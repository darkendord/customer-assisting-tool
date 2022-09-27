import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";


function Users() {
const {input, handleChange, handleClick, updateData} = useContext(UserContext);

console.log(updateData)


  return (
    <div className="avatar ml-[30px] flex flex-col">
      <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mb-5">
        <img src="https://placeimg.com/192/192/people" />
      </div>
      <ul>
        <li className="font-bold">Fullname:</li> {updateData.name}
        <li className="font-bold">age:</li> {updateData.age}
        <li className="font-bold">SSN:</li>
        <li className="font-bold">Phone number:</li>
        <li className="font-bold">Type of customer: (platinium)</li>
        <li className="font-bold">Address:</li>
        <li className="font-bold">Profile status:</li>
      </ul>
    </div>
  )
}
/////////////////////////
//////////////////////////



export default function RightSide() {


  return (
    <>


      <div className="bg-base-200 w-[100%] flex flex-col justify-between items-center ml-[30px] md:ml-[0] rounded-box mb-[20px] mt-[20px] mr-[20px]">
        <div className="bg-base-200 w-[100%] flex justfy-center items-center ml-[30px] rounded-box mb-[20px] mt-[20px] mr-[20px]">
          {<Users />}
        </div>
        <div className="m-4 max-h-[200px] border-8 p-3 overflow-auto">
          <p className="border-b-2 mb-2">
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
          </p>
        </div>
        <div className="ml-3  flex items-center">
          <textarea className="textarea textarea-primary max-h-[150px] mb-3 w-auto resize-none" placeholder="Customer notes" rows="50" cols="100">
          </textarea>
          <button className="btn btn-primary ml-2 mt-10">Add note</button>
        </div>

      </div>
    </>
  )
}