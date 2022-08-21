const jwt = require("jsonwebtoken");

exports.generateActiveToken = (payload) => {
  // console.log("generate token", process.env.ACTIVE_TOKEN_SECRET);
  return jwt.sign(payload, `${process.env.ACTIVE_TOKEN_SECRET}`, {
    expiresIn: "5m",
  });
};

exports.generateAccessToken = (payload) => {
  return jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, {
    expiresIn: "15m",
  });
};

exports.generateRefreshToken = (payload, res) => {
  const refresh_token = jwt.sign(
    payload,
    `${process.env.REFRESH_TOKEN_SECRET}`,
    {
      expiresIn: "30d",
    }
  );

  res.cookie("refreshtoken", refresh_token, {
    // sameSite: "none",
    // secure: true,
    httpOnly: true,
    path: `/api/refresh_token`,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
  });

  return refresh_token;
};
