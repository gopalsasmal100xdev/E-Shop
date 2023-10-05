const { Router } = require("express");
const router = Router();
const { localVariables } = require("../middleware/localvariables");
const { generateOtp } = require("../controller/OTP.controller");

router
  .route("/")
  .get(localVariables, generateOtp)
  .post((req, res) => {
    res.json({ message: "OTP post route" });
  });

module.exports = router;
