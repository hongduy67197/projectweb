const express = require("express");
const path = require("path");
const router = express.Router();
const mongoose = require("mongoose");
const productModel = require("../models/productModel");
const usersModel = require("../models/usersModel");
const catagoryModel = require("../models/catagoriesSchema");
const cartstModel = require("../models/cartsSchema");
const jwt = require("jsonwebtoken");
// bcrypt
const bcrypt = require("bcrypt");
const saltRounds = 10;
// bcrypt
const { checkLogin } = require("../views/assets/js/checkLogin");
// const axios = require('axios');

router.get("/", async (req, res) => {
  const listCatagory = await catagoryModel.find();
  res.render("../views/home", { listCatagory });
});

router.get("/login", (req, res) => {
  res.render("../views/login");
});
//<<<<<<< anhdv
// router.post('/login',(req,res)=>{
//     usersModel.findOne({username: req.body.username, password: req.body.password})
//     .then((data)=>{
//       if(data){
//           res.render("../views/product_add");
//           console.log("dang nhap thanh cong")
//       }
//       else{
//         res.render("../views/login");
//         console.log("dang nhap that bai")

//       }
//   })
//   .catch((err)=>{
//       res.send(err);
//   })
//   });
// res.render("../views/product_add",{data:token});
// login
// router.post('/login',(req,res)=>{
//=======
// bcrypt
router.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  let encryptedPassword = "";

  bcrypt.hash(password, saltRounds, function (err, hash) {
    if (err) {
      console.log("err", err);
    } else {
      console.log("hash", hash);

      usersModel
        .create({ username: username, password: hash })
        .then(async (data) => {
          await cartstModel.create({
            iduser: data._id,
          });
          res.json({ status: 200, mess: "ok", data });
        })
        .catch((err) => {
          console.log("Db not connected successfully", err);
          res.json({ mess: "Không thể kết nối Database", status: 500 });
        });
    }
  });
});
// end bcrypt
router.get("/register", (req, res) => {
  res.render("../views/register");
});

router.post("/login", (req, res) => {
  //>>>>>>> main
  usersModel
    .findOne({ username: req.body.username })
    .then(async (data) => {
      if (data) {
        let check = await bcrypt.compare(req.body.password, data.password);
        if (check) {
          let token = jwt.sign({ id: data._id }, "projectk10");
          console.log(data);
          res.json({
            status: 200,
            data: { token: token, role: data.role },
            mess: "ok",
          });
        } else {
          res.json({ status: 400, mess: "sai pass" });
        }
      } else {
        res.json({ status: 400, mess: "sai username" });
      }
    })
    .catch((err) => {
      res.json({ err, status: 500, mess: "loi server" });
    });
});

router.post("/checkLogin", checkLogin, (req, res) => {
  res.json({ status: 200, mess: "ok", data: req.role, id: req.id });
});
// logout

router.post("/logout", checkLogin, (req, res) => {
  console.log(200);
  usersModel
    .updateOne({ token: req.cookies.user }, { token: "" })
    .then((data) => {
      if (data.nModified) {
        res.json({ status: 200, mess: "đăng xuất thành công" });
      } else {
        res.json({ status: 500, mess: "đăng xuất thất bại" });
      }
    })
    .catch((err) => {
      res.json({ status: 500, mess: "đăng xuất thất bại", err });
    });
});
module.exports = router;
