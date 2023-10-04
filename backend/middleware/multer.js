const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    if (!file) return;
    const uniqueSuffix = `${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}${file.originalname}`);
  },
});

exports.upload = multer({ storage: storage });
