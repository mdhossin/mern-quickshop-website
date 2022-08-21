const fs = require("node:fs/promises");
const CustomErrorHandler = require("../services/CustomErrorHandler");

module.exports = async function (req, res, next) {
  // console.log(req.files);
  try {
    if (!req.files || Object.keys(req.files).length === 0)
      return next(CustomErrorHandler.badRequest("No files were uploaded."));

    const file = req.files.file;

    if (file.size > 1024 * 1024) {
      removeTmp(file.tempFilePath);
      return next(CustomErrorHandler.badRequest("Size too large."));
    } // 1mb max

    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      removeTmp(file.tempFilePath);

      return next(CustomErrorHandler.badRequest("File format is incorrect."));
    }

    next();
  } catch (err) {
    return next(err);
  }
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
