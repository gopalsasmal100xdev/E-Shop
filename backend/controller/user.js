const { upload } = require("../middleware/multer");
const User = require("../models/User");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const catchAsyncError = require("../middleware/CatchAsyncError");
const sendToken = require("../utils/JwtToken");

//! Creating activation token for user
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET_KEY, {
    expiresIn: "5m",
  });
};

// create user

const createUser =
  (upload.single("file"),
  async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
      const isUserPresent = await User.findOne({ email });
      if (isUserPresent) {
        const filename = req.file.filename;
        const filePath = `uploads/${filename}`;
        fs.unlink(filePath, (error) => {
          if (error) {
            console.log(error);
          }
        });
        return next(new ErrorHandler("User already exists!", 400));
      }

      const fileName = req.file?.filename;

      const user = {
        name,
        email,
        password,
        avatar: { url: fileName },
      };
      // change activation link to activation otp

      /*const activationToken = createActivationToken(user);
      const activationUrl = `http://localhost:5173/activation/${activationToken}`;

      try {
        await sendMail({
          email,
          subject: "Active your E-shop account",
          message: `Hello ${name}, please click the link below to activate your E-shop account: ${activationUrl}`,
        });

        res.status(201).json({
          success: true,
          message: `Please check your ${email} to activate your E-shop account. Thank You! 🙏`,
        });
      } catch (error) {
        return next(new ErrorHandler(error?.message, 500));
      }*/

      const result = await User.create(user);

      res.status(201).send({
        message: "User created successfully",
        data: {
          name: result.name,
          avatar: result.avatar.url,
        },
      });
    } catch (error) {
      return next(new ErrorHandler(error?.message, 400));
    }
  });

const userActivation = catchAsyncError(async (req, res, next) => {
  try {
    const { activationToken } = req.body;
    const newUser = jwt.verify(
      activationToken,
      process.env.ACTIVATION_SECRET_KEY
    );

    if (!newUser) {
      return next(new ErrorHandler("Invalid activation token", 400));
    }
    const { name, email, password, avatar } = newUser;
    await User.create({
      name,
      email,
      password,
      avatar: { url: avatar },
    });

    sendToken(newUser, 201, res);
  } catch (error) {
    return next(
      new ErrorHandler("Error occurred while activating! Try again later.👍")
    );
  }
});

module.exports = {
  createUser,
  userActivation,
};
