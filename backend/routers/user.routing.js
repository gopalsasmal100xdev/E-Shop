const express = require("express");
const path = require("path");
const router = express.Router();
const { upload } = require("../middleware/multer");
const User = require("../models/User");
const ErrorHandler = require("../utils/ErrorHandler");
const sendToken = require("../utils/JwtToken");
const catchAsyncError = require("../middleware/CatchAsyncError");
const { isAuthenticated } = require("../middleware/Auth");

router
  .route("/create-user")
  .get((req, res) => {
    res.json({ msg: "Connect to our helpline email address!" });
  })
  .post(upload.single("file"), async (req, res, next) => {
    const { name, email, password } = req.body;
    const isUserPresent = await User.findOne({ email });
    if (isUserPresent) {
      next(new ErrorHandler("User already exists!", 400));
    }

    const fileName = req.file?.filename;

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

router
  .route("/login-user")
  .get((req, res) => {
    res.json({ message: "Welcome to login" });
  })
  .post(
    catchAsyncError(async (req, res, next) => {
      try {
        const { email, password } = req.body;
        if (!email || !password) {
          return next(new ErrorHandler("Please provide the all fields!"));
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
          return next(new ErrorHandler("User does't exist!", 400));
        }

        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
          return next(new ErrorHandler("Invalid information!", 400));
        }
        const token = user.getJwtToken();
        res
          .status(201)
          .cookie("token", token, {
            maxAge: 60 * 60 * 24 * 1000 * 7,
            httpOnly: true,
          })
          .json({
            success: true,
            data: { name: user.name, email: user.email, avatar: user.avatar },
            token,
          });
      } catch (error) {
        res.status(401).json({ message: "Invalid username or password" });
      }
    })
  );

router
  .route("/getUser")
  .get(
    isAuthenticated,
    catchAsyncError(async (req, res, next) => {
      try {
        const user = await User.findById(req.user.id);

        if (!user) {
          return next(new ErrorHandler("User does't exists", 400));
        }

        res.status(200).json({
          success: true,
          user,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  )
  .post((req, res) => {
    res.json({ message: "getUser post route" });
  });

module.exports = router;