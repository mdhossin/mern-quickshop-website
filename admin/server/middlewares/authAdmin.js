const Users = require("../models/userModels");
const CustomErrorHandler = require("../services/CustomErrorHandler");
const authAdmin = async (req, res, next) => {
  try {
    const user = await Users.findOne({ _id: req.user.id });
    if (user.role === 1) {
      next();
    } else {
      return next(
        CustomErrorHandler.unAuthorized("Admin resources access denied.")
      );
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = authAdmin;
