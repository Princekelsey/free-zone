const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config({ path: "./config/config.env" });
const colors = require("colors");
const morgan = require("morgan");
const Pusher = require("pusher");
const cors = require("cors");
const mongoose = require("mongoose");

const userAuth = require("./routes/auth");
const chatRoom = require("./routes/room");
const consultant = require("./routes/consultant");
const errorHandler = require("./middleware/errorHandler");

const dbConnection = require("./config/db");

// connect database
dbConnection();

const app = express();

// configure pusher listner

const pusher = new Pusher({
  appId: process.env.PURSER_API_ID,
  key: process.env.PURSER_API_KEY,
  secret: process.env.PURSER_SECRET,
  cluster: "eu",
  useTLS: true,
});

// middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// watch database change on changestream
const db = mongoose.connection;

db.once("open", () => {
  console.log("connected".green.inverse);
  const roomChatColllection = db.collection("rooms");
  const changeStream = roomChatColllection.watch();

  changeStream.on("change", (change) => {
    if (change.operationType === "update") {
      const data = change.updateDescription.updatedFields;

      let newData = null;
      for (let item in data) {
        if (data[item].message) {
          newData = {
            _id: data[item]._id,
            message: data[item].message,
            senderAlias: data[item].senderAlias,
            senderId: data[item].senderId,
            date: data[item].date,
          };
        } else {
          newData = {
            _id: data[item]._id,
            alias: data[item].alias,
            userId: data[item].userId,
          };
        }
      }

      pusher.trigger("rooms", "updated", newData);
    } else if (change.operationType === "insert") {
      pusher.trigger("rooms", "inserted", change.fullDocument);
    }
  });
});

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
