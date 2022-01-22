const mongoose = require("./dbConnect.js");

const CatagoriesSchema = mongoose.Schema(
  {
    catagoriesName: String,
  },
  { collection: "catagories" }
);

let catagoriesModel = mongoose.model("catagories", CatagoriesSchema);

module.exports = catagoriesModel;
