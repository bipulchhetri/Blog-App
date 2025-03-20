import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios
      .get(`https://blog-app-1-4i8q.onrender.com/blog/${id}`)
      .then((res) => setBlog(res.data))
      .catch((err) => console.error("Error fetching blog:", err));
  }, [id]);

  if (!blog) {
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;
  }

  // ✅ Ensure content is wrapped properly in <p> tags for each paragraph
  const formatContent = (content) => {
    if (!content) return "";
    return content
      .split(/\n+/) // Split content by new lines
      .map((line) => `<p>${line.trim()}</p>`) // Wrap each in <p>
      .join(""); // Join all paragraphs
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-md">
        {/* ✅ Image rendering fix */}
        <img
          src={`https://blog-app-1-4i8q.onrender.com${blog.image}`}
          className="w-full h-80 object-cover rounded-lg"
          alt="Blog"
        />

        <h1 className="text-4xl font-bold text-gray-900 mt-6">{blog.title}</h1>
        <p className="text-gray-600 mt-2">
          <span className="font-medium">{blog.author}</span> -{" "}
          {new Date(blog.createdAt).toLocaleString()}
        </p>

        {/* ✅ Fix for new line issue in blog content */}
        <div
          className="text-gray-700 text-lg mt-4 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(formatContent(blog.content)) }}
        />
      </div>
    </div>
  );
};

export default BlogDetail;
