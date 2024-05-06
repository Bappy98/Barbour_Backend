const express = require("express");
const { Registration, Login, getAllUsers } = require("../controllers/auth");
const { protect, IsSupperAdmin } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(Registration);
router.route("/login").post(Login);
router.route("/getAllUser").get(getAllUsers);

module.exports = router;
