const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/Users");

// @desc    Register User
// @route   POST /api/v1/auth/register
// @access  Public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { alias, password, role } = req.body;
  const user = await User.create({
    alias,
    password,
    role,
  });

  // sign Token and send

  const token = user.signJWTandReturn();

  res.status(200).json({ success: true, token });
});

// @desc    Login User
// @route   POST /api/v1/auth/login
// @access  Public
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { alias, password } = req.body;

  // Validate data
  if (!alias || !password) {
    return next(new ErrorResponse("Please provide alias and password", 400));
  }

  // check for user
  const user = await User.findOne({ alias }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // comapre password
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // sign Token and send

  const token = user.signJWTandReturn();

  res.status(200).json({ success: true, token });
});
