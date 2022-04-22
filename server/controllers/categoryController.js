const Category = require("../models/categoryModel");
const Products = require("../models/productModel");
const CustomErrorHandler = require("../services/CustomErrorHandler");
const categoryController = {
  async getCategories(req, res, next) {
    try {
      const categories = await Category.find();

      res.json(categories);
    } catch (err) {
      return next(err);
    }
  },

  async createCategory(req, res, next) {
    // if user have role = 1  --  mean admin

    // only admin can create, delete and update category

    const { name } = req.body;
    try {
      if (!name) {
        return next(CustomErrorHandler.badRequest("Please add a Category."));
      }
      const category = await Category.findOne({ name });
      if (category) {
        return next(
          CustomErrorHandler.alreadyExist("This category already exists.")
        );
      }
      const newCategory = new Category({
        name,
      });

      await newCategory.save();

      res.json({
        message: "Created a category.",
      });
    } catch (error) {
      return next(error);
    }
  },

  async deleteCategory(req, res, next) {
    try {
      const products = await Products.findOne({ category: req.params.id });

      if (products)
        return res.status(400).json({
          message: "Please delete all products with a relationship.",
        });

      await Category.findByIdAndDelete(req.params.id);

      res.json({
        message: "Deleted a category",
      });
    } catch (err) {
      return next(err);
    }
  },

  async updateCategory(req, res, next) {
    try {
      const { name } = req.body;
      await Category.findByIdAndUpdate(
        {
          _id: req.params.id,
        },
        { name },
        { new: true }
      );

      res.json({
        message: "Updated a category.",
      });
    } catch (err) {
      return next(err);
    }
  },
};

module.exports = categoryController;
