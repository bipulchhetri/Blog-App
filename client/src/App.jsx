import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Blogs from "./components/Blogs";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


      </Routes>
    </Router>
    </>
  );
}

export default App;
