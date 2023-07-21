const express  = require( "express")
const {getAllBlogs, getBlog, addBlog, updateBlog, deleteBlog} = require("../controllers/blog-controller")
const blogRouter = express.Router()


blogRouter.get("/",getAllBlogs)
blogRouter.get("/:id",getBlog)

blogRouter.post("/add",addBlog)

blogRouter.put("/update/:id",updateBlog)

blogRouter.delete("/delete/:id",deleteBlog)


module.exports = blogRouter