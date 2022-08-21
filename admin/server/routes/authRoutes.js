const express = require("express");
const authCtrl = require("../controllers/authController");
const auth = require("../middlewares/auth");

const router = express.Router();

// login route

router.post("/login", authCtrl.login);

// logout route must be authenticated

router.get("/logout", auth, authCtrl.logout);

// refresh token route

router.get("/refresh_token", authCtrl.refreshToken);

module.exports = router;
