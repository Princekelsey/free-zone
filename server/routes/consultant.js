const express = require("express");
const {
  getAllConsultants,
  updateConsultantImage,
} = require("../controllers/consultant");
const { authorizeConsultant } = require("../middleware/authHandler");
const upload = require("../utils/multer").single("image");

const router = express.Router();

router.route("/").get(getAllConsultants);
router.route("/image").put(authorizeConsultant, upload, updateConsultantImage);

module.exports = router;
