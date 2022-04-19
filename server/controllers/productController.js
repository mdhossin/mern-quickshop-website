const Products = require("../models/productModel");
const CustomErrorHandler = require("../services/CustomErrorHandler");

const productController = {
  async createProduct(req, res, next) {
    try {
      const { name, description, Stock, price, isActive, images, ratings } =
        req.body;

      if (!images) {
        return next(CustomErrorHandler.badRequest("You must upload image."));
      }

      if (!description || !name) {
        return res
          .status(400)
          .json({ message: "You must enter description & name." });
      }

      if (!Stock) {
        return res.status(400).json({ message: "You must enter a stock." });
      }

      if (!price) {
        return res.status(400).json({ message: "You must enter a price." });
      }

      const product = new Products({
        name,
        description,
        Stock,
        price,
        isActive,
        images,
        ratings,
      });

      const savedProduct = await product.save();

      res.status(201).json({
        message: `Product has been added successfully!`,
        product: savedProduct,
      });
    } catch (error) {
      return next(error);
    }
  },
  async updateProducts(req, res, next) {
    try {
      const { name, description, Stock, price, isActive, images, ratings } =
        req.body;
      if (!images) {
        return next(CustomErrorHandler.badRequest("No image upload"));
      }

      await Products.findOneAndUpdate(
        { _id: req.params.id },
        {
          name,
          description,
          Stock,
          price,
          isActive,
          images,
          ratings,
        },
        { new: true }
      );

      res.status(200).json({ message: "Updated a Product" });
    } catch (err) {
      return next(err);
    }
  },
  async deleteProducts(req, res, next) {
    try {
      try {
        await Products.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Deleted a Product" });
      } catch (err) {
        return next(err);
      }
    } catch (err) {
      return next(err);
    }
  },
  async getByIdProduct(req, res, next) {
    let product;
    try {
      product = await Products.findOne({ _id: req.params.id }).select(
        "-updatedAt -__v"
      );
    } catch (err) {
      return next(err);
    }

    res.status(200).json(product);
  },
  async getAllProducts(req, res, next) {
    let products;
    try {
      products = await Products.find()
        .select("-updatedAt -__v")
        .sort({ _id: -1 });
    } catch (err) {
      return next(err);
    }

    res.status(200).json(products);
  },
};

module.exports = productController;
