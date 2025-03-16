import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.snow.css"
import axios from 'axios'
import DOMPurify from 'dompurify'
import {FaEdit, FaSave, FaTrash} from 'react-icons/fa'
const Dashboard = () => {
    const username=localStorage.getItem("username")
    const[title,setTitle]=useState("")
    const[content,setContent]=useState("")
    const[image,setImage]=useState(null)
    const[blogs,setBlogs]=useState([])


    useEffect(() =>{
        axios.get(`https://blog-app-x66b.onrender.com/blogs/${username}`).then((res) => setBlogs(res.data));

    },[username])

    const stripHtml=(html)=>{
        const cleanText= DOMPurify.sanitize(html,{ALLOWED_TAGS:[]});
        return cleanText.trim()
    }

    const handleUpload=async(e) =>{
    e.preventDefault()
    const formData= new FormData();
    formData.append("title",title)
    formData.append("content",stripHtml(content))
    formData.append("image",image)
    formData.append("author",username)
    await axios.post("https://blog-app-x66b.onrender.com/upload",formData)
    window.location.reload();
    }
  

    
    const handleUpdate=async() =>{
      const formData= new FormData()
      formData.append("title",title)
      formData.append("content",content)
      if(image) formData.append("image",image);

      await axios.put(`https://blog-app-x66b.onrender.com/blogs/${editingBlog._id}`,formData)
      setBlogs(blogs.map((blog) =>(blog._id === editingBlog._id ? {...blog,title,content} : blog)))
      setEditingBlog(null)
      setImage(null)
    }

    const handleDelete=async(id)=>{
     await axios.delete(`https://blog-app-x66b.onrender.com/blogs/${id}`)
     setBlogs(blogs.filter((blog) => blog._id !== id))
    }
    
    const handleEdit=(blog)=>{
      setEditingBlog(blog)
      setTitle(blog.title)
      setContent(blog.content)
    }
  return (
    <div className='p-6 bg-gray-200 min-h-screen'>
      <h1 className='text-3xl font-bold text-gray-700'>Welcome,{username}</h1>
    
     <form onSubmit={handleUpload}>
        <input placeholder="Blog Title"
        onChange={(e) =>setTitle(e.target.value)}
         className='border p-2 w-full mb-2'
        ></input>
         <input 
           onChange={(e) =>setImage(e.target.files[0])}
          type="file" placeholder="Blog Title"
         className='mb-2'
        ></input>
        <ReactQuill value={content} onChange={setContent} className='mb-2' id='editor'></ReactQuill>
        <button type="submit"className='bg-blue-500 text-white  p-2'>Publish</button>
     </form>

     <h2>My Blogs</h2>
     <div className='mt-4'>
        {blogs.map((blog) =>(
            <div key={blog._id} className='flex items-center justify-between bg-white p-4 rounded-lg shadow-lg mt-2'>
                {editingBlog && editingBlog._id === blog._id ? (
                 <div className='w-full'>
                   <input 
                   value={title}
                   onChange={(e) => setTitle(e.target.value)}
                   className='border p-2 w-full mb-2'></input>
                   <input type="file" onChange={(e) => setImage(e.target.files[0])} className='mb-2'
                       ></input>
                        <ReactQuill value={content} onChange={setContent} className='mb-2'></ReactQuill>
                        <button onClick={handleUpdate} className='bg-green-500 text-white p-2 w-full rounded'><FaSave className='inline mr-2'/>Save Changes</button>
             
                 </div>
                ): (
                    <>
                      <div className='flex items-center space-x-4'>
                        <img src={`https://blog-app-x66b.onrender.com${blog.image}`}
                        className='w-12 h-12 object-cover rounded-full'
                        ></img>
                      
                      <div>
                      <h3 className='font-bold'>{blog.title}</h3>
                      <p className='text-gray-600 text-sm'>{new Date(blog.createdAt).toLocaleString()}</p>
                      </div>
                      </div>
                      <div className='space-x-4'>
                        <button onClick={() => handleEdit(blog)} className='text-blue-500'><FaEdit size={18}/></button>
                        <button onClick={ ()=>handleDelete(blog._id)} className='text-red-500'><FaTrash/></button>
                      </div>
                     </>
                )}
            </div>
        ))}
     </div>
    </div>
  )
}

export default Dashboard
