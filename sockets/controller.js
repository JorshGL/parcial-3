const Pedido = require("./../models/pedido.schema");
const Coordenadas = require("./../models/coordenadas.schema");

class SocketController {
  constructor(io) {
    this.io = io;
    this.users = new Map();
  }

  async handleConnection(socket) {
    this.io.to(socket.id).emit("usersConnected", [...this.users.keys()]);
    this.users.set(socket.id, { clientes: [] });
    console.log(this.users);
  }

  async startPedido(socket, socketSelected) {
    let pedido;
    pedido =
      this.users
        .get(socket.id)
        .clientes.find((cliente) => cliente.socket === socketSelected)
        ?.pedido ??
      this.users
        .get(socketSelected)
        .clientes.find((cliente) => cliente.socket === socket.id)?.pedido;

    if (!pedido) {
      pedido = new Pedido({ fecha: new Date() });
      pedido.save();
      this.users.get(socket.id).clientes.push({
        socket: socketSelected,
        pedido,
      });
    }
    setInterval(() => {
      const coordenadas = new Coordenadas({
        x: Math.random(),
        y: Math.random(),
        pedido: pedido._id,
      });
      coordenadas.save();
      socket.to(socketSelected).emit("coordenadas", coordenadas);
    }, 2000);
  }
}

module.exports = { SocketController };
