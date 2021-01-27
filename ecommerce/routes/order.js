const express = require('express')
const router = express.Router();

const {requireSignin,isAuth,isAdmin} = require("../controllers/auth")
const {userById,orderHistory} = require("../controllers/user")
const {create} = require("../controllers/order")
const {decreaseQuantity} = require("../controllers/product")

router.post('/order/create/:userId',requireSignin,isAuth,orderHistory,decreaseQuantity,create)

router.param('userId',userById)

module.exports = router