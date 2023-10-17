const express = require("express");
const router = express.Router();
const { upload } = require("../middleware/multer");
const Shop = require("../models/Shop");

router
  .route("/create-shop")
  .get((req, res) => {
    res.json({ msg: "Welcome to my shop!Are you find something?" });
  })
  .post(upload.single("file"), async (req, res) => {
    const { name, email, password, address, zipCode, phoneNumber } = req.body;
    const isUserPresent = await Shop.findOne({ email });
    if (isUserPresent) {
      res.status(400).json({ message: "User already exists!" });
    } else {
      const fileName = req.file?.filename;
      const user = {
        name,
        email,
        password,
        avatar: { url: fileName },
        address,
        zipCode,
        phoneNumber,
      };
      const newUser = await Shop.create(user);

      res.status(200).json({
        success: true,
        newUser,
      });
    }
  });

router
  .route("/login-shop")
  .get((req, res) => {
    res.json({ message: "Welcome to Shop login" });
  })
  .post(async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await Shop.findOne({ email }).select("+password");
        if (!user) {
          res.status(404).json({ message: "User does not exist!" });
        } else {
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
    } catch (error) {
      res
        .status(401)
        .json({ message: "Something went wrong! Please try again!🙏" });
    }
  });

module.exports = router;
