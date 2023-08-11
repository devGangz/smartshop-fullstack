// Khai báo thư viện
const express = require("express")

// Imprt controller:
const { createOrder, getOrderById, getAllOrder } = require('../controller/orderController')

// tạo ra router
const orderRouter = express.Router();

// 1. router cho phương thức get
orderRouter.get('/order', getAllOrder)
// 1. router cho phương thức post
orderRouter.post('/order', createOrder)

// 3. router cho phương thức get (lấy 1 giá trị)
orderRouter.get('/order/:orderId', getOrderById)

module.exports = { orderRouter }