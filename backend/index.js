const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const port = 3000

const io = new Server(httpServer, { 
  cors: {
    origin: "http://localhost:5173"
  }
});

const connectedSockets = [];

io.on("connection", (socket) => {
  connectedSockets.push(socket);

  socket.on("message", (msg) => {
    for (const s of connectedSockets) {
      s.emit("reply", msg);
    }
  });
});

httpServer.listen(port);
console.log("Listening on port", port);
