const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async (url) => {
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("mongodb connected");
};
module.exports = connectDB;
