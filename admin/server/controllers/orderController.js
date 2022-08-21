const sendMailPaymentSuccess = require("../config/sendMailPaymentSuccess");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const CustomErrorHandler = require("../services/CustomErrorHandler");
const orderController = {
  async newOrder(req, res, next) {
    try {
      const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      } = req.body;

      const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
      });

      res.status(201).json({
        success: true,
        order,
      });
    } catch (error) {
      return next(error);
    }
  },

  async getOrderById(req, res, next) {
    let order;
    try {
      order = await Order.findOne({ _id: req.params.id })
        .populate("user", "name email")
        .select("-updatedAt -__v");

      if (!order) {
        return next(
          CustomErrorHandler.badRequest("Order not found with this Id.")
        );
      }
    } catch (err) {
      return next(err);
    }

    res.json(order);
  },
  // get user all order
  async myOrders(req, res, next) {
    let orders;
    try {
      orders = await Order.find({ user: req.user._id })
        .select("-updatedAt -__v")
        .sort({ _id: -1 });
    } catch (err) {
      return next(err);
    }

    res.json(orders);
  },
  // get admin all orders
  async getAllOrders(req, res, next) {
    try {
      const orders = await Order.find();

      let totalAmount = 0;

      orders.forEach((order) => {
        totalAmount += order.totalPrice;
      });

      res.json({
        success: true,
        totalAmount,
        orders,
      });
    } catch (err) {
      return next(err);
    }
  },
  // admin can do that
  async updateOrder(req, res, next) {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(
          CustomErrorHandler.badRequest("Order not found with this Id,")
        );
      }

      if (order.orderStatus === "Delivered") {
        return next(
          CustomErrorHandler.badRequest("You have already delivered this order")
        );
      }

      if (req.body.status === "Shipped") {
        order?.orderItems?.forEach(async (o) => {
          await updateStock(o.product, o.quantity);
        });
      }
      order.orderStatus = req.body.status;

      if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
      }

      await order.save({ validateBeforeSave: false });
      res.status(200).json({
        success: true,
      });
    } catch (error) {
      return next(error);
    }
  },

  async deleteOrder(req, res, next) {
    try {
      try {
        await Order.findByIdAndDelete(req.params.id);
        res.json({ success: true });
      } catch (err) {
        return next(err);
      }
    } catch (err) {
      return next(err);
    }
  },

  async sendMailUserPaymentSuccess(req, res, next) {
    try {
      sendMailPaymentSuccess(req.body.email, "Payment successful.");

      res.status(200).json("Send message on success the payment.");
    } catch (error) {
      return next(error);
    }
  },

  // async deleteOrder(req, res, next){
  //   try {
  //     const order = await Order.findById(req.params.id);

  //     if (!order) {
  //       return next(
  //         CustomErrorHandler.badRequest("Order not found with this Id,")
  //       );
  //     }

  //     await order.remove();

  //     res.status(200).json({
  //       success: true,
  //     });

  //   } catch (error) {
  //     return next(error)

  //   }
  // }
  // search api
  // fetch  product name search api
};

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

module.exports = orderController;
