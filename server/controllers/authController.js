const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/Users");
const Consultant = require("../models/Consultants");
const cookie = require("cookie");

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
  sendTokenResponse(user, 200, res);
});

// @desc    Login User
// @route   POST /api/v1/auth/login
// @access  Public
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { alias, password } = req.body;

  // Validate data
  if (!alias || !password) {
    return next(new ErrorResponse("Please provide an alias and password", 400));
  }

  // check for user
  const user = await User.findOne({ alias }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 404));
  }

  // comapre password
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // sign Token and send

  sendTokenResponse(user, 200, res);
});

// @desc    Get current logged in user
// @route   POST /api/v1/auth/user/me
// @access  Private
exports.getCurrentUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Register Consultant
// @route   POST /api/v1/auth/consultant/register
// @access  Public
exports.registerConsultant = asyncHandler(async (req, res, next) => {
  const { name, email, password, title, description, shortInfo } = req.body;
  const data = {
    name,
    email,
    password,
    title,
    shortInfo,
  };

  if (description) {
    data.description = description;
  }
  const consultant = await Consultant.create(data);

  // sign Token and send
  sendTokenResponse(consultant, 200, res);
});

// @desc    Login Consultant
// @route   POST /api/v1/auth/consultant/login
// @access  Public
exports.loginConsultant = asyncHandler(async (req, res, next) => {
  const { password, email } = req.body;

  // Validate data
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  // check for user
  const consultant = await Consultant.findOne({ email }).select("+password");

  if (!consultant) {
    return next(new ErrorResponse("Invalid credentials", 400));
  }

  // comapre password
  const isMatch = await consultant.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // sign Token and send
  sendTokenResponse(consultant, 200, res);
});

// @desc    Get current logged in consultant
// @route   POST /api/v1/auth/consultant/me
// @access  Private
exports.getCurrentConsultant = asyncHandler(async (req, res, next) => {
  const consultant = await Consultant.findById(req.consultant.id);
  res.status(200).json({
    success: true,
    data: consultant,
  });
});

// get token from model,create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.signJWTandReturn();

  res.set(
    "Set-Cookie",
    cookie.serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400,
      path: "/",
    })
  );

  res.status(statusCode).json({
    success: true,
    token,
  });
};
