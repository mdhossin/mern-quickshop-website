import express from "express";
import authController from "../controllers/authController.js";
import auth from "../middlewares/auth.js";
import authAdmin from "../middlewares/authAdmin.js";
const router = express.Router();

// update user
router.patch("/user/update", auth, authController.updateUser);

// reset password
router.post("/user/reset", auth, authController.resetPassword);

// forgot password route

router.post("/user/forgot_password", authController.forgotPassword);

// all user information route only admin can get
router.get("/admin/users", auth, authAdmin, authController.getAllUser);

// update user role only admin
router.patch(
  "/admin/update_role/:id",
  auth,
  authAdmin,
  authController.updateUsersRole
);

// delete user only can admin
router.delete("/delete/:id", auth, authAdmin, authController.deleteUser);

export default router;
