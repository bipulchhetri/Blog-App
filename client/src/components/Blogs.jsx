import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Blogs = () => {
    const[blogs,setBlogs]=useState([])
    const[currentPage,setCurrentPage]=useState(1)
   const blogsPerPage=6;
   const navigate= useNavigate()

   useEffect(() =>{
    const fetchBlogs= async() =>{
        try{
            const response= await fetch("https://blog-app-x66b.onrender.com/all-blogs");
            const data= await response.json()
            setBlogs(data)
        }
        catch(error){
            console.error("Error")
        }
    }
    fetchBlogs()
   },[])

   const indexOfLastBlog=currentPage * blogsPerPage;
     const indexOfFB= indexOfLastBlog - blogsPerPage;
     const currentBlogs= blogs.slice(indexOfFB,indexOfLastBlog)
     const totalPages= Math.ceil(blogs.length / blogsPerPage)

     const ut=[...new Map(blogs.map((blog) => [blog.title,blog._id])).entries()]

     const handleC=(blogId)=>{
        navigate(`/blog/${blogId}`)
     }
  return (
    <div className='max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-8'>
       <div className='w-full md:w-3/4'>
        <h2 className='text-3xl font-bold mb-6'>All Blogs</h2>
        <div className='grid md:grid-cols-3 gap-8'>
           {currentBlogs.length > 0 ? (
            currentBlogs.map((blog) =>(
                <div key={blog._id} className='bg-gray-200 p-4 '>
                    <img src={`https://blog-app-x66b.onrender.com${blog.image}`} className='w-full h-32 object-cover'></img>
                 <h3>{blog.title}</h3>
               <p>{blog.content.substring(0,50)}...</p>
               <Link to={`/blog/${blog._id}`} className=' mt-4 inline-block bg-orange-600 text-white px-4 py-2'>Red More</Link>
                </div>
            ))
           ):(
            <p className='text-center text-gray-500'>No Blogs Found</p>
           )}
            
        </div>

        {totalPages > 1 && (
            <div className='mt-8 flex justify-center space-x-4'>
                {Array.from({length:totalPages},(_,i)=>(
                    <button
                     className={`px-4 py-2 rounded-lg font-bold ${currentPage === i + 1 ? "bg-red-600 text-white" : "bg-gray-200 text-black"}`}
                     onClick={() => setCurrentPage(i + 1)}
                    >{i + 1}</button>
                ))}
            </div>
        )}
       </div>

       <div className='w-full md:w-1/4 bg-gray-100 p-6 shadow-lg'>
        <h3 className='text-xl text-orange-500 font-bold mb-4'>Blog Titles</h3>
        <ol>
            {ut.length > 0 ? (
             ut.map(([title,id])=>(
                <li key={id} 
                onClick={() => handleC(id)}
                className='cursor-pointer font-bold hover:text-red-600 hover:underline'> {title}</li>
            ))  
            ):(
                <p>No Blog found</p>
            )}
        </ol>
       </div>
    </div>
  )
}

export default Blogs