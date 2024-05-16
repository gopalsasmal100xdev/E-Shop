const express = require("express");
const { isAuthenticated } = require("../middleware/Auth");
const router = express.Router();
const UserCart = require("../models/UserCart");

router
  .route("/all-items/:userId")
  .get(isAuthenticated, async (req, res) => {
    const userId = req.params?.userId;
    try {
      const data = await UserCart.find({ userId });
      res.status(201).json({
        message: "User cart items fetch successfully!",
        data,
      });
    } catch (error) {
      res.status(400).json({
        message: "Can't fetch user cart items!",
      });
    }
  })
  .post(isAuthenticated, async (req, res) => {
    const userId = req.body?.userId;
    try {
      const data = await UserCart.find({});
      res.status(201).json({
        message: "User cart items fetch successfully!",
        data,
      });
    } catch (error) {
      res.status(400).json({
        message: "Can't fetch user cart items!",
      });
    }
  });

// Items add to cart
router
  .route("/add-items")
  .get(isAuthenticated, (req, res) => {
    res.json({ message: "Hello" });
  })
  .post(async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
      const userCart = new UserCart({
        userId,
        productId,
        quantity,
      });
      await userCart.save();
      res.status(201).json({ message: "Items add successfully!" });
    } catch (error) {
      res.status(401).json({ message: "Failed to add items to cart!", error });
    }
  });

router.route("/delete-item/:itemId").delete(async (req, res) => {
  const itemId = req.params.itemId;
  try {
    const deletedItem = await UserCart.findOneAndDelete({ _id: itemId });

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found in cart!" });
    }
    res.json({
      message: "Item removed from the cart successfully",
      deletedItem,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// update quantity
router.route("/update-quantity/:itemId").put(async (req, res) => {
  const itemId = req.params.itemId;
  const { quantity } = req.body;
  try {
    const data = await UserCart.findOneAndUpdate(
      { _id: itemId },
      { $set: { quantity } },
      { new: true }
    );
    res.json({
      message: "Item quantity updated successfully",
      data,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
