const express = require("express");
const uploadController = require("../controllers/uploadController");
const auth = require("../middlewares/auth");
const uploadImage = require("../middlewares/uploadImage");

const router = express.Router();
// upload image  middleware for user
router.post(
  "/upload_image",
  [auth, uploadImage],
  uploadController.uploadAvatar
);

// delete image
router.post("/destroy", auth, uploadController.destroy);

module.exports = router;
