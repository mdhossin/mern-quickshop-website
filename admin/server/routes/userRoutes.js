const express = require("express");
const authCtrl = require("../controllers/authController");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");

const router = express.Router();

// update user
router.patch("/user/update", auth, authCtrl.updateUser);

// reset password
router.post("/user/reset", auth, authCtrl.resetPassword);

// forgot password route

router.post("/user/forgot_password", authCtrl.forgotPassword);

// // all user information route only admin can get
router.get("/admin/users", [auth, authAdmin], authCtrl.getAllUser);

// // update user role only admin
router.patch(
  "/admin/update_role/:id",
  auth,
  authAdmin,
  authCtrl.updateUsersRole
);

// // delete user only can admin
router.delete("/admin/delete/:id", [auth, authAdmin], authCtrl.deleteUser);

// get user stats per month route
router.get("/admin/stats", [auth, authAdmin], authCtrl.statsUserPerMonth);

module.exports = router;
