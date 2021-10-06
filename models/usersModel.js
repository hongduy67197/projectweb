const mongoose = require("mongoose");
const path = require("path");

mongoose.connect("mongodb://localhost/k12nodemy_project", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// const usersSchema = mongoose.Schema({
//   username: String,
//   password: String,
//  role:{
//    type:String,
//    default:'user'
//  },
//  token:String,

// },{collection: 'users'})
const usersSchema = mongoose.Schema(
  {
    role: { type: String, default: "user" },
    idcart: [{ type: String, ref: "carts" }],
    username: String,
    password: String,
    email: String,
    phone: String,
    sex: String,
    dob: Date,
    address: String,
    createDate: Date,
  },
  { collection: "users" }
);

const usersModel = mongoose.model("users", usersSchema);

module.exports = usersModel;

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
