const express = require("express");
const {
  createChatRoom,
  getAllChatRoom,
  getSingleChatRoom,
  getAuthorChatRoom,
  joinChatRoom,
  deleteChatRoom,
  sendMessage,
} = require("../controllers/roomContoller");
const { authorizeUser } = require("../middleware/authHandler");

const router = express.Router();

router.route("/").get(getAllChatRoom).post(authorizeUser, createChatRoom);
router
  .route("/:id")
  .get(getSingleChatRoom)
  .delete(authorizeUser, deleteChatRoom);
router.route("/author/:id").get(getAuthorChatRoom);
router.route("/join").post(joinChatRoom);
router.route("/:id/message").post(authorizeUser, sendMessage);

module.exports = router;
