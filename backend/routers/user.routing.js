const express = require("express");
const router = express.Router();
const { upload } = require("../middleware/multer");
const User = require("../models/User");
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
      res.status(400).json({ message: "User already exists!" });
    } else {
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
    }
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
        if (email && password) {
          const user = await User.findOne({ email }).select("+password");
          if (!user) {
            res.status(404).json({ message: "User does not exist!" });
          } else {
            // user is present
            const isPasswordValid = await user.comparePassword(password);
            if (!isPasswordValid) {
              res.status(404).json({
                message: "Invalid information!",
              });
            } else {
              const token = user.getJwtToken();
              res
                .status(201)
                .cookie("token", token, {
                  maxAge: 60 * 60 * 24 * 1000 * 7,
                  httpOnly: true,
                })
                .json({
                  success: true,
                  data: {
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                  },
                  token,
                });
            }
          }
        } else if (!email || !password) {
          res.status(401).json({ message: "Please provide all information!" });
        } else {
          res.status(401).json({ message: "Something went wrong!" });
        }
        /*if (!email || !password) {
          // return next(new ErrorHandler("Please provide the all fields!"));
          
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
          console.log("User not found");
          
          // return next(new ErrorHandler("User does't exist!", 400));
        }

        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
          // return next(new ErrorHandler("Invalid information!", 400));
          res.status(404).json({
            message: "Invalid information!",
          });
        } else {
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
        }*/
      } catch (error) {
        res
          .status(401)
          .json({ message: "Something went wrong! Please try again!🙏" });
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
          // return next(new ErrorHandler("User does't exists", 400));
          res.status(400).json({ message: "User does't exists!" });
        } else {
          res.status(200).json({
            success: true,
            data: user,
          });
        }
      } catch (error) {
        // return next(new ErrorHandler(error.message, 500));
        res
          .status(500)
          .json({ message: error.message || "Internal Server Error!" });
      }
    })
  )
  .post((req, res) => {
    res.json({ message: "getUser post route" });
  });

module.exports = router;
