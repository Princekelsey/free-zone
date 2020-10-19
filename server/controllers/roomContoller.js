const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");
const Room = require("../models/Room");
const User = require("../models/Users");

// @desc    Create room
// @route   POST /api/v1/room
// @access  Private
exports.createChatRoom = asyncHandler(async (req, res, next) => {
  req.body.author = req.user.id;

  const room = await Room.create(req.body);

  res.status(201).json({
    success: true,
    data: room,
  });
});

// @desc    Get all chatrooms
// @route   GET /api/v1/room
// @access  Public
exports.getAllChatRoom = asyncHandler(async (req, res, next) => {
  const room = await Room.find().populate({
    path: "author",
    select: "alias id",
  });

  res.status(200).json({
    success: true,
    data: room,
  });
});

// @desc    Get single chatroom
// @route   GET /api/v1/room/:id
// @access  Public
exports.getSingleChatRoom = asyncHandler(async (req, res, next) => {
  const room = await Room.findById(req.params.id).populate({
    path: "author",
    select: "alias id",
  });

  if (!room) {
    return next(
      new ErrorResponse(`No chat room with the ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: room,
  });
});

// @desc    Get chatrooms by authorId
// @route   GET /api/v1/room/author/:id
// @access  Public
exports.getAuthorChatRoom = asyncHandler(async (req, res, next) => {
  const room = await Room.find({ author: req.params.id }).populate({
    path: "author",
    select: "alias id",
  });

  if (!room) {
    return next(
      new ErrorResponse(`No chat room with the ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: room,
  });
});

// @desc    Join chatrooms
// @route   GET /api/v1/room/join
// @access  Public
exports.joinChatRoom = asyncHandler(async (req, res, next) => {
  const { roomId, userId } = req.body;
  // Validate data
  if (!roomId || !userId) {
    return next(new ErrorResponse("Please provide roomId and userId", 400));
  }
  const room = await Room.findById(roomId).populate({
    path: "author",
    select: "alias id",
  });

  const user = await User.findById(userId);

  if (!room) {
    return next(new ErrorResponse(`No chat room with the ${roomId}`, 404));
  }

  if (!user) {
    return next(new ErrorResponse(`No user with the ${userId}`, 404));
  }

  const updatedRoom = await Room.findByIdAndUpdate(
    { _id: roomId },
    {
      $push: { members: { alias: user.alias, userId: userId } },
    },
    { new: true }
  ).populate({ path: "author", select: "alias id" });

  if (!updatedRoom) {
    return next(new ErrorResponse(`Error joining room, try again `, 404));
  }

  res.status(200).json({
    success: true,
    data: updatedRoom,
  });
});
