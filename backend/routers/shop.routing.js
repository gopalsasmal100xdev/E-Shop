const express = require("express");
const router = express.Router();
const { upload } = require("../middleware/multer");
const Shop = require("../models/Shop");
const { isSellerAuthenticated } = require("../middleware/Auth");
const CatchAsyncError = require("../middleware/CatchAsyncError");

/** Signup shop */

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

/*** Login shop */
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
                  id: user._id,
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

router
  .route("/getSeller")
  .get(
    isSellerAuthenticated,
    CatchAsyncError(async (req, res) => {
      try {
        const seller = await Shop.findById(req.seller.id);
        if (!seller) {
          res.status(400).json({ message: "Seller does not exists!" });
        } else {
          res.status(200).json({
            success: true,
            data: seller,
          });
        }
      } catch (error) {
        res
          .status(500)
          .json({ message: error.message || "Internal Server Error!" });
      }
    })
  )
  .post((req, res) => {
    res.json({ message: "Please go back to home page" });
  });

router.route("/get-shop-info/:id").get(async (req, res) => {
  try {
    const { id } = req.params;
    const shopInfo = await Shop.findById(id);
    if (!shopInfo) {
      res.status().json({ message: "Invalid shop id" });
    } else {
      res.status(200).json({ shopInfo });
    }
  } catch (error) {
    res.status().json({ message: `error - ${error}` });
  }
});

module.exports = router;
