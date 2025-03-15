import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
const BlogDetail = () => {
    const{id}=useParams()
    const[blog,setBlog]=useState(null)
    // const[likes,setLikes]=useState(0)
//     const [liked, setLiked] = useState(false);
// const [likes, setLikes] = useState(0); 
// const userId = {id}; 
    // const[comments,setComments]=useState([])
    // const[newComment,setNewComment]=useState("")

    useEffect(() =>{
        axios.get(`https://blog-app-x66b.onrender.com/blog/${id}`)
        .then((res) =>{
            setBlog(res.data)
            setLikes(res.data.likes || 0)
            setComments(res.data.comments || [])
        })
        .catch((err) => console.error("Error"))
    },[id])



    // const handleLike = async () => {
    //     if (liked) return; // Prevent multiple likes
    
    //     try {
    //         const response = await axios.post(`https://blog-app-x66b.onrender.com/${id}/like`, { userId });
    
    //         setLikes(response.data.totalLikes);
    //         setLiked(true); // User can only like once
    //     } catch (error) {
    //         console.error("Error liking blog:", error.response?.data?.message || error.message);
    //     }
    // };
   
    
    // const handleC=async() =>{
    //   if(!newComment.trim()) return;
    //   try{
    //     await axios.post(`https://blog-app-x66b.onrender.com/${id}/comment`,{text:newComment })
    //     setComments([...comments,{text:newComment}]);
    //         setNewComment("")

    //   }catch(error){
    //     console.error("Error commenting on blog:", error)
    //   }
    // }
    if (!blog) return <p>Loading...</p>
  return (
    <div className='p-6 bg-gray-100 min-h-screen flex justify-center items-center'>
       <div className='max-w-3xl w-full bg-white p-8 rounded-lg '>
        <img src={blog.image}  className='w-full h-80 object-cover rounded-lg'></img>
        <h1 className='text-4xl font-bold text-gray-900 mt-6'>{blog.title}</h1>
        <p className='text-gray-600 mt-2'>{blog.author} -{new Date(blog.createdAt).toLocaleString()}</p>
        <div
        className='mt-4 text-gray-700 leading-relaxed'
         dangerouslySetInnerHTML={{ __html:blog.content}}
        ></div>

        {/* <div className='flex items-center space-x-4 mt-6'>
        <button onClick={handleLike} disabled={liked} className='bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700'>
    {liked ? "Liked Done" : "Like "} ({likes})
</button>
            <button onClick={handleLike}className='bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700'>Like ({likes})</button>
        </div> */}

        {/* <div className='mt-8'>
            <h2 className='text-2xl font-bold text-gray-800'>Comments</h2>
            <input 
             type="text"
             onChange={(e)=> setNewComment(e.target.value)}
             value={newComment}
            className='w-full p-3 border rounded-lg mt-4'></input>
            <button 
            onClick={handleC}
            className='mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-700'>Add Comment</button>

            <div className='mt-4 space-y-3'>
                {comments.length > 0 ? (
                    comments.map((comment,index) =>(
                        <div key={index} className='bg-gray-100 p-3 rounded-lg'>{comment.text}</div>
                    ))
                ):(
                    <p className='text-gray-600'>No Comments Yet.</p>
                )}
            </div>
        </div> */}
       </div>
    </div>
  )
}

export default BlogDetail