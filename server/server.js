const path = require("path");
const express = require("express");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config({ path: "./config/config.env" });
const colors = require("colors");
const morgan = require("morgan");

const userAuth = require("./routes/auth");
const errorHandler = require("./middleware/errorHandler");

const dbConnection = require("./config/db");

// connect database
dbConnection();

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());

// dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// file upload
app.use(fileUpload());

// static folder
app.use(express.static(path.join(__dirname, "public")));

// set routers
app.use("/api/v1/auth", userAuth);

//error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `App runing in ${process.env.NODE_ENV} and listening on port ${PORT}!`
      .yellow.bold
  );
});

// handle promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});
