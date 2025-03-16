import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Latest = () => {
    const[tb,setTb]=useState([])

    useEffect(() =>{
        const fetchLB=async()=>{
            try{
                const response= await fetch("http://localhost:3000/latest-blog")
                const data=await response.json()
                setTb(data)
            }catch(error){
                console.error("Effor fetching blogs")
            }
        }
        fetchLB()
    },[])
  return (
    <div  >
      <section className='py-16 px-6 dark:bg-gray-300 text-black'>
        <div className='max-w-6xl mx-auto'>
            <h2 className='text-3xl font-bold text-center mb-8'>Latest Blogs</h2>
            <div className='grid md:grid-cols-3 gap-8'>
                {tb.length > 0 ? (
                    tb.map((blog) =>(
                        <div key={blog._id} className='p-4 border-2 border-black-600'>
                        <img className='w-full h-32 object-cover'src={`http://localhost:3000${blog.image}`}></img>
                        <h3 className='text-xl font-bold'>{blog.title}</h3>
                        {/* <p className='text-gray-700 text-sm mt-2'>{blog.content.substring(0,80)}...</p> */}
                 
                        <Link  to={`/blog/${blog._id}`} className='text-orange-600 font-bold underline'>Read More</Link>
                        </div>
                    ))
                ): (
                    <p>No Latest Blog</p>
                )}
            </div>
        </div>
      </section>
    </div>
  )
}

export default Latest