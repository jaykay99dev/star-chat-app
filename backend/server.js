const path = require("path");
const express = require("express");
const morgan = require("morgan");
const SocketIO = require("socket.io");

const app = express();

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "static")));

const PORT = 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is created at http://localhost:${PORT}`);
});

const io = SocketIO(server, { path: "/socket.io" });

const users = {};

io.on("connection", (socket) => {
  const req = socket.request;
  const ip = req.connection.remoteAddress;

  console.log("new client", ip, socket.id);

  socket.on("disconnect", () => {
    console.log("close client", ip, socket.id);
    delete users[socket.id];

    // 다른 사용자들에 나간 사용자의 socket id를 전달한다
    socket.broadcast.emit("userCameOut", socket.id);
  });

  socket.on("error", (err) => {
    console.error(err);
  });

  // 사용자가 처음 chat-app에 들어올때 수신한다
  socket.on("enterChatApp", (userData) => {
    users[socket.id] = {
      username: userData.username,
    };

    // 다른 사용자들에게 새로운 사용자가 입장했음을 알린다
    socket.broadcast.emit("userCameIn", [socket.id, users[socket.id]]);

    // 입장한 사용자에게 사용자 목록을 전송한다
    socket.emit("iCameIn", users);
  });

  // 사용자가 메시지를 보낼 때 수신한다
  socket.on("sendMessage", (userMessage) => {
    // socket.server.emit("receiveMessage", userMessage);

    socket.emit("myMessage", userMessage);
    socket.broadcast.emit("notMyMessage", userMessage);
  });
});
