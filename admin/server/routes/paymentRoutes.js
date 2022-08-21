const express = require("express");
const paymentConroller = require("../controllers/paymentController");
const auth = require("../middlewares/auth");

const router = express.Router();

// router.route("/payment/process").post(auth, paymentConroller.processPayment);
router.post("/payment/process", auth, paymentConroller.processPayment);

module.exports = router;
