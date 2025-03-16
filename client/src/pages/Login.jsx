import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Login = () => {
  
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')

  const navigate=useNavigate()

  const handleLogin= async(e)=>{
    e.preventDefault()
    try{
     const res= await axios.post("http://localhost:3000/login",{email,password})
      localStorage.setItem('token',res.data.token)
      localStorage.setItem("username",res.data.username)
      navigate('/dashboard')
    }catch(err){
      alert("Invalid Data")
    }
  }

  return (
    <div className='min-h-screen flex justify-center items-center bg-orange-100'>
      <form className='bg-white p-6' onSubmit={handleLogin}>
        <h2 className='text-orange-500 text-2xl font-bold mb-4'>Login</h2>
        <input type="email" placeholder="Enter Email"className='border p-2 w-full mb-2 'onChange={(e) => setEmail(e.target.value)} ></input>
        <input type="password"placeholder="Enter Password"className='border p-2 w-full mb-2' onChange={(e) => setPassword(e.target.value)}></input>
       <button type="submit" className='bg-orange-500 text-white p-2 w-full '>Login</button>
      </form>
    </div>
  )
}

export default Login