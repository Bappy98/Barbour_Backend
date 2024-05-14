const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const generateToken = require("../utils/generateToken");

const Registration = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const userExists = await User.findOne({ email });

  console.log("user exist", userExists);

  if (userExists) {
    res.status(202).send(new Error("user already exist"));
  }
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  try {
    const createUser = await user.save();
    res.json({
      message: "successfully registration",
      data: createUser,
    });
  } catch (error) {
    console.log(error);
  }
});

const Login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      message: "login success",
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(202).send(new Error("invalid user name or password"));
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const allUsers = await User.find({ userType: { $ne: "IsSuperAdmin" } });
    res.json({
      message: "successfully registration",
      data: allUsers,
    });
  } catch (error) {
    console.log(error);
  }
});
const findById = asyncHandler(
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  })
);

// Delete single user
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User deleted successfully" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});
// Update single user
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.email = req.body.email || user.email;
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

module.exports = {
  Login,
  Registration,
  getAllUsers,
  updateUser,
  deleteUser,
  findById,
};
