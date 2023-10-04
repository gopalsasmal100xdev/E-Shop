const app = require("./app");
const connectDb = require("./db/ConnectDb");

// Handling uncaught exceptions

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server for handling uncaught exception`);
});

// configuration settings

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

// create server
const server = app.listen(process.env.PORT, () => {
  (async () => {
    connectDb();
  })();
  console.log(`Server is listening on http://localhost:${process.env.PORT}`);
});

// unhandled promise resections
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down server: for ${err.message}`);
  console.log(
    `Shutting down server for unhandled promise rejection: ${err.message}`
  );

  // close server
  // server.close(() => {
  //   process.exit(1);
  // });
});
