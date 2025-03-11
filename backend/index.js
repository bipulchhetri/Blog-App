// const express= require("express")
// const mongoose= require("mongoose")
// const cors= require("cors")
// const bcrypt= require("bcryptjs")
// const jwt= require("jsonwebtoken")
// const path=require("path")
// const fs=require("fs")
// const multer= require("multer")
// const app=express()


// app.use(express.json())
// app.use(cors())
// app.use("/uploads",express.static("uploads")) //it is used to upload image from local to server

// // const mongoose = require('mongoose');

// mongoose.connect("mongodb+srv://bipul:12345@englishblog.gwipu.mongodb.net/", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => console.log("MongoDB connected successfully!"))
// .catch(err => console.error("MongoDB connection error:", err));


// const uploadDir=path.join(__dirname,"uploads")
// if(!fs.existsSync(uploadDir)){
//     fs.mkdirSync(uploadDir)
// }

// const storage= multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,"uploads/");
//     },
//     filename:(req,file,cb)=>{
//         cb(null,Date.now() + path.extname(file.originalname))
//     }
// })

// const upload= multer({storage})

// const UserSchema= new mongoose.Schema({
//     username:String,
//     email:String,
//     password:String
// })
// const User=mongoose.model("User",UserSchema)

// const BlogSchema= new mongoose.Schema({
//     title:String,
//     content:String,
//     image:String,
//     author:String,
//     createdAt:{type:Date,default:Date.now},
//     likes:{type:Number,default:0},
//     comments:[{text:String}]
// })

// const Blog= mongoose.model("Blog",BlogSchema)

// app.use("upload",express.static("upload"))
// app.post("/upload",upload.single("image"),async(req,res) =>{
//     const {title,content,author}=req.body;
//     const image=req.file ? `/uploads/${req.file.filename}` : "";
//     const newBlog= new Blog({title,content,image,author});
//     await newBlog.save();
//     res.json({message:"Blog Created"})
// })

// app.post("/register",async(req,res) =>{
//     const {username,email,password}=req.body;
//     const hashedPassword= await bcrypt.hash(password,10)
//     try{
//         const newUser= new User({username,email,password:hashedPassword})
//         await newUser.save()
//         res.json({message:"user Registered"})
//     }catch(error){
//         res.json({message:"user not Registered"})
//     }
// })

// app.post("/login",async(req,res)=>{
//     const{email,password}=req.body;
//     const user= await User.findOne({email})

//     if(!user || !(await bcrypt.compare(password,user.password))){
//         return res.status(400).json({message:"Invalid Credentials"})
//     }
//     const token= jwt.sign({id:user._id,username:user.username},"SECRET",{expiresIn:"1h"})
//     res.json({token,username:user.username})
// })

// app.get("/blogs/:author",async(req,res) =>{
//     const blogs= await Blog.find({author:req.params.author})
//     res.json(blogs)
// })
// app.put("/blogs/:id",upload.single("image"),async(req,res) =>{
//     const {title,content} =req.body;
//     let updateData={title,content}

//     if(req.file){
//         updateData.image=`/uploads/${req.file.filename}`

//     }

//     await Blog.findByIdAndUpdate(req.params.id,updateData)
//     res.json({message:"Blog Updated"})
// })

// app.delete("/blogs/:id",async(req,res) =>{
//     const blog= await Blog.findById(req.params.id)

//     if(blog.image){
//         const imagePath= path.join(__dirname,blog.image)
//         if(fs.existsSync(imagePath)){
//             fs.unlinkSync(imagePath)
//         }
//     }

//     await Blog.findByIdAndDelete(req.params.id)
//     res.json({message:"Blog Deleted"})
// })

// app.get("/blogs",async(req,res) =>{
//     const blogs= await Blog.find().sort({createdAt:-1});
//     res.json(blogs)
// })
// app.get("/blog/:id",async(req,res) =>{
//     try{
//         const blog= await Blog.findById(req.params.id)
//         if(!blog){
//             return res.status(404).json({message:"Blog not found"})
//         }

//         blog.image=`http://localhost:3000${blog.image}`;
//         res.json(blog)
//     }catch(error){
//         res.status(500).json({message:"Internal Server Error"})
//     }
// })

// app.post("/blogs/:id/like",async(req,res) =>{
//     await Blog.findByIdAndUpdate(req.params.id,{$inc:{likes:1}});
//     res.sendStatus(200)
// })

// app.post("/blogs/:id/comment",async(req,res)=>{
//     await Blog.findByIdAndUpdate(req.params.id,{$push:{comments:req.body}})
//     res.sendStatus(200)
// })

// app.get("/latest-blog",async(req,res) =>{
//     try{
//         const threeDaysAgo= new Date();
//         threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

//         const latestBlogs= await Blog.find({createdAt:{$gte:threeDaysAgo}})
//         .sort({createdAt: -1})
//         res.json(latestBlogs)
//     }catch(error){
//         res.status(500).json({message:"Internal Server Error"})
//     }
// })

// app.get("/all-blogs",async(req,res) =>{
//     try{
//         const blogs= await Blog.find().sort({createdAt: -1})
//         res.json(blogs)
//     }catch(error){
//         res.status(500).json({message:"Internal Server Error"})
//     }
// })
// app.listen(3000,() => console.log("Server Start"))

const express= require("express")
const mongoose= require("mongoose")
const cors= require("cors")
const bcrypt= require("bcryptjs")
const jwt= require("jsonwebtoken")
const path=require("path")
const fs=require("fs")
const multer= require("multer")
const app=express()
app.use(express.json())
app.use(cors())

app.use("/uploads",express.static("uploads"))

mongoose.connect("mongodb+srv://bipul:12345@englishblog.gwipu.mongodb.net/", {
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const uploadDir=path.join(__dirname,"uploads")
if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir)
}

const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/");
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now() + path.extname(file.originalname))
    }
})

const upload= multer({storage})

const UserSchema= new mongoose.Schema({
    username:String,
    email:String,
    password:String
})
const User=mongoose.model("User",UserSchema)

const BlogSchema= new mongoose.Schema({
    title:String,
    content:String,
    image:String,
    author:String,
    createdAt:{type:Date,default:Date.now},
    likes:{type:Number,default:0},
    comments:[{text:String}]
})

const Blog= mongoose.model("Blog",BlogSchema)

app.use("upload",express.static("upload"))
app.post("/upload",upload.single("image"),async(req,res) =>{
    const {title,content,author}=req.body;
    const image=req.file ? `/uploads/${req.file.filename}` : "";
    const newBlog= new Blog({title,content,image,author});
    await newBlog.save();
    res.json({message:"Blog Created"})
})





app.post("/register",async(req,res) =>{
    const {username,email,password}=req.body;
    const hashedPassword= await bcrypt.hash(password,10)
    try{
        const newUser= new User({username,email,password:hashedPassword})
        await newUser.save()
        res.json({message:"user Registered"})
    }catch(error){
        res.json({message:"user not Registered"})
    }
})

app.post("/login",async(req,res)=>{
    const{email,password}=req.body;
    const user= await User.findOne({email})

    if(!user || !(await bcrypt.compare(password,user.password))){
        return res.status(400).json({message:"Invalid Credentials"})
    }
    const token= jwt.sign({id:user._id,username:user.username},"SECRET",{expiresIn:"1h"})
    res.json({token,username:user.username})
})

app.get("/blogs/:author",async(req,res) =>{
    const blogs= await Blog.find({author:req.params.author})
    res.json(blogs)
})
app.put("/blogs/:id",upload.single("image"),async(req,res) =>{
    const {title,content} =req.body;
    let updateData={title,content}

    if(req.file){
        updateData.image=`/uploads/${req.file.filename}`

    }

    await Blog.findByIdAndUpdate(req.params.id,updateData)
    res.json({message:"Blog Updated"})
})

app.delete("/blogs/:id",async(req,res) =>{
    const blog= await Blog.findById(req.params.id)

    if(blog.image){
        const imagePath= path.join(__dirname,blog.image)
        if(fs.existsSync(imagePath)){
            fs.unlinkSync(imagePath)
        }
    }

    await Blog.findByIdAndDelete(req.params.id)
    res.json({message:"Blog Deleted"})
})

app.get("/blogs",async(req,res) =>{
    const blogs= await Blog.find().sort({createdAt:-1});
    res.json(blogs)
})
app.get("/blog/:id",async(req,res) =>{
    try{
        const blog= await Blog.findById(req.params.id)
        if(!blog){
            return res.status(404).json({message:"Blog not found"})
        }

        blog.image=`http://localhost:3000${blog.image}`;
        res.json(blog)
    }catch(error){
        res.status(500).json({message:"Internal Server Error"})
    }
})

app.post("/blogs/:id/like",async(req,res) =>{
    await Blog.findByIdAndUpdate(req.params.id,{$inc:{likes:1}});
    res.sendStatus(200)
})

app.post("/blogs/:id/comment",async(req,res)=>{
    await Blog.findByIdAndUpdate(req.params.id,{$push:{comments:req.body}})
    res.sendStatus(200)
})

app.get("/latest-blog",async(req,res) =>{
    try{
        const threeDaysAgo= new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

        const latestBlogs= await Blog.find({createdAt:{$gte:threeDaysAgo}})
        .sort({createdAt: -1})
        res.json(latestBlogs)
    }catch(error){
        res.status(500).json({message:"Internal Server Error"})
    }
})

app.get("/all-blogs",async(req,res) =>{
    try{
        const blogs= await Blog.find().sort({createdAt: -1})
        res.json(blogs)
    }catch(error){
        res.status(500).json({message:"Internal Server Error"})
    }
})
app.listen(3000,() => console.log("Server Start"))