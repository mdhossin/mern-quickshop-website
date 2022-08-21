const Users = require("../models/userModels");
const { OAuth2Client } = require("google-auth-library");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const CustomErrorHandler = require("../services/CustomErrorHandler");
const {
  generateActiveToken,
  generateAccessToken,
  generateRefreshToken,
} = require("../config/generateToken");
const jwt = require("jsonwebtoken");
const sendEmail = require("../config/sendMail");

const client = new OAuth2Client(`${process.env.MAIL_CLIENT_ID}`);
const CLIENT_URL = `http://localhost:3000`;
// const CLIENT_URL = `https://mern-quickshop-app-ecommerce.herokuapp.com`;

const authCtrl = {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email });
      if (!user)
        return next(
          CustomErrorHandler.badRequest("This account does not exits.")
        );

      // if user exists
      loginUser(user, password, res, next);
    } catch (err) {
      return next(err);
    }
  },
  async logout(req, res, next) {
    if (!req.user)
      return next(CustomErrorHandler.badRequest("Invalid Authentication."));

    try {
      res.clearCookie("refreshtoken", { path: `/api/refresh_token` });

      await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          rf_token: "",
        }
      );

      return res.json({ message: "Logged out!" });
    } catch (err) {
      return next(err);
    }
  },
  async refreshToken(req, res, next) {
    try {
      const rf_token = req.cookies.refreshtoken;

      if (!rf_token)
        return next(CustomErrorHandler.badRequest("Please login now!"));

      const decoded = jwt.verify(
        rf_token,
        `${process.env.REFRESH_TOKEN_SECRET}`
      );
      if (!decoded.id)
        return next(CustomErrorHandler.badRequest("Please login now!"));

      const user = await Users.findById(decoded.id).select(
        "-password +rf_token"
      );
      if (!user)
        return next(
          CustomErrorHandler.badRequest("This email does not exist.")
        );

      if (rf_token !== user.rf_token)
        return next(CustomErrorHandler.badRequest("Please login now!"));

      const access_token = generateAccessToken({ id: user._id });
      const refresh_token = generateRefreshToken({ id: user._id }, res);

      await Users.findOneAndUpdate(
        { _id: user._id },
        {
          rf_token: refresh_token,
        }
      );

      res.json({ access_token, user });
    } catch (err) {
      return next(err);
    }
  },

  // get all users  admin  routes start here
  async getAllUser(req, res, next) {
    try {
      const users = await Users.find().select("-password");

      res.json(users);
    } catch (err) {
      return next(err);
    }
  },

  // user routes start here
  async updateUser(req, res, next) {
    try {
      const { name, avatar } = req.body;
      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          name,
          avatar,
        },
        {
          new: true,
        }
      );
      res.json({ message: "Update Success!" });
    } catch (err) {
      return next(err);
    }
  },
  // onley can admin do
  async updateUsersRole(req, res, next) {
    try {
      const { role } = req.body;

      await Users.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          role,
        },
        {
          new: true,
        }
      );
      res.json({ message: "Update Success!" });
    } catch (err) {
      return next(err);
    }
  },
  // onley can admin do
  async deleteUser(req, res, next) {
    try {
      await Users.findByIdAndDelete(req.params.id);
      res.json({
        message: "Deleted Successful!",
      });
    } catch (err) {
      return next(err);
    }
  },

  async resetPassword(req, res, next) {
    if (!req.user)
      return res.status(400).json({ message: "Invalid Authentication." });

    if (req.user.type !== "register")
      return res.status(400).json({
        message: `Quick login account with ${req.user.type} can't use this function.`,
      });
    try {
      const { password } = req.body;
      if (password < 6) {
        return next(
          CustomErrorHandler.badRequest(
            "Password must be at least 6 charactors long."
          )
        );
      }

      const passwordHash = await bcrypt.hash(password, 12);
      await Users.findOneAndUpdate(
        {
          _id: req.user.id,
        },
        {
          password: passwordHash,
        }
      );
      res.json({ message: "Password successfully changed!" });
    } catch (err) {
      return next(err);
    }
  },

  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;

      const user = await Users.findOne({ email });
      if (!user)
        return res
          .status(400)
          .json({ message: "This account does not exist." });

      if (user.type !== "register")
        return res.status(400).json({
          message: `Quick login account with ${user.type} can't use this function.`,
        });

      const access_token = generateAccessToken({ id: user._id });

      const url = `${CLIENT_URL}/user/reset/${access_token}`;

      if (validateEmail(email)) {
        sendEmail(email, url, "Forgot password?");
        return res.json({ message: "Success! Please check your email." });
      }
    } catch (err) {
      return next(err);
    }
  },

  async statsUserPerMonth(req, res, next) {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    let data;

    try {
      data = await Users.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
    } catch (err) {
      return next(err);
    }
    res.json(data);
  },
};

const loginUser = async (user, password, res) => {
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    let msgError =
      user?.type === "register"
        ? "Password is incorrect."
        : `Password is incorrect. This account login with ${user?.type}`;

    return res.status(400).json({ message: msgError });
  }

  const access_token = generateAccessToken({ id: user._id });
  const refresh_token = generateRefreshToken({ id: user._id }, res);

  await Users.findOneAndUpdate(
    { _id: user._id },
    {
      rf_token: refresh_token,
    }
  );

  res.json({
    message: "Login Success!",
    access_token,
    user: { ...user._doc, password: "" },
  });
};

module.exports = authCtrl;

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
