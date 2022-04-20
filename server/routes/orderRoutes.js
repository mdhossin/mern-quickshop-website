const orderController = require("../controllers/orderController");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");

router.post("/order/new", auth, orderController.newOrder);
router.get("/order/me", auth, orderController.myOrders);
router.get("/order/:id", auth, orderController.getOrderById);

// admin routes
router.get("/admin/orders", auth, authAdmin, orderController.getAllOrders);
router
  .route("/admin/order/:id")
  .put(auth, authAdmin, orderController.updateOrder)
  .delete(auth, authAdmin, orderController.deleteOrder);

module.exports = router;
