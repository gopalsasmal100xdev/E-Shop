const express = require("express");
const Shop = require("../models/Shop");
const Product = require("../models/Product");
const { upload } = require("../middleware/multer");
const Router = express.Router();

Router.route("/create-product")
  .get((req, res) => {
    res.json({ message: "Product created route" });
  })
  .post(upload.array("images", 10), async (req, res) => {
    try {
      const { shopId } = req.body;
      const shopPresent = await Shop.findById(shopId);
      if (!shopPresent) {
        res.status(404).json({ message: "Shop id is invalid!" });
      } else {
        const files = req.files;
        const imageUrls = files.map((file) => `${file.filename}`);
        const productData = {
          ...req.body,
          images: imageUrls,
          shop: shopPresent,
        };
        const product = await Product.create(productData);
        res.status(201).json({
          message: "Product created successfully!",
          success: true,
          data: product,
        });
      }
    } catch (error) {
      res
        .status(404)
        .json({ message: error.message || "Something went wrong!" });
    }
  });

Router.route("/get-all-products/:id")
  .get(async (req, res) => {
    try {
      const shopId = req.params?.id;
      const products = await Product.find({ shopId: shopId });
      res.status(200).json(products);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  })
  .post((req, res) => {});

module.exports = Router;
