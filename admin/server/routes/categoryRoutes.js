const router = require("express").Router();
const {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoryController");

const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");

// get and create category route here category is the route route
router
  .route("/category")
  .get(getCategories)
  .post(auth, authAdmin, createCategory);

// delete and update route here have

router
  .route("/category/:id")
  .delete(auth, authAdmin, deleteCategory)
  .put(auth, authAdmin, updateCategory);

module.exports = router;
