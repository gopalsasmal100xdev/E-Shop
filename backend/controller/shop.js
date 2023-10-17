const ErrorHandler = require("../utils/ErrorHandler");
const { upload } = require("../middleware/multer");
const fs = require("fs");
const Shop = require("../models/Shop");

const createShopOwner =
  (upload.single("file"),
  async (req, res, next) => {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    const isUserPresent = await Shop.findOne({ email });

    try {
      if (isUserPresent) {
        const fileName = req.file.filename;
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
      const result = await User.create(user);

      res.status(201).send({
        message: "User created successfully",
        data: {
          name: result.name,
          avatar: result.avatar.url,
        },
      });
    } catch (error) {
      return next(
        new ErrorHandler("Error occurred while activating! Try again later.👍")
      );
    }
  });

module.exports = {
  createShopOwner,
};
