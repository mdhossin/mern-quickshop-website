const express = require("express");
const productController = require("../controllers/productController");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");

const router = express.Router();
// must be authenticated and admin

router
  .route("/products")
  .get(productController.getAllProducts)

  .post([auth, authAdmin], productController.createProduct);

router
  .route("/products/:id")
  .get(productController.getByIdProduct)
  .delete([auth, authAdmin], productController.deleteProducts)
  .put([auth, authAdmin], productController.updateProducts);

module.exports = router;
