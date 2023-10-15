const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("Novo cliente conectado");

  socket.on("send-video", (data) => {
    // Lógica de recebimento de vídeo
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

server.listen(3000, () => {
  console.log("Server ouvindo na porta 3000");
});
