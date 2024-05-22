const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Button = require("../models/ButtonModel");
const { renameSync } = require("fs");
require("dotenv").config();

const register = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  const { username, password } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.userType !== "admin") {
      return res
        .status(400)
        .json({ success: false, message: "Unauthenticated User" });
    }
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide the username and password",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password should be greater than 6 characters",
      });
    }
    const username_user = await User.findOne({ username });
    if (username_user) {
      return res
        .status(400)
        .json({ success: false, message: "Username already exists" });
    }
    const user = await User.create({
      username: username,
      password: password,
    });
    sendToken(user, 201, res);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const login = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide the username and password",
    });
  }
  try {
    let user = await User.findOne({ username: username }).select("password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Credentials" });
    }
    const ismatch = await user.matchPassword(password, user.password);
    if (!ismatch) {
      return res.status(404).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    user = await User.findOne({ username: username });
    sendToken(user, 200, res);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const verifyUser = async (req, res, next) => {
  try {
    const { token } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found and not authorized to accesss this route",
      });
    }
    return res.status(200).json({ success: true, message: "User verified" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

const addButton = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.userType !== "admin") {
      return res
        .status(400)
        .json({ success: false, message: "Unauthenticated User" });
    }
    const { name, color } = req.body;
    if (!name || !color) {
      return res
        .status(400)
        .json({ success: false, message: "Name or color is not provided" });
    }
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Please select the file" });
    }
    const checkbtn = await Button.findOne({ name: name });
    if (checkbtn) {
      return res.status(400).json({
        success: false,
        message: "Button with the same name already exists",
      });
    }
    const date = Date.now();
    let filename = "uploads/audio_files/" + date + req.file.originalname;
    renameSync(req.file.path, filename);
    const button = await Button.create({
      name: name,
      color: color,
      fileUrl: filename,
    });
    await button.save();
    return res
      .status(201)
      .json({ success: true, message: "Button is created successfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

const getAllButtons = async (req, res, next) => {
  try {
    const buttons = await Button.find({});
    return res.status(200).json({ success: true, message: buttons });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

const getOneButton = async (req, res, next) => {
  try {
    const { id } = req.params;
    const button_ = await Button.findById(id);
    if (!button_) {
      return res
        .status(404)
        .json({ success: false, message: "Button not found" });
    }
    return res.status(200).json({ success: true, message: button_ });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

const deleteButton = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.userType !== "admin") {
      return res
        .status(400)
        .json({ success: false, message: "Unauthenticated User" });
    }
    const { id } = req.params;
    const button = await Button.findById(id);
    if (!button) {
      return res
        .status(404)
        .json({ success: false, message: "Button not found" });
    }
    await button.deleteOne();
    return res
      .status(200)
      .json({ success: true, message: "Button is deleted successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

const updateButton = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.userType !== "admin") {
      return res
        .status(400)
        .json({ success: false, message: "Unauthenticated User" });
    }
    const { id } = req.params;
    const { name, color, audio_file } = req.body;
    if (!name || !color) {
      return res.status(400).json({
        success: false,
        message: "Please provide the required data first",
      });
    }
    const checkbtn = await Button.findById(id);
    if (!checkbtn) {
      return res
        .status(404)
        .json({ success: false, message: "Button not found" });
    }
    let filename;
    if (req.file) {
      const date = Date.now();
      filename = "uploads/audio_files/" + date + req.file.originalname;
      renameSync(req.file.path, filename);
    }
    await checkbtn.updateOne({
      name: name,
      color: color,
      fileUrl: filename ? filename : audio_file,
    });
    return res
      .status(200)
      .json({ success: true, message: "Button has been updated successfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

const sendToken = async (user, statusCode, res) => {
  const token = await user.getSignedToken(user);
  return res.status(statusCode).json({ success: true, token: token });
};

module.exports = {
  login,
  register,
  verifyUser,
  addButton,
  getAllButtons,
  deleteButton,
  getOneButton,
  updateButton,
};
