import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { FaEdit, FaSave, FaTrash } from "react-icons/fa";

const Dashboard = () => {
  const username = localStorage.getItem("username");

  // States for creating a new blog
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  // States for editing a blog
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editImage, setEditImage] = useState(null);

  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`https://blog-app-1-4i8q.onrender.com/blogs/${username}`).then((res) => setBlogs(res.data));
  }, [username]);

  const handleUpload = async (e) => {
    e.preventDefault();

    // Validation
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!content.trim() || content === "<p><br></p>") {
      setError("Content is required.");
      return;
    }
    setError(""); // Clear errors if validation passes

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("image", image);
    formData.append("author", username);

    await axios.post("https://blog-app-1-4i8q.onrender.com/upload", formData);
    window.location.reload();
  };

  const handleUpdate = async () => {
    if (!editTitle.trim()) {
      setError("Title is required.");
      return;
    }
    if (!editContent.trim() || editContent === "<p><br></p>") {
      setError("Content is required.");
      return;
    }
    setError("");

    const formData = new FormData();
    formData.append("title", editTitle);
    formData.append("content", editContent);
    if (editImage) formData.append("image", editImage);

    await axios.put(`https://blog-app-1-4i8q.onrender.com/blogs/${editingBlog._id}`, formData);
    setBlogs(
      blogs.map((blog) =>
        blog._id === editingBlog._id ? { ...blog, title: editTitle, content: editContent } : blog
      )
    );
    setEditingBlog(null);
    setEditTitle("");
    setEditContent("");
    setEditImage(null);
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://blog-app-1-4i8q.onrender.com/blogs/${id}`);
    setBlogs(blogs.filter((blog) => blog._id !== id));
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setEditTitle(blog.title);
    setEditContent(blog.content);
  };

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-700">Welcome, {username}</h1>

      {/* Blog Upload Form */}
      <form onSubmit={handleUpload} className="bg-white p-4 rounded-lg shadow-md mt-4">
        {error && <p className="text-red-500">{error}</p>}
        <input
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="mb-2" />
        <ReactQuill value={content} onChange={setContent} className="mb-2" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Publish
        </button>
      </form>

      <h2 className="mt-6 text-xl font-semibold">My Blogs</h2>

      <div className="mt-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-lg mt-2">
            {editingBlog && editingBlog._id === blog._id ? (
              <div className="w-full">
                {error && <p className="text-red-500">{error}</p>}
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="border p-2 w-full mb-2"
                />
                <input type="file" onChange={(e) => setEditImage(e.target.files[0])} className="mb-2" />
                <ReactQuill value={editContent} onChange={setEditContent} className="mb-2 blog-content ql-editor" />
                <button onClick={handleUpdate} className="bg-green-500 text-white p-2 w-full rounded">
                  <FaSave className="inline mr-2" />
                  Save Changes
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center space-x-4">
                  <img
                    src={`https://blog-app-1-4i8q.onrender.com${blog.image}`}
                    className="w-12 h-12 object-cover rounded-full"
                    alt="Blog"
                  />
                  <div>
                    <h3 className="font-bold">{blog.title}</h3>
                    <p className="text-gray-600 text-sm">{new Date(blog.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <div className="space-x-4">
                  <button onClick={() => handleEdit(blog)} className="text-blue-500">
                    <FaEdit size={18} />
                  </button>
                  <button onClick={() => handleDelete(blog._id)} className="text-red-500">
                    <FaTrash />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

