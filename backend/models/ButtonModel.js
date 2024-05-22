const mongoose = require("mongoose");
require("dotenv").config();

const ButtonSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Please provide a name"],
  },
  color: {
    type: String,
    required: [true, "Please provide a color"],
  },
  fileUrl: {
    type: String,
    required: [true, "Please provide a filename"],
  },
});

const Button = mongoose.model("button", ButtonSchema);

module.exports = Button;
