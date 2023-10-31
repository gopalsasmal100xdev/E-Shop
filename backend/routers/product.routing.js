const express = require("express");
const Shop = require("../models/Shop");
const Product = require("../models/Product");
const { upload } = require("../middleware/multer");
const Router = express.Router();
const { isSellerAuthenticated } = require("../middleware/Auth");
const fs = require("fs");

Router.route("/create-product")
  .get((req, res) => {
    res.json({ message: "Product created route" });
  })
  .post(upload.array("images", 15), async (req, res) => {
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
      res.status(404).json({
        message: "Error for " + error.message || "Something went wrong!",
      });
    }
  });
// id refers to the shop id
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
  .post((req, res) => {
    res.status(201).json({ message: "There is no post request!" });
  });

Router.route("/single-product/:id").get(async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

Router.route("/get-all-products").get(async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(200).json({ message: error || "Error in geting all products!" });
  }
});

Router.route("/delete-shop-product/:id")
  .get((req, res) => {
    res.status(404).json({ message: "There is no delete request!" });
  })
  .post((req, res) => {
    res.status(404).json({ message: "There is no delete request!" });
  })
  .delete(isSellerAuthenticated, async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findByIdAndDelete(productId);
      if (!product) {
        res.status(404).json({ message: "Product id is not valid!" });
      } else {
        const imageUrls = product.images;
        imageUrls.forEach((url) => {
          fs.unlink(`uploads/${url}`, (err) => {
            console.log(err);
          });
        });
        res
          .status(200)
          .json({ success: true, message: "Product successfully deleted!" });
      }
    } catch (err) {
      res
        .status(400)
        .json({ message: err.message || "Error in deleting product!" });
    }
  });

module.exports = Router;
