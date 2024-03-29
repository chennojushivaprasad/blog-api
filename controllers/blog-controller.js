const mongoose= require("mongoose");
const Blog = require( "../model/blogs");
const User = require ("../model/user");

// Blog is a collection


 const getBlog = async (req, res, next) => {
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(blogId); //  sqlite select * from Blog
  } catch (error) {
    console.log(error);
  }
  if (blog) {
    return res.status(200).send(blog);
  }

  console.log("blog item")
  return res.status(400).json("no data found");
};

 const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find(); //  sqlite select * from Blog
  } catch (error) {
    console.log(error);
  }
  if (blogs) {
    return res.status(200).send(blogs);
  }

  return res.status(400).json("no data found");
};

 const addBlog = async (req, res, next) => {
  const { title, imgUrl, description, user } = req.body;

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (error) {
   return  console.log(error);
  }

  if (!existingUser) {
    return res.status(400).json({ message: "unable to find user by this id" });
  }

  const blog = new Blog({
    title,
    imgUrl,
    description,
    publishedDate: new Date(),
    user,
  });

  try {
    const session = await mongoose.startSession()
    session.startTransaction()
    await blog.save({session})
    existingUser.blogs.push(blog)
    await existingUser.save({session})
    await session.commitTransaction()
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "failed to insert data" });
  }

  return res.status(201).json({ message: "blog added successfully" });
};

 const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
  const blogId = req.params.id;

  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "unable to update blog" });
  }

  return res.status(201).json({ blog });
};

const deleteBlog = async (req, res, next) => {
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndRemove(blogId).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save()
  } catch (error) {
    console.log(error);
  }

  if (!blog) {
    return res.status(500).json({ message: "unable to delete" });
  }
  return res.status(200).json({ message: "deleted succesfully" });
};


module.exports.getBlog = getBlog;
module.exports.getAllBlogs = getAllBlogs;
module.exports.addBlog = addBlog;
module.exports.updateBlog = updateBlog;
module.exports.deleteBlog = deleteBlog;
