const mongoose = require("./dbConnect.js");

const productCodeSchema = mongoose.Schema(
  {
    productCode: String,
    Idproduct: [{ type: String, ref: "product" }],
  },
  { collection: "productCode" }
);

let productCodeModel = mongoose.model("productCode", productCodeSchema);

// productCodeModel.create({
//   productCode: "111",
//   Idproduct: ["611d064b84940907490af607"],
// });
module.exports = productCodeModel;
