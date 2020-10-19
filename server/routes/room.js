const express = require("express");
const {
  createChatRoom,
  getAllChatRoom,
  getSingleChatRoom,
  getAuthorChatRoom,
  joinChatRoom,
} = require("../controllers/roomContoller");
const { authorizeUser } = require("../middleware/authHandler");

const router = express.Router();

router.route("/").get(getAllChatRoom).post(authorizeUser, createChatRoom);
router.route("/:id").get(getSingleChatRoom);
router.route("/author/:id").get(getAuthorChatRoom);
router.route("/join").post(joinChatRoom);

module.exports = router;
