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
  async register(req, res, next) {
    //  create schema useing joi for validation

    const registerSchema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      repeat_password: Joi.ref("password"),
    });

    const { error } = registerSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    // check if user is in the database already
    try {
      // here useing the user model
      const exist = await Users.exists({ email: req.body.email });

      if (exist) {
        // here need to custom error send to the client side
        return next(
          CustomErrorHandler.alreadyExist("This email is already taken")
        );
      }
    } catch (err) {
      return next(err);
    }

    try {
      // destructuring object
      const { name, email, password } = req.body;

      if (password?.length < 6) {
        return next(
          CustomErrorHandler.badRequest(
            "Password must be at least 6 charactor."
          )
        );
      }
      // hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // prepare the model to store user data on databse
      const newUser = { name, email, password: hashedPassword };

      const active_token = generateActiveToken({ newUser });

      const url = `${CLIENT_URL}/active/${active_token}`;

      if (validateEmail(email)) {
        sendEmail(email, url, "Verify your email address");
        return res.json({
          message: "Success! Please check your email and verify.",
        });
      }
    } catch (err) {
      return next(err);
    }
  },
  async activeAccount(req, res, next) {
    try {
      const { activation_token } = req.body;
      const decoded = jwt.verify(
        activation_token,
        `${process.env.ACTIVE_TOKEN_SECRET}`
      );
      const { newUser } = decoded;

      if (!newUser)
        return next(CustomErrorHandler.badRequest("Invalid authentication."));

      const user = await Users.findOne({ email: newUser.email });
      if (user)
        return next(CustomErrorHandler.alreadyExist("Account already exists."));

      const new_user = new Users(newUser);

      await new_user.save();

      res.json({ message: "Account has been activated!" });
    } catch (err) {
      return next(err);
    }
  },
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
  async googleLogin(req, res, next) {
    try {
      const { Authorization } = req.body.headers;
      const verify = await client.verifyIdToken({
        idToken: Authorization,
        audience: `${process.env.MAIL_CLIENT_ID}`,
      });

      const { email, email_verified, name, picture } = verify.getPayload();

      if (!email_verified)
        return res.status(500).json({ message: "Email verification failed." });

      const password = email + process.env.GOOGLE_SECRET;
      const passwordHash = await bcrypt.hash(password, 12);

      const user = await Users.findOne({ email });

      if (user) {
        loginUser(user, password, res);
      } else {
        const user = {
          name,
          email,
          password: passwordHash,
          avatar: picture,
          type: "google",
        };
        registerUser(user, res);
      }
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

const registerUser = async (user, res) => {
  const newUser = new Users(user);

  const access_token = generateAccessToken({ id: newUser._id });
  const refresh_token = generateRefreshToken({ id: newUser._id }, res);

  newUser.rf_token = refresh_token;
  await newUser.save();

  res.json({
    message: "Login Success!",
    access_token,
    user: { ...newUser._doc, password: "" },
  });
};

module.exports = authCtrl;

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
