const productModel = require("../models/productModel");
const usersModel = require("../models/usersModel");
const catagoriesModel = require("../models/catagoriesSchema");
const cartstModel = require("../models/cartsSchema");
const ordersModel = require("../models/ordersSchema");
exports.getList = async function (req, res) {
  try {
    // const listCatagory = await catagoriesModel.find();
    let product = await productModel.find({
      idCatagories: req.query.idCatagories,
    });
    const listCatagory = await catagoriesModel.find();
    let cartId = req.query.cartId;
    // let orderlist = await ordersModel
    //   .find({ _id: orderId })
    //   .populate("listProducts.idproduct");
    // let userid = await usersModel.find();
    // let listproduct = await productModel.find({});
    let cart = await cartstModel
      .find({ _id: cartId })
      .populate("listProducts.idproduct");
    // console.log(cart.listProducts);
    let listData = {
      product: product,
      // orderlist: orderlist,
      cart: cart,
      listCatagory,
      // listproduct: listproduct,
      // iduser: userid,
    };
    // res.json(listData);
    console.log(25, cart[0]);
    res.render("cart.ejs", listData);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

exports.createCatagories = async function (req, res) {
  try {
    let { catagoriesName } = req.body;
    let searchcata = await catagoriesModel.findOne({ catagoriesName });
    if (searchcata) {
      res.json("da co phan loai nay");
    } else {
      let newCatagories = await catagoriesModel.create({
        catagoriesName: catagoriesName,
      });
      res.json("tao moi thanh cong ", newCatagories);
    }
  } catch (error) {
    res.json(error);
  }
};

exports.getListOrderUser = async function(req, res){
  try {
    let listOrder = await ordersModel
    .find({iduser: req.params.iduser})
    .populate("listProducts.idproduct");
    res.json(listOrder);
  } catch (error) {
    console.log(error);
  }
}

exports.createorder = async function (req, res) {
  try {
    let listsp = await cartstModel.find({iduser: req.body.iduser});
    console.log(70, listsp[0].listProducts);
    let a ;
    a = listsp[0].listProducts;
    let newDate = new Date();
    console.log(73, a);
    let newOrder = await ordersModel.create({
      listProducts: a,
      iduser: req.body.iduser, 
      status: req.body.status,
      createDate: newDate, 
      status: "waiting",
    });
    let olderQuality = listsp[0].listProducts;
    for(let elm of olderQuality){
      let CartQuality = elm.quantity;
      console.log(83, -CartQuality, elm.idproduct);
      await productModel.updateOne({
        _id: elm.idproduct,
      },{
        $inc:{quality: -CartQuality} 
      });
    }
    console.log(123, olderQuality);
    let clearCartUser = await cartstModel.updateOne({
      iduser: req.body.iduser
    }, {listProducts: []});
    res.json(newOrder)
  } catch (error) {
    console.log(error);
  }
};


exports.updatecart = async function (req, res) {
  try {
    let idproductes = req.body.idproductes;
    let quantity = req.body.quantity;
    let searchproduct = await cartstModel.findOne({
      _id: req.query.cartId,
    });

    console.log(80, req.body);
    let oldquantity;
    for (let i = 0; i < searchproduct.listProducts.length; i++) {
      if (idproductes === searchproduct.listProducts[i].idproduct) {
        oldquantity = searchproduct.listProducts[i].quantity;
      }
    }
    if (oldquantity) {
      // console.log(91, "if");
      // let newQuantity = oldquantity * 1 + quantity * 1;
      let newQuantity =  quantity ;
      console.log(87, newQuantity);
      let updatecartquantity = await cartstModel.updateOne(
        { _id: req.query.cartId, "listProducts.idproduct": idproductes },
        { $set: { "listProducts.$.quantity": newQuantity } }
        // $. trong "listProducts.$.quantity" su dung de truy van den "listProducts.idproduct"
      );
      res.json(updatecartquantity);
    } else {
      console.log(101, "else");

      let fixcartes = await cartstModel.updateOne(
        { _id: req.query.cartId },
        {
          cartsPrice: req.body.cartsPrice,
          $push: {
            listProducts: {
              idproduct: idproductes,
              quantity: quantity,
            },
          },
        }
      );
      res.json(fixcartes);
    }
  } catch (error) {
    console.log(100, error);
  }
};

exports.updatecarqua = function (req, res) {
  cartstModel
    .updateOne(
      { _id: req.query.cartId, "listProducts.idproduct": req.body.idproduct },
      {
        $pull: {
          listProducts: {
            idproduct: req.body.idproduct,
          },
        },
      }
    )
    .then(() => {
      cartstModel
        .updateOne(
          {
            _id: req.query.cartId,
            // "listProducts.idproduct": req.body.idproduct,
          },
          {
            $push: {
              listProducts: {
                idproduct: req.body.idproduct,
                quantity: req.body.quantity,
              },
            },
          }
        )
        .then((data) => {
          res.json(data);
        });
      // .catch((err) => {
      //   res.json(err);
      // });
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
};

exports.deletacard = async function (req, res) {
  try {
    let detecard = await cartstModel.updateOne(
      { _id: req.query.cartId, "listProducts.idproduct": req.body.idproduct },
      {
        $pull: {
          listProducts: {
            idproduct: req.body.idproduct,
          },
        },
      }
    );
    res.json(detecard);
    console.log(detecard);
  } catch (error) {
    console.log(error);
  }
};

exports.getidcard = async function (req, res) {
  try {
    let userid = req.params.userid;

    let cardid = await cartstModel.find({ iduser: userid });
    // console.log(cardid);
    res.json(cardid[0]._id);
  } catch (error) {
    console.log(error);
  }
};

exports.getidproduct = async function (req, res) {
  let seaidpro = await productModel.find({
    productCode: req.query.namesp,
    productName: req.query.productName,
    color: req.query.color,
    size: req.query.size,
  });
  res.json(seaidpro);
};
