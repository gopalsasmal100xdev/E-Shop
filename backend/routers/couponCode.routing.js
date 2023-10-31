const express = require("express");
const Router = express.Router();
const { isSellerAuthenticated } = require("../middleware/Auth");
const CouponCode = require("../models/CouponCode");

/**
 * Creating a new CouponCode
 */
Router.route("/create-coupon")
  .get((req, res) => {
    res.json({ message: "Create coupon get route" });
  })
  .post(isSellerAuthenticated, async (req, res) => {
    try {
      const { name } = req.body;
      const isCouponCodeExists = await CouponCode.find({ name });
      if (isCouponCodeExists.length > 0) {
        res.status(401).json({ message: "Coupon code already exists!" });
      } else {
        const coupon = await CouponCode.create({ ...req.body });
        res.status(201).json(coupon);
      }
    } catch (error) {
      res
        .status(400)
        .json({ message: error.message || "Failed to create coupon!" });
    }
  });

/**
 * Return coupon codes for the specific shop
 */
Router.route("/get-shop-coupon-codes/:id").get(async (req, res) => {
  try {
    const { id } = req.params;
    const couponCodes = await CouponCode.find({ shopId: id });
    res.status(200).json(couponCodes);
  } catch (error) {
    res
      .status(400)
      .json({ message: error.message || "Failed to get coupon codes!" });
  }
});

/**
 * Delete a coupon code
 */

Router.route("/delete-coupon-code/:id").delete(
  isSellerAuthenticated,
  async (req, res) => {
    try {
      const { id } = req.params;
      const couponCode = await CouponCode.findByIdAndDelete(id);
      if (!couponCode) {
        res.status(404).json({ message: "Invalid coupon code!" });
      } else
        res.status(200).json({ message: "Coupon Code deleted successfully!" });
    } catch (error) {
      res
        .status(400)
        .json({ message: error.message || "Failed to delete coupon code!" });
    }
  }
);

/**
 * Get coupon code by coupon name
 */

Router.route("/get-couponCode-byName/:name").get(async (req, res) => {
  try {
    const { name } = req.params;
    const couponCode = await CouponCode.find({ name });
    if (!couponCode) {
      res.status(404).json({ message: "Invalid coupon Code name!" });
    } else {
      res.status(200).json(couponCode);
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: error.message || "Failed to fetch coupon code!" });
  }
});

module.exports = Router;
