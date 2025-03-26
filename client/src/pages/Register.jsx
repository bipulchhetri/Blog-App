// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
// const Register = () => {
//   const[username,setUsername]=useState('')
//   const[email,setEmail]=useState('')
//   const[password,setPassword]=useState('')

//   const navigate=useNavigate()

//   const handleRegister= async(e)=>{
//     e.preventDefault()
//     try{
//       await axios.post("https://blog-app-ro4q-git-main-bipulchhetri80gmailcoms-projects.vercel.app/register",{username,email,password})
//       alert("Register Success")
//       navigate('/login')
//     }catch(err){
//       alert("Error")
//     }
//   }

//   return (
//     <div className='min-h-screen flex justify-center items-center bg-orange-100'>
//       <form className='bg-white p-6' onSubmit={handleRegister}>
//         <h2 className='text-orange-500 text-2xl font-bold mb-4'>Register</h2>
//         <input placeholder="Enter Name"className='border p-2 w-full mb-2' type="text" onChange={(e) => setUsername(e.target.value)}></input>
//         <input type="email" placeholder="Enter Email"className='border p-2 w-full mb-2 'onChange={(e) => setEmail(e.target.value)} ></input>
//         <input type="password"placeholder="Enter Password"className='border p-2 w-full mb-2' onChange={(e) => setPassword(e.target.value)}></input>
//        <button type="submit" className='bg-orange-500 text-white p-2 w-full '>Register</button>
//       </form>
//     </div>
//   )
// }

// export default Register


import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Register = () => {
  const[username,setUsername]=useState('')
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')

  const navigate=useNavigate()

  const handleRegister= async(e)=>{
    e.preventDefault()
    try{
      await axios.post("https://blog-app-1-4i8q.onrender.com/register",{username,email,password})
      alert("Register Success")
      navigate('/login')
    }catch(err){
      alert("Error")
    }
  }

  return (
    <div className='min-h-screen flex justify-center items-center bg-orange-100'>
      <form className='bg-white p-6' onSubmit={handleRegister}>
        <h2 className='text-red-500 text-2xl font-bold mb-4'>Register</h2>
        <input placeholder="Enter Name"className='border p-2 w-full mb-2' type="text" onChange={(e) => setUsername(e.target.value)}></input>
        <input type="email" placeholder="Enter Email"className='border p-2 w-full mb-2 'onChange={(e) => setEmail(e.target.value)} ></input>
        <input type="password"placeholder="Enter Password"className='border p-2 w-full mb-2' onChange={(e) => setPassword(e.target.value)}></input>
       <button type="submit" className='bg-red-500 text-white p-2 w-full '>Register</button>
      </form>
    </div>
  )
}

export default Register