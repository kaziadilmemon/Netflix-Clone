const express = require("express");
require("dotenv").config();
const cors = require("cors");
const router = require("./routes/route");

const connectDB = require("./config/db");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/uploads/audio_files", express.static("uploads/audio_files"));

app.use("/api", router);

const PORT = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log("listening on port 5000");
    });
  } catch (error) {
    console.log(error);
    console.log("some error occured");
  }
};

start();
