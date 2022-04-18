import Users from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import CustomErrorHandler from "../services/CustomErrorHandler.js";

const auth = async (req, res, next) => {
  console.log(process.env.ACCESS_TOKEN_SECRET, "auth");
  try {
    const token = req.header("Authorization");
    console.log(token, "token");

    if (!token) {
      return next(CustomErrorHandler.unAuthorized());
    }

    const decoded = jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);
    if (!decoded) {
      return next(CustomErrorHandler.unAuthorized());
    }

    const user = await Users.findOne({ _id: decoded.id }).select("-password");

    if (!user) {
      return next(CustomErrorHandler.badRequest("User does not exist."));
    }

    req.user = user;

    next();
  } catch (err) {
    return next(err);
  }
};

export default auth;
