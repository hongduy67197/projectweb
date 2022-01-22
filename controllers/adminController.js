const productModel = require("../models/productModel");
const usersModel = require("../models/usersModel");
const catagoriesModel = require("../models/catagoriesSchema");
const cartstModel = require("../models/cartsSchema");
const ordersModel = require("../models/ordersSchema");

exports.getListOrder = async function (req, res){
    try {
        let listAllOrder = await ordersModel.find().populate("listProducts.idproduct")
        .populate('iduser').sort("createDate");
        let listStatus = [
            {
                title: 'Waiting',
                value: 'waiting'
            },
            {
                title: 'Doing',
                value: 'doing'
            },
            {
                title: 'Done',
                value: 'done'
            }
        ]
        
        res.render( "list-order-admin.ejs" ,{listAllOrder, listStatus});
        // console.log(listAllOrder[0].iduser[0].username);
        // res.json(listAllOrder);
        
    } catch (error) {
       console.log(error); 
    }
}

exports.UpdateOrderinlist = async function(req,res) {
    try {
        
       let updateOrder = await ordersModel.updateOne({_id:req.params.idorder},{
        status: req.body.status,
       });
       res.json(updateOrder);
    } catch (error) {
        console.log(error);
    }
}
