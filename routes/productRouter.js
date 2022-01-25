const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const router = express.Router();
const productModel = require("../models/productModel");
const catagoriesModel = require("../models/catagoriesSchema");
const productCodeModel = require("../models/productCodesSchema");
const { maxHeaderSize } = require("http");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../views/assets/uploads"));
  },
  filename: function (req, file, cb) {
    console.log(path.extname(file.originalname));
    // const uniqueSuffix = Date.now() + path.extname(file.originalname)+ "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });
// const jwt = require("jwt")
// const axios = require('axios');

router.get("/add", async(req, res) => {
  try {
    const listCata = await catagoriesModel.find()
    res.render("../views/product_add", {listCata});
  } catch (error) {
    res.json(error)
  }
});

router.get("/product", (req, res) => {
  productModel
    .find()
    .populate('idCatagories')
    .then((data) => {
      res.render("../views/product", { data });

      console.log(data[0]);
    })
    .catch((err) => {
      res.send(err);
    });
});
// router.get("/product", async (req, res) => {
//   try {
//     let listcata = await catagoriesModel.find();
//     let listProduct = await productModel.find();
//     let listDataProduct = {
//       listcata: listcata,
//       listProduct: listProduct,
//     }
//         res.render("../views/product", { listDataProduct });
//   } catch (error) {
//     console.log(error);    
//   }
// });

router.post("/add", upload.single("noidung"), async function (req, res, next) {
  console.log(req.file);
  let index = req.file.path.indexOf("assets");
  let link = "/views/" + req.file.path.slice(index, req.file.path.length);
  console.log(link);

  try {
    const themproduct = await new productModel({
      idCatagories: req.body.idCatagories, //select
      productName: req.body.productName, // type string
      productCode: req.body.productCode, // type string
      ListImg: link,
      price: req.body.price, // type string
      quality: req.body.quality, // type string
      info: req.body.info, // type string
      description: req.body.description, // type string
      color: req.body.color, // type string
      size: req.body.size,
      createDate: req.body.createDate,
    });
    
    console.log(79, listCata)
    themproduct.save();
    res.render("../views/product_add");
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// router.post("/add", (req, res) => {
//   try {
//     const themproduct = new productModel({
//       idCatagories: req.body.idCatagories, //select
//       productName: req.body.productName, // type string
//       productCode: req.body.productCode, // type string
//       ListImg: req.body.ListImg,
//       price: req.body.price, // type string
//       quality: req.body.quality, // type string
//       info: req.body.info, // type string
//       description: req.body.description, // type string
//       color: req.body.color, // type string
//       size: req.body.size,
//       createDate: req.body.createDate,
//     });
//     themproduct.save();
//     res.render("../views/product_add");
//   } catch (error) {
//     res.status(404).send(error.message);
//   }
// });

//API tim kiem theo mau sac
router.get("/test", (req, res) => {
  productModel
    .find({ color: req.query.color })
    .then((data) => {
      if (data) {
        res.json(data);
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

//API tim theo  idCatagories
router.get("/phanloai", (req, res) => {
  productModel
    .find({ idCatagories: req.query.idCatagories })
    .then((data) => {
      if (data) {
        res.json(data);
      }
    })
    .catch((err) => {
      res.send(err);
    });
});
//API tim kiem all => trang chu
router.get("/dien-thoai", (req, res) => {
  productModel
    .find()
    .then((data) => {
      if (data) {
        res.send(data);
      }
    })
    .catch((err) => {
      res.send(err);
    });
});
//Api Tim kiem theo Price
router.get("/price", (req, res) => {
  productModel
    .find({ price: req.query.price })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

//Api Tim kiem theo idDetailCatagories
router.get("/detail", (req, res) => {
  productModel
    .find({ idDetailCatagories: req.query.idDetailCatagories })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get("/search", async (req, res) => {
  try {
    const searchList = await productModel.find({
      productName: { $regex: `.*${req.query.search}.*` },
    });
    console.log(164, searchList);
    res.json(searchList);
  } catch (error) {
    res.json(error);
  }
});

router.post("/createcata", async (req, res) =>{
  try {
    let newCatagory = await catagoriesModel.create({
      catagoriesName: req.body.catagoriesName,
    }); 
    res.json(newCatagory);
  } catch (error) {
    console.log(error);
  }
})

router.put("/updatecata", async (req, res) =>{
  try {
    let updatecata = await catagoriesModel.updateOne({
      _id: req.body.idcatagories
    },{catagoriesName: req.body.catagoriesName,})
    res.json(updatecata)
  } catch (error) {
    console.log(error);
  }
})

router.delete("/deletecata", async (req,res)=>{
  try {
    let deleteCata = await catagoriesModel.deleteOne({_id:req.body.idcatagories})
    res.json(deleteCata);
  } catch (error) {
    console.log(error);
  }
})

router.get("/filter", async (req, res) => {
  try {
    let listProduct;
    const listCatagory = await catagoriesModel.find();
    if (req.query.name) {
      listProduct = await productModel.find({
        productName: { $regex: `.*${req.query.name}.*` },
      });
    } else if (req.query.max && req.query.min) {
      listProduct = await productModel.find({
        idCatagories: req.query.catagory,
        price: { $lte: req.query.max, $gte: req.query.min },
      });
    } else {
      listProduct = await productModel.find({
        idCatagories: req.query.catagory,
      });
    }
    console.log(req.query);
    let productCodeList = [];

    for (let i = 0; i < listProduct.length; i++) {
      if (productCodeList.indexOf(listProduct[i].productCode) === -1) {
        productCodeList.push(listProduct[i].productCode);
      }
    }

    let filterledProductList = productCodeList.map((ele) => {
      for (let i = 0; i < listProduct.length; i++) {
        if (ele === listProduct[i].productCode) {
          return listProduct[i];
        }
      }
    });

    console.log("159", filterledProductList);
    res.render("../views/filter", {
      productList: filterledProductList,
      listCatagory,
    });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});
router.get("/product_details", async (req, res) => {
  try {
    const listCatagory = await catagoriesModel.find();
    let listinformation = await productModel.find({
      productCode: req.query.namesp,
    });
    // let listinfor = { listinformation: listinformation };
    res.render("../views/product_details", {
      listCatagory,
      listinfor: listinformation,
    });
    // console.log(187, listinformation);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

router.post("/product_details_color", async (req, res) => {
  try {
    console.log(256);
    let listCatagory = await catagoriesModel.find();
    let listSearchColor = await productModel.find({
      productCode: req.query.namesp,
      color: req.body.color,
    })
    console.log(listSearchColor);
    res.render('product_color', {listCatagory, listSearchColor});
    // res.json(listSearchColor)
  } catch (error) {
    console.log(error);
  }
});

router.put("/fix_product", async (req,res) =>{
  try {
    let updateProduct = await productModel.updateOne(
      { _id: req.params.idProduct}, 
      { 
        idCatagories: req.body.idCatagories, 
        productName: req.body.productName, 
        productCode: req.body.productCode, 
        price: req.body.price, 
        quality: req.body.quality, 
        color: req.body.color, 
        size: req.body.size
      });
    res.json(updateProduct);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/delete_product", async (req,res) =>{
  try {
    let deleteProduct = await productModel.deleteOne({
      _id: req.params.idProduct
    })
    res.json('Delete Success');
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
