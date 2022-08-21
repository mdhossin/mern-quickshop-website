// here extends the inbuild javascript class Error thake
class CustomErrorHandler extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static alreadyExist(message) {
    return new CustomErrorHandler(409, message);
  }
  static badRequest(message) {
    return new CustomErrorHandler(400, message);
  }

  static unAuthorized(message = "unAuthorized") {
    return new CustomErrorHandler(401, message);
  }

  static notFound(message = "404 not found") {
    return new CustomErrorHandler(404, message);
  }

  static serverError(
    message = "Your request could not be processed. Please try again."
  ) {
    return new CustomErrorHandler(500, message);
  }
}

module.exports = CustomErrorHandler;
