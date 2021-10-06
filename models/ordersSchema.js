const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema(
  {
    listProducts: [
      {
        idproduct: { type: String, ref: "products", required: true },
        quantity: Number,
        totalIprice: Number,
      },
    ],
    iduse: [{ type: String, ref: "users" }],
    address: String,
    orderPrice: Number,
    phone: String,
    createDate: Date,
    status: {
      type: String,
      enum: ["done", "undone"],
      required: true,
      trim: true,
    },
  },
  { collection: "orders" }
);

let ordersModel = mongoose.model("orders", ordersSchema);

module.exports = ordersModel;
