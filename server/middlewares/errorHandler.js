import Joi from "joi";
import CustomErrorHandler from "../services/CustomErrorHandler.js";

const { ValidationError } = Joi;

// error handeling middleware
const errorHandler = (err, req, res, next) => {
  let statusCode = 500;

  let data = {
    ...err,
    message: "Your request could not be processed. Please try again.",
    ...(process.env.DEBUG_MODE === "true" && { originalError: err.message }),
  };

  if (err.code === 11000) {
    statusCode = 400;
    data = {
      message: err.message,
    };
  }
  // from joi
  if (err instanceof ValidationError) {
    // 422 mean validation error code
    statusCode = 422;
    data = {
      message: err.message,
    };
  }

  //  from custom err handeler
  if (err instanceof CustomErrorHandler) {
    statusCode = err.status;
    data = {
      message: err.message,
    };
  }

  return res.status(statusCode).json(data);
};

export default errorHandler;
