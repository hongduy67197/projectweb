const mongoose = require("./dbConnect.js");
const productModel = require("./productModel");
const cartsSchema = mongoose.Schema(
  {
    listProducts: [
      { idproduct: { type: String, ref: "product" }, quantity: Number },
    ],
    cartsPrice: Number,
    iduser: { type: String, ref: "users" },
  },
  { collection: "carts" }
);

let cartstModel = mongoose.model("carts", cartsSchema);

module.exports = cartstModel;

