const { Schema, model } = require("mongoose");

const PedidoSchema = Schema(
  {
    fecha: {
      type: Date,
      require: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

PedidoSchema.virtual("coordenadas", {
  ref: "Coordenadas",
  localField: "_id",
  foreignField: "pedido",
  justOne: false,
});

module.exports = model("Pedido", PedidoSchema);
