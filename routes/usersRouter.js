const express = require("express");
const path = require("path");
const router = express.Router();
const mongoose = require("mongoose");
const userController = require("../controllers/userController");

// router.get("/cart", (req, res) => {
//   res.render("../views/cart.ejs", userController.getList);
// });

router.get("/cart", userController.getList);
// router.put("/cart/:id", userController.uploadcard);
router.put("/cart/fix", userController.updatecarqua);
router.put("/cart/del", userController.deletacard);
router.get("/productid", userController.getidproduct);
router.get("/:userid", userController.getidcard);
router.post("/ordernew", userController.createorder);
router.put("/cartupdate", userController.updatecart);
module.exports = router;
