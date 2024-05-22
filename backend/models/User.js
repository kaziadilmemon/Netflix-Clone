const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Please provide a username"],
  },
  status: {
    type: String,
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please add a Password"],
    minlength: 6,
    select: false,
  },
  token: {
    type: String,
    default: null,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

UserSchema.methods.getSignedToken = async (user) => {
  const token = jwt.sign(
    { id: user._id, userType: user.status },
    process.env.JWT_SECRET,
    {
      expiresIn: "10 days",
    }
  );
  user.token = token;
  await user.save();
  return token;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
