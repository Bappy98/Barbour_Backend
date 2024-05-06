const asyncHandler = require("express-async-handler");
const Blog = require("../model/healthySpotlight");

// Create a new blog post
const createBlog = asyncHandler(async (req, res) => {
  try {
    const newBlog = new Blog({
      creator: req.body.creator,
      title: req.body.title,
      details: req.body.details,
      image: req.body.image,
      status: req.body.status,
    });

    const savedBlog = await newBlog.save();
    res.status(201).json({
      message: "Blog created successfully",
      data: savedBlog,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create blog", error: error.message });
  }
});

// Get all blog posts
const getAllBlogs = asyncHandler(async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.json({
      message: "Successfully retrieved all healthy Spotlight",
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving healthy Spotlight",
      error: error.message,
    });
  }
});

// Get single blog post by ID
const getBlogById = asyncHandler(async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404).json({ message: "healthy Spotlight not found" });
    } else {
      res.json(blog);
    }
  } catch (error) {
    res.status(500).json({
      message: "Error finding healthy Spotlight",
      error: error.message,
    });
  }
});

// Update single blog post
const updateBlog = asyncHandler(async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404).json({ message: "healthy Spotlight not found" });
      return;
    }

    blog.title = req.body.title || blog.title;
    blog.details = req.body.details || blog.details;
    blog.image = req.body.image || blog.image;
    blog.status = req.body.status || blog.status;

    const updatedBlog = await blog.save();
    res.json({
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to update blog", error: error.message });
  }
});

// Delete single blog post
const deleteBlog = asyncHandler(async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete blog", error: error.message });
  }
});

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
