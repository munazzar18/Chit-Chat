const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const port = 3000

const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
  console.log(socket.id); 
});

httpServer.listen(port);