const cloudinary = require("cloudinary");
const fs = require("fs");
const CustomErrorHandler = require("../services/CustomErrorHandler");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadController = {
  async uploadAvatar(req, res, next) {
    // console.log(process.env.CLOUD_API_KEY);
    try {
      const file = req.files.file;

      cloudinary.v2.uploader.upload(
        file.tempFilePath,
        {
          folder: "quick-shop",
        },
        async (err, result) => {
          try {
            if (err) throw err;

            removeTmp(file.tempFilePath);

            res.json({
              url: result.secure_url,
              public_id: result.public_id,
              message: "Image upload successfull!",
            });
          } catch (err) {
            return next(err);
          }
        }
      );
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      const { public_id } = req.body;
      if (!public_id)
        return next(CustomErrorHandler.badRequest("No images Selected"));

      cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
        try {
          if (err) throw err;

          res.json({ message: "Deleted Image" });
        } catch (err) {
          return next(err);
        }
      });
    } catch (err) {
      return next(err);
    }
  },
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
module.exports = uploadController;
