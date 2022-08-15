import { useEffect, useState } from "react"

export default function Home() {

  const API_URL = "https://cat-node-api.herokuapp.com/api/customers"

const [customersData, setCustomersData] = useState([])
const [input, setInput] = useState("")
const [filtered, setFiltered] = useState([])

function handleClick(){
customersData.filter((item)=> {
    if(item.name.toLowerCase() === input.toLocaleLowerCase() || item._id.toLowerCase() === input.toLocaleLowerCase()){
      setFiltered(item)
      setInput("")
    }
})
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

console.log(input)

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

          <ul className="search-resut ml-2">
            {<div> Customer: {filtered.name}</div>}
          </ul>
        </div>
      </div>

    </>
  )
}