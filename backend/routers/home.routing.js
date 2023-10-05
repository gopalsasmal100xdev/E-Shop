const express = require("express");
const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    res.json({ msg: "welcome to the e-shop app" });
  })
  .post((req, res) => {
    res.json({
      msg: "welcome to the e-shop app post route",
    });
  });

module.exports = router;
