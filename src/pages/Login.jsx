import React from 'react'
import { useState } from 'react'


function Login() {
    const [employeeLogin, setEmployeeLogin] = useState([])

    
  return (
    <main className="bg-primary w-screen h-screen flex justify-center items-center flex-col">
      <h1 className='font-bold text-5xl text-white mb-4'>Welcome to Customer assiting tool</h1>
      <p className='font-bold text-white mb-3'>Please Login with your employee credentials</p>
<label htmlFor="my-modal-3" className="btn modal-button">LOGIN</label>

<input type="checkbox" id="my-modal-3" className="modal-toggle" />
<div className="modal">
    
  <div className="modal-box relative">
    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <h3 className="text-lg font-bold">Please enter your employee ID starting with "cat" followed by 4 digits:</h3>

    <form className="form-control">
  <label className="label">
    <span className="label-text">Employee ID:</span>
  </label>
  <label className="input-group input-group-vertical">
    <input type="text" placeholder="cat1234" className="input input-bordered" required/>
  </label>

  <label className="label">
    <span className="label-text">Password:</span>
  </label>
  <label className="input-group input-group-vertical">
    <input type="password" placeholder="Your password" className="input input-bordered" required/>
  </label>
  <button className='btn bg-primary mt-3'>Submit</button>
</form>

  </div>

</div>
    </main>
  )
}

export default Login
