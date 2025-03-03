import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'
const Dashboard = () => {
    const username=localStorage.getItem("username")
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [blog, setBlog] = useState("");
  const [edit, setEdit] = useState("");
  const [content,setContent]=useState("");


useEffect(()=>{
    axios.get(`http://localhost:3000/blogs/${username}`).then((res)=>setBlog(res.data))
},[username])

  const handleUpload=()=>{
    setContent
  }
  return (
    <div className="p-6 bg-grey-200 min-h-screen ">
      <h1 className="text-3xl font-bold text-grey-600">Welcome {username}</h1>
      <form onSubmit={handleUpload}>
        <input
          type="text"
          name=""
          id=""
          placeholder="Blog Titile"
          className="border p-2 w-full mb-2"
          onChange={(e)=>setTitle(e.target.value)}
        />
        <input
          type="file"
          name=""
          id=""
          placeholder=" "
          className="mb-2 border p-2 w-50%"
          onChange={(e)=>setImage(e.target.files[0])}

        />
        <ReactQuill onChange={setContent} value={content} className="mb-2"></ReactQuill>
<button className="p-2 w-[20%] m-2 rounded border bg-green-300 ">Publish</button>        
      </form>
    </div>
  );
};

export default Dashboard;
