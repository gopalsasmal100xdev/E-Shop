const express = require("express");
const path = require("path");
const router = express.Router();
const { upload } = require("../middleware/multer");
const User = require("../models/User");
const ErrorHandler = require("../utils/ErrorHandler");

router
  .route("/create-user")
  .get((req, res) => {
    res.json({ msg: "Connect to our helpline email address!" });
  })
  .post(upload.single("file"), async (req, res, next) => {
    const { name, email, password } = req.body;
    const isUserPresent = await User.findOne({ email });
    if (isUserPresent) {
      return next(new ErrorHandler("User already exists!", 400));
    }

    const fileName = req.file?.filename;
    // const fileUrl = path.join(fileName);

    const user = {
      name,
      email,
      password,
      avatar: { url: fileName },
    };

    const newUser = await User.create(user);

    res.status(200).json({
      success: true,
      newUser,
    });
  });

module.exports = router;
