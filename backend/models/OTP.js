const { default: mongoose } = require("mongoose");
const sendVerificationEmail = require("../utils/sendMail");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
  },
});

otpSchema.pre("save", async function (next) {
  console.log("New document saved to the database");
  // Only send an email when a new document is created
  if (this.isNew) {
    await sendVerificationEmail({
      email: this.email,
      subject: "",
      otp: this.otp,
    });
  }
  next();
});
module.exports = mongoose.model("OTP", otpSchema);
