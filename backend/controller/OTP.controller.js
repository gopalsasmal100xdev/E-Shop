const otpGenerator = require("otp-generator");

async function generateOtp(req, res) {
  req.app.locals.OTP = await otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  res.status(201).send({
    code: req.app.locals.OTP,
  });
}

async function verifyOTP(req, res) {
  const { code } = req.query;
  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    req.app.locals.OTP = null;
    req.app.locals.resetSession = true;
    return res.status(201).send({ msg: "Verify Successfully..!" });
  } else {
    res.status(400).send({ msg: "Invalid otp" });
  }
}

module.exports = { generateOtp, verifyOTP };
