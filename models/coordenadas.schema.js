const { Schema, model } = require("mongoose");

const CoordenadasSchema = Schema({
  x: {
    type: Number,
    require: true,
  },
  y: {
    type: Number,
    require: true,
  },
  pedido: {
    type: Schema.Types.ObjectId,
    ref: "Pedido",
  },
});

module.exports = model("Coordenadas", CoordenadasSchema);
