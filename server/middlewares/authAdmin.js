import Users from "../models/userModel.js";
import CustomErrorHandler from "../services/CustomErrorHandler.js";
const authAdmin = async (req, res, next) => {
  console.log(req.user, "auth admin");
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

export default authAdmin;
