import { async } from '@firebase/util';
import React from 'react'
import { useState,useContext } from 'react'
import { UserContext } from "../Context/UserContext";


function Login() {
    
  const { login, isLogin, setIsLogin, employeeLogin, setEmployeeLogin, repIn } = useContext(UserContext);

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState("")


const handleSubmit = async(e)=>{
  e.preventDefault()
  setError("");
  try{
    await login(email, password);
    repIn && setIsLogin(!isLogin)
  }catch(err){
    setError(err.message)
    console.log(err)
  }
};

  return (
    <main className="bg-primary w-screen h-screen flex justify-center items-center flex-col">
      <h1 className='font-bold text-5xl text-white mb-4'>Welcome to Customer assiting tool</h1>
      <p className='font-bold text-white mb-3'>Please Login with your employee credentials</p>
<label htmlFor="my-modal-3" className="btn modal-button">LOGIN</label>

<input type="checkbox" id="my-modal-3" className="modal-toggle" />
<div className="modal">
    
  <div className="modal-box relative">
    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <h3 className="text-lg font-bold">Please enter your employee email:</h3>

    <form onSubmit={(e)=>handleSubmit(e)} className="form-control">
  <label className="label">
    <span className="label-text">Employee Email:</span>
  </label>
  <label className="input-group input-group-vertical">
    <input 
    type="text" 
    placeholder="user@example.com" 
    className="input input-bordered" 
    required
    value={email}
    onChange={(e)=>setEmail(e.target.value)}
    />
  </label>

  <label className="label">
    <span className="label-text">Password:</span>
  </label>
  <label className="input-group input-group-vertical">
    <input 
    type="password" 
    placeholder="Your password" 
    className="input input-bordered" 
    required
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
    />
  </label>
  <button className='btn bg-primary mt-3'>Submit</button>
</form>

  </div>

</div>
    </main>
  )
}

export default Login
