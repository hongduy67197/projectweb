const mongoose = require("./dbConnect.js");
const path = require("path");

// mongoose.connect("mongodb://localhost/k12nodemy_project", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true,
// });
// const productSchema = mongoose.Schema({
//   idCatagories: String,
//   idSubCatagories: String,
//   idDetailCatagories: String,
//   productName: String,
//   productCode: String,
//   description: String,
//   color: String,
//   size:String,
//   price: Number,
//   quality: Number,
//   sold: Number,
//   createDate: Date,
//   colorImg: [
//       {link: String, }
//   ],
//   listImg:[
//       {list: String,}
//   ],
//   info: [{
//       infoTitle: String,
//       infoValue: String,
//   }],

// },{collection: 'product'})
const productSchema = mongoose.Schema(
  {
    idCatagories: [{ type: String, ref: "catagories" }],
    productName: String,
    productCode: String,
    ListImg: [{ type: String }],
    price: Number,
    quality: Number,
    info: [{ infoTitle: String, infoValue: String }],
    description: String,
    color: String,
    size: String,
    createDate: Date,
  },
  { collection: "product" }
);

const productModel = mongoose.model("product", productSchema);
// productModel.updateOne({_id: "613b6e55971608edb978de81"},{$inc:{quality: -5}})
// .then((data)=>{
//   console.log(data);
// })
// .catch((error)=>{
//   console.log(error);
// })
// productModel.create({
//     idCatagories: 'phone',
//     idSubCatagories: 'smartphone',
//     idDetailCatagories: 'bphone',
//     productName: "test",
//     productCode: "test",
//     description: "test",
//     color: "test",
//     size:"test",
//     price: "1",
//     quality: "1",
//     sold: "1",
//     listimg:[
//         { list: "link_http"},
//  ],
//       colorImg: [
//        {link: "link IMG", }
//     ],
//     createDate: new Date(),
//     info: [{
//         infoTitle: "info_bphone",
//         infoValue: "value_bphone",
//     }]
//  }),

module.exports = productModel;

// productModel.create({
//    idCatagories: 'phone',
//    idSubCatagories: 'smartphone',
//    idDetailCatagories: 'bphone',
//    productName: "test",
//    productCode: "test",
//    description: "test",
//    color: "test",
//    size:"test",
//    price: "1",
//    quality: "1",
//    sold: "1",
//    listimg:[
//        { list: "link_http"},
// ],
//      colorImg: [
//       {link: "link IMG", }
//    ],
//    createDate: new Date(),
//    info: [{
//        infoTitle: "info_bphone",
//        infoValue: "value_bphone",
//    }]
// },
// {
//        idCatagories: 'phone',
//        idSubCatagories: 'smartphone',
//        idDetailCatagories: 'vivo',
//        productName: "vv1",
//        productCode: "vv123",
//        description: "test",
//        color: "den",
//        size:"l",
//        price: "14055500",
//        quality: "5",
//        sold: "2",
//        listimg:[{
//        list: "link_http"
//        }],
//        createDate: new Date(),
//        info: [{
//            infoTitle: "vivo_title",
//            infoValue: "vivo_value",
//        }]
//     },

//     {
//        idCatagories: 'phone',
//        idSubCatagories: 'smartphone',
//        idDetailCatagories: 'realme',
//        productName: "rm",
//        productCode: "rmq432",
//        description: "test_desc_realme",
//        color: "ghi",
//        size:"m",
//        price: "1425500",
//        quality: "10",
//        sold: "1",
//        listimg:[{

//        }],
//        createDate: new Date(),
//        info: [{
//            infoTitle: "infoTitle1",
//            infoValue: "value1",
//        }]
//     },
// {
//        idCatagories: 'phone',
//        idSubCatagories: 'smartphone',
//        idDetailCatagories: 'nokia',
//        productName: "a1100",
//        productCode: "11000i",
//        description: "test_nokia_desc",
//        color: "xanh",
//        size:"s",
//        price: "1075025",
//        quality: "10",
//        sold: "8",
//        listimg:[{

//        }],
//        createDate: new Date(),
//        info: [{
//            infoTitle: "info_nokia",
//            infoValue: "value_nokia",
//        }]
//     },
// {
//        idCatagories: 'phone',
//        idSubCatagories: 'smartphone',
//        idDetailCatagories: 'vinsmart',
//        productName: "vins",
//        productCode: "vins23434",
//        description: "test_desc_vin",
//        color: "den",
//        size:"m",
//        price: "1000001",
//        quality: "11",
//        sold: "2",
//        listimg:[{

//        }],
//        createDate: new Date(),
//        info: [{
//            infoTitle: "info_vinsmart",
//            infoValue: "value_vinsmart",
//        }]
//     },
// {
//        idCatagories: 'phone',
//        idSubCatagories: 'smartphone',
//        idDetailCatagories: 'redmi',
//        productName: "red",
//        productCode: "rephone",
//        description: "test_redmi",
//        color: "vang",
//        size: "s",
//        price: "1000000",
//        quality: "8",
//        sold: "5",
//        listimg:[{

//        }],
//        createDate: new Date(),
//        info: [{
//            infoTitle: "info_redmi",
//            infoValue: "value1_redmi",
//        }]
//     },
// {
//        idCatagories: 'phone',
//        idSubCatagories: 'smartphone',
//        idDetailCatagories: 'xiaomi',
//        productName: "no1",
//        productCode: "xi10b",
//        description: "xiaomi_desc",
//        color: "trang",
//        size:"xxl",
//        price: "12345678",
//        quality: "8",
//        sold: "4",
//        listimg:[{

//        }],
//        createDate: new Date(),
//        info: [{
//            infoTitle: "info_xiaomi",
//            infoValue: "value1_xiaomi",
//        }]
//     },
// {
//        idCatagories: 'phone',
//        idSubCatagories: 'smartphone',
//        idDetailCatagories: 'oppo',
//        productName: "f1",
//        productCode: "f1sa",
//        description: "f1_ok",
//        color: "hong",
//        size:"xl",
//        price: "100000",
//        quality: "6",
//        sold: "2",
//        listimg:[{

//        }],
//        createDate: new Date(),
//        info: [{
//            infoTitle: "info_oppo",
//            infoValue: "value_oppo",
//        }]
//     },
// {
//        idCatagories: 'phone',
//        idSubCatagories: 'smartphone',
//        idDetailCatagories: 'samsung',
//        productName: "galaxy",
//        productCode: "s10",
//        description: "da ok",
//        color: "xanh",
//        size:"xs",
//        price: "7000000",
//        quality: "10",
//        sold: "3",
//        listimg:[{

//        }],
//        createDate: new Date(),
//        info: [{
//            infoTitle: "info_samsung",
//            infoValue: "value1_samsung",
//        }]
//     },
// {
//        idCatagories: 'phone',
//        idSubCatagories: 'smartphone',
//        idDetailCatagories: 'apple',
//        productName: "iphone",
//        productCode: "ip11pro",
//        description: "ok",
//        color: "den",
//        size:"xs",
//        price: "100000",
//        quality: "10",
//        sold: "5",
//        listimg:[{

//        }],
//        createDate: new Date(),
//        info: [{
//            infoTitle: "info_iphone",
//            infoValue: "value_iphone",
//        }]
//     },
//     {
//        idCatagories: 'phone',
//        idSubCatagories: 'smartphone',
//        idDetailCatagories: 'blackbery',
//        productName: "bbery",
//        productCode: "bbery1111",
//        description: "test_bbery",
//        color: "do",
//        size:"xxl",
//        price: "1500001",
//        quality: "10",
//        sold: "4",
//        listimg:[{

//        }],
//        createDate: new Date(),
//        info: [{
//            infoTitle: "info_blackbery",
//            infoValue: "value_blackbery",
//        }]
//     },
// )
