const {Order,CartItem} = require("../models/order")
const {errorHandler} = require("../helpers/dbErrorHandler")

exports.create = (req,res) => {
    req.body.order.user = req.profile
    const order = new Order(req.body.order)
    order.save((error,data) => {
        if(error){
            return res.status(400).json({
                error:errorHandler(error)
            })
        }else {
            res.json(data)
        }
    })
}

exports.listOrders = (req,res) => {
    Order.find()
        .populate('user',"_id name address")
        .sort('-created')
        .exec((err,order) => {
            if(err){
                return res.status(400).json({
                    error:errorHandler(err)
                })
            }
            res.json(order)
        })
}

exports.getStatusValue = (req,res) => {
    res.json(Order.schema.path('status').enumValues)
}