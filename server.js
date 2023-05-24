const express = require("express");
const { connectDB } = require("./database/database.config");
const { SocketController } = require("./sockets/controller");

class Server {
  constructor() {
    this._app = express();
    this._httpServer = require("http").createServer(this._app);
    this.io = require("socket.io")(this._httpServer);
    this.connectToDB()
    this.sockets();
  }

  async connectToDB() {
    await connectDB();
  }

  sockets() {
    const controller = new SocketController(this.io);
    this.io.on("connection", (socket) => {
      controller.handleConnection(socket);

      socket.on("startPedido", (payload) => controller.startPedido(socket, payload));
    });
  }

  listen(port = 5000) {
    this._httpServer.listen(port, () =>
      console.log(`Listening on http://localhost:${port}`)
    );
  }
}

module.exports = { Server };
