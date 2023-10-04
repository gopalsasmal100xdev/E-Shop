const express = require("express");
const app = express();
const ErrorHandler = require("./utils/ErrorHandler");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const UserRouter = require("./controller/user");
const cors = require("cors");

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

// middleware

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
// app.use();

// routing
app.get("/", (req, res) => {
  res.json({ msg: "welcome to the e-shop app" });
});
app.use("/api/v2/user", UserRouter);

// it's is a Error handler middleware
app.use(ErrorHandler);

module.exports = app;
