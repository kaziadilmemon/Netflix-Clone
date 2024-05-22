const User = require("../models/User");
const refreshToken = async (req, res, next) => {
  const { token } = req.body;
  try {
    const user = await User.findOne({ token: token });
    if (user) {
      sendToken(user, 200, res);
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
const sendToken = async (user, statusCode, res) => {
  const token = await user.getSignedToken(user);
  return res.status(statusCode).json({ success: true, token: token });
};
module.exports = { refreshToken };
