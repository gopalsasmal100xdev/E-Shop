const nodemailer = require("nodemailer");

const sendVerificationEmail = async (option) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: option.email,
    subject: option.subject,
    html: option.message,
  };
  await transporter.sendMail(mailOptions);
};

module.exports = sendVerificationEmail;
