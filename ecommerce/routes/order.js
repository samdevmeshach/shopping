const express = require('express')
const router = express.Router();

const {requireSignin,isAuth,isAdmin} = require("../controllers/auth")
const {userById,orderHistory} = require("../controllers/user")
const {create,listOrders,getStatusValue} = require("../controllers/order")
const {decreaseQuantity} = require("../controllers/product")

router.post('/order/create/:userId',requireSignin,isAuth,orderHistory,decreaseQuantity,create)
router.get('/order/list/:userId',requireSignin,isAuth,isAdmin,listOrders)
router.get('/order/status-value/:userId',requireSignin,isAuth,isAdmin,getStatusValue)
router.put('/order/:orderId/status/:userId',requireSignin,isAuth,isAdmin,getStatusValue)

router.param('userId',userById)

module.exports = router