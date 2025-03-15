// // import React, { useEffect, useState } from 'react'
// // import axios from "axios"
// // const Blogcard = () => {
// //     const [blogs,setBlogs]=useState([]);
// //     const [search,setSearch]=useState("");
// //     const [currentPage,SetcurrentPage]=useState(1)
// //     const BlogperPage=6;
// //     useEffect(()=>{
// //         axios.get("http://localhost:3000/blogs").then((res)=>setBlogs(res.data))
// //     },[])
// //   return (
// //     <div className='p-6 bg-white min-h-screen flex gap-8'>
// //         <div>
// //             <h1>All Blogs</h1>
// //             <div>
// //                {blogs.map((blog)=>(
// //                 <div key={blog._id}>
// //                     <img src={`http://localhost:3000 ${blogs.image}`} alt="" />
// //                 </div>
// //                ))}
// //             </div>
// //         </div>
// //     </div>
// //   )
// // }

// // export default Blogcard    

// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import { Link } from 'react-router-dom'
// const BlogCard = () => {
//     const[blogs,setBlogs]=useState([])
//     const[search,setSearch]=useState("")
//     const[currentPage,setCurrentPage]=useState(1)
//     const blogsPerPage=6;

//     const filteredBlog= blogs.filter((blog) =>
    
//      blog.title.toLowerCase().includes(search.toLowerCase()));

//      const indexOfLastBlog=currentPage * blogsPerPage;
//      const indexOfFB= indexOfLastBlog - blogsPerPage;
//      const currentBlogs= filteredBlog.slice(indexOfFB,indexOfLastBlog)

//      const nextPage=() =>{
//         if(currentPage < Math.ceil(filteredBlog.length/ blogsPerPage)){
//             setCurrentPage(currentPage + 1)
//         }
//      }

//      const prevPage=() =>{
//         if(currentPage > 1){
//             setCurrentPage(currentPage - 1)
//         }
//      }

//     useEffect(() =>{
//         axios.get("http://localhost:3000/blogs").then((res) => setBlogs(res.data))
//     },[])

//   return (
//     <div className='p-6 bg-white min-h-screen flex flex-col md:flex-row  gap-8'>
//       <div className=' w-full md:w-3/4'>
//         <h1 className='text-3xl font-bold text-red-600 text-center mb-6'>All Blogs</h1>

//         <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
//             {currentBlogs.map((blog) =>(
//                 <div key={blog._id} className='bg-white p-3 border border-red-500 '>
//                     <img src={`http://localhost:3000${blog.image}`} className='w-full h-32 object-cover'></img>
//                     <h3 className='font-bold text-gray-700 mt-12'>{blog.title}</h3>
//                    <p className='text-gray-600 text-sm'><span className='text-red-500 font-medium'>{blog.author}</span> | {new Date(blog.createdAt).toLocaleString()}</p>
//                   <p className='text-gray-700 text-sm mt-2'>{blog.content.substring(0,80)}...</p>
//                   <Link to={`/blog/${blog._id}`} className='block text-center mt-3 bg-red-600 text-white py-1 px-3'>Read More</Link>
//                 </div>
//             ))}
//         </div>

//         <div className='flex justify-center mt-6 gap-4'>
//             <button onClick={prevPage} disabled ={currentPage === 1}className='bg-red-500 text-white px-3 py-1 disabled::opacity-50'>Prev</button>
//             <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredBlog.length / blogsPerPage)}className='bg-red-500 text-white px-3 py-1 disabled::opacity-50'>Next</button>
           
//         </div>
//       </div>

//       <div className='w-full md:w-1/4 bg-gray-200 p-4 rounded-lg shadow-lg'>
//         <h2 className='text-lg font-bold text-red-600'>Search Blogs</h2>
//         <input placeholder="Search by title..."
//          value={search}
//          onChange={(e) => setSearch(e.target.value)}
//          className='w-full p-2 mt-2 border rounded'
//         ></input>

//         <div>
//             <h2>Trending Blogs</h2>
//             {blogs.slice(0,10).map((blog) =>(
               
//                     <li key={blog._id} className='mt-2'>
//                       <Link to={`/blog/${blog._id}`} className='text-red-500 hover:underline'>{blog.title}</Link>
//                     </li>
               
//             ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default BlogCard


import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const BlogCard = () => {
    const[blogs,setBlogs]=useState([])
    const[search,setSearch]=useState("")
    const[currentPage,setCurrentPage]=useState(1)
    const blogsPerPage=6;

    const filteredBlog= blogs.filter((blog) =>
    
     blog.title.toLowerCase().includes(search.toLowerCase()));

     const indexOfLastBlog=currentPage * blogsPerPage;
     const indexOfFB= indexOfLastBlog - blogsPerPage;
     const currentBlogs= filteredBlog.slice(indexOfFB,indexOfLastBlog)

     const nextPage=() =>{
        if(currentPage < Math.ceil(filteredBlog.length/ blogsPerPage)){
            setCurrentPage(currentPage + 1)
        }
     }

     const prevPage=() =>{
        if(currentPage > 1){
            setCurrentPage(currentPage - 1)
        }
     }

    useEffect(() =>{
        axios.get("https://blog-app-x66b.onrender.com/blogs").then((res) => setBlogs(res.data))
    },[])

  return (
    <div className='p-6 bg-white min-h-screen flex flex-col md:flex-row  gap-8'>
      <div className=' w-full md:w-3/4'>
        <h1 className='text-3xl font-bold text-orange-400 text-center mb-6'>All Blogs</h1>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {currentBlogs.map((blog) =>(
                <div key={blog._id} className='bg-white p-3 border border-black-500 '>
                    <img src={`https://blog-app-x66b.onrender.com/{blog.image}`} className='w-full h-32 object-cover'></img>
                    <h3 className='font-bold text-gray-700 mt-12'>{blog.title}</h3>
                   <p className='text-gray-600 text-sm'><span className='text-red-500 font-medium'>{blog.author}</span> | {new Date(blog.createdAt).toLocaleString()}</p>
                  <p className='text-gray-700 text-sm mt-2'>{blog.content.substring(0,80)}...</p>
                  <Link to={`/blog/${blog._id}`} className='block text-center mt-3 bg-orange-600 text-white py-1 px-3'>Read More</Link>
                </div>
            ))}
        </div>

        <div className='flex justify-center mt-6 gap-4'>
            <button onClick={prevPage} disabled ={currentPage === 1}className='bg-orange-500 text-white px-3 py-1 disabled::opacity-50'>Prev</button>
            <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredBlog.length / blogsPerPage)}className='bg-orange-500 text-white px-3 py-1 disabled::opacity-50'>Next</button>
           
        </div>
      </div>

      <div className='w-full md:w-1/4 bg-orange-100 p-4 rounded-lg shadow-lg'>
        <h2 className='text-lg font-bold text-orange-600'>Search Blogs</h2>
        <input placeholder="Search by title..."
         value={search}
         onChange={(e) => setSearch(e.target.value)}
         className='w-full p-2 mt-2 border rounded'
        ></input>
 
        <div>
            <h2 className='text-orange-600  font-bold'>Trending Blogs</h2>
            {blogs.slice(0,10).map((blog) =>(
               
                    <li key={blog._id} className='mt-2'>
                      <Link to={`/blog/${blog._id}`} className='text-black-500 font-bold hover:underline'>{blog.title}</Link>
                    </li>
               
            ))}
        </div>
      </div>
    </div>
  )
}

export default BlogCard