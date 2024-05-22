const express = require("express");
const {
  login,
  register,
  verifyUser,
  addButton,
  getAllButtons,
  deleteButton,
  getOneButton,
  updateButton,
} = require("../controller/controllers");
const { refreshToken } = require("../controller/refreshToken");
const { protect } = require("../middleware/auth");

const multer = require("multer");

const uploadAudio = multer({ dest: "uploads/audio_files" });
const updateAudio = multer({ dest: "uploads/audio_files" });

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/refresh").post(refreshToken);
router.route("/verifyUser").post(verifyUser);

router
  .route("/addButton")
  .post(protect, uploadAudio.single("audio_file"), addButton);
router
  .route("/updateButton/:id")
  .put(protect, updateAudio.single("audio_file"), updateButton);
router.route("/getallButtons").get(protect, getAllButtons);
router.route("/getOneButton/:id").get(protect, getOneButton);
router.route("/deleteButton/:id").delete(protect, deleteButton);

module.exports = router;
