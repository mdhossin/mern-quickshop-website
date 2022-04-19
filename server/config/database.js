const mongoose = require("mongoose");
const URL = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database Connected");
  } catch (error) {
    console.error("Database connection fail");
  }
};

module.exports = connectDB;
