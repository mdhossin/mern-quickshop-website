const express = require("express");
const sendMessageController = require("../controllers/sendMessageController");
const router = express.Router();

router.post("/message", sendMessageController.sendMessage);

module.exports = router;
