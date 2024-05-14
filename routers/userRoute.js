const express = require("express");
const {
  Registration,
  Login,
  getAllUsers,
  findById,
  updateUser,
  deleteUser,
} = require("../controllers/auth");
const { protect } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(Registration);
router.route("/login").post(Login);
router.route("/users").get(protect, getAllUsers);
router
  .route("/user/:id")
  .get(protect, findById)
  .put(protect, updateUser)
  .delete(protect, deleteUser);

module.exports = router;
