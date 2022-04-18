import express from "express";
import authController from "../controllers/authController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

// register route
router.post("/register", authController.register);

// verify and active account route
router.post("/active", authController.activeAccount);

// login route

router.post("/login", authController.login);

// logout route must be authenticated

router.get("/logout", auth, authController.logout);

// refresh token route

router.get("/refresh_token", authController.refreshToken);

// google login route
router.post("/google_login", authController.googleLogin);

export default router;
