const express = require("express");
const app = express();
const ErrorHandler = require("./utils/ErrorHandler");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const UserRouter = require("./routers/user.routing");
const homeRouter = require("./routers/home.routing");
const CouponRouter = require("./routers/couponCode.routing");
const ShopRouter = require("./routers/shop.routing");
const ProductsRouter = require("./routers/product.routing");
const EventsRouter = require("./routers/event.routing");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

/** Middlewares */
app.use(cookieParser());
app.use(express.json());
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://127.0.0.1",
    "http://example.com",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
  ],
  credentials: true,
  exposedHeaders: ["set-cookie"],
};
app.use(cors(corsOptions));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(morgan("tiny"));
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.disable("x-powered-by");
app.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
/** routing */
app.use("/", homeRouter);
app.use("/api/v2/user", UserRouter);
app.use("/api/v2/shop", ShopRouter);
app.use("/api/v2/products", ProductsRouter);
app.use("/api/v2/events", EventsRouter);
app.use("/api/v2/coupon", CouponRouter);

// it's is a Error handler middleware
app.use((error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
});

module.exports = app;
