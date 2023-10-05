const express = require("express");
const app = express();
const ErrorHandler = require("./utils/ErrorHandler");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const UserRouter = require("./routers/user.routing");
const homeRouter = require("./routers/home.routing");
const cors = require("cors");
const morgan = require("morgan");

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

/** Middlewares */
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan("tiny"));
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.disable("x-powered-by");

/** routing */
app.use("/", homeRouter);
app.use("/api/v2/user", UserRouter);

// it's is a Error handler middleware
app.use(ErrorHandler);

module.exports = app;
