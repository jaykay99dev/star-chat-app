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

io.on("connection", socket => {
  const req = socket.request;
  const ip = req.connection.remoteAddress;
  console.log("new client", ip, socket.id);

  socket.on("disconnect", () => {
    console.log("close client", ip, socket.id);
    clearInterval(socket.intervalId);
  });

  socket.on("error", err => {
    console.error(err);
  });

  socket.on("bye", data => {
    console.log(data); // Bye, Server!
  });

  socket.intervalId = setInterval(() => {
    socket.emit("hello", "Hello, Client!");
  }, 1000);
});
