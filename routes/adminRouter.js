const express = require("express");
const path = require("path");
const router = express.Router();
const mongoose = require("mongoose");
const adminController = require("../controllers/adminController");

router.get("/listOrder", adminController.getListOrder);
router.put("/updateOrder", adminController.UpdateOrderinlist);

module.exports = router;