const orderController = require("../controllers/orderController");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");
const express = require("express");

const router = express.Router();

router.post("/order/new", auth, orderController.newOrder);
router.get("/order/me", auth, orderController.myOrders);
router.get("/order/:id", auth, orderController.getOrderById);

// admin routes
router.get("/admin/orders", auth, authAdmin, orderController.getAllOrders);
router
  .route("/admin/order/:id")
  .put(auth, authAdmin, orderController.updateOrder)
  .delete(auth, authAdmin, orderController.deleteOrder);

// when the payment is success send the email on user
router.post("/user/success", auth, orderController.sendMailUserPaymentSuccess);

module.exports = router;
