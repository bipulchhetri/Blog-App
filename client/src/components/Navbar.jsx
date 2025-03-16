import React, { useState } from "react";
import { Link } from "react-router-dom";
// import Register from "../pages/Register";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full h-16 md:h-20 bg-white shadow-md flex items-center justify-between px-6">
      {/* Logo */}
      <div className="text-2xl font-bold uppercase">
        <Link to="/">Englis<span className="bg-orange-400 p-2">ify</span></Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 text-lg">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        {/* <Link to="/about" className="hover:text-blue-600">About</Link> */}
        <Link to="/blogs" className="hover:text-blue-600">Blogs</Link>
        <Link to="/contact" className="hover:text-blue-600">Contact</Link>
        <Link to='/login' onClick={()=>setOpen(false)} >Login</Link>
        <Link to='/register' onClick={()=>setOpen(false)} >Register</Link>
        {/* <Link to='/dashboard' onClick={()=>setOpen(false)} >Dashboard</Link> */}



      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden cursor-pointer" onClick={() => setOpen(!open)}>
        <div className="w-6 h-1 bg-black mb-1"></div>
        <div className="w-6 h-1 bg-black mb-1"></div>
        <div className="w-6 h-1 bg-black"></div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-16 left-0 w-full bg-gray-100 text-center flex flex-col items-center py-4 gap-4 transition-all duration-300 ${
          open ? "block" : "hidden"
        }`}
      >
        <Link to="/" onClick={() => setOpen(false)}>Home</Link>
        {/* <Link to="/about" onClick={() => setOpen(false)}>About</Link> */}
        <Link to="/blogs" onClick={() => setOpen(false)}>Blogs</Link>
        <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
        <Link to='/login' onClick={()=>setOpen(false)} >Login</Link>
        <Link to='/register' onClick={()=>setOpen(false)} >Register</Link>
        {/* <Link to='/dashboard' onClick={()=>setOpen(false)} >Register</Link> */}


      </div>
    </nav>
  );
};

export default Navbar;
