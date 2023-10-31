const express = require("express");
const Shop = require("../models/Shop");
const Router = express.Router();
const Event = require("../models/Event");
const { upload } = require("../middleware/multer");

// create events
Router.route("/create-event")
  .get((req, res) => {
    res.status(404).json({ message: "Invalid event request!" });
  })
  .post(upload.array("images", 15), async (req, res) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        res.status(400).json({ message: "Inavalid shop id!" });
      } else {
        const files = req.files;
        const imageUrls = files.map((file) => `${file.filename}`);
        const eventsData = {
          ...req.body,
          images: imageUrls,
          shop: shop,
        };
        const events = await Event.create(eventsData);
        res.status(201).json({
          success: true,
          events,
        });
      }
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });
// get all events
Router.route("/get-all-events").get(async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    res.status(400).json({ message: error || "Error in creating event!" });
  }
});

// get a spacific event by id
// GET req
Router.route("/get-event/:id")
  .get(async (req, res) => {
    try {
      const events = await Event.find({ shopId: req.params.id });

      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  })
  .post((req, res) => {
    res.status(400).json({ message: "Invalid Event Route" });
  });
// delete shop events by their id
Router.route("/delete-shop-events/:id")
  .get((req, res) => {
    res.status(400).json({ message: "Invalid Event Route" });
  })
  .post((req, res) => {
    res.status(400).json({ message: "Invalid Event Route" });
  })
  .delete(async (req, res) => {
    try {
      const event = await Event.findByIdAndDelete(req.params.id);
      if (!event) {
        res.status(404).json({ message: "Invalid Event id" });
      } else {
        res.status(201).json({
          success: true,
          message: "Event Deleted successfully!",
        });
      }
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

module.exports = Router;
