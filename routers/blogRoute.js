const express = require("express");
const router = express.Router();
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const { protect, IsSupperAdmin } = require("../middleware/auth");

// Route to handle creating a blog
router
  .route("/healthySpotlight/create")
  .post(protect, IsSupperAdmin, createBlog);

// Route to retrieve all blogs
router.route("/healthySpotlights").get(getAllBlogs);

// Routes to handle single blog by ID
router
  .route("/healthySpotlight/:id")
  .get(getBlogById)
  .put(protect, IsSupperAdmin, updateBlog)
  .delete(protect, IsSupperAdmin, deleteBlog);

module.exports = router;
