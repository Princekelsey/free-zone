const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const mongoSanitze = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const dotenv = require("dotenv").config({ path: "./config/config.env" });
const morgan = require("morgan");
const cors = require("cors");

const userAuth = require("./routes/auth");
const chatRoom = require("./routes/room");
const consultant = require("./routes/consultant");
const errorHandler = require("./middleware/errorHandler");

const dbConnection = require("./config/db");
const testDb = require("./test/testDb");

// connect database
if (process.env.NODE_ENV === "test") {
  testDb.connect();
} else {
  dbConnection();
}

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Sanitze data
app.use(mongoSanitze());

// Security headers
app.use(helmet());

// prevent XSS attack
app.use(xss());

// rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});

app.use(limiter);

//prevent http param pollution
app.use(hpp());

// dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// static folder
app.use(express.static(path.join(__dirname, "public")));

// set routers
app.use("/api/v1/auth", userAuth);
app.use("/api/v1/room", chatRoom);
app.use("/api/v1/consultant", consultant);

//error middleware
app.use(errorHandler);

module.exports = app;
