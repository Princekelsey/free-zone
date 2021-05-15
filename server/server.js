const app = require("./app");
const colors = require("colors");
const ErrorResponse = require("./utils/errorResponse");

// models
const User = require("./models/Users");
const Room = require("./models/Room");

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `App runing in ${process.env.NODE_ENV} and listening on port ${PORT}!`
      .yellow.bold
  );
});

const options = {
  cors: true,
};

const io = require("socket.io")(server, options);

// step up socket webHooks

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;

    if (!token) {
      return next(
        new ErrorResponse("Not authorized to access this route", 401)
      );
    }

    const user = await User.findById(token);

    if (!user) {
      return next(
        new ErrorResponse("Not authorized to access this route", 401)
      );
    }
    socket.userId = user._id;
    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
});

io.on("connection", (socket) => {
  console.log("Connected: " + socket.userId);

  socket.on("disconnect", () => {
    console.log("Disconnected: " + socket.userId);
  });

  socket.on("joinRoom", ({ chatroomId }) => {
    socket.join(chatroomId);
    console.log("A user joined chatroom: " + chatroomId);
  });

  socket.on("leaveRoom", ({ chatroomId }) => {
    socket.leave(chatroomId);
    console.log("A user left chatroom: " + chatroomId);
  });

  socket.on("chatroomMessage", async ({ chatroomId, message }) => {
    if (message.trim().length > 0) {
      const user = await User.findOne({ _id: socket.userId });
      if (user) {
        const messageObj = {
          message,
          senderAlias: user.alias,
          senderId: user._id,
          date: Date.now(),
        };

        io.to(chatroomId).emit("newMessage", messageObj);

        const room = await Room.find({
          _id: chatroomId,
          members: { $elemMatch: { userId: user._id } },
        });

        if (room.length) {
          await Room.findByIdAndUpdate(
            { _id: chatroomId },
            {
              $push: { chatHistory: messageObj },
            },
            { new: true }
          );
        }
      }
    }
  });
});

// handle promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});
